import React, {Component} from 'react';
import Player from './Player';
import axios from 'axios';

class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deck: null
        }
        this.drawCard = this.drawCard.bind(this)
    }

    drawCard() {
        let card = {};
        axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deck.deck_id}/draw/?count=1`)
            .then(res => {
                const {suit, value} = res.data.cards[0];
                card.suit = suit;
                card.value = value;
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
            <p>Cards left: {this.state.deck.remaining}</p> :
            <p>Waiting......</p>

        return(
            <div>
                {deck}

                <Player id={1} draw={this.drawCard}/>
                <Player id={2} draw={this.drawCard}/>
            </div>
        )
    }
}

export default Game;