import Popup from "../components/Popup.js";
import success from "../images/InfoTooltip-success.svg";
import fail from "../images/InfoTooltip-fail.svg";

function InfoTooltip({ isOpen, onClose, name, isSuccess, errorText }) {
  const headerText = isSuccess ? "Вы успешно зарегистрировались" : "Что-то пошло не так! Попробуйте ещё раз";
  const imageSrc = isSuccess ? success : fail;

  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose}></button>
        <img className="popup__register-image" src={imageSrc} alt={headerText} />
        <h3 className="popup__register-title">{headerText}</h3>
        {!isSuccess && <p className="popup__error-text">{errorText}</p>}
      </div>
    </Popup>
  );
}

export default InfoTooltip;
