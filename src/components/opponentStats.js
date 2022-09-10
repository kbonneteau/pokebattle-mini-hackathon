import { createNewElement } from "../services/templateFunctions";

const OpponentStats = () => {
  const statsDetails = {
    opponentName: createNewElement("h2", ["opponent__name"], "Opponent"),
    currentPokemon: createNewElement("p", ["opponent__poke-name"]),
    pokemonHp: createNewElement("p", ["opponent__poke-hp"]),
  };
  const opponent = createNewElement("section", ["opponent"]);
  const stats = createNewElement("div", ["opponent__container"]);

  for (const detail in statsDetails) {
    stats.appendChild(statsDetails[detail]);
  }

  opponent.appendChild(stats);
  return opponent;
};

export default OpponentStats;
