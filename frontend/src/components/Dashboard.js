import { useContext, useEffect, useState } from "react";
// import AuthContext from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StoreList from "./StoreList";
import "../styles/Dashboard.css";


const Dashboard = () => {
    // const { user, logout } = useContext(AuthContext);

    const [prev, setPrev] = useState("");
    const [newP, setNewP] = useState("");

    const nav = useNavigate();

    const changePassword = async () => {
        let token = localStorage.getItem("token")

        const res = await axios.post("http://localhost:5000/api/auth/changePassword", { prev, newP, token })

        console.log(res.data)
    }

    const logout = () => {
        localStorage.removeItem('token')
        nav('/')
    }

    useEffect(() => {
        const getLoad = async () => {
            let token = localStorage.getItem("token")
            // console.log(token);
            if (token === null || token === undefined)
                nav("/login")
            const res = await axios.post("http://localhost:5000/api/auth/decode", { token });

            return res;
        }
        getLoad().then(data => {
            if (data.role === 'admin')
                nav('/admin')
            if (data.role === 'store-owner')
                nav('/sown')
        });
    })

    return (
        <>
            <div className="dashboard-container">
            <div className="dashboard-header">
                    <h1 className="dashboard-title">Dashboard</h1>
                    <button className="logout-button" onClick={logout}>Logout</button>
                </div>

                <div className="password-card">
                    <h2>Update Password</h2>
                    <input
                        type="password"
                        className="password-input"
                        placeholder="Previous Password"
                        value={prev}
                        onChange={(e) => setPrev(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="password-input"
                        placeholder="New Password"
                        value={newP}
                        onChange={(e) => setNewP(e.target.value)}
                        required
                    />
                    <button className="password-submit" onClick={changePassword}>Submit</button>
                </div>

                {/* Store List */}
                <div className="store-list-container">
                    <StoreList />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
