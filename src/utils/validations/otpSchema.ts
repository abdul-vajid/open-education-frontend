import * as Yup from "yup";

export const otpSchema = Yup.object().shape({
    otp: Yup.number()
        .required("OTP field is required")
        .min(100000, "OTP must be at least 6 characters")
        .max(999999, "OTP must be at most 6 characters")
});