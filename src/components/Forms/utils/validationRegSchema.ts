import * as Yup from "yup";

export const validationRegSchema = Yup.object().shape({
  email: Yup.string()
    .email("Некорректная почта.")
    .required("Данное поле необходимо."),
  username: Yup.string()
    .required("Данное поле необходимо.")
    .min(5, "Логин слишком короткий.")
    .max(16, "Логин слишком длинный.")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Логин может содержать только латинские буквы."
    ),
  password: Yup.string()
    .required("Данное поле необходимо.")
    .min(5, "Пароль слишком короткий.")
    .max(30, "Пароль слишком длинный.")
    .matches(
      /[a-zA-Z0-9]/,
      "Пароли может содержать только латинские буквы и цифры."
    ),
  passwordAgain: Yup.string()
    .required("Подтвердите пароль.")
    .oneOf([Yup.ref("password")], "Пароли должны совпадать."),
});
