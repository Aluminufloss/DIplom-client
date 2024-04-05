import * as Yup from "yup";

export const validationRegSchema = Yup.object().shape({
  email: Yup.string().email("Email must be a valid").required("Email is Required."),
  username: Yup.string()
    .required("Username is Required.")
    .min(5, "Username is too Short.")
    .max(16, "Username is too Long.")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Username can only contain Latin letters."
    ),
  password: Yup.string()
    .required("Password is Required.")
    .min(5, "Password is too short")
    .max(20, "Password is too long")
    .matches(/(?=.*[0-9])/, "Password must contain a number.")
    .matches(/[!@#%&_]/, "Password must contain a special character.")
    .matches(
      /^([A-Za-z\u00C0-\u00D6\u00D8-\u00f6\u00f8-\u00ff\s]*)$/gi,
      "Password can only contain Latin letters."
    ),
  passwordAgain: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
