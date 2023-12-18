import React, {useState} from "react";
import {Link, useParams} from "react-router-dom";

function DeckForm({formType, deck={name: "", description: ""}, handleSubmit}){
    const initialFormState = {name: deck.name, description: deck.description};
    const [formData, setFormData] = useState({...initialFormState});

    const {deckId} = useParams();
    let cancelPath = "/";
    if(deckId) cancelPath= `/decks/${deckId}`;

    const handleChange = ({target}) => {
        setFormData({
            ...formData,
            [target.name]: target.value
        });
    };

    
    return (<>
        <h2>{formType} Deck</h2>
        <form onSubmit={(event)=> handleSubmit(event, formData)} style={{width: "600px"}}>
            <label htmlFor="name" className="form-label">Name</label>
            <input
                id="name" 
                type="text" 
                placeholder="Deck Name"
                name="name"
                className="form-control mb-3"
                onChange={handleChange}
                value={formData.name}
            />
            
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
                id="description" 
                type="text" 
                placeholder="Brief description of the deck"
                name="description"
                className="form-control mb-3"
                style={{height: "100px"}}
                onChange={handleChange}
                value={formData.description}
            />
            <Link to={cancelPath} role="button"className="btn btn-secondary">Cancel</Link>
            <button type="submit" className="btn btn-primary mx-2">Submit</button>
        </form>
    </>);
}

export default DeckForm;