import { createNewElement } from "../services/templateFunctions";

const PlayerPrompt = () => {
  const playerPrompt = createNewElement("div", ["prompt"]);
  const textPrompt = createNewElement(
    "p",
    ["prompt__text"],
    "What will you do?"
  );
  const newBattle = createNewElement("button", ["new-battle"], "Start again");

  playerPrompt.appendChild(textPrompt);
  playerPrompt.appendChild(newBattle);

  return playerPrompt;
};

export default PlayerPrompt;
