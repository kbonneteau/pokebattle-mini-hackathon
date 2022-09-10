import axios from "axios";

// ======================
//      FUNCTIONS
// ======================

/**
 * Pokemon class to store relevant pokemon data.
 *
 * @param {string} pokemonName string from API containing the pokemon name
 * @param {array} pokemonMoves array of strings containing the names of the pokemon's moves
 * @param {number} pokemonHp a number for the base hp stat of that pokemon
 * @param {object} pokemonSprites an object containing the front and back images for the pokemon
 */
class Pokemon {
  constructor(pokemonName, pokemonMoves, pokemonHp, pokemonSprites) {
    this.pokemonName = pokemonName;
    this.pokemonHp = pokemonHp;
    this.pokemonMoves = pokemonMoves;
    this.pokemonSprites = pokemonSprites;
  }
  describe() {
    console.log(this.pokemonName);
    console.log(this.pokemonHp);
  }
}

/**
 * Find a random pokemon ID. Limited to 1st gen pokemon (because I'm old).
 * @returns {number} a random number from 1 - 151.
 */
const getRandomPokemonId = () => {
  return Math.ceil(Math.random() * 151);
};

/**
 * Makes two API get calls with randomized pokemon IDs to generate pokemon for the player and opponent.
 *
 * @param {array} pokemonData data received from the API related to the pokemon.
 * @param {array} playerOrOpponent indicates which player this pokemon should be assigned to
 */
const getPokemon = () => {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${getRandomPokemonId()}`)
    .then((res) => {
      // Generate a pokemon for the player
      generatePokemon(res.data, player);
      playerTotalHp = player.pokemon.pokemonHp;
      playerPokemonName.innerText = player.pokemon.pokemonName;
      playerHpDisplay.innerText = `hp: ${player.pokemon.pokemonHp} / ${playerTotalHp}`;
      playerImage.src = player.pokemon.pokemonSprites.pokemonSpritesBack;
    })
    .then(() => {
      // Applies the current move list to the DOM
      buildMoveList(player.pokemon.pokemonMoves);
      battleText.innerText = `What will ${player.pokemon.pokemonName.toUpperCase()} do?`;
    });
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${getRandomPokemonId()}`)
    .then((res) => {
      // Generate a pokemon for the opponent
      generatePokemon(res.data, opponent);
      opponentTotalHp = opponent.pokemon.pokemonHp;
      opponentPokemonName.innerText = opponent.pokemon.pokemonName;
      opponentHpDisplay.innerText = `hp: ${opponent.pokemon.pokemonHp} / ${opponentTotalHp}`;
      opponentImage.src = opponent.pokemon.pokemonSprites.pokemonSpritesFront;
    })
    .catch((error) => console.error(error));
};

/**
 * Creates a new pokemon for a user. Takes in pokemon data and assigns it to a new Pokemon object
 *
 * @param {array} pokemonData data received from the API related to the pokemon.
 * @param {array} playerOrOpponent indicates which player this pokemon should be assigned to
 */
const generatePokemon = (pokemonData, playerOrOpponent) => {
  const pokemonName = pokemonData.name;
  const updatedMoves = [];
  const moves = pokemonData.moves.splice(0, 4);
  moves.forEach((move) => {
    updatedMoves.push(move.move.name);
  });
  const pokemonMoves = updatedMoves;
  const pokemonStats = pokemonData.stats[0].base_stat;
  const pokemonSprites = {
    pokemonSpritesFront: pokemonData.sprites.front_default,
    pokemonSpritesBack: pokemonData.sprites.back_default,
  };
  playerOrOpponent.pokemon = new Pokemon(
    pokemonName,
    pokemonMoves,
    pokemonStats,
    pokemonSprites
  );
};

/**
 * Creates a list of drop down options for selection.
 *
 * @param {array} pokemonMoves is list of pokemon move names
 */
const buildMoveList = (pokemonMoves) => {
  pokemonMoves.forEach((move) => {
    const newMove = document.createElement("option");
    newMove.setAttribute("value", move);
    newMove.innerText = move;
    moveList.appendChild(newMove);
  });
};

/**
 * Checks the current hp levels of the pokemon.  If the pokemon no longer has hp, it faints!
 *
 * @param {number} pokemonHp the current hp level of the pokemon
 * @param {object} initiatingPerson indicates attacked the pokemon
 * @returns {boolean} indicating if the pokemon fainted
 */
const checkHpLevels = (pokemonHp, initiatingPerson, receivingPlayer) => {
  let fainted = false;

  if (pokemonHp <= 0) {
    fainted = true;

    console.log("Game over!");
    if (initiatingPerson === player) {
      opponentHpDisplay.innerText = `Fainted!`;
    } else {
      playerHpDisplay.innerText = `Fainted!`;
    }

    battleText.innerText = `${
      receivingPlayer.name
    }'s ${receivingPlayer.pokemon.pokemonName.toUpperCase()} fainted!  Play again?`;

    submitButton.style.display = "none";
    newBattle.style.display = "inline-block";
  } else if (initiatingPerson === opponent) {
    console.log(initiatingPerson);
    setTimeout(
      () =>
        (battleText.innerText = `What will ${player.pokemon.pokemonName.toUpperCase()} do?`),
      1000
    );
  }

  return fainted;
};

/**
 * Checks the attack power of the selected move. After gathering attack power, invokes a calculation to display the lowered hp.
 *
 * Finishes by confirming if the pokemon has fainted or not.
 *
 * @param {string} move the selected move from the moves list
 * @param {object} attackingPlayer the player initiating damage
 * @param {object} receivingPlayer the player being attacked
 */
const attack = (move, attackingPlayer, receivingPlayer) => {
  axios
    .get(`https://pokeapi.co/api/v2/move/${move}`)
    .then((res) => {
      console.log(move);
      const attackPower = res.data.power;

      attackCalculation(attackPower, receivingPlayer);

      battleText.innerText = `${
        attackingPlayer.name
      }'s ${attackingPlayer.pokemon.pokemonName.toUpperCase()} used ${move} on ${receivingPlayer.pokemon.pokemonName.toUpperCase()}`;
    })
    .then(() => {
      checkHpLevels(
        receivingPlayer.pokemon.pokemonHp,
        attackingPlayer,
        receivingPlayer
      );
    })
    .catch(console.log);

  // Diving deeper: the longer they win, the harder the opponents are
  // Have the attack potential value based on the power of the move.
};

/**
 * Calculates the damage of the chosen attack. Math.random gets random flow between 0 and 1, and multiples this by the overall power of the attack to get a randomized attack value.
 *
 * @param {number} power indicates the power level of the move. Is not over 9000.
 * @param {object} recipientOfAttack indicates who is being attacked
 */
const attackCalculation = (power, recipientOfAttack) => {
  // power here is power / 2 as it could be OP if attackPower is 90+
  const attackValue = Math.floor(Math.random() * (power / 2));
  recipientOfAttack.pokemon.pokemonHp =
    recipientOfAttack.pokemon.pokemonHp - attackValue;
  if (recipientOfAttack === opponent) {
    opponentHpDisplay.innerText = `hp: ${recipientOfAttack.pokemon.pokemonHp} / ${opponentTotalHp}`;
  } else {
    playerHpDisplay.innerText = `hp: ${recipientOfAttack.pokemon.pokemonHp} / ${playerTotalHp}`;
  }
};

/**
 * It's the computer's turn to attack! Randomizes a move selection from 0-3, and uses the index to select the move from the move list.
 *
 * Initiates the attack on the player.
 */
const computersTurn = () => {
  const moveSelection = Math.floor(Math.random() * 4);
  attack(opponent.pokemon.pokemonMoves[moveSelection], opponent, player);
};

/**
 * Initiates a new battle. Assigns a new pokemon to both the player and opponent and hides the play again button.
 *
 */
const startNewBattle = () => {
  getPokemon();
  submitButton.style.display = "inline-block";
  newBattle.style.display = "none";
};

// ======================
//    GLOBAL VARIABLES
// ======================

const form = document.querySelector(".player-attacks");
const moveList = document.getElementById("player-moves");
const submitButton = document.querySelector(".submit");
const dialogBox = document.querySelector(".player__textbox");
const battleText = document.querySelector(".player__textprompt");
const newBattle = document.querySelector(".new-battle");

let opponent = {
  name: "Daniil",
};

let player = {
  name: "Player",
};

// Store opponent's values
const opponentPokemonName = document.querySelector(".poke-name");
let opponentHpDisplay = document.querySelector(".poke-hp");
const opponentImage = document.querySelector(".opponent__image");
let opponentTotalHp;

// Store player's values
const playerPokemonName = document.querySelector(".player__poke-name");
let playerHpDisplay = document.querySelector(".player__poke-hp");
const playerImage = document.querySelector(".player__image");
let playerTotalHp;

// ======================
//      START HERE
// ======================

getPokemon();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  attack(e.target.move.value, player, opponent);
  if (opponent.pokemon.pokemonHp !== 0) {
    console.log(opponent.pokemon.pokemonHp);
    setTimeout(computersTurn, 1000);
  }
});

newBattle.addEventListener("click", startNewBattle);

// Hides the new battle button by default.
newBattle.style.display = "none";
