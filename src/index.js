import "./styles/styles.scss";
import "./scripts/script";
import pokeBattleLogo from "./assets/pokemon-logo.png";

const logoLoader = () => {
  const logo = document.querySelector(".poke__logo");
  logo.src = pokeBattleLogo;
};

logoLoader();
