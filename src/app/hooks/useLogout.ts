import { clearLoggedUserData } from "../../features/users/Common/userSlice";
import { logoutApi } from "../api/authApi";
import { useAppDispatch } from "./storeHooks";

function useLogout() {
  const dispatch = useAppDispatch()

  const logout = () => {
    dispatch(clearLoggedUserData());
    logoutApi();
  };

  return logout;
}

export default useLogout;
