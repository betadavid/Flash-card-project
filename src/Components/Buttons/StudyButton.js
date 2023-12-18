import React from "react";
import {Link} from "react-router-dom";

function StudyButton ({deckId}) {
    return <Link to={`/decks/${deckId}/study`} className="btn btn-primary mx-2" role="button">Study</Link>;
}

export default StudyButton;