import * as Yup from "yup";


export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .matches(/^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+)\.([a-zA-Z]{2,6})$/, "Invalid email Please enter a valid email")
        .required("Email field is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(16, "Password can have maximum 16 characters")
        .required("Password field is required"),
});