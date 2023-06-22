import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCourse as Course, TPostCallExtra } from '../../../app/types/types';
import { CourseStatus, ValuationModes } from '../../../app/types/enums';

type InitialState = {
    courseDetailsAvailable: boolean;
    course: Course,
    isCourseHosting: boolean,
    courseHostingErrorMsg: string
};

const initialState: InitialState = {
    course: {
        _id: '',
        authorId: '',
        courseTitle: '',
        imageUrl: '',
        courseFee: '',
        paymentMode: '',
        valuationMode: '',
        difficulty: '',
        fieldOfStudy: '',
        enrolledCount: 0,
        status: '',
        description: '',
        prerequisites: '',
        discountCoupons: '',
        lessons: '',
        reviews: '',
        createdAt: '',
        updatedAt: '',
        __v: 0,
    },
    courseDetailsAvailable: false,
    isCourseHosting: false,
    courseHostingErrorMsg: ""
};

interface setCurrentCoursePayload extends Course {
    courseId: string;
}

export const hostCourse = createAsyncThunk(
    'quiz/hostCourse',
    async ({ axiosInstance, body }: TPostCallExtra) => {
        const axios = axiosInstance;
        try {
            const response = await axios.put('/course/publish-course', body);
            return response.data.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Something went wrong');
        }
    }
);

const currentCourseSlice = createSlice({
    name: 'current-course',
    initialState,
    reducers: {
        setCurrentCourse: (state, action: PayloadAction<setCurrentCoursePayload>) => {
            state.courseDetailsAvailable = true
            if (action.payload.status !== CourseStatus.Draft) {
                state.course.imageUrl = action.payload.imageUrl
                state.course.courseFee = action.payload.courseFee
                state.course.paymentMode = action.payload.paymentMode
                state.course.valuationMode = action.payload.valuationMode
                state.course.difficulty = action.payload.difficulty
            }
            state.course.valuationMode = action.payload?.valuationMode
            state.course._id = action.payload.courseId
            state.course.courseTitle = action.payload.courseTitle
            state.course.fieldOfStudy = action.payload.fieldOfStudy
            state.course.description = action.payload.description
            state.course.lessons = action.payload.lessons
            state.course.prerequisites = action.payload.prerequisites
            state.course.authorId = action.payload.authorId
            state.course.status = action.payload.status
        },
        setValuationMode: (state, action: PayloadAction<ValuationModes>) => {
            state.course.valuationMode = action.payload
        },
        clearCurrentCourse: (state) => {
            state.courseDetailsAvailable = false
            state.course = initialState.course
        }
    },
    extraReducers: (builder) => {
        builder.addCase(hostCourse.pending, (state) => {
            state.isCourseHosting = true
        })
            .addCase(hostCourse.fulfilled, (state, action: PayloadAction<InitialState[Partial<"course">]>) => {
                state.isCourseHosting = false
                state.course.courseTitle = action.payload.courseTitle
                state.course.fieldOfStudy = action.payload.fieldOfStudy
                state.course.courseFee = action.payload.courseFee
                state.course.difficulty = action.payload.difficulty
                state.course.imageUrl = action.payload.imageUrl
                state.course.description = action.payload.description
                state.course.paymentMode = action.payload.paymentMode
                state.course.prerequisites = action.payload.prerequisites
            })
            .addCase(hostCourse.rejected, (state, action) => {
                state.isCourseHosting = false;
                state.courseHostingErrorMsg = action.error.message || 'Something went wrong';
            });
    },
});

export default currentCourseSlice.reducer;
export const { setCurrentCourse, clearCurrentCourse, setValuationMode } = currentCourseSlice.actions