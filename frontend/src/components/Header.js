import NavBar from "./NavBar.js";
import logo from "../images/header-logo.svg";

function Header({ loggedIn, onSignOut, userEmail, isOpen, onMobileMenu, onClose, isLoading }) {
  return (
    <header className={`header ${isOpen && "header_is-enlarged"}`}>
      <img className="header__logo" src={logo} alt="Логотип" />
      <NavBar
        loggedIn={loggedIn}
        onSignOut={onSignOut}
        userEmail={userEmail}
        isOpen={isOpen}
        onMobileMenu={onMobileMenu}
        onClose={onClose}
        isLoading={isLoading}
      />
    </header>
  );
}

export default Header;
