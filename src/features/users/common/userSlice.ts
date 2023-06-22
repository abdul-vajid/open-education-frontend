import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TPostCallExtra } from '../../../app/types/types';
import { AxiosInstance } from 'axios';


type InitialState = {
    accessToken?: string,
    role: string,
    userId: string,
    fullname: string,
    email: string,
    phoneNumber: number,
    profilePicture?: string,
    profileTitle?: string,
    city?: string,
    country?: string,
    about?: string,
    isLoading: boolean,
    isGetCallError: boolean,
    isPostCallError: boolean,
    getCallErrorMsg: string,
    postCallErrorMsg: string,
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
    country: "",
    profilePicture: "",
    profileTitle: "",
    isLoading: false,
    isGetCallError: false,
    isPostCallError: false,
    getCallErrorMsg: "",
    postCallErrorMsg: ""
}

export const updateProfile = createAsyncThunk('user/updateProfile', async ({ body, axiosInstance }: TPostCallExtra) => {
    const axios = axiosInstance;
    return await axios.patch('user/update-profile', body).then((response) => response.data.data)
})

export const getUserProfile = createAsyncThunk('user/getUserProfile', async (axiosInstance: AxiosInstance) => {
    const axios = axiosInstance;
    return await axios.get('user/get-user').then((response) => response.data.data)
})


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
            state.about = action.payload.about ? action.payload.about : ''
            state.city = action.payload.city ? action.payload.city : ''
            state.country = action.payload.country ? action.payload.country : ''
            state.profilePicture = action.payload.profilePicture ? action.payload.profilePicture : ''
            state.profileTitle = action.payload.profileTitle ? action.payload.profileTitle : ''
        },
        clearLoggedUserData: (state) => {
            state.accessToken = '';
            state.email = '';
            state.fullname = '';
            state.phoneNumber = 0;
            state.role = '';
            state.userId = '';
            state.about = '';
            state.city = '';
            state.country = '';
            state.profilePicture = '';
            state.profileTitle = '';
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateProfile.pending, (state) => {
            state.isLoading = true;
            state.isPostCallError = false
        })
            .addCase(updateProfile.fulfilled, (state, action: PayloadAction<InitialState>) => {
                state.isPostCallError = false
                state.isLoading = false;
                state.userId = action.payload.userId
                state.role = action.payload.role
                state.email = action.payload.email
                state.fullname = action.payload.fullname
                state.phoneNumber = action.payload.phoneNumber
                state.about = action.payload.about ? action.payload.about : ''
                state.city = action.payload.city ? action.payload.city : ''
                state.country = action.payload.country ? action.payload.country : ''
                state.profilePicture = action.payload.profilePicture ? action.payload.profilePicture : ''
                state.profileTitle = action.payload.profileTitle ? action.payload.profileTitle : ''
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isPostCallError = true
                state.postCallErrorMsg = action.error.message || 'Something went wrong';
            })
            .addCase(getUserProfile.pending, (state) => {
                state.isLoading = true;
                state.isGetCallError = false
            })
            .addCase(getUserProfile.fulfilled, (state, action: PayloadAction<InitialState>) => {
                state.isLoading = false;
                state.isGetCallError = false
                state.userId = action.payload.userId
                state.role = action.payload.role
                state.email = action.payload.email
                state.fullname = action.payload.fullname
                state.phoneNumber = action.payload.phoneNumber
                state.about = action.payload.about ? action.payload.about : ''
                state.city = action.payload.city ? action.payload.city : ''
                state.country = action.payload.country ? action.payload.country : ''
                state.profilePicture = action.payload.profilePicture ? action.payload.profilePicture : ''
                state.profileTitle = action.payload.profileTitle ? action.payload.profileTitle : ''
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.isGetCallError = true
                state.getCallErrorMsg = action.error.message || 'Something went wrong';
                userSlice.actions.clearLoggedUserData()
            })
    },
})

export default userSlice.reducer
export const { setLoggedUserData, setAccessToken, clearLoggedUserData } = userSlice.actions