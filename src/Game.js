import React, {Component} from 'react';
import Player from './Player';
import PlayerForm from './PlayerForm';
import axios from 'axios';

//Left to do:
//

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deck: null,
            dealerCards: []
        }
        this.drawCard = this.drawCard.bind(this);
        this.registerPlayer = this.registerPlayer.bind(this);
        this.getCardData = this.getCardData.bind(this);
        this.getRealValue = this.getRealValue.bind(this);
        this.whoWon = this.whoWon.bind(this);
    }

    registerPlayer(name) {
        const player = {name: name, money: 500};
        this.setState(state => state = {...state, player: player})
    }

    async drawCard() {
        let card = {};
        await axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw/?count=2`)
            .then(res => {
                card = this.getCardData(card, res.data.cards[0])
                const updatedDeck = this.state.deck;
                updatedDeck.remaining = updatedDeck.remaining -2;
                const updatedDealerCards = this.state.dealerCards;
                updatedDealerCards.push(this.getCardData({}, res.data.cards[1]))
                this.setState({deck: updatedDeck, dealerCards: updatedDealerCards})
            })
            return card;
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

    whoWon(playersSum, bet) {
        let dealerSum = 0;
        this.state.dealerCards.map(card => dealerSum += card.value);
        if(dealerSum < playersSum) {
            console.log('Win!')
            return bet
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

        const game = this.state.player ?
            <Player player={this.state.player} draw={this.drawCard} whoWon={this.whoWon}/> :
            <PlayerForm registerPlayer={this.registerPlayer} />
        return(
            <div>
                {deck}
                {game}
            </div>
        )
    }
}

export default Game;