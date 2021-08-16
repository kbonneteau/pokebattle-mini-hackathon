// import axios from "axios";

// get a pokemon from the API
// get a list of moves
// get the pokemon's stats (attack modifier, hp)
// have a way to have two people fighting
// pick your team option?  grabs a random pokemon and opponent pokemon from the API
class Pokemon {
    constructor(pokemonName, pokemonMoves, pokemonStats, pokemonSprites) {
        this.pokemonName = pokemonName;
        this.pokemonStats = pokemonStats;
        this.pokemonMoves = pokemonMoves;
        this.pokemonSprites = pokemonSprites;
    }
    describe() {
        console.log(this.pokemonName);
        console.log(this.pokemonStats);
    }
}



// let pokemon = {};

const getRandomPokemonId = () => {
    return Math.ceil(Math.random() * 151);
};

const testId = getRandomPokemonId();

console.log(testId);

// getPokemon();
const getPokemon = () => {
    axios
        .get(`https://pokeapi.co/api/v2/pokemon/${testId}`)
        .then((res) => {
            console.log(res);
            const pokemon = res;
            const pokemonName = res.data.name;
            const moves = res.data.moves.splice(0, 4);
            const pokemonMoves = moves;
            const pokemonStats = res.data.stats;
            const pokemonSprites = {
                pokemonSpritesFront: res.data.sprites.front_default,
                pokemonSpritesBack: res.data.sprites.back_default
            };
            const newPokemonGen = new Pokemon(
                pokemonName,
                pokemonMoves,
                pokemonStats,
                pokemonSprites
            );
            console.log(newPokemonGen);
        })
        .catch((error) => console.error(error));
};
getPokemon();
