import {ReactNode, useCallback, useContext, useEffect, useState} from "react";
import AuthContext from "./AuthContext";
import {useNavigate} from "react-router-dom";
import axios, {AxiosError} from "axios";

export default function AuthProvider({children}: { children: ReactNode }) {
    const nav = useNavigate();
    const [token, setToken] = useState(localStorage.getItem('jwt') ?? '');
    const [roles, setRoles] = useState<string[]>([]);
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (token) {
            const decoded = window.atob(token.split('.')[1]);
            const decodeJWT = JSON.parse(decoded);
            setUsername(decodeJWT.sub);
            setRoles(decodeJWT.roles)
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

    const defaultApiResponseChecks = useCallback((err: Error | AxiosError) => {
        if (axios.isAxiosError(err)) {
            // Access to config, request, and response
            if (err.response?.status === 403) {
                logout();
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
