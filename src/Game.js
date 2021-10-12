import React, {Component} from 'react';
import Player from './Player';
import PlayerForm from './PlayerForm';
import axios from 'axios';
import Cards from './Cards';


class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deck: null,
            dealerCards: {cards:[], sum: 0},
            playerCards: {cards:[], sum: 0}
        }
        this.drawCard = this.drawCard.bind(this);
        this.registerPlayer = this.registerPlayer.bind(this);
        this.getCardData = this.getCardData.bind(this);
        this.getRealValue = this.getRealValue.bind(this);
        this.whoWon = this.whoWon.bind(this);
        this.getSum = this.getSum.bind(this);
    }

    registerPlayer(name) {
        const player = {name: name, money: 500};
        this.setState(state => state = {...state, player: player})
    }

    async drawCard() {
        const sums = {};
        await axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw/?count=2`)
            .then(res => {
                const updatedDeck = this.state.deck;
                updatedDeck.remaining = updatedDeck.remaining -2;

                const dealerCards = [...this.state.dealerCards.cards, this.getCardData({}, res.data.cards[1])];
                const updatedDealer = {cards: dealerCards, sum: this.getSum(dealerCards)}

                const playerCards = [...this.state.playerCards.cards, this.getCardData({}, res.data.cards[0])];
                const updatedPlayer = {cards: playerCards, sum: this.getSum(playerCards)}

                sums.dealer = updatedDealer.sum;
                sums.player = updatedPlayer.sum;

                this.setState({deck: updatedDeck, dealerCards: updatedDealer, playerCards: updatedPlayer})
            })
            return sums;
    }

    getCardData(obj, data) {
        const {suit, value, image} = data;
        obj.suit = suit;
        obj.value = this.getRealValue(value);
        obj.image = image;
        return obj;
    }

    getRealValue(value) {
        let num;
        if(!isNaN(parseInt(value))) {
            num = parseInt(value)
        } else if(value !== 'ACE') {
            num = 10
        } else {
            // const choice = prompt(`You got total of ${this.state.sum}. Would you like to add 1 or 11?`)
            num = 11
        }
        return num;
    }

    getSum(cards) {
        let sum = 0;
        cards.map(card => sum += card.value);
        return sum;
    }

    whoWon(bet) {
        if(this.state.dealerCards.sum < this.state.playerCards.sum) {
            console.log('Win!')
            return bet;
        } else if(this.state.dealerCards.sum < this.state.playerCards.sum) {
            console.log('Lost!')
            return (bet - bet*2);
        } else {
            console.log('it a draw!!!')
        }
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
            <Player player={this.state.player} draw={this.drawCard} whoWon={this.whoWon} cards={this.state.playerCards}/> :
            <PlayerForm registerPlayer={this.registerPlayer} />
        return(
            <div>
                {deck}
                <Cards cards={this.state.dealerCards.cards} />
                {player}
            </div>
        )
    }
}

export default Game;