import AllStats from "./AllStats";

// this can be an abstract
// create different Pokemon Type classes?
// use Pokemon factory to handle class creation?

/**
 * Pokemon class to store relevant pokemon data.
 *
 * @param {string} pokemonName string from API containing the pokemon name
 * @param {array} pokemonMoves array of strings containing the names of the pokemon's moves
 * @param {number} pokemonHp a number for the base hp stat of that pokemon
 * @param {object} pokemonSprites an object containing the front and back images for the pokemon
 */
class Pokemon {
  //   level;
  //   type1;
  //   type2;
  //   hp;
  //   maxHp;
  //   status;
  //   moves;
  //   stats;
  //   experiencePoints;
  //   indexNumber;
  //   baseStats;
  //   name;

  //   constructor(
  //     pokemonName,
  //     pokemonMoves,
  //     pokemonHp,
  //     pokemonSprites,
  //     baseStats,
  //     types,
  //     level
  //   ) {
  constructor(
    pokemonName,
    // pokemonMoves,
    // pokemonHp,
    // pokemonSprites,
    baseStats,
    level
  ) {
    this.pokemonName = pokemonName;
    // this.pokemonHp = pokemonHp;
    // this.pokemonMoves = pokemonMoves;
    // this.pokemonSprites = pokemonSprites;
    this.stats = new AllStats(baseStats);
    this.level = level;
    // this.types = types;
  }
  describe = () => {
    console.log(this.pokemonName);
    console.log(this.pokemonHp);
  };

  getStats = () => {
    return this.stats.getCurrentStats(this.level);
  };

  // this doesn't work
  // I'll need to loop through base stats provided
  // determine if a stat is a special
  // then set the stats
  // will need to pass base stats as param

  //   attack() {}
  //   lvlUp() {}

  //   faint() {
  //     set current stats to 0
  //     return base stats for EV calculation of opponent
  //   }

  //   hpIncrease() {
  //     ( ( ( ( this.baseStats.hp + IV) * 2 + ( Math.sqrt(EV) / 4 ) ) * this.level ) / 100 ) + this.level + 10
  //   }
}

export default Pokemon;
