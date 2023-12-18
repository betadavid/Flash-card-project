import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from 'react-router-dom'
import { readCard, readDeck, updateCard } from "../utils/api/index";
import CardForm from "../Components/Forms/CardForm";

function EditCard() {
    const history = useHistory();
    const { deckId, cardId } = useParams();
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
            console.log("I loaded the deck", deck);
        } catch (error) {
            if (error.name === "AbortError")
            console.log("Aborted Load Single Deck");
            else throw error;
        }
    } 

    loadDeck();

    return () => abortController.abort();
}, [deckId]);

useEffect(() => {
    const abortController = new AbortController();

    async function loadCard() {
        try {
            const card = await readCard(cardId, abortController.signal);
            setFormData({ ...card });

        } catch (error){
            if (error.name === "AbortError")
            console.log("Aborted Load Single Card");
            else throw error;
        }
    }

    loadCard();

    return () => abortController.abort();
}, [deckId, cardId]);

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
        await updateCard(formData);
        history.push(`/decks/${deckId}`);
    }
    create();
};

const handleCancel = () => {
    history.push(`/decks/${deckId}`);
};

return (<div style={{width: "600px"}}>
    <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${currentDeck.id}`}>{currentDeck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
            </ol>
        </nav>
    <div className="row">
        <div className="col">
            <h3>Edit Card</h3>
                <CardForm
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    formData={formData}
                    handleCancel={handleCancel}
                />
        </div>
    </div>
</div>);
}

export default EditCard;