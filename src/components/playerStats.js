import { createNewElement } from "../services/templateFunctions";
import MovesList from "./movesList";

const PlayerStats = () => {
  const playerDetails = {
    name: createNewElement("h2", ["player__name"], "Player"),
    pokemonName: createNewElement("p", ["player__poke-name"]),
    pokemonHp: createNewElement("p", ["player__poke-hp"]),
    sprite: createNewElement("div", ["sprite"]),
  };
  const playerDialog = createNewElement("div", ["player__container"]);

  for (const details in playerDetails) {
    playerDialog.appendChild(playerDetails[details]);
  }

  playerDialog.appendChild(MovesList());

  return playerDialog;
};

export default PlayerStats;
