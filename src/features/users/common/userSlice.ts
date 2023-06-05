import { createSlice, PayloadAction } from '@reduxjs/toolkit'


type InitialState = {
    accessToken: string,
    role: string,
    userId: string,
    fullname: string,
    email: string,
    phoneNumber: number,
    profilePicture?: string,
    profileTitle?: string,
    city?: string,
    county?: string,
    about?: string,
}
const initialState: InitialState = {
    accessToken: '',
    email: "",
    fullname: "",
    phoneNumber: 0,
    role: "",
    userId: "",
    about: "",
    city: "",
    county: "",
    profilePicture: "",
    profileTitle: ""
}



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload
        },
        setLoggedUserData: (state, action: PayloadAction<InitialState>) => {
            state.userId = action.payload.userId
            state.role = action.payload.role
            state.email = action.payload.email
            state.fullname = action.payload.fullname
            state.phoneNumber = action.payload.phoneNumber
        },
        clearLoggedUserData: (state) => {
            state = initialState
        }
    },
})

export default userSlice.reducer
export const { setLoggedUserData, setAccessToken, clearLoggedUserData } = userSlice.actions