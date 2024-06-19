import Player from "./Player";
export default function Players({ active }) {
  return (
    <ol id="players" className="highlight-player">
      <Player
        initialPlayer="Player-1"
        symbol="X"
        isActive={active === "X"}
      />
      <Player
        initialPlayer="Player-2"
        symbol="O"
        isActive={active === "O"}
      />
    </ol>
  );
}
