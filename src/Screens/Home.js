import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import DeckList from "../Components/DeckList";
import { listDecks } from "../utils/api";

function Home(){

    const [decks, setDecks] = useState([]);

    useEffect(()=>{
        const abortController = new AbortController();
        async function loadDecks (){
            try{
                const decksFromAPI = await listDecks(abortController.signal);
                setDecks(decksFromAPI);
            }
            catch(error){
                if(error.name !== "AbortError") throw error;
            }
        }
        loadDecks();
        return ()=>abortController.abort();
    },[]);

    return (<>
        <Link to="/decks/new" className="btn btn-secondary" role="button"> <strong>+</strong> Create Deck</Link>
        <DeckList decks={decks}/>
    </>);
}

export default Home;