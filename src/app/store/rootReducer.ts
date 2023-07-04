import { combineReducers } from 'redux';
import themeReducer from '../../features/theme/themeSlice';
import publicReducer from '../../features/Public/publicSlice';
import authReducer from '../../features/Public/authSlice';
import userReducer from '../../features/users/Common/userSlice';
import tutorCoursesReducer from '../../features/users/Tutor/tutorCoursesSlice';
import currentCourseReducer from '../../features/users/Tutor/currentCourseSlice';
import currentLessonReducer from '../../features/users/Tutor/currentLessonSlice';
import setUpValuationReducer from '../../features/users/Tutor/setUpValuationSlice';
import publicCurrentReducer from '../../features/Public/publicCurrentSlice';
import inboxReducer from '../../features/users/Common/inboxSlice';
import currentChatReducer from '../../features/users/Common/currentChatSlice';



const rootReducer = combineReducers({
    theme: themeReducer,
    public: publicReducer,
    auth: authReducer,
    user: userReducer,
    tutorCourses: tutorCoursesReducer,
    currentCourse: currentCourseReducer,
    currentLesson: currentLessonReducer,
    setUpValuation: setUpValuationReducer,
    publicCurrent: publicCurrentReducer,
    inbox: inboxReducer,
    currentChat: currentChatReducer,
});

export default rootReducer;
