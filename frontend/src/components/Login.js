import useForm from "../hooks/useForm.js";

function Login({ name, onLogin, isLoading }) {
  const { values, errors, formValid, onChange } = useForm();
  const submitButtonDisable = isLoading || !formValid;
  const submitButtonClassName = `login__submit-button ${!formValid && "login__submit-button_disabled"}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values);
  };

  return (
    <div className="login">
      <h2 className="login___title">Вход</h2>
      <form name={`${name}`} className="login__form" onSubmit={handleSubmit} noValidate>
        <input
          type="email"
          value={values.email || ""}
          onChange={onChange}
          className={`login__input ${errors.email && "login__input_type_error"}`}
          name="email"
          id="email"
          placeholder="Email"
          autoComplete="off"
          required
        />
        <span className={`login__error ${errors.email && "login__error_visible"}`}>{errors.email}</span>
        <input
          type="password"
          value={values.password || ""}
          onChange={onChange}
          className={`login__input ${errors.password && "login__input_type_error"}`}
          name="password"
          id="password"
          placeholder="Пароль"
          autoComplete="off"
          minLength="8"
          required
        />
        <span className={`login__error ${errors.password && "login__error_visible"}`}>{errors.password}</span>
        <button className={submitButtonClassName} type="submit" disabled={submitButtonDisable}>
          {isLoading ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
}

export default Login;
