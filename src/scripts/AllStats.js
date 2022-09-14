import Stat from "./Stat";
import HpStat from "./HpStat";

class AllStats {
  static ALL_STATS = ["hp", "attack", "defense", "speed", "special"];
  static SPECIAL_INDEX = 4;
  static ACCEPT_SPECIAL = "special-attack";
  static OMIT_SPECIAL = "special-defense";
  static SPECIAL_CASES = [this.ACCEPT_SPECIAL, this.OMIT_SPECIAL];

  constructor(baseStats) {
    if (!this.areValidStats(baseStats)) {
      throw new Error("Invalid stat provided");
    }

    this.baseStats = this.initializeBaseStats(baseStats);
    this.stats = this.initializeStats(baseStats);
  }

  areValidStats = (baseStats) => {
    let valid = true;
    baseStats.forEach((stat) => {
      const statName = stat.stat.name;

      if (
        !AllStats.ALL_STATS.includes(statName) &&
        !AllStats.SPECIAL_CASES.includes(statName)
      ) {
        valid = false;
      }
    });
    return valid;
  };

  initializeStats = (baseStats) => {
    const stats = {};

    baseStats.forEach((stat) => {
      let newStat = {};
      let statName = stat.stat.name;
      const baseValue = stat.base_stat;

      switch (statName) {
        case HpStat.STAT_NAME:
          newStat = new HpStat(baseValue);
          newStat.setIv();
          break;
        case AllStats.ACCEPT_SPECIAL:
          statName = AllStats.ALL_STATS[AllStats.SPECIAL_INDEX];
          newStat = new Stat(statName, baseValue);
          break;
        case AllStats.OMIT_SPECIAL:
          return;
        default:
          newStat = new Stat(statName, baseValue);
          break;
      }

      stats[statName] = newStat;
    });

    return stats;
  };

  getCurrentStats = (level) => {
    return {
      hp: this.stats.hp.calculateStat(level),
      attack: this.stats.attack.calculateStat(level),
      defense: this.stats.defense.calculateStat(level),
      speed: this.stats.speed.calculateStat(level),
      special: this.stats.special.calculateStat(level),
    };
  };

  initializeBaseStats = (baseStats) => {
    const stats = {};

    baseStats.forEach((stat) => {
      let statName = stat.stat.name;
      const baseValue = stat.base_stat;

      if (statName === AllStats.OMIT_SPECIAL) {
        return;
      }
      if (statName === AllStats.ACCEPT_SPECIAL) {
        statName = AllStats.ALL_STATS[AllStats.SPECIAL_INDEX];
      }

      stats[statName] = baseValue;
    });

    return stats;
  };

  getBaseStats = () => {
    return this.baseStats;
  };
}

export default AllStats;
