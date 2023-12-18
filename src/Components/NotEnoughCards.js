import React from "react";
import AddCardsButton from "./Buttons/AddCardsButton";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";


function NotEnoughCards({cards}) {
    const {deckId} = useParams();
    return (<>
        <h4>Not enough cards</h4>
        <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
        <AddCardsButton deckId={deckId} />
    </>);
}

export default NotEnoughCards;