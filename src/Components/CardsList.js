import React from "react";
import Card from "./Card";

function CardList ({cards}) {
    const cardList = cards.map(card => <li key={card.id} className="list-group-item"><Card card={card}/></li>)
    return (<div className="card mt-2" style={{width: "600px"}}>
        <ul className="list-group list-group-flush">
            {cardList}
        </ul>
    </div>);
}

export default CardList;