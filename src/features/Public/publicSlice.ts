import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { constRoles } from '../../app/constants/BasicConstants'
import axios from "../../app/config/apiConfig"
import { TPublishedCourse } from '../../app/types/types'

type InitialState = {
    role: string,
    event: string
    publicCourses: TPublishedCourse[]
    isCoursesFetched: boolean,
    isCourseFetched: boolean,
    isFetchingCourses: boolean
    isFetchingCourse: boolean
    fetchingCoursesErrMsg: string
    fetchingCourseErrMsg: string
}
const initialState: InitialState = {
    role: constRoles.guest,
    event: "",
    publicCourses: [],
    isCoursesFetched: false,
    isCourseFetched: false,
    isFetchingCourses: false,
    isFetchingCourse: false,
    fetchingCoursesErrMsg: "",
    fetchingCourseErrMsg: ""
}

export const fetchPublicCourses = createAsyncThunk(
    'course/fetchPublicCourses',
    async () => {
        try {
            const response = await axios.get('/get-courses');
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || 'Something went wrong');
        }
    }
);

const publicSlice = createSlice({
    name: 'public',
    initialState,
    reducers: {
        roleIsLearner: state => {
            state.role = constRoles.learner
        },
        roleIsTutor: (state) => {
            state.role = constRoles.tutor
        },
        roleIsAdmin: state => {
            state.role = constRoles.admin
        },
        roleIsGuest: state => {
            state.role = constRoles.guest
        },
        setEvent: (state, action: PayloadAction<string>) => {
            state.event = action.payload
        },
        clearEvent: state => {
            state.event = ""
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPublicCourses.pending, (state) => {
            state.isFetchingCourses = true
        })
            .addCase(fetchPublicCourses.fulfilled, (state, action: PayloadAction<InitialState["publicCourses"]>) => {
                state.isFetchingCourses = false
                state.isCoursesFetched = true
                state.publicCourses = action.payload
            })
            .addCase(fetchPublicCourses.rejected, (state, action) => {
                state.isFetchingCourses = false;
                state.isCoursesFetched = false
                state.fetchingCoursesErrMsg = action.error.message || 'Something went wrong';
            });
    },
})

export default publicSlice.reducer
export const { roleIsLearner, roleIsTutor, roleIsAdmin, roleIsGuest, setEvent, clearEvent } = publicSlice.actions