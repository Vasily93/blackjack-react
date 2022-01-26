import React, {Component} from 'react';
import Cards from './Cards';
import './Player.css';

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
        const {dealerSum, playerSum} = await this.props.draw();
        if(playerSum > 21) {
            this.props.over21();
            alert(`${this.props.player.name} went over 21! You lost $ ${this.state.bet}`)
            this.setState(state => state = {...state, playing: false, money: (this.state.money - this.state.bet)});
        } else if(dealerSum > 21) {
            this.props.over21();
            alert(`Dealer went over 21! You Win $ ${this.state.bet*2}`)
            this.setState(state => state = {...state, playing: false, money: (this.state.money + this.state.bet*2)});
        }
    }

    handleGuess = () => {
        const result = this.props.whoWon(this.state.bet);
        const newSum = this.state.money + (parseInt(result));
        this.setState(state => state = {...state, playing: false, money: newSum})
    }

    render() {
        let {name} = this.props.player;
        let game = this.state.playing ? 
            <div className='Player'>
                <span className='Player-nums'>Your bet: {this.state.bet}</span>
                <span className='Player-nums'>Total: {this.props.cards.sum}</span>
                <div style={{minHeight:'130px'}}>
                    <Cards cards={this.props.cards.cards}/>
                </div>
                <div className='Player-buttons'>
                    <button onClick={this.handleDraw}>Draw</button>
                    <button onClick={this.handleGuess}>guess win</button>
                </div>
            </div>
            :
            <form className='Bet-form' onSubmit={this.handleSubmit}>
                <label>
                    <p>Your bet:</p>
                    <input onChange={this.handleChange} value={this.state.bet}/>
                </label>
                <button>Place a bet</button>
            </form>
        return(
            <div className='Player'>
                <span className='Player-name'>Player: {name}</span>
                <span className='Player-bank'>Your Bank: {`$ ${this.state.money}`}</span>
                {game}
            </div>
        )
    }
}

export default Player;