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
