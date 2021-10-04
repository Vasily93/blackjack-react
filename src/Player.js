import React, {Component} from 'react';

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
        // let num;
        // if(!isNaN(parseInt(value))) {
        //     num = parseInt(value)
        // } else if(value !== 'ACE') {
        //     num = 10
        // } else {
        //     const choice = prompt(`You got total of ${this.state.sum}. Would you like to add 1 or 11?`)
        //     num = parseInt  (choice);
        // }
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
        this.props.whoWon(sum, bet)
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
                <ul>
                    {this.state.cards.map(c => (
                        <li>
                            <img alt='card' src={c.image}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Player;