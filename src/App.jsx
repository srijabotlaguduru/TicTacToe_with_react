import Players from "./components/Players";
import { useState } from "react";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.jsx";
import GameOver from "./components/GameOver.jsx";

function deriveActivePlayer(gameTurn) {
  let currActivePlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currActivePlayer = "O";
  }
  return currActivePlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameTurn, setGameTurn] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurn);

  let gameBoard = [...initialGameBoard.map(array=>[...array])];

  gameTurn.map(
    (turn) => (gameBoard[turn.square.row][turn.square.col] = turn.player)
  );

  let winner = "";
  for (const combination of WINNING_COMBINATIONS) {
    const firstSq = gameBoard[combination[0].row][combination[0].column];
    const secondSq = gameBoard[combination[1].row][combination[1].column];
    const thirdSq = gameBoard[combination[2].row][combination[2].column];

    if (firstSq && firstSq == secondSq && firstSq == thirdSq) {
      winner = firstSq;
    }
  }

  const hasDraw = (gameTurn.length === 9 && !winner)

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

  function handleRestart(){
    gameBoard = initialGameBoard;
    setGameTurn([]);
    winner=''
    hasDraw= false
  }

  return (
    <main>
      <div id="game-container">
        <Players active={activePlayer} />
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurn} />
    </main>
  );
}

export default App;
