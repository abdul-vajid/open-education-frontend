import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TGetCallWithParamsIdExtra, TPostCallExtra } from '../../../app/types/types';
import { AxiosInstance } from 'axios';
import { ICourseDetails } from '../../../app/types/interfaces';


type InitialState = {
    wishList : ICourseDetails[],
    isFetching: boolean,
    isPosting: boolean,
    isRemoving: boolean
    fetchError: string,
    postError: string,
    removeError: string
}

const initialState: InitialState = {
    wishList: [],
    isFetching: false,
    isPosting: false,
    isRemoving: false,
    fetchError: "",
    postError: "",
    removeError: ""
}


export const getWishlist = createAsyncThunk('wishlist/getWishlist', async (axiosInstance: AxiosInstance) => {
    const axios = axiosInstance;
    try {
        const response = await axios.get("user/wishlist")
        return response.data.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Something went wrong');
    }
})

export const removeFromWishlist = createAsyncThunk('wishlist/removeFromWishlist', async ({ paramsId, axiosInstance }: TGetCallWithParamsIdExtra) => {
    const axios = axiosInstance;
    try {
        const response = await axios.get(`user/wishlist/remove-course/${paramsId}`)
        return response.data.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Something went wrong');
    }
})

export const addToWishList = createAsyncThunk('user/addToWishList', async ({ body, axiosInstance }: TPostCallExtra) => {
    const axios = axiosInstance;
    try {
        const response = await axios.post('user/wishlist/add', body)
        return response.data.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Something went wrong');
    }
})

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getWishlist.pending, (state) => {
            state.isFetching = true
            state.fetchError = ""
        })
            .addCase(getWishlist.fulfilled, (state, action: PayloadAction<InitialState['wishList']>) => {
                state.isFetching = false
                state.wishList = action.payload
            })
            .addCase(getWishlist.rejected, (state, action) => {
                state.isFetching = false
                state.fetchError = action.error.message || 'Something went wrong, Try again';
            })
            .addCase(addToWishList.pending, (state) => {
                state.isPosting = true
                state.postError = ""
            })
            .addCase(addToWishList.fulfilled, (state) => {
                state.isPosting = false
            })
            .addCase(addToWishList.rejected, (state, action) => {
                state.isPosting = false
                state.postError = action.error.message || 'Something went wrong, Try again';
            })
            .addCase(removeFromWishlist.pending, (state) => {
                state.isRemoving = true
                state.removeError = ""
            })
            .addCase(removeFromWishlist.fulfilled, (state) => {
                state.isRemoving = false
            })
            .addCase(removeFromWishlist.rejected, (state, action) => {
                state.isRemoving = false
                state.removeError = action.error.message || 'Something went wrong, Try again';
            })
    },
})

export default wishlistSlice.reducer