import { TOAST_CONFIG } from "../util/constants";
import { toast } from "react-toastify";
export const logoutUser = (setToken, setUser, setLoader) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setLoader(true);
    setTimeout(() => {
        setLoader(false);
        toast.info(`Logged out`, TOAST_CONFIG);
    }, 300);
};