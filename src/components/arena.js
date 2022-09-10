import arenaBackground from "../assets/pokemon-logo.png";
import { createNewElement } from "../services/templateFunctions";
import OpponentStats from "../components/opponentStats";

{
  /* <div class="background-image"> // done

        <section class=opponent> // TODO
            <div class="opponent__container">
                <h2>Opponent</h1>
                    <p class="poke-name"></p>
                    <p class="poke-hp"></p>
            </div>
        </section>
        <section class="battlefield">
            <div class="battlefield__opponent">
                <img class="opponent__image pokecard-image"
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/7.gif"
                    alt="">
            </div>
            <div class="battlefield__player">
                <img class="player__image pokecard-image"
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/4.png" alt="">
            </div>
        </section>
    </div> */
}

const Arena = () => {
  const arena = createNewElement("div", ["arena"]);
  arena.appendChild(OpponentStats());

  return arena;
};

export default Arena;
