let board = (function () {
  let counter = 0;

  let gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const modify = function (i, j, letter) {
    gameBoard[i][j] = letter;
  };
  const getCounter = function () {
    return counter;
  };

  const getGameBoard = function () {
    return gameBoard;
  };

  const increment = function () {
    counter++;
  };

  const print = function () {
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard.length; j++) {
        console.log(gameBoard[i][j]);
      }
    }
  };

  const reset = function () {
    counter = 0;

    gameBoard = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  };
  return { modify, getCounter, getGameBoard, increment, print, reset };
})();
//
// Player Factory
//
function playerFactory(sign, ID) {
  const $selector = document.getElementById(ID);

  const getSign = function () {
    return sign;
  };

  const getID = function () {
    return $selector;
  };

  const modifyClass = function (newClass) {
    $selector.className = newClass;
  };

  return { sign, getSign, modifyClass };
}

const playerA = playerFactory("X", "first-player");
const playerB = playerFactory("O", "second-player");
//
// End of Player Factory
//

//
// Display Controller
//
const displayController = (function () {
  const message = document.querySelector(".message");
  const resetBtn = document.querySelector("#reset-BTN");
  const boardElements = document.querySelectorAll(".gamesquare");

  //Resetting
  const resetAll = function () {
    boardElements.forEach((ele) => {
      ele.textContent = "";
    });
    board.reset();
    playerA.modifyClass("playerA-turn");
    playerB.modifyClass("playerB");
  };

  const resetButton = function () {
    boardElements.forEach((ele) => {
      ele.textContent = "";
    });
    board.reset();
    modifyMSG("Play!");
    playerA.modifyClass("playerA-turn");
    playerB.modifyClass("playerB");
  };
  resetBtn.addEventListener("click", resetButton);
  // Resetting Ends

  const modifyMSG = function (msg) {
    message.textContent = msg;
  };

  // Playing
  boardElements.forEach((ele) => {
    ele.addEventListener("click", function () {
      if (ele.textContent == "") {
        const iValue = ele.getAttribute("i");
        const jValue = ele.getAttribute("j");

        if (board.getCounter() % 2 == 0) {
          const sign = playerA.getSign();
          ele.textContent = sign;
          board.modify(iValue, jValue, sign);

          playerA.modifyClass("playerA");
          playerB.modifyClass("playerB-turn");
        } else {
          const sign = playerB.getSign();
          ele.textContent = sign;
          board.modify(iValue, jValue, sign);

          playerA.modifyClass("playerA-turn");
          playerB.modifyClass("playerB");
        }
        board.increment();

        boardCounter = board.getCounter();
        if (boardCounter >= 5) {
          winner = gamefinished(board.getGameBoard(), boardCounter);

          if (winner != "none") {
            modifyMSG(winner);
            resetAll();
          }
        }
      }
    });
  });
  // Playing Ends

  // Checking Winner
  const gamefinished = function (gameBoard, counter) {
    for (let i = 0; i < 3; i++) {
      // Check rows
      if (
        gameBoard[i][0] != "" &&
        gameBoard[i][0] === gameBoard[i][1] &&
        gameBoard[i][0] === gameBoard[i][2]
      ) {
        return gameBoard[i][0] + " is the winner!"; // Row winner
      }
      // Check columns
      if (
        gameBoard[0][i] != "" &&
        gameBoard[0][i] === gameBoard[1][i] &&
        gameBoard[0][i] === gameBoard[2][i]
      ) {
        return gameBoard[0][i] + " is the winner!"; // Column winner
      }
    }

    // Check diagonals
    if (
      gameBoard[0][0] != "" &&
      gameBoard[0][0] === gameBoard[1][1] &&
      gameBoard[0][0] === gameBoard[2][2]
    ) {
      return gameBoard[0][0] + " is the winner!"; // Diagonal from top-left to bottom-right
    }
    if (
      gameBoard[0][2] != "" &&
      gameBoard[0][2] === gameBoard[1][1] &&
      gameBoard[0][2] === gameBoard[2][0]
    ) {
      return gameBoard[0][2] + " is the winner!"; // Diagonal from top-right to bottom-left
    }

    if (counter == 9) {
      return "tie!"; // No winner
    }

    return "none";
  };
})();
