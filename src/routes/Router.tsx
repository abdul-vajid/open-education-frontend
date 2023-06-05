import React from "react";
import { Routes, Route, } from "react-router-dom";
// import NotFound from "./NotFound";
import Home from "../features/Public/Home";
import AuthLayout from "../features/Public/AuthLayout";
import TutorAuthorization from "./Authorization/TutorAuthorization";
import TutorOverView from "../features/users/Tutor/OverView";
import LearnerAuthorization from "./Authorization/LearnerAuthorization";
import OverView from "../features/users/Learner/OverView";

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
      </Route>
      <Route path="/" element={<Home />} />
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  )
}

export default Router