import React from "react";
import {Link} from "react-router-dom";

function ViewButton ({deckId}) {
    return <Link to={`/decks/${deckId}`} className="btn btn-secondary" role="button">View</Link>;
}

export default ViewButton;