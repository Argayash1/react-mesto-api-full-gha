import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки
  const isLiked = card.likes.some((i) => i._id === currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like-button ${isLiked && "element__like-button_active"}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <>
      {isOwn && <button className="element__delete-button" type="button" onClick={handleDeleteClick}></button>}
      <img className="element__image" src={card.link} alt={card.name} onClick={handleClick} />
      <div className="element__info">
        <h3 className="element__title">{card.name}</h3>
        <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
        <span className="element__count-likes">{card.likes.length}</span>
      </div>
    </>
  );
}

export default Card;
