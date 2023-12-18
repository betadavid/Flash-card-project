import React from "react";
import {Link, useHistory} from "react-router-dom";
import DeckForm from "../Components/Forms/DeckForm";
import { updateDeck } from "../utils/api";

function EditDeck({deck}){

    const history = useHistory();

    async function handleSubmit(event, dataToUpdate) {
        event.preventDefault();
        const abortController = new AbortController();
        try{
            const updatedDeck = {id: deck.id, ...dataToUpdate};
            await updateDeck(updatedDeck, abortController.signal); 
            history.push("/");
        }
        catch(error){
            if(error.name !== "AbortError") throw error;
        }
        return ()=>abortController.abort();
    }

    return(<div style={{width: "600px"}}>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
            </ol>
        </nav>
        <DeckForm deck={deck} formType="Edit" handleSubmit={handleSubmit}/>
    </div>);
}

export default EditDeck;