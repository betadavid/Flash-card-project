import React from "react";
import {Link, useParams} from "react-router-dom";

function EditButton ({cardId, type}) {
    const {deckId} = useParams();
    const linkPath = type==="deck"? `/decks/${deckId}/edit`: `/decks/${deckId}/cards/${cardId}/edit`;
    return <Link to={linkPath} className="btn btn-secondary" role="button">Edit</Link>;
}

export default EditButton;