import { createNewElement } from "../services/templateFunctions";

const MovesList = () => {
  const moves = createNewElement("form", ["player-attacks"]);
  const interactionLabel = createNewElement("label", [], "move");
  const movesList = createNewElement("select");
  interactionLabel.setAttribute("for", "move");
  movesList.setAttribute("name", "move");
  movesList.id = "player-moves";

  moves.appendChild(interactionLabel);
  moves.appendChild(movesList);
  return moves;
};

export default MovesList;
