import React from "react";
import StudyButton from "./Buttons/StudyButton";
import ViewButton from "./Buttons/ViewButton";
import DeleteButton from "./Buttons/DeleteButton";

function DeckCard({deck}) {
  return <div className="card mt-2" style={{width: "600px"}}>
          <div className="card-body">
            <div className="container">
              <div className="row">
                <div className="col d-flex justify-content-start">
                  <h5 className="card-title ms-0">{deck.name}</h5>
                </div>
                <div className="col d-flex justify-content-end">
                  <p className="card-title text-secondary">{deck.cards.length} cards</p> 
                </div>
              </div>
              <div className="row" >
                <p className="card-text p-3">{deck.description}</p>
              </div>
              <div className="row d-flex">
                <div className="col">
                  <ViewButton deckId={deck.id}/>
                  <StudyButton deckId={deck.id}/>
                </div>
                <div className="col d-flex justify-content-end">
                  <DeleteButton elementToDelete="deck" elementId={deck.id}/>
                </div>
              </div>
            </div>
          </div>
        </div>;
}

export default DeckCard;