import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "../styles/Login.css";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    useEffect(() => {

        const getLoad = async () => {
            let token = localStorage.getItem("token")

            if (token === undefined || token === null)
                navigate('/login')

            const res = await axios.post("http://localhost:5000/api/auth/decode", { token });

            return res.data;
        }

        getLoad().then((data) => {
            if (data !== null) {
                if (data.role === 'admin')
                    navigate('/admin')
                else
                    navigate('/dashboard')
            }
        })


    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();

        await axios.post("http://localhost:5000/api/auth/login", { email, password })
            .then((res) => {
                if (res.data.message !== null && res.data.message !== undefined) {
                    toast.warn(`${res.data.message}`, {
                        position: 'top-right',
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        style:
                        {
                            fontFamily: "'Noto Sans', sans-serif",
                        },
                    });
                }
                else {

                    let a = res.data.user.role;

                    localStorage.setItem("token", res.data.token)
                    // console.log(a)
                    if (a === null)
                        navigate("/")

                    if (a === "user") {
                        navigate("/dashboard")
                    }
                    else
                        navigate("/admin");
                }
            })

    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit">Login</button>
                </form>
                <button className="register-btn" onClick={() => navigate('/register')}>Register</button>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Login;
