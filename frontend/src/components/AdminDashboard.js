import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

import { useNavigate } from "react-router-dom";
import Register from "./Register";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
    const [data, setData] = useState({ users: 0, stores: 0, ratings: 0 });
    const [stores, setStores] = useState([])
    const [admins, setAdmins] = useState([])
    const [normal, setNormal] = useState([])
    const [storeOwner, setStoreOwner] = useState([])

    const nav = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get("http://localhost:5000/api/auth/stats");
            setData(res.data);
        };
        fetchData();

        const getLoad = async () => {
            let token = localStorage.getItem("token")
            if (token === null || token === undefined)
                nav("/login")
            const res = await axios.post("http://localhost:5000/api/auth/decode", { token });

            return res.data;
        }
        getLoad().then(data => {
            if (data.role === 'user')
                nav('/dashboard')
            if (data.role === 'store-owner')
                nav('/sown')
        });

        const getAllStores = async () => {
            const res = await axios.get("http://localhost:5000/api/stores/allStores");
            setStores(res.data)
        }
        getAllStores()

        const getAllAdmins = async () => {
            const res = await axios.get("http://localhost:5000/api/users/allAdmins");
            console.log(res.data)
            setAdmins(res.data)
        }
        getAllAdmins()

        const getAllNormalUsers = async () => {
            const res = await axios.get("http://localhost:5000/api/users/allNormal");
            console.log(res.data)
            setNormal(res.data)
        }
        getAllNormalUsers()

        const getAllStoreOwners = async () => {
            const res = await axios.get("http://localhost:5000/api/users/allStoreOwners");
            console.log(res.data)
            setStoreOwner(res.data)
        }
        getAllStoreOwners()

    }, [nav]);

    const logout = () => {
        localStorage.removeItem('token')
        nav('/')
    }

    return (
        <>
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <button onClick={logout}>Logout</button>
            </div>

            <div className="stats-container">
                <div className="stat-card users">
                    <h3>Total Users</h3>
                    <p>{data.users}</p>
                </div>
                <div className="stat-card stores">
                    <h3>Total Stores</h3>
                    <p>{data.stores}</p>
                </div>
                <div className="stat-card ratings">
                    <h3>Total Ratings</h3>
                    <p>{data.ratings}</p>
                </div>
            </div>


            <div>
                <h2>Add new User</h2>
                <Register />
            </div>

            <div>
                <h2>Stores Listing</h2>

                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Store Owner ID</th>
                            <th>Store Name</th>
                            <th>Store Address</th>
                            <th>Store Email</th>
                            <th>Store Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stores.length > 0 ? (
                            stores.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.owner_id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>{item.email}</td>
                                    <td>{item.rating}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-muted">
                                    No stores available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div>
                <h3>Admin Users</h3>
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    {admins.length > 0 ?
                        (
                            admins.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td>{item.role}</td>
                                </tr>
                            ))
                        ) :
                        <tr>
                            <td colSpan="5" className="text-center text-muted">
                                No Admins available
                            </td>
                        </tr>
                    }
                </table>
            </div>

            <div>
                <h3>Normal Users</h3>
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    {admins.length > 0 ?
                        (
                            normal.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td>{item.role}</td>
                                </tr>
                            ))
                        ) :
                        <tr>
                            <td colSpan="5" className="text-center text-muted">
                                No Normal Users available
                            </td>
                        </tr>
                    }
                </table>
            </div>

            <div>
                <h3>Store Owners</h3>
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Role</th>
                            <th>Store Name</th>
                            <th>Store Rating</th>
                        </tr>
                    </thead>
                    {admins.length > 0 ?
                        (
                            storeOwner.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td>{item.role}</td>
                                    <td>{item.s_name}</td>
                                    <td>{item.rating}</td>
                                </tr>
                            ))
                        ) :
                        <tr>
                            <td colSpan="5" className="text-center text-muted">
                                No Store Owners available
                            </td>
                        </tr>
                    }
                </table>
            </div>
        </>
    );
};

export default AdminDashboard;
