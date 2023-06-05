import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type InitialState = {
    fullname: string,
    email: string,
    phoneNumber: number
    role: string,
    token: string
}
const initialState: InitialState = {
    fullname: "",
    email: "",
    phoneNumber: 0,
    role: "",
    token: ""
}

type UserInfoPayload = {
    fullname: string;
    email: string;
    phoneNumber: number;
    role: string;
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserInfoPayload>) => {
            state.fullname = action.payload.fullname
            state.email = action.payload.email
            state.phoneNumber = action.payload.phoneNumber
            state.role = action.payload.role
        },
        setConfirmationToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload
        },
    }
})

export default authSlice.reducer
export const { setUserInfo, setConfirmationToken } = authSlice.actions