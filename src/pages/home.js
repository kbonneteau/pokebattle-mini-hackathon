import { createNewElement } from "../services/templateFunctions";
import Arena from "../components/arena";
import PlayerArea from "../components/playerArea";

const Home = () => {
  const home = createNewElement("div", ["battleground"]);
  home.appendChild(Arena());
  home.appendChild(PlayerArea());
  return home;
};

export default Home;
