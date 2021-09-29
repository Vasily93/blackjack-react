import React, {Component} from 'react';
import Player from './Player';
import PlayerForm from './PlayerForm';
import axios from 'axios';



class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deck: null
        }
        this.drawCard = this.drawCard.bind(this);
        this.registerPlayer = this.registerPlayer.bind(this);
    }

    registerPlayer(name) {
        const player = {name: name, money: 500};
        this.setState(state => state = {...state, player: player})
    }

    async drawCard() {
        let card = {};
        await axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw/?count=1`)
            .then(res => {
                const {suit, value, image} = res.data.cards[0];
                card.suit = suit;
                card.value = value;
                card.image = image;
                this.setState(state => {
                    state.deck['remaining'] = res.data.remaining;
                    return state
                })
            })
            return card;
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