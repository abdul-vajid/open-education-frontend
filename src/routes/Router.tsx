import React from "react";
import { Routes, Route, } from "react-router-dom";
import Home from "../features/Public/Home";
import AuthLayout from "../features/Public/AuthLayout";
import TutorAuthorization from "./Authorization/TutorAuthorization";
import TutorOverView from "../features/users/Tutor/OverView";
import LearnerAuthorization from "./Authorization/LearnerAuthorization";
import OverView from "../features/users/Learner/OverView";
import TutorCoursesPage from "../features/users/Tutor/Courses";
import LearnerCoursesPage from "../features/users/Learner/Courses";
import CourseDetails from "../features/users/Tutor/CourseDetails";
import LeanerCourseDetails from "../features/users/Learner/CourseDetails";
import CreateLesson from "../features/users/Tutor/CreateLesson";
import UserProfile from "../features/users/Common/UserProfile";
import SetupValuation from "../features/users/Tutor/SetupValuation";
import NotFound from "./NotFound";
import CheckLoginStatus from "./Authorization/CheckLoginStatus";
import LessonbasedQuizCreation from "../features/users/Tutor/LessonbasedQuizCreation";
import HostCourse from "../features/users/Tutor/HostCourse";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/learner" element={<LearnerAuthorization />}>
        <Route path="/learner" element={<OverView />} />
        <Route path="/learner/profile" element={<UserProfile />} />
        <Route path="/learner/courses" element={<LearnerCoursesPage />} />
        <Route path="/learner/course/details" element={<LeanerCourseDetails />} />
      </Route>
      <Route path="/tutor" element={<TutorAuthorization />}>
        <Route path="/tutor" element={<TutorOverView />} />
        <Route path="/tutor/profile" element={<UserProfile />} />
        <Route path="/tutor/courses" element={<TutorCoursesPage />} />
        <Route path="/tutor/course/details" element={<CourseDetails />} />
        <Route path="/tutor/course/create-lesson" element={<CreateLesson />} />
        <Route path="/tutor/course/setup-valuation" element={<SetupValuation />} />
        <Route path="/tutor/course/create-quiz" element={<LessonbasedQuizCreation />} />
        <Route path="/tutor/course/host" element={<HostCourse />} />
      </Route>
      {/* <Route path="/admin" element={<AdminAuthorization />}/> */}
      {/* <Route path="/learner" element={<LearnerAuthorization />}/> */}
      <Route path="/" element={<CheckLoginStatus />}>
        <Route path="/login" element={<AuthLayout />} />
        <Route path="/signup" element={<AuthLayout />} />
        <Route path="/tutor/signup" element={<AuthLayout />} />
        <Route path="/set-password" element={<AuthLayout />} />
        <Route path="/verify-email" element={<AuthLayout />} />
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Router