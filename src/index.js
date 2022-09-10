import "./styles/styles.scss";
// import "./scripts/script";
import pokeBattleLogo from "./assets/pokemon-logo.png";
import axios from "axios";

const logoLoader = async () => {
  // const logo = document.querySelector(".poke__logo");
  // logo.src = pokeBattleLogo;
  const data = await axios.get("https://pokeapi.co/api/v2/pokemon/1");
  console.log(data.data.name);
};

logoLoader();
