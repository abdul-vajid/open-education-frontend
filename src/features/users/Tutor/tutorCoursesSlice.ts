import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { TCourse as Course } from '../../../app/types/types';

type InitialState = {
    loading: boolean;
    courses: {
        unpublishedCourses: Course[];
        publishedCourses: Course[];
        unlistedCourses: Course[];
    };
    error: string;
};

const initialState: InitialState = {
    loading: false,
    courses: {
        unpublishedCourses: [],
        publishedCourses: [],
        unlistedCourses: [],
    },
    error: '',
};

export const fetchCourses = createAsyncThunk('tutor/fetchCourses', async (extra: AxiosInstance) => {
    const axios = extra as AxiosInstance;
    return await axios.get('/course/tutor/courses').then(response => response.data.data)
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
    },
});

export default tutorCoursesSlice.reducer;
