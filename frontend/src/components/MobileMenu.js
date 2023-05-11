import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function MobileMenu({ onSignOut, userEmail, isOpen, onMobileMenu, onClose }) {
  return (
    <>
      <div className={`mobile-menu__elements ${isOpen && "mobile-menu__elements_is-active"}`}>
        <span className="mobile-menu__usermail">{userEmail}</span>
        <button onClick={onSignOut} className="mobile-menu__button">
          Выйти
        </button>
      </div>
      {!isOpen && <AiOutlineMenu className="mobile-menu__navbutton" size="30" onClick={onMobileMenu} />}
      {isOpen && <AiOutlineClose className="mobile-menu__navbutton" size="30" onClick={onClose} />}
    </>
  );
}

export default MobileMenu;
