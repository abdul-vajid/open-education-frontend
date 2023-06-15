import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { TCourse as Course, TFetchCourseExtra } from '../../../app/types/types';
import { IPayloadActionFetchCourse } from '../../../app/types/interfaces';
import { CourseStatus } from '../../../app/types/enums';

type InitialState = {
    loading: boolean;
    courseFetching: boolean
    courses: {
        unpublishedCourses: Course[];
        publishedCourses: Course[];
        unlistedCourses: Course[];
    };
    error: string;
    courseFetchingErr: string
};

const initialState: InitialState = {
    loading: false,
    courseFetching: false,
    courses: {
        unpublishedCourses: [],
        publishedCourses: [],
        unlistedCourses: [],
    },
    error: '',
    courseFetchingErr: ""
};

export const fetchCourses = createAsyncThunk('tutor/fetchCourses', async (extra: AxiosInstance) => {
    const axios = extra as AxiosInstance;
    return await axios.get('/course/tutor/courses').then(response => response.data.data)
})


export const fetchCourse = createAsyncThunk('tutor/fetchCourse', async ({ courseId, axiosInstance }: TFetchCourseExtra) => {
    const axios = axiosInstance;
    return await axios.get(`/course/tutor/course/${courseId}`).then(response => response.data.data)
})

const tutorCoursesSlice = createSlice({
    name: 'tutor-courses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCourses.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCourses.fulfilled, (state, action: PayloadAction<InitialState['courses']>) => {
            state.loading = false;
            state.courses = action.payload;
            state.error = '';
        });
        builder.addCase(fetchCourses.rejected, (state, action) => {
            state.loading = false;
            state.courses = {
                unpublishedCourses: [],
                publishedCourses: [],
                unlistedCourses: [],
            };
            state.error = action.error.message || 'Something went wrong';
        });
        builder.addCase(fetchCourse.pending, (state) => {
            console.log("inside fetchCourse.pending 1")
            state.courseFetching = true;
        });
        builder.addCase(fetchCourse.fulfilled, (state, action: PayloadAction<IPayloadActionFetchCourse>) => {
            state.courseFetching = false;
            state.error = '';
            console.log("inside fetchCourse.fulfilled 1. action.payload.courseDetails.status", action.payload.courseDetails)
            console.log("CourseStatus.Draft === action.payload.courseDetails.status", CourseStatus.Draft === action.payload.courseDetails.status)
            console.log("CourseStatus.Draft <<<>>>> action.payload.courseDetails.status", CourseStatus.Draft, "<<<???>>>",action.payload.courseDetails.status)
            if (CourseStatus.Draft === action.payload.courseDetails.status) {
                console.log("inside fetchCourse.fulfilled 2")
                const courseId = action.payload.courseDetails.courseId;
                const courseIndex = state.courses.unpublishedCourses.findIndex((course) => course._id === courseId);
                if (courseIndex !== -1) {
                    console.log("action.payload.courseDetails from fetchCourse.fulfilled tutorCourses slice", action.payload.courseDetails)
                    state.courses.unpublishedCourses[courseIndex].courseTitle = action.payload.courseDetails.courseTitle;
                    state.courses.unpublishedCourses[courseIndex].fieldOfStudy = action.payload.courseDetails.fieldOfStudy;
                    state.courses.unpublishedCourses[courseIndex].description = action.payload.courseDetails.description;
                    state.courses.unpublishedCourses[courseIndex].prerequisites = action.payload.courseDetails.prerequisites;
                    state.courses.unpublishedCourses[courseIndex].lessons = action.payload.courseDetails.lessons;
                    state.courses.unpublishedCourses[courseIndex].reviews = action.payload.reviews;
                }
                console.log("inside fetchCourse.fulfilled 3")
            }
        });

        builder.addCase(fetchCourse.rejected, (state, action) => {
            console.log("inside fetchCourse.rejected 1")
            state.courseFetchingErr = action.error.message || 'Something went wrong';
        })
    },
});

export default tutorCoursesSlice.reducer;
