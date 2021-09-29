import React, {Component} from 'react';

class Player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: [],
            bet: 0,
            playing: false,
            sum: 0
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
        // console.log(card.value)
        this.addToSum(card.value)
        let newCards = this.state.cards;
        newCards.push(card);
        this.setState({cards: newCards})
    }

    addToSum = (value) => {
        let num;
        if(!isNaN(parseInt(value))) {
            num = parseInt(value)
        } else if(value !== 'ACE') {
            num = 10
        } else {
            num = 11
        }
        const newSum = this.state.sum + num;
        this.setState(state => state = {...state, sum: newSum})
    }

    render() {
        let {name, money} = this.props.player;
        let game = this.state.playing ? 
            <div>
                <p>Your bet: {this.state.bet}</p>
                <button onClick={this.handleDraw}>Draw</button>
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
                <p>Money: {`$ ${money}`}</p>
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