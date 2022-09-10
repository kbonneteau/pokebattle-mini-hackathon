import { createNewElement } from "../services/templateFunctions";
import PlayerStats from "./playerStats";
import PlayerPrompt from "./playerPrompt";

const PlayerArea = () => {
  const playArea = createNewElement("section", ["player"]);
  playArea.appendChild(PlayerStats());
  playArea.appendChild(PlayerPrompt());

  return playArea;
};

export default PlayerArea;
