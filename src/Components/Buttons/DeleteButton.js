import React from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { deleteCard, deleteDeck } from "../../utils/api";

function DeleteButton ({elementToDelete, elementId}) {
    const {url} = useRouteMatch();
    const history = useHistory();

    async function handleDelete(){
        const abortController = new AbortController();
        if(window.confirm(`Delete this ${elementToDelete}?\n \n you will not be able to recover it!`)){
            try{
                if(elementToDelete==="deck"){
                    console.log("element Id: ", elementId);
                    await deleteDeck(elementId,abortController.signal);
                    url==="/"? history.go(0) : history.push("/"); //if deleting deck at home page refresh page, else go to the home page.
                }
                else if(elementToDelete==="card"){
                    await deleteCard(elementId, abortController.signal);
                    history.go(0); //refresh page
                }
                else{
                    throw new Error("Specify element type in <DeleteButton />")
                }
            }
            catch(error){
                if(error.name !== "AbortError") throw error;
            }
        }
        return ()=>AbortController.abort();
    }

    return <button onClick={()=>handleDelete()} className="btn btn-danger align-self-end mx-2">Delete</button>;
}

export default DeleteButton;