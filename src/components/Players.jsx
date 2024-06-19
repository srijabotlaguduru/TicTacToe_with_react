import Player from "./Player";
import { PLAYERS } from "../initial-players";

export default function Players({ active, onNameChange }) {
  return (
    <ol id="players" className="highlight-player">
      <Player
        initialPlayer={PLAYERS.X}
        symbol="X"
        isActive={active === "X"}
        onChangeName={onNameChange}
      />
      <Player
        initialPlayer={PLAYERS.O}
        symbol="O"
        isActive={active === "O"}
        onChangeName={onNameChange}
      />
    </ol>
  );
}
