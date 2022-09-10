import { createNewElement } from "../services/templateFunctions";

const Battlefield = () => {
  const field = createNewElement("section", ["battlefield"]);
  const opponent = createNewElement("div", ["battlefield__opponent"]);
  const player = createNewElement("div", ["battlefield__player"]);
  const opponentPokemon = createNewElement("img", [
    "opponent-pokemon-image",
    "battlefield__pokemon",
  ]);
  const playerPokemon = createNewElement("img", [
    "player-pokemon-image",
    "battlefield__pokemon",
  ]);

  opponent.appendChild(opponentPokemon);
  player.appendChild(playerPokemon);
  field.appendChild(opponent);
  field.appendChild(player);

  return field;
};

export default Battlefield;
