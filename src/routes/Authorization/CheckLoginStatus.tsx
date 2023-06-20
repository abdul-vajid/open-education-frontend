import React from "react";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/storeHooks";
import { constRoles } from "../../app/constants/BasicConstants";


const CheckLoginStatus: React.FC = () => {
    const { accessToken, role } = useAppSelector(state => state.user)
    const location = useLocation();

    return !accessToken ? (
        <Outlet />
    ) : accessToken && role === constRoles.tutor ? (
        <Navigate to="/tutor" state={{ from: location.pathname }
        } replace={true} />
    ) : accessToken && role === constRoles.admin ? (
        <Navigate to="/admin" state={{ from: location.pathname }
        } replace={true} />
    ) : (
        <Navigate to="/learner" state={{ from: location.pathname }
        } replace={true} />
    )
}

export default CheckLoginStatus;
