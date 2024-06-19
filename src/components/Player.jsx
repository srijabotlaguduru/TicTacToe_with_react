import { useState } from "react";


export default function Player({ initialPlayer, symbol , isActive, onChangeName}) {


  const [isEditing, setIsEditing] = useState(false);

  const [player, setPlayerName] = useState(initialPlayer);

  function handleClick(){
    setIsEditing((editing)=>!editing);
    if(isEditing){
      onChangeName(symbol, player);
    }
  }

  function handleChange(event){
    setPlayerName(event.target.value);
  }

  let display = <span className="player-name">{player}</span>;

  if (isEditing) {
    display = <input type="text" required value={player} onChange={handleChange}/>;
  }


  return (
    <li className={isActive? 'active': undefined}>
      <span className="player">
        {display}
        <span className="player-symbol">{symbol}</span>
      </span>
      {isEditing ? (
        <button
          onClick={handleClick}
        >
          Save
        </button>
      ): (
        <button
          onClick={handleClick}
        >
          Edit
        </button>
      )}
    </li>
  );
}
