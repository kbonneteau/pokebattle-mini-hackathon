// effortValue === stat experience
// IVs are listed from 0-15
class Stat {
  static DEFAULT_EV = 0; // value set for newly caught pokemon
  static MAX_EV = 65535;
  static MAX_IV = 16;

  constructor(name, baseValue) {
    this.name = name;
    this.baseValue = baseValue;
    this.effortValue = Stat.DEFAULT_EV;
    this.individualValue = this.initializeIndividualValue();
  }

  calculateStat(level) {
    return Math.floor(
      (((this.baseValue + this.individualValue) * 2 +
        Math.sqrt(this.effortValue) / 4) *
        level) /
        100 +
        5
    );
  }

  initializeIndividualValue = () => {
    return Math.floor(Math.random() * Stat.MAX_IV);
  };

  setIv = (iv) => {
    this.individualValue = iv;
  };

  setEv = (ev) => {
    this.effortValue = ev;
  };

  getIv = () => {
    return this.individualValue;
  };

  getEv = () => {
    return this.effortValue;
  };

  getBaseValue = () => {
    return this.baseValue;
  };
}

export default Stat;
