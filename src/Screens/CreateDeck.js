import React from "react";
import {Link, useHistory} from "react-router-dom";
import DeckForm from "../Components/Forms/DeckForm";
import {createDeck} from "../utils/api";

function CreateDeck(){
    const history = useHistory();

    async function handleSubmit(event, newDeck) {
        event.preventDefault();
        const abortController = new AbortController();
        try{
            const response = await createDeck(newDeck, abortController.signal); 
            history.push("/");
        }
        catch(error){
            if(error.name !== "AbortError") throw error;
        }
        return () => abortController.abort();
    }

    return(<>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
            </ol>
        </nav>
        <DeckForm formType="Create" handleSubmit={handleSubmit}/>
    </>);
}

export default CreateDeck;