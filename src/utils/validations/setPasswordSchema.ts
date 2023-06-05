import * as Yup from "yup";

export const setPasswordSchema = Yup.object().shape({
    password: Yup.string()
        .required("Password field is required")
        .min(8, "Password must be at least 8 characters")
        .max(16, "Password must be at most 16 characters")
        .matches(
            /^[a-zA-Z0-9!@#$%&*()-_=+{}|^~.?,;:<>/]+$/,
            "Invalid password. Please enter a valid password"
        )
        .matches(/[a-zA-Z]/, "Password must contain at least one letter")
        .matches(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: Yup.string()
        .required("Confirm Password field is required")
        .min(8, "Password must be at least 8 characters")
        .max(16, "Password must be at most 16 characters")
        .matches(
            /^[a-zA-Z0-9!@#$%&*()-_=+{}|^~.?,;:<>/]+$/,
            "Invalid password. Please enter a valid password"
        )
        .matches(/[a-zA-Z]/, "Password must contain at least one letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .oneOf([Yup.ref("password")], "Passwords must match"),
});
