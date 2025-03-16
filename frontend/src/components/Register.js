import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "", address: "", role: "user" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/auth/register", formData)
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
                else
                    console.log(res.data)
            })

    };

    useEffect(() => {

        const getLoad = async () => {
            let token = localStorage.getItem("token")

            if (token === undefined || token === null)
                navigate('/register')

            const res = await axios.post("http://localhost:5000/api/auth/decode", { token });

            return res.data;
        }

        getLoad().then((data) => {
            if (data !== null) {
                if (data.role === 'admin')
                    navigate('/admin')
                else if (data.role === 'user')
                    navigate('/dashboard')
            }
        })


    }, [navigate]);

    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <input type="text" name="address" placeholder="Address" onChange={handleChange} required />
                    <select name="role" onChange={handleChange}>
                        <option value="user">User</option>
                        <option value="store-owner">Store Owner</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit">Register</button>
                </form>
                <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
                <ToastContainer />
            </div>
        </div>
    );
};

export default Register;
