import { createNewElement } from "../services/templateFunctions";

//     <section class="battlefield">
//     <div class="battlefield__opponent">
//         <img class="opponent__image pokecard-image"
//             src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif"
//             alt="">
//     </div>
//     <div class="battlefield__player">
//         <img class="player__image pokecard-image"
//             src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png" alt="">
//     </div>
// </section>

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
