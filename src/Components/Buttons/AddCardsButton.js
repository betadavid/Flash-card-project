import React from "react";
import {Link} from "react-router-dom";

function AddCardsButton ({deckId}) {
    return <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary" role="button"><strong>+</strong> Add Cards</Link>;
}

export default AddCardsButton;