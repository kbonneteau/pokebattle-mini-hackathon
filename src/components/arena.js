import { createNewElement } from "../services/templateFunctions";
import OpponentStats from "../components/opponentStats";
import Battlefield from "./battlefield";

const Arena = () => {
  const arena = createNewElement("div", ["arena"]);
  arena.appendChild(OpponentStats());
  arena.appendChild(Battlefield());

  return arena;
};

export default Arena;
