import { Routes, Route, NavLink } from "react-router-dom";
import Menu from "./Menu.js";
import MobileMenu from "./MobileMenu.js";

function Navbar({ loggedIn, onSignOut, userEmail, isOpen, onMobileMenu, onClose, isLoading }) {
  return (
    <nav className="navbar">
      <ul className="navbar__navlist">
        <Routes>
          {loggedIn && !isLoading && (
            <Route
              path="/"
              element={
                <li className="navbar__navlist-item">
                  <Menu onSignOut={onSignOut} userEmail={userEmail} />
                  <MobileMenu
                    onSignOut={onSignOut}
                    userEmail={userEmail}
                    isOpen={isOpen}
                    onMobileMenu={onMobileMenu}
                    onClose={onClose}
                  />
                </li>
              }
            />
          )}
          <Route
            path="/sign-in"
            element={
              <li className="navbar__navlist-item">
                <NavLink className="navbar__navlink" to="/sign-up">
                  Регистрация
                </NavLink>
              </li>
            }
          />
          <Route
            path="/sign-up"
            element={
              <li className="navbar__navlist-item">
                <NavLink className="navbar__navlink" to="/sign-in">
                  Войти
                </NavLink>
              </li>
            }
          />
        </Routes>
      </ul>
    </nav>
  );
}

export default Navbar;
