import React from "react";
import EditButton from "./Buttons/EditButton";
import DeleteButton from "./Buttons/DeleteButton";

function Card ({card}) {
    return (<div className="container">
                <div className="row">
                    <div className="col">
                        <p>{card.front}</p>
                    </div>
                    <div className="col">
                        <p>{card.back}</p>
                    </div>
                </div>
                <div className="row justify-content-end">
                    <EditButton type="card" cardId={card.id}/>
                    <DeleteButton elementToDelete="card" elementId={card.id}/>
                </div>
            </div>);
}

export default Card;