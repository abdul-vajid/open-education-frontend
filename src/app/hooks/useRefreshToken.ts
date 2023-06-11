import { refreshTokenApi } from "../api/authApi"; 
import { useAppDispatch } from "./storeHooks";
import { setAccessToken } from "../../features/users/Common/userSlice";

function useRefreshToken() {
  const dispatch = useAppDispatch()

  const refresh = async () => {
    const response = await refreshTokenApi();
    dispatch(setAccessToken(response.data?.data));
    return response.data?.data;
  };

  return refresh;
}

export default useRefreshToken;
