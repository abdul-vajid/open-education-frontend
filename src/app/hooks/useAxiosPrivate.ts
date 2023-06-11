import { useEffect } from "react";
import { axiosPrivate } from "../config/apiConfig";
import useRefreshToken from "./useRefreshToken";
import { useAppSelector } from "./storeHooks";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const auth = useAppSelector(state => state.user)

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config: any) => {
                console.log(config)
                if (!config.headers.Authorization) {
                    config.headers.Authorization = `Bearer ${auth?.accessToken}`;
                }
                return config;
            },
            (err: any) => Promise.reject(err)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response: any) => response,
            async (error: any) => {
                console.log("error inside axios intreceptor", error)
                const prvsRequest = error?.config;
                if (error?.response?.status === 403 && !prvsRequest?.sent) {
                    console.log("inside axios intreceptor if")
                    prvsRequest.sent = true;
                    const { accessToken } = await refresh();
                    console.log("axios token inside axios intreceptor if", error)
                    prvsRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return axiosPrivate(prvsRequest);
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;
