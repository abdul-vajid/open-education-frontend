import { combineReducers } from 'redux';
import themeReducer from '../../features/theme/themeSlice';
import publicReducer from '../../features/Public/publicSlice';
import authReducer from '../../features/Public/authSlice';
import userReducer from '../../features/users/Common/userSlice';
import tutorCoursesReducer from '../../features/users/Tutor/tutorCoursesSlice';


const rootReducer = combineReducers({
    theme: themeReducer,
    public: publicReducer,
    auth: authReducer,
    user: userReducer,
    tutorCourses: tutorCoursesReducer
});

export default rootReducer;
