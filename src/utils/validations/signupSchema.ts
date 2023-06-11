import * as Yup from "yup";


export const signupSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .matches(/^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+)\.([a-zA-Z]{2,6})$/, "Invalid email. Please enter a valid email")
        .required("Email field is required"),
    fullname: Yup.string()
        .min(2, "Fullname must be at least 2 characters")
        .max(50, "Fullname can have maximum 50 characters")
        .matches(/^[[a-zA-Z][a-zA-Z ]+[a-zA-Z]/, "Invalid fullname. Please enter a valid name")
        .required("Fullname field is required"),
    phoneNumber: Yup.number()
        .typeError("Phone number must be a number")
        .min(5555555555, "Invalid phone number")
        .max(9999999999, "Invalid phone number")
        .required("Phone number field is required"),
    role: Yup.string()
        .oneOf(["learner", "tutor"], "Invalid role specified")
        .required("Role field is required"),
});