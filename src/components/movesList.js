import { createNewElement } from "../services/templateFunctions";

const MovesList = () => {
  const moves = createNewElement("form", ["player-attacks"]);
  const interactionLabel = createNewElement("label", [], "move");
  const movesList = createNewElement("select");
  const attackBtn = createNewElement("button", ["submit"], "Attack!");

  attackBtn.setAttribute("type", "submit");
  interactionLabel.setAttribute("for", "move");
  movesList.setAttribute("name", "move");
  movesList.id = "player-moves";

  moves.appendChild(interactionLabel);
  moves.appendChild(movesList);
  moves.appendChild(attackBtn);
  return moves;
};

export default MovesList;
