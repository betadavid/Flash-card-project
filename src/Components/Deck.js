import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import { readDeck } from "../utils/api";
import StudyButton from "./Buttons/StudyButton";
import DeleteButton from "./Buttons/DeleteButton";
import EditButton from "./Buttons/EditButton";
import AddCardsButton from "./Buttons/AddCardsButton";
import CardsList from "./CardsList";

function Deck() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        
        async function getData() {
            try {
                const deckResponse = await readDeck(
                    deckId,
                    abortController.signal
                );
                setDeck(deckResponse);
                setCards(deckResponse.cards);
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
                <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
            </ol>
        </nav>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <div className="container">
            <div className="row">
                <div className="col p-0">
                    <EditButton type="deck"/>
                    <StudyButton deckId={deck.id}/>
                    <AddCardsButton deckId={deck.id}/>
                </div>
                <div className="col d-flex justify-content-end">
                    <DeleteButton elementToDelete="deck" elementId={deck.id}/>
                </div>
            </div>
        </div>
        <h2 style={{marginTop: "50px"}}>Cards</h2>
        {cards.length>0 ? <CardsList cards={cards}/> : <p>No cards to display! Add some cards</p>}
    </div>);
}

export default Deck;