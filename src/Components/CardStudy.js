import React, {useEffect, useState} from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NotEnoughCards from "./NotEnoughCards";

function CardStudy ({cards}) {
    const history = useHistory();
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const [currentCard, setCurrentCard] = useState(cards[currentCardIndex]);
    const [flipped, setFlipped] = useState(false);

    const flipCard = () => {
        setFlipped(state => !state);
    }

    const nextCard = () => {
        if(currentCardIndex === cards.length - 1){
            if(window.confirm("Restart Cards?\n \nClick 'cancel' to return to home page.")){
                setCurrentCardIndex(0);
            }else{
                history.push("/");
            }
        }
        else{
            setCurrentCardIndex(current => current+1);
        }
    }

    useEffect(()=>{
        setCurrentCard(cards[currentCardIndex]);
        setFlipped(false);
    },[currentCardIndex, cards]);

    if(cards.length < 3) return <NotEnoughCards cards={cards}/>;

    return (<div className="card mt-2" style={{width: "600px"}}>
        <div className="card-body">
            <h3>Card {currentCardIndex+1} of {cards.length}</h3>
            <p className="card-text">{flipped ? currentCard.back : currentCard.front}</p>
            <button onClick={flipCard} className="btn btn-secondary">Flip</button>
            {flipped ? <button onClick={nextCard} className="btn btn-primary mx-2">Next</button>:<></>}
        </div>
    </div>);
}

export default CardStudy;