
import React, { useEffect, useState } from "react";
import { useBeforeunload,Beforeunload } from 'react-beforeunload';
import "./App.css";


export default function App() {
  const [value, setValue] = useState('');

  useBeforeunload((event) => {
    if (value !== '') {
      event.preventDefault();
    }
  });
  const [openedCard, setOpenedCard] = useState([]);
  const [matched, setMatched] = useState([]);

  const cards = [
    { id: 1, name: "A" },
    { id: 2, name: "D" },
    { id: 3, name: "F" },
    { id: 4, name: "B" },
    { id: 5, name: "C" },
    { id: 6, name: "G" },
    { id: 7, name: "H" },
    { id: 8, name: "E" }
    
  ];
  

  var t=0;

  const pairOfCards = [...cards, ...cards];
  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
  
    while (currentIndex != 0) {
  
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  useEffect(() => {
    shuffle(pairOfCards)

  },[])

  function flipCard(index) {
    if (t ==0)

    {t=1;pairOfCards.sort(()=>Math.random() -0.5)}

    setOpenedCard((opened) => [...opened, index]);
  }

  useEffect(() => {
    if (openedCard < 2) return;

    const firstMatched = pairOfCards[openedCard[0]];
    const secondMatched = pairOfCards[openedCard[1]];

    if (secondMatched && firstMatched.id === secondMatched.id) {
      setMatched([...matched, firstMatched.id]);
    }

    if (openedCard.length === 2) setTimeout(() => setOpenedCard([]), 1000);
  }, [openedCard]);

  return (
    <div className="App">
      <Beforeunload onBeforeunload={() => 'are you sure you want to leave?'} />
      <div className="cards">
        {pairOfCards.map((cards, index) => {
  

          let isFlipped = false;

          if (openedCard.includes(index)) isFlipped = true;
          if (matched.includes(cards.id)) isFlipped = true;
          return (
            <div
              className={`rotate-card ${isFlipped ? "flipped" : ""} `}
              key={index}
              onClick={() => flipCard(index)}
            >
              <div className="inner">
                <div className="front">
                  
                  {cards.name}
                </div>
                <div className="back"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}