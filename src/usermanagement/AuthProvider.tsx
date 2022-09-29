import {ReactNode, useCallback, useContext, useEffect, useState} from "react";
import AuthContext from "./AuthContext";
import {useNavigate} from "react-router-dom";
import axios, {AxiosError} from "axios";
import {MyError} from "../models";
import toast from "react-hot-toast";

export default function AuthProvider({children}: { children: ReactNode }) {
    const nav = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('jwt') ?? '');
    const [roles, setRoles] = useState<string[]>([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (token) {
            const decoded = window.atob(token.split('.')[1]);
            const decodeJWT = JSON.parse(decoded);
            setUsername(decodeJWT.username);
            setRoles(decodeJWT.roles)
            console.log(decodeJWT)
        }
    }, [token]);

    const logout = useCallback(() => {
        console.log("logout")
        localStorage.removeItem('jwt');
        setToken('');
        setRoles([]);
        setUsername('');
        nav("/login");
    }, [nav]);

    const login = (gotToken: string) => {
        localStorage.setItem('jwt', gotToken);
        setToken(gotToken);
    };

    function createToastFromMyError(err: MyError){
        let retString = err.message + "\n";
        for (const sm of err.subMessages){
            retString += "\n- " + sm
        }
        let duration = 3000 + retString.length * 30
        toast.error(retString, {duration: duration})
    }

    function isMyErrorResponse(err: AxiosError) {
        return err.response && err.response.data && (err.response.data as MyError).message && (err.response.data as MyError).subMessages
    }

    const defaultApiResponseChecks = useCallback((err: Error | AxiosError) => {
        if (axios.isAxiosError(err)) {
            // Access to config, request, and response
            if (err.response?.status === 403) {
                logout();
            }

            if(isMyErrorResponse(err)){
                    createToastFromMyError(err.response!.data as MyError)
            }
        } else {
            console.log("is stock err");
            // Just a stock error
        }
    }, [logout])


    return <AuthContext.Provider
        value={
            {
                username,
                roles,
                logout,
                login,
                defaultApiResponseChecks
            }
        }
    >{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
