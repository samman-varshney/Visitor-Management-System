import * as yup from "yup";

export const loginValidtor = yup.object({
  email: yup.string().email().required("email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[^\w]/, "Password requires a symbol"),
});
