import { Link } from "react-router-dom";
import useForm from "../hooks/useForm.js";

const Register = ({ name, onRegister, isLoading }) => {
  const { values, errors, formValid, onChange } = useForm();
  const submitButtonDisable = isLoading || !formValid;
  const submitButtonClassName = `register__submit-button ${!formValid && "register__submit-button_disabled"}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
  };

  return (
    <div className="register">
      <h2 className="register__title">Регистрация</h2>
      <form className="register__form" name={`${name}`} onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          value={values.email || ""}
          onChange={onChange}
          className={`register__input ${errors.email && "register__input_type_error"}`}
          name="email"
          id="email"
          placeholder="Email"
          autoComplete="off"
          required
        />
        <span className={`register__error ${errors.email && "register__error_visible"}`}>{errors.email}</span>
        <input
          type="password"
          value={values.password || ""}
          onChange={onChange}
          className={`register__input ${errors.password && "register__input_type_error"}`}
          name="password"
          id="password"
          placeholder="Пароль"
          autoComplete="off"
          minLength="8"
          required
        />
        <span className={`register__error ${errors.password && "register__error_visible"}`}>{errors.password}</span>
        <button className={submitButtonClassName} type="submit" disabled={submitButtonDisable}>
          {isLoading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </form>
      <div className="register__signin">
        <p className="register__signin-text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="register__signin-link">
          Войти
        </Link>
      </div>
    </div>
  );
};

export default Register;
