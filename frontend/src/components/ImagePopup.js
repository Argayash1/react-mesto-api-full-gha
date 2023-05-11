import Popup from "../components/Popup.js";
function ImagePopup({ card, onClose, name }) {
  const isOpen = Object.keys(card).length !== 0;

  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <div className="popup__image-container">
        <button className="popup__close" type="button" onClick={onClose}></button>
        <img className="popup__photo" src={card.link} alt={card.name} />
        <p className="popup__caption">{card.name}</p>
      </div>
    </Popup>
  );
}

export default ImagePopup;
