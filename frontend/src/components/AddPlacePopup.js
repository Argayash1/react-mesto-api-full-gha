import { useEffect } from "react";
import useForm from "../hooks/useForm.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading, name }) {
  const { values, errors, formValid, onChange, resetValidation } = useForm();

  useEffect(() => {
    resetValidation();
  }, [isOpen, resetValidation]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: values.name,
      link: values.link,
    });
  }

  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <PopupWithForm
        title="Новое место"
        name={name}
        onClose={onClose}
        onSubmit={handleSubmit}
        submitButtonText={isLoading ? "Сохранение..." : "Создать"}
        isLoading={isLoading}
        isValid={!formValid}
      >
        <input
          type="text"
          value={values.name || ""}
          onChange={onChange}
          id="title"
          className={`popup__input ${errors.name && "popup__input_type_error"}`}
          name="name"
          placeholder="Название"
          autoComplete="off"
          required
          minLength="2"
          maxLength="30"
        />
        <span className={`popup__error ${errors.name && "popup__error_visible"}`} id="title-error" name="name">
          {errors.name}
        </span>
        <input
          type="url"
          value={values.link || ""}
          onChange={onChange}
          id="url"
          className={`popup__input ${errors.link && "popup__input_type_error"}`}
          name="link"
          placeholder="Ссылка на картинку"
          autoComplete="off"
          required
        />
        <span className={`popup__error ${errors.link && "popup__error_visible"}`} id="url-error" name="link">
          {errors.link}
        </span>
      </PopupWithForm>
    </Popup>
  );
}

export default AddPlacePopup;
