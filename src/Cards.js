import React, {useState, useRef, useEffect} from "react";
import axios from "axios";
import Card from "./Card";
// import Shuffle from "./Shuffle"
import './Cards.css';

//  On load, it calls useEffect to query API and get a new deck with data
//  Renders two buttons for drawing and shuffling cards
//
//  On clicking the draw button, will draw a card by calling the API for the
//  card data and displays the card.
//
//  On clicking shuffle, it will clear out all the current cards and
//  call the API to shuffle the deck with the current deck id

function Cards() {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [shuffleBtnVis, setShuffleBtnVis] = useState(true);
  const [drawBtnVis, setDrawBtnVis] = useState(true);

  const remain = useRef

// Called once on load to get new deck data from API  
  useEffect(() => {
    async function newDeck() {
      const res = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
      setDeck(res.data);
      remain.current = res.data.remaining;              
    }
    newDeck();
    return () => console.log("CLEANING UP!")
  }, []);

//  Draw A Card button 
//    will query Deck Of Cards API and return a drawn card
//    Calls setCards to add the drawn card to the array of cards drawn
//    If all cards are drawn, throws an error and hides the draw button  
  async function drawCard() {
    try {      
      const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
      const card = res.data.cards[0];
      setCards(c => [
        ...c, card,
      ]);
      remain.current = res.data.remaining;  
      if(remain.current === 0) {
        setDrawBtnVis(false);
        throw new Error("ALL CARDS DRAWN!")
      }
    } catch(e) {
      alert(e);
    }
  }

//  Shuffle button
//    Shuffles the deck by calling the API shuffle with the current deck id
//    Clears all cards that are being displayed
//    Hides both buttons while it is shuffling the deck  
  async function shuffle() {
    setDrawBtnVis(false);
    setShuffleBtnVis(false);
    try {
      const res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`);            
      setCards([]);
      setDrawBtnVis(true);
      setShuffleBtnVis(true);
    } catch(e) {
      alert(e);
    }
  }

  return (
    <div className="Cards">      
      {drawBtnVis && <button className="btn btn-primary" onClick={drawCard}>Draw a Card</button>}
      {shuffleBtnVis && <button className="btn btn-primary" onClick={shuffle}>SHUFFLE</button>}
      
      {/* Create an area to display cards, and map out all drawn cards */}
      <div className="card-box">
        {cards.map(c => (
          <Card className="Card" val={c} key={c.code}/>         
        ))}        
      </div>
    </div>
  )
}

export default Cards;