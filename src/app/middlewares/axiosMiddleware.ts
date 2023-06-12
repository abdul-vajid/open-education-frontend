import { Middleware } from 'redux';
import { AxiosInstance } from 'axios';

const axiosMiddleware = (axiosInstance: AxiosInstance): Middleware => {
    return ({ dispatch }) => (next) => (action) => {
        if (typeof action === 'function') {
            return (action as any)(dispatch, axiosInstance);
        }
        return next(action);
    };
};

export default axiosMiddleware;
