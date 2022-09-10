import battleLogo from "../assets/pokemon-logo.png";
import { createNewElement } from "../services/templateFunctions";

const Header = () => {
  const header = createNewElement("header", ["poke"]);
  const logo = createNewElement("img", ["poke__logo"]);
  logo.src = battleLogo;
  header.appendChild(logo);
  return header;
};

export default Header;
