function Menu({ onSignOut, userEmail }) {
  return (
    <div className="menu__elements">
      <span className="menu__usermail">{userEmail}</span>
      <button onClick={onSignOut} className="menu__button">
        Выйти
      </button>
    </div>
  );
}

export default Menu;
