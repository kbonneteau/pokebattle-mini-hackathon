import { createNewElement } from "../services/templateFunctions";
import Frame from "../components/frame";
import Arena from "../components/arena";
import PlayerArea from "../components/playerArea";

const Home = () => {
  const frame = Frame();
  const battleground = createNewElement("div", ["battleground"]);
  battleground.appendChild(Arena());
  battleground.appendChild(PlayerArea());
  frame.appendChild(battleground);
  return frame;
};

export default Home;
