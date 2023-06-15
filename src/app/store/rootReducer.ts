import { combineReducers } from 'redux';
import themeReducer from '../../features/theme/themeSlice';
import publicReducer from '../../features/Public/publicSlice';
import authReducer from '../../features/Public/authSlice';
import userReducer from '../../features/users/Common/userSlice';
import tutorCoursesReducer from '../../features/users/Tutor/tutorCoursesSlice';
import currentCourseReducer from '../../features/users/Tutor/currentCourseSlice';


const rootReducer = combineReducers({
    theme: themeReducer,
    public: publicReducer,
    auth: authReducer,
    user: userReducer,
    tutorCourses: tutorCoursesReducer,
    currentCourse: currentCourseReducer
});

export default rootReducer;
