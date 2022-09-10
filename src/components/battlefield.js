import { createNewElement } from "../services/templateFunctions";

const Battlefield = () => {
  const fieldElements = {
    opponent: createNewElement("div", ["battlefield__opponent"]),
    player: createNewElement("div", ["battlefield__player"]),
    opponentPokemon: createNewElement("img", [
      "opponent-pokemon-image",
      "battlefield__pokemon",
    ]),
    playerPokemon: createNewElement("img", [
      "player-pokemon-image",
      "battlefield__pokemon",
    ]),
  };
  const field = createNewElement("section", ["battlefield"]);

  for (const element in fieldElements) {
    field.appendChild(fieldElements[element]);
  }

  return field;
};

export default Battlefield;
