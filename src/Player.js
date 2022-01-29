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
            money: 400,
            bets: []
        }
    }

    handleSubmit = (e) => {
        this.setState(state => state = {...state,playing: true, bet: parseInt(e.target.id)})

    }

    handleChange = (e) => {
        e.preventDefault()
        const bet = e.target.value;
        this.setState(state => state = {...state, bet: bet})
    }

    handleDraw = async() => {
        const {dealerSum, playerSum} = await this.props.draw();
        if(playerSum > 21) {
            this.props.over21(`${this.props.player.name} went over 21! You lost $ ${this.state.bet}`);
            this.setState(state => state = {...state, playing: false, money: (this.state.money - this.state.bet)});
        } else if(dealerSum > 21) {
            this.props.over21(`Dealer went over 21! You Win $ ${this.state.bet*2}`);
            this.setState(state => state = {...state, playing: false, money: (this.state.money + this.state.bet*2)});
        }
    }

    handleGuess = () => {
        const result = this.props.whoWon(this.state.bet);
        const newSum = this.state.money + (parseInt(result));
        this.setState(state => state = {...state, playing: false, money: newSum})
    }

    setBets = () => {
        const arr = [];
        let n =this.state.money;
        while (arr.length < 4 && n > 10) {
            arr.push(n);
            n = Math.floor(n/2)
        }
        this.setState({bets: arr})
    }

    componentDidMount() {
        this.setBets()
    }

    componentDidUpdate(prevPorps, prevState) {
        if(prevState.money !== this.state.money) {
            this.setBets()
        }
        if(this.state.money === 0) {
            this.props.destroyPlayer()
        }
    }

    render() {

        return(
            <div className='Player'>
                <span className='Player-name'>Player: {this.props.player.name}</span>
                <span className='Player-bank'>Your Bank: {`$ ${this.state.money}`}</span>
                <span className='Player-nums'>Your bet: {this.state.bet}</span>
                <span className='Player-nums'>Total: {this.props.cards.sum}</span>
                <Cards cards={this.props.cards.cards}/>
                {this.state.playing === true &&
                    <div className='Player-buttons'>
                        <button onClick={this.handleDraw}>Draw</button>
                        <button onClick={this.handleGuess}>guess win</button>
                    </div>
                }
                {this.state.playing === false &&
                        <div className='Player-buttons'>
                        {this.state.bets.map(n =>(<button onClick={this.handleSubmit} id={n}>{n}</button>))}
                    </div>
                }
            </div>
        )
    }
}

export default Player;