// Imports
import { useState, useEffect } from "react";
import Img from "./ElementBuilder.jsx";
import "../styles/card.css";

// Card Function returns The character and its name
function Card({
  charSrc,
  nameSrc,
  alt,
  onClick,
  flippedStatus,
  scoreState,
  restartGame,
  onLoad,
}) {
  const [clicked, setClicked] = useState(false);
  const [score, setScore] = scoreState;

  const incrementScore = () => {
    setScore(score + 1);
  };

  const resetScore = () => {
    setScore(0);
  };

  const handleClick = () => {
    if (flippedStatus) {
      return;
    }
    if (!clicked) {
      onClick();
      setClicked(true);
      incrementScore();
    } else {
      // Reset the game
      resetScore();
      restartGame();
      console.log("This Card Already Clicked");
    }
  };

  return (
    <div className={"card"} onClick={handleClick}>
      <div className={`${flippedStatus ? "card-inner flipped" : "card-inner"}`}>
        <div className="card-front">
          <img
            src={charSrc}
            className="character-portrait"
            alt={alt}
            onLoad={onLoad}
          />
          <img src={nameSrc} className="character-name" alt="" />
        </div>
        <div className="card-back"></div>
      </div>
    </div>
  );
}

// Returns the card section
export default function CardsContainer({
  array,
  handleShuffle,
  scoreState,
  restartGame,
  onLoad,
  onScreenStatus,
}) {
  const [flippedStatus, setFlipStatus] = useState(false);

  const flipCards = () => {
    setTimeout(() => {
      setFlipStatus(true);
    }, 0);
    setTimeout(() => {
      setFlipStatus(false);
    }, 1000);
  };
  const handleCardClick = () => {
    handleShuffle();
    flipCards();
  };

  const childernCards = array.map((item, index) => (
    <Card
      charSrc={item.charSrc}
      nameSrc={item.nameSrc}
      alt={item.alt}
      key={item.id}
      onClick={() => handleCardClick(index)}
      flippedStatus={flippedStatus}
      scoreState={scoreState}
      restartGame={restartGame}
      onLoad={onLoad}
    />
  ));

  const className = onScreenStatus + " cards-container";
  return <div className={className}>{childernCards}</div>;
}
