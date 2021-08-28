import React, {Component} from 'react';

class Player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
        this.handleDraw = this.handleDraw.bind(this)
    }

    handleDraw() {
        const card = this.props.draw()
        console.log('card====', card)
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