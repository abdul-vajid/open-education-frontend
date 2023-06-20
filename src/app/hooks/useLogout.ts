import { clearLoggedUserData } from "../../features/users/Common/userSlice";
import { clearAllCourses } from "../../features/users/Tutor/tutorCoursesSlice";
import { logoutApi } from "../api/authApi";
import { useAppDispatch } from "./storeHooks";

function useLogout() {
  const dispatch = useAppDispatch()

  const logout = () => {
    dispatch(clearLoggedUserData());
    dispatch(clearAllCourses())
    logoutApi();
  };

  return logout;
}

export default useLogout;
