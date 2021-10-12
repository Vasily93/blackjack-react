import React, {Component} from 'react';
import Cards from './Cards';

class Player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bet: 0,
            playing: false,
            sum: 0,
            money: 500
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState(state => state = {...state, playing: true})
    }

    handleChange = (e) => {
        e.preventDefault()
        const bet = e.target.value;
        this.setState(state => state = {...state, bet: bet})
    }

    handleDraw = async() => {
        const {dealer, player} = await this.props.draw();
        if(dealer > 21) {
            console.log('Dealer is over 21')
        } else if(player > 21) {
            console.log('Player is over 21')
        }
    }

    handleGuess = () => {
        this.props.whoWon(this.state.bet)
    }

    render() {
        let {name} = this.props.player;
        let game = this.state.playing ? 
            <div>
                <p>Your bet: {this.state.bet}</p>
                <p>Total: {this.props.cards.sum}</p>
                <button onClick={this.handleDraw}>Draw</button>
                <button onClick={this.handleGuess}>guess win</button>
            </div>
            :
            <form onSubmit={this.handleSubmit}>
                <label>
                    Your bet:
                    <input onChange={this.handleChange} value={this.state.bet}/>
                </label>
                <button>Place a bet</button>
            </form>
        return(
            <div>
                <h4>Player: {name}</h4>
                <p>Money: {`$ ${this.state.money}`}</p>
                {game}
                <Cards cards={this.props.cards.cards} />
            </div>
        )
    }
}

export default Player;