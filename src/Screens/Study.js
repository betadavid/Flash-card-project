import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import CardStudy from "../Components/CardStudy";
import { readDeck } from "../utils/api";

function Study(){
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});

    useEffect(() => {
        const abortController = new AbortController();
        
        async function getData() {
            try {
                const deckResponse = await readDeck(deckId,abortController.signal);
                setDeck(deckResponse);
            } catch (error) {
                if(error.name!=="AbortError") throw error;
            }     
        }
        getData();
        return () => abortController.abort();
    }, [deckId]);

    return (<div style={{width: "600px"}}>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Study</li>
            </ol>
        </nav>
        <h2>Study: {deck.name}</h2>
        {deck.cards ? <CardStudy cards={deck.cards}/>:<></>}
    </div>);
}

export default Study;