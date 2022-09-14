import axios from "axios";
import Pokemon from "./Pokemon";

// ======================
//      FUNCTIONS
// ======================

const playerParty = {
  slot1: null,
  slot2: null,
  slot3: null,
  slot4: null,
  slot5: null,
  slot6: null,
};

// === TESTING ===
axios.get("https://pokeapi.co/api/v2/pokemon/1").then((res) => {
  console.log(res.data);
  const { name, stats, moves, sprites } = res.data;
  const hp = stats[0].base_stat;
  const bulbasaur = new Pokemon(name, moves, hp, sprites, stats, 5);
  console.log(bulbasaur.getCurrentHp());
  console.log(bulbasaur.getStats());
});

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
      playerTotalHp = player.pokemon.hp;
      playerPokemonName.innerText = player.pokemon.name;
      playerHpDisplay.innerText = `hp: ${player.pokemon.hp} / ${playerTotalHp}`;
      playerImage.src = player.pokemon.sprites.pokemonSpritesBack;
    })
    .then(() => {
      // Applies the current move list to the DOM
      buildMoveList(player.pokemon.moves);
      battleText.innerText = `What will ${player.pokemon.name.toUpperCase()} do?`;
    });
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${getRandomPokemonId()}`)
    .then((res) => {
      // Generate a pokemon for the opponent
      generatePokemon(res.data, opponent);
      opponentTotalHp = opponent.pokemon.hp;
      opponentPokemonName.innerText = opponent.pokemon.name;
      opponentHpDisplay.innerText = `hp: ${opponent.pokemon.hp} / ${opponentTotalHp}`;
      opponentImage.src = opponent.pokemon.sprites.pokemonSpritesFront;
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
  const { name, moves, stats, sprites } = pokemonData;

  const updatedMoves = [];
  const movesList = moves.splice(0, 4);
  movesList.forEach((move) => {
    updatedMoves.push(move.move.name);
  });
  const healthStat = stats[0].base_stat;
  const pokemonSprites = {
    pokemonSpritesFront: sprites.front_default,
    pokemonSpritesBack: sprites.back_default,
  };
  playerOrOpponent.pokemon = new Pokemon(
    name,
    updatedMoves,
    healthStat,
    pokemonSprites,
    stats,
    5
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
    }'s ${receivingPlayer.pokemon.name.toUpperCase()} fainted!  Play again?`;

    submitButton.style.display = "none";
    newBattle.style.display = "inline-block";
  } else if (initiatingPerson === opponent) {
    console.log(initiatingPerson);
    setTimeout(
      () =>
        (battleText.innerText = `What will ${player.pokemon.name.toUpperCase()} do?`),
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
      }'s ${attackingPlayer.pokemon.name.toUpperCase()} used ${move} on ${receivingPlayer.pokemon.name.toUpperCase()}`;
    })
    .then(() => {
      checkHpLevels(
        receivingPlayer.pokemon.hp,
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
  recipientOfAttack.pokemon.hp = recipientOfAttack.pokemon.hp - attackValue;
  if (recipientOfAttack === opponent) {
    opponentHpDisplay.innerText = `hp: ${recipientOfAttack.pokemon.hp} / ${opponentTotalHp}`;
  } else {
    playerHpDisplay.innerText = `hp: ${recipientOfAttack.pokemon.hp} / ${playerTotalHp}`;
  }
};

/**
 * It's the computer's turn to attack! Randomizes a move selection from 0-3, and uses the index to select the move from the move list.
 *
 * Initiates the attack on the player.
 */
const computersTurn = () => {
  const moveSelection = Math.floor(Math.random() * 4);
  attack(opponent.pokemon.moves[moveSelection], opponent, player);
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
const dialogBox = document.querySelector(".prompt");
const battleText = document.querySelector(".prompt__text");
const newBattle = document.querySelector(".new-battle");

let opponent = {
  name: "Daniil",
};

let player = {
  name: "Player",
};

// Store opponent's values
const opponentPokemonName = document.querySelector(".opponent__poke-name");
let opponentHpDisplay = document.querySelector(".opponent__poke-hp");
const opponentImage = document.querySelector(".opponent-pokemon-image");
let opponentTotalHp;

// Store player's values
const playerPokemonName = document.querySelector(".player__poke-name");
let playerHpDisplay = document.querySelector(".player__poke-hp");
const playerImage = document.querySelector(".player-pokemon-image");
let playerTotalHp;

// ======================
//      START HERE
// ======================

getPokemon();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  attack(e.target.move.value, player, opponent);
  if (opponent.pokemon.hp !== 0) {
    console.log(opponent.pokemon.hp);
    setTimeout(computersTurn, 1000);
  }
});

newBattle.addEventListener("click", startNewBattle);

// Hides the new battle button by default.
newBattle.style.display = "none";
