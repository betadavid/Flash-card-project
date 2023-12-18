import React, {useState, useEffect} from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Screens/Home";
import DeckScreen from "../Screens/DeckScreen";
import {Switch,Route} from "react-router-dom";
import CreateDeck from "../Screens/CreateDeck";

function Layout() {

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId">
            <DeckScreen />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
