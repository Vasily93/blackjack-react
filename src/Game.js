import React, {Component} from 'react';
import Player from './Player';
import PlayerForm from './PlayerForm';
import axios from 'axios';

//make a dealer

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
    }

    registerPlayer(name) {
        const player = {name: name, money: 500};
        this.setState(state => state = {...state, player: player})
    }

    async drawCard() {
        let card = {};
        let dealerCard = {};
        await axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw/?count=2`)
            .then(res => {
                console.log(res)
                card = this.getCardData(card, res.data.cards[0])
                dealerCard = this.getCardData(dealerCard, res.data.cards[1])
                console.log(dealerCard)
                this.setState({
                    remaining: res.data.remaining,
                    // dealerCards: this.state.dealerCards.push(dealerCard)
                })
            })
            return card;
    }

    getCardData(obj, data) {
        const {suit, value, image} = data;
        obj.suit = suit;
        obj.value = value;
        obj.image = image;
        return obj;
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
            <Player player={this.state.player} draw={this.drawCard}/> :
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