import React from "react";
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function CardForm({handleSubmit, handleChange, formData}){
    const {cardId, deckId} = useParams();

    return (<>
        <form onSubmit={handleSubmit} style={{width: "600px"}}>
            <label htmlFor="front" className="form-label">Front</label>
            <textarea
                id="front" 
                type="text" 
                placeholder="Front side of card"
                name="front"
                className="form-control mb-3"
                style={{height: "100px"}}
                onChange={handleChange}
                value={formData.front}
            />
            
            <label htmlFor="back" className="form-label">Back</label>
            <textarea
                id="back" 
                type="text" 
                placeholder="Back side of card"
                name="back"
                className="form-control mb-3"
                style={{height: "100px"}}
                onChange={handleChange}
                value={formData.back}
            />
            <Link to={`/decks/${deckId}`} role="button" className="btn btn-secondary">{cardId ? "Cancel":"Done"}</Link> {/* if cardId is defined means we are in the edit card screen, so displays cancel, otherwise display done */}
            <button type="submit" className="btn btn-primary mx-2">{cardId ? "Submit" : "Save"}</button>
        </form>
    </>);
}

export default CardForm;