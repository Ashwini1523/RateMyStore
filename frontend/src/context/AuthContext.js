import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    }, [token]);

    const login = async (email, password) => {
        const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
        if (res.data.message !== "Invalid Credentials") {
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);

            console.log(res.data);

            return res.data.user.role;
        }

        return null;
    };

    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
