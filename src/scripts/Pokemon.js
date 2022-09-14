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
  static MAX_LEVEL = 100;
  static MIN_LEVEL = 1;
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

  constructor(name, moves, hp, sprites, baseStats, level) {
    this.name = name;
    this.hp = hp;
    this.moves = moves;
    this.sprites = sprites;
    this.stats = new AllStats(baseStats);
    this.level = level;
    this.currentHp = this.stats.getCurrentStats(level).hp;
  }

  describe = () => {
    console.log(this.pokemonName);
    console.log(this.pokemonHp);
  };

  getStats = () => {
    return this.stats.getCurrentStats(this.level);
  };

  getCurrentHp = () => {
    return this.currentHp;
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
