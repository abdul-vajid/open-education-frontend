import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "../../app/config/apiConfig"
import { TPublishedCourse } from '../../app/types/types'

type InitialState = {
    publicCourse: TPublishedCourse
    isCourseFetched: boolean,
    isFetchingCourse: boolean
    fetchingCourseErrMsg: string
}
const initialState: InitialState = {
    publicCourse: {
        authorDetails: {
            about: "",
            autherId: "",
            city: "",
            country: "",
            fullname: "",
            profilePicture: "",
            profileTitle: ""
        },
        courseFee: 0,
        courseId: "",
        courseTitle: "",
        description: "",
        difficulty: "",
        discountCoupons: "",
        enrolledCount: 0,
        fieldOfStudy: "",
        imageUrl: "",
        paymentMode: "",
        prerequisites: [],
        reviews: "",
        totalLessons: 0,
        valuationMode: "",
    },
    isCourseFetched: false,
    isFetchingCourse: false,
    fetchingCourseErrMsg: ""
}

export const fetchPublicCourse = createAsyncThunk(
    'course/fetchPublicCourse',
    async (courseId: string) => {
        try {
            const response = await axios.get(`/get-courses${courseId}`);
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Something went wrong');
        }
    }
);

const publicCurrentSlice = createSlice({
    name: 'public',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPublicCourse.pending, (state) => {
            state.isFetchingCourse = true
        })
            .addCase(fetchPublicCourse.fulfilled, (state, action: PayloadAction<InitialState["publicCourse"]>) => {
                state.isFetchingCourse = false
                state.isCourseFetched = true
                state.publicCourse = action.payload
            })
            .addCase(fetchPublicCourse.rejected, (state, action) => {
                state.isFetchingCourse = false;
                state.isCourseFetched = false
                state.fetchingCourseErrMsg = action.error.message || 'Something went wrong';
            });
    },
})

export default publicCurrentSlice.reducer