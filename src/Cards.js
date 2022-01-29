import React from "react";
import { Component } from "react";
import './Cards.css'

class Cards extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return(
            <div className='Cards'>
                <ul >
                {this.props.cards.map((c, ind) => (
                    <li key={`${c.value}${c.suit}${ind}`}>
                        <img alt={`${c.value}-${c.suit}`} src={c.image}/>
                    </li>
                ))}
                </ul>   
            </div>
        )
    }
}

export default Cards;
