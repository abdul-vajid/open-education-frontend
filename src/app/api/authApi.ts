import axios from "../config/apiConfig.ts";

interface LoginRequest {
    email: string;
    password: string;
}

interface SignupRequest {
    fullname: string;
    email: string;
    phoneNumber: number;
    password: string;
    role: string
}

export interface VerifyEmailRequest {
    otp: number;
    token: string;
}

interface ResendOtpRequest {
    token: string;
}

interface PostForgotPasswordRequest {
    email: string;
    token: string;
}

interface ResetPasswordRequest {
    password: string;
    token: string;
}

interface ApiResponse<T> {
    success: boolean,
    message: string,
    accessToken?: string;
    data: T;
}

export const loginApi = (payload: LoginRequest): Promise<ApiResponse<any>> =>
    axios.post("/auth/login", payload, { withCredentials: false });

export const signupApi = (payload: SignupRequest): Promise<ApiResponse<any>> =>
    axios.post("/auth/signup", payload);

export const verifyEmailApi = (payload: VerifyEmailRequest): Promise<ApiResponse<any>> =>
    axios.post("/auth/verify-email", payload);

export const resendOtpApi = (
    payload: ResendOtpRequest
): Promise<ApiResponse<any>> =>
    axios.get(`/auth/resend-otp/${payload.token}`);

export const refreshTokenApi = (): Promise<ApiResponse<any>> =>
    axios.get("/auth/refresh-token", { withCredentials: true });

export const logoutApi = (): Promise<ApiResponse<any>> =>
    axios.get("/auth/logout", { withCredentials: true });

export const getForgotPasswordApi = (): Promise<ApiResponse<any>> =>
    axios.post("/auth/forgot-password");

export const postForgotPasswordApi = (
    payload: PostForgotPasswordRequest
): Promise<ApiResponse<any>> =>
    axios.post("/auth/forgot-password", payload);

export const resetPasswordApi = (
    payload: ResetPasswordRequest
): Promise<ApiResponse<any>> =>
    axios.post("/auth/reset-password", payload);
