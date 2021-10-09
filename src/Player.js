import React, {Component} from 'react';
import Cards from './Cards';

class Player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: [],
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
        const card = await this.props.draw();
        let newCards = this.state.cards;
        newCards.push(card);
        this.setState({cards: newCards})
        this.addToSum(card.value)
    }

    addToSum = (value) => {
        const newSum = this.state.sum + value;
        if(newSum > 21) {
            alert('You lost!');
            const updatedMoney = this.state.money - this.state.bet
            this.setState(state => state = {
                bet:0,
                playing: false,
                cards: [],
                sum: 0,
                money: updatedMoney})
        } else {
            this.setState(state => state = {...state, sum: newSum})
        }
    }

    handleGuess = () => {
        const {sum, bet} = this.state;
        let res = this.props.whoWon(sum, bet);
        console.log('result', res)
        this.setState(state => state = {
            bet:0,
            playing: false,
            cards: [],
            sum: 0,
            money: state.money + res})
    }

    render() {
        let {name} = this.props.player;
        let game = this.state.playing ? 
            <div>
                <p>Your bet: {this.state.bet}</p>
                <p>Total: {this.state.sum}</p>
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
                <Cards cards={this.state.cards} />
            </div>
        )
    }
}

export default Player;