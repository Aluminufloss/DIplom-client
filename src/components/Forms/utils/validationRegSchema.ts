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
    .max(30, "Password is too long")
    .matches(/[!@#%&_]/, "Password must contain a special character. (!@#%&_)")
    .matches(/[a-zA-Z0-9]/, 'Password can only contain Latin letters and numbers.'),
  passwordAgain: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
