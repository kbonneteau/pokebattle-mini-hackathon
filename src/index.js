import "./styles/styles.scss";
import Header from "./components/header";
import Home from "./pages/home";

const App = () => {
  document.body.appendChild(Header());
  document.body.appendChild(Home());
};

App();
