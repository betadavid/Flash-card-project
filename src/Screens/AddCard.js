import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../utils/api/index";
import CardForm from "../Components/Forms/CardForm";

function AddCard() {
    const { deckId } = useParams();
    const [currentDeck, setCurrentDeck] = useState({});

    const initialFormState = {
        front: "",
        back: "",
    };

    const [formData, setFormData] = useState({ ...initialFormState });

    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck() {
            try {

                const deck = await readDeck(deckId, abortController.signal);
                setCurrentDeck(deck);
            } catch (error) { 
                if (error.name !== "AbortError") throw error;
            }
        }
            loadDeck();
        return () => abortController.abort();
    }, [deckId]);

    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        async function create() {
            setFormData({ ...initialFormState }); // Reset form
            await createCard(deckId, formData);
        }
        create();
    };

    return (<div style={{width: "600px"}}>
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
        </nav>
        <div className="row">
            <div className="col">
                <h3>Add Card: {currentDeck.name}:</h3>
                <CardForm
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    formData={formData}
                />
            </div>
        </div>
    </div>);
}

export default AddCard;