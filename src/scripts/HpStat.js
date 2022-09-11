import Stat from "./Stat";

class HpStat extends Stat {
  static STAT_NAME = "hp";

  constructor(baseValue) {
    super(HpStat.STAT_NAME, baseValue);
    this.effortValue = Stat.DEFAULT_EV;
  }

  calculateStat = (level) => {
    return Math.floor(
      (((this.baseValue + this.individualValue) * 2 +
        Math.sqrt(this.effortValue) / 4) *
        level) /
        100 +
        level +
        10
    );
  };

  /**
   * HP IV is derived using all other stat IVs -> for each odd IV value for a stat, you'll add a bit value to the overall hpIV
   * attack (8), defense (4), speed (2), special (1)
   * @param {int} attackIv
   * @param {int} defenseIv
   * @param {int} speedIv
   * @param {int} specialIv
   */
  setIv = (attackIv, defenseIv, speedIv, specialIv) => {
    let hpIv = 0;

    if (attackIv % 2 !== 0) {
      hpIv += 8;
    }
    if (defenseIv % 2 !== 0) {
      hpIv += 4;
    }
    if (speedIv % 2 !== 0) {
      hpIv += 2;
    }
    if (specialIv % 2 !== 0) {
      hpIv += 1;
    }
    this.individualValue = hpIv;
  };
}

export default HpStat;
