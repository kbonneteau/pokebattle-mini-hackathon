import { createNewElement } from "../services/templateFunctions";
import Arena from "../components/arena";

const Home = () => {
  const home = createNewElement("div", ["battleground"]);
  home.appendChild(Arena());
  return home;
};

export default Home;
