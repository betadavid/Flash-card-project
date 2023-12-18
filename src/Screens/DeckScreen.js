import React, {useState, useEffect} from "react";
import Study from "./Study";
import NotFound from "../Layout/NotFound";
import {Switch, Route, useRouteMatch, useParams} from "react-router-dom";
import EditDeck from "./EditDeck";
import { readDeck } from "../utils/api";
import Deck from "../Components/Deck";
import EditCard from "./EditCard";
import AddCard from "./AddCard";

function DeckScreen() {
  const {path} = useRouteMatch();
  const [deck, setDeck] = useState({});
  const {deckId} = useParams();
  

  useEffect(()=>{
    const abortController = new AbortController();
    async function loadDeck(){
      try{
        const deckFromAPI = await readDeck(deckId,abortController.signal);
        setDeck({...deckFromAPI});
      }
      catch(error){
        if(error.name!=="AbortError") throw error;
      }
    }
    loadDeck();
    return ()=>abortController.abort();
  },[deckId]);

  if(deck.id){
    return (<>
      <Switch>
        <Route exact path={path}>
          <Deck />
        </Route>
        <Route path={`${path}/study`}>
          <Study />
        </Route>
        <Route path={`${path}/edit`}>
          <EditDeck deck={deck}/>
        </Route>
        <Route path={`${path}/cards/new`}>
          <AddCard />
        </Route>
        <Route path={`${path}/cards/:cardId/edit`}>
          <EditCard />
        </Route>
        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </>);
  }
  return "Loading";
}

export default DeckScreen;