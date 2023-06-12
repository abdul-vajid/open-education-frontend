import React from "react";
import { Routes, Route, } from "react-router-dom";
// import NotFound from "./NotFound";
import Home from "../features/Public/Home";
import AuthLayout from "../features/Public/AuthLayout";
import TutorAuthorization from "./Authorization/TutorAuthorization";
import TutorOverView from "../features/users/Tutor/OverView";
import LearnerAuthorization from "./Authorization/LearnerAuthorization";
import OverView from "../features/users/Learner/OverView";
import Courses from "../features/users/Tutor/Courses";
import CourseDetails from "../features/users/Tutor/CourseDetails";
import CreateLesson from "../features/users/Tutor/CreateLesson";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthLayout />} />
      <Route path="/signup" element={<AuthLayout />} />
      <Route path="/tutor/signup" element={<AuthLayout />} />
      <Route path="/set-password" element={<AuthLayout />} />
      <Route path="/verify-email" element={<AuthLayout />} />
      {/* <Route path="/admin" element={<AdminAuthorization />}/> */}
      {/* <Route path="/learner" element={<LearnerAuthorization />}/> */}
      <Route path="/learner" element={<LearnerAuthorization />}>
        <Route path="/learner" element={<OverView />} />
      </Route>
      <Route path="/tutor" element={<TutorAuthorization />}>
        <Route path="/tutor" element={<TutorOverView />} />
        <Route path="/tutor/courses" element={<Courses />} />
        <Route path="/tutor/course/details/:id" element={<CourseDetails />} />
        <Route path="/tutor/course/create-lesson" element={<CreateLesson/>} />
      </Route>
      <Route path="/" element={<Home />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default Router