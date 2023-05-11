import React from "react";
import { Link } from "react-router-dom";

// import Bye from "../images/404.svg";

function PageNotFound() {
  return (
    <div className="not-found">
      <h3 className="not-found__title">
        <span className="not-found__span">404</span> - Страница не найдена
      </h3>
      <img className="not-found__image" src="#" alt="" />
      <p className="not-found__text">Ой, здесь ничего нет</p>
      <Link className="not-found__button" to="/">
        Назад
      </Link>
    </div>
  );
}

export default PageNotFound;
