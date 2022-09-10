import "./styles/styles.scss";
import Header from "./components/header";
import Home from "./pages/home";
import Footer from "./components/footer";

const App = () => {
  document.body.appendChild(Header());
  document.body.appendChild(Home());
  document.body.appendChild(Footer());
};

App();
