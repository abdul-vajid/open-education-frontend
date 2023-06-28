import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "../../app/config/apiConfig"
import { IAuthorDetails, ICourseDetails, IReview } from '../../app/types/interfaces'

type InitialState = {
    course: {
        courseDetails: ICourseDetails
        authorDetails: IAuthorDetails
        reviews: IReview | string
    }
    isCourseFetched: boolean,
    isFetchingCourse: boolean
    fetchingCourseErrMsg: string
}
const initialState: InitialState = {
    course: {
        authorDetails: {
            about: "",
            userId: "",
            city: "",
            country: "",
            fullname: "",
            profilePicture: "",
            profileTitle: "",
            phoneNumber: 0
        },
        courseDetails: {
            courseId: "",
            courseTitle: "",
            fieldOfStudy: "",
            imageUrl: "",
            courseFee: 0,
            paymentMode: "",
            valuationMode: "",
            difficulty: "",
            enrolledCount: 0,
            description: "",
            totalLessons: 0,
            status: "",
            prerequisites: "",
            discountCoupons: "",
            lessons: []
        },
        reviews: "This course does not have any review",
    },
    isCourseFetched: false,
    isFetchingCourse: false,
    fetchingCourseErrMsg: ""
}

export const fetchPublicCourse = createAsyncThunk(
    'course/fetchPublicCourse',
    async (courseId: string) => {
        try {
            const response = await axios.get(`/get-course/${courseId}`);
            return response.data.data;
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
            .addCase(fetchPublicCourse.fulfilled, (state, action: PayloadAction<InitialState["course"]>) => {
                state.isFetchingCourse = false
                state.isCourseFetched = true
                console.log("fetchPublicCourse ",action.payload)
                state.course.authorDetails = action.payload.authorDetails
                state.course.courseDetails = action.payload.courseDetails
                state.course.reviews = action.payload.reviews
            })
            .addCase(fetchPublicCourse.rejected, (state, action) => {
                state.isFetchingCourse = false;
                state.isCourseFetched = false
                state.fetchingCourseErrMsg = action.error.message || 'Something went wrong';
            });
    },
})

export default publicCurrentSlice.reducer