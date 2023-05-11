import logo from "../images/header-logo.svg";
import CircleLoader from "react-spinners/CircleLoader";
import Footer from "./Footer.js";

function Loader() {
  return (
    <div className="loader">
      <div className="loader__container">
        <div className="loader__logo-container">
          <img className="loader__logo" src={logo} alt="Логотип" />
        </div>
        <CircleLoader
          color="#ffffff"
          className="loader__spinner"
          size={600}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <div className="loader__text-container">
          <p className="loader__text">Loading</p>
          <p className="loader__animated-text">...</p>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Loader;
