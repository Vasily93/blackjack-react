import React, {Component} from 'react';
import Player from './Player';
import PlayerForm from './PlayerForm';
import axios from 'axios';
import Cards from './Cards';
import MessageModal from './MessageModal';
import AceModal from './AceChoiceModal';
import './Game.css';


class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deck: null,
            dealerCards: {cards:[], sum: 0},
            playerCards: {cards:[], sum: 0},
            message: 'Black Jack',
            isModal: false,
            isAceModal: false,
            player: null
        }
        this.drawCard = this.drawCard.bind(this);
        this.registerPlayer = this.registerPlayer.bind(this);
        this.destroyPlayer = this.destroyPlayer.bind(this);
        this.getCardData = this.getCardData.bind(this);
        this.getRealValue = this.getRealValue.bind(this);
        this.whoWon = this.whoWon.bind(this);
        this.getSum = this.getSum.bind(this);
        this.clearCards = this.clearCards.bind(this);
        this.over21 = this.over21.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.aceChoice = this.aceChoice.bind(this);
    }

    registerPlayer(name) {
        const player = {name: name};
        this.setState(state => state = {...state, player: player})
    }

    destroyPlayer() {
        this.setState({player: null})
        this.showModal('You lost All Yuor Money. Start over!')

    }

    async drawCard() {
        const sums = {};
        await axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw/?count=2`)
            .then(res => {
                const updatedDeck = this.state.deck;
                updatedDeck.remaining = updatedDeck.remaining -2;

                const dealerCards = [...this.state.dealerCards.cards, this.getCardData({}, res.data.cards[1], true)];
                const updatedDealer = {cards: dealerCards, sum: this.getSum(dealerCards)}

                const playerCards = [...this.state.playerCards.cards, this.getCardData({}, res.data.cards[0], false)];
                const updatedPlayer = {cards: playerCards, sum: this.getSum(playerCards)}

                sums.dealerSum = updatedDealer.sum;
                sums.playerSum = updatedPlayer.sum;

                this.setState({deck: updatedDeck, dealerCards: updatedDealer, playerCards: updatedPlayer})
            })
            return sums;
    }

    getCardData(obj, data, isDealer) {
        const {suit, value, image} = data;
        obj.suit = suit;
        obj.value = this.getRealValue(value, isDealer);
        obj.image = image;
        return obj;
    }

    getRealValue(value, isDealer) {
        if(!isNaN(parseInt(value))) return parseInt(value);
        if(value !== 'ACE') return 10;
        if(value === 'ACE' && isDealer) {
            let num = 0;
            (this.state.dealerCards.sum + 11) > 21 ? 
                num += 1 :
                num += 11;
            return num;
        } 
        if(value === 'ACE' && isDealer === false) {
            this.setState({ isAceModal: true})
            return 0;
        }
    }

    getSum(cards) {
        let sum = 0;
        cards.map(card => {
            return sum+= card.value;
        });
        return sum;
    }

    clearCards() {
        this.setState({
            deck: this.state.deck,
            dealerCards: {cards:[], sum: 0},
            playerCards: {cards:[], sum: 0}
        })
    }

    over21(message) {
        this.showModal(message)
    }

    showModal(message) {
        this.setState({
                message: message,
                isModal: true,
            })
    }

    hideModal() {
         this.setState({isModal: false})
         this.clearCards()
    }

    aceChoice(choice) {
        const newSum = this.state.playerCards.sum + choice;
        this.setState({ 
            isAceModal: false,
            playerCards: {
                cards: this.state.playerCards.cards,
                sum: newSum
            }
        })
    }

    whoWon(bet) {
        let res = 0;
        if(this.state.dealerCards.sum === this.state.playerCards.sum) {
            this.showModal('This is a Draw!')
            return res;

        }
        switch(this.state.dealerCards.sum < this.state.playerCards.sum) {
            case true:
                res = bet*2;
                this.showModal(`You Win $ ${res}`)
                break;
            case false:
                res = (bet - bet*2);
                this.showModal(`You lost ${bet}`) 
                break;
            default:
                res = 0;
        }
        return res;
    }

    componentDidMount() {
        axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
            .then(res => {
                this.setState({deck: res.data})
            }) 
    }


    render() {
        let deck = this.state.deck ? 
            <p>Deck: {this.state.deck.remaining}</p> :
            <p>Waiting......</p>

        const player = this.state.player ?
            <Player player={this.state.player} 
                draw={this.drawCard} 
                whoWon={this.whoWon} 
                cards={this.state.playerCards}
                over21={this.over21}
                destroyPlayer={this.destroyPlayer}  
            /> :
            <PlayerForm registerPlayer={this.registerPlayer} />
        return(
            <div className='Game'>
                <MessageModal message={this.state.message} 
                    visible={this.state.isModal}
                    hideModal={this.hideModal}
                />
                <AceModal visible={this.state.isAceModal} 
                    aceChoice={this.aceChoice}
                />
                <div className='Game-playerBlock'>
                    <h4>Dealer</h4>
                    {deck}
                    {this.state.player && <Cards isDealer={true} isModal={this.state.isModal} cards={this.state.dealerCards.cards} />}
                </div>
                <div className='Game-playerBlock'>
                    {player}
                </div>
            </div>
        )
    }
}

export default Game;