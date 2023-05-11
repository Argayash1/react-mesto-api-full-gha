import { useState, useCallback } from "react";

function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    setValues((values) => ({ ...values, [name]: value }));
    setErrors((errors) => ({ ...errors, [name]: e.target.validationMessage }));
    const formValid = e.target.closest("form").checkValidity();
    setFormValid(formValid);
  }

  const resetValidation = useCallback(function reset(values = {}, errors = {}, formValid = false) {
    setValues(values);
    setErrors(errors);
    setFormValid(formValid);
  }, []);

  return { values, errors, formValid, onChange, resetValidation };
}

export default useForm;
