import React from "react";
import DeckCard from "./DeckCard";

function DeckList ({decks}) {
    const deckList = decks.map(deck=><DeckCard key={deck.id} deck={deck}/>)
    return (<>
        {deckList}
    </>);
}

export default DeckList;