import React, {Component} from 'react';

class Player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cards: []
        }
        this.handleDraw = this.handleDraw.bind(this)
    }

    async handleDraw() {
        const card =  await this.props.draw();
        let newCards = this.state.cards;
        newCards.push(card);
        this.setState({cards: newCards})
    }

    render() {
        return(
            <div>
                player {this.props.id}
                <button onClick={this.handleDraw}>Draw</button>
            </div>
        )
    }
}

export default Player;