import { useEffect, useState, useRef } from "react";
import CardsContainer from "./components/card";
import "./styles/score.css";
import "./styles/game.css";
import loseGif from "/CharAnimation/aba-sadge.gif";
import winGif from "/CharAnimation/guilty-gear-guilty-gear-xx.gif";
import mainArray from "./components/array";

// Keeping track of player's score
function Score({ score, highestScore, size }) {
  return (
    <div className="score-container">
      <div className="player-score">
        <span>
          SCORE: [{score}/{size}]
        </span>
        {/* Placeholder for high score */}
        <span>HIGH SCORE: {highestScore}</span>
      </div>
    </div>
  );
}

export default function Game({ size }) {
  const [cardAmountDiff, setCardAmountDiff] = useState(0);
  const [shuffledArr, setShuffledArr] = useState([]);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);

  const [startMenuStatus, setStartMenu] = useState(true);
  const [loserMenuStatus, setLoserMenu] = useState(false);
  const [winnerMenuStatus, setWinnerMenu] = useState(false);

  const renderCount = useRef(0); // For loading screen
  const [imgLoading, setLoading] = useState(true);

  const imageLoaded = () => {
    renderCount.current += 1;
    if (renderCount.current >= shuffledArr.length) {
      setLoading(false);
      renderCount.current = 0;
    }
  };

  useEffect(() => {
    setShuffledArr(shuffleArray(mainArray, cardAmountDiff));
  }, [startMenuStatus, loserMenuStatus, winnerMenuStatus]);

  useEffect(() => {
    if (score > highestScore) {
      setHighestScore(score);
    }
    if (score != 0 && score == cardAmountDiff) {
      setWinnerMenu(!winnerMenuStatus);

      restartGameWin();
    }
  }, [score]);

  const toggleStartupMenu = (DiffSelect) => {
    setStartMenu(!startMenuStatus);
    setCardAmountDiff(DiffSelect);
  };

  const toggleLoserMenu = (DiffSelect2) => {
    setLoserMenu(!loserMenuStatus);

    if (DiffSelect2 == 0) {
      toggleStartupMenu(cardAmountDiff);
      setLoserMenu(!loserMenuStatus);
    } else {
      setLoserMenu(!loserMenuStatus);
    }
  };

  const toggleWinnerMenu = (DiffSelect) => {
    if (DiffSelect == 0) {
      toggleStartupMenu(cardAmountDiff);
      setWinnerMenu(!winnerMenuStatus);
    } else {
      setWinnerMenu(!winnerMenuStatus);
    }
  };

  const handleShuffle = () => {
    setTimeout(() => {
      setShuffledArr([...shuffleArray(shuffledArr, cardAmountDiff)]);
    }, 800);

    console.log("shuffled");
  };

  // When user loses
  const restartGame = () => {
    setShuffledArr([...shuffleArray(shuffledArr, cardAmountDiff)]);
    toggleLoserMenu();
    setLoading(true);
  };

  // When user wins
  const restartGameWin = () => {
    console.log("win shuffle");
    setShuffledArr([...shuffleArray(shuffledArr, cardAmountDiff)]);
    setScore(0);
    setLoading(true);
  };

  return (
    <div className="game-container">
      {startMenuStatus ? (
        <StartUpPopup handleClick={toggleStartupMenu} />
      ) : null}
      <Score size={cardAmountDiff} score={score} highestScore={highestScore} />

      {imgLoading ? <p>Loading.......</p> : null}
      {!startMenuStatus && !loserMenuStatus && !winnerMenuStatus ? (
        <CardsContainer
          array={shuffledArr}
          handleShuffle={handleShuffle}
          scoreState={[score, setScore]}
          restartGame={restartGame}
          onLoad={imageLoaded}
          onScreenStatus={!imgLoading ? "" : "none"}
        />
      ) : null}

      {loserMenuStatus ? (
        <LoserWinnerPopup handleClick={toggleLoserMenu} />
      ) : null}
      {winnerMenuStatus ? (
        <LoserWinnerPopup
          handleClick={toggleWinnerMenu}
          img={winGif}
          msg={"We Have A Winner!"}
        />
      ) : null}
    </div>
  );
}

function StartUpPopup({ handleClick }) {
  const handleMenuClick = (difficulty) => {
    handleClick(difficulty);
  };

  return (
    <div className="startup-menu">
      <span className="upper-message">Welcome</span>
      <span className="rules-message">
        Rule's simple: Never pick the same character twice
      </span>
      <div className="button-container">
        <span>Difficulty &#8594;</span>
        <button className="button" onClick={() => handleMenuClick(8)}>
          Easy
        </button>
        <button className="button" onClick={() => handleMenuClick(10)}>
          Medium
        </button>
        <button className="button" onClick={() => handleMenuClick(14)}>
          Hard
        </button>
      </div>
    </div>
  );
}

function LoserWinnerPopup({
  handleClick,
  img = loseGif,
  msg = "You've Lost!",
}) {
  const handleMenuClick = (difficulty) => {
    handleClick(difficulty);
  };

  return (
    <div className="loser-popup-menu">
      <img src={img} alt="Image of a Loser" />
      <span className="loser-message">{msg}</span>
      <div className="button-container">
        <span>Select &#8594;</span>
        <button className="button" onClick={() => handleMenuClick(0)}>
          Quit
        </button>
        <button className="button" onClick={() => handleMenuClick(1)}>
          Continue
        </button>
      </div>
    </div>
  );
}

function shuffleArray(array = [], size = 0) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  if (size === 0) {
    return array;
  }
  return array.slice(0, size);
}
