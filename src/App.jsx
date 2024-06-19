import Players from "./components/Players";
import { useState } from "react";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.jsx";
import GameOver from "./components/GameOver.jsx";

//initial states
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

import { PLAYERS } from "./initial-players.jsx";

//creates gameboard and assigns value of box according to the player clicking it
function deriveGameBoard(gameTurn){
  //creation
  let gameBoard= [...initialGameBoard.map((array) => [...array])];

  //assigning
  gameTurn.map(
    (turn) => (gameBoard[turn.square.row][turn.square.col] = turn.player)
  );

  return gameBoard;
}

// to check if game resulted in a draw
function isDraw(gameTurn, winner){
  //if turns are 9 ie all blocks have been clicked and no one won then it is draw
  return gameTurn.length === 9 && !winner;
}

// going through combinations to check if it matches
function checkWinner(gameBoard, playerNames){
  let winner = "";
  for (const combination of WINNING_COMBINATIONS) {
    const firstSq = gameBoard[combination[0].row][combination[0].column];
    const secondSq = gameBoard[combination[1].row][combination[1].column];
    const thirdSq = gameBoard[combination[2].row][combination[2].column];

    if (firstSq && firstSq == secondSq && firstSq == thirdSq) {
      winner = playerNames[firstSq];
    }
  }
  return winner;
}

//changing active player
function deriveActivePlayer(gameTurn) {
  let currActivePlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currActivePlayer = "O";
  }
  return currActivePlayer;
}

//main function component
function App() {

  //use states
  const [playerNames, setPlayerName] = useState(PLAYERS);
  const [gameTurn, setGameTurn] = useState([]);

  //declarations
  const gameBoard = deriveGameBoard(gameTurn);
  const activePlayer = deriveActivePlayer(gameTurn);  
  const winner = checkWinner(gameBoard,playerNames);
  const hasDraw = isDraw(gameTurn, winner); 
  
  //handle functions

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurn((prev) => {
      let currPlayer = deriveActivePlayer(prev);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currPlayer },
        ...prev,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurn([]);
  }

  function handleNewPlayerName(symbol, playername) {
    setPlayerName((prevPlayers) => {
      return { ...prevPlayers, [symbol]: playername };
    });
  }

  //main component code

  return (
    <main>
      <div id="game-container">
        <Players active={activePlayer} onNameChange={handleNewPlayerName} />
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
