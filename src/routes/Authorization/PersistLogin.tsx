import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../../app/hooks/useRefreshToken";
import { useAppSelector } from "../../app/hooks/storeHooks";

function PersistLogin() {
    const [loading, setLoading] = useState(true);
    const refresh = useRefreshToken();
    const accessToken = useAppSelector((state) => state.user.accessToken);

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } finally {
                setLoading(false);
            }
        };

        if (!accessToken) verifyRefreshToken();
        else setLoading(false);
    }, []);

    return loading ? (
        <div className="h-screen flex justify-center items-center">
            <div>
                <ImSpinner2 className="animate-spin w-11"></ImSpinner2>
            </div>
        </div>
    ) : (
        <Outlet />
    );
}

export default PersistLogin;