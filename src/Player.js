import React, {Component} from 'react';

class Player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: [],
            bet: 0,
            playing: false
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

    handleDraw = () => {
        const card = this.props.draw();
        let newCards = this.state.cards;
        newCards.push(card);
        this.setState({cards: newCards})
    }

    // componentDidUpdate() {
    //     let newSum = 0;
    //     this.state.cards.forEach(c  => {
    //         if(typeof parseInt(c.value) === 'number') {
    //             newSum += parseInt(c.value)
    //         }
    //     })
    //     console.log('update', newSum)
    // }

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
                        <li>{`${c.value} of ${c.suit}`}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Player;