import React from "react";
import './Cards.css'

function Cards(props) {
    return(
        <ul >
        {props.cards.map((c, ind) => (
            <li key={`${c.value}${c.suit}${ind}`}>
                <img alt={`${c.value}-${c.suit}`} src={c.image}/>
            </li>
        ))}
    </ul>   
    )
}

export default Cards;
