import battleLogo from "../assets/pokemon-logo.png";
import { createNewElement } from "../services/templateFunctions";

const Header = () => {
  const header = createNewElement("img", ["poke__logo"]);
  header.src = battleLogo;
  return header;
};

export default Header;
