import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

import { useNavigate } from "react-router-dom";
import NewStore from "./NewStore";
import UserByStore from "./UserByStore";
import '../styles/StoreDashboard.css'

const StoreDashboard = () => {
    const [stores, setStores] = useState([])

    const [prev, setPrev] = useState("");
    const [newP, setNewP] = useState("");

    const [selectStoreId, setSelectStoreId] = useState(0);
    const [selectStoreName, setSelectStoreName] = useState("");


    const nav = useNavigate();

    const changePassword = async () => {
        let token = localStorage.getItem("token")

        const res = await axios.post("http://localhost:5000/api/auth/changePassword", { prev, newP, token })

        console.log(res.data)
    }


    useEffect(() => {
        const fetchData = async () => {
            let token = localStorage.getItem("token")
            await axios.post("http://localhost:5000/api/stores/byOwner", { token })
                .then((res) => {
                    setStores(res.data.stores)
                })
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
            if (data.role === 'admin')
                nav('/admin')
        });

        const getAllStores = async () => {

        }
        getAllStores()


    }, [nav]);

    const logout = () => {
        localStorage.removeItem('token')
        nav('/')
    }

    return (
        <>
            <div className="navbar">
            <h1 className="dashboard-heading">Store Owner Dashboard</h1>
            <button className="logout-btn" onClick={logout}>Logout</button>
            </div>

            <div className="update-password-card">
                <h3>Update Password</h3>
                <input type="password" placeholder="Previous Password"
                    value={prev} onChange={(e) => setPrev(e.target.value)} required />
                <input type="password" placeholder="New Password"
                    value={newP} onChange={(e) => setNewP(e.target.value)} required />
                <button className="submit-button" onClick={changePassword}>Submit</button>
            </div>

            <NewStore setStores={setStores} />

            <div className="stores-container">
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
                        {stores !== undefined && stores.length > 0 ? (
                            stores.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.owner_id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <>{item.rating}</>&nbsp;&nbsp;
                                        <button className="rating-button" onClick={() => {
                                            setSelectStoreId(item.id);
                                            setSelectStoreName(item.name)
                                        }}>
                                            See Ratings
                                        </button>
                                    </td>
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

            {selectStoreId !== 0 ? <UserByStore storeId={selectStoreId} storeName={selectStoreName} /> :
                <h4 className="ratings-info">Click Any Store to see User Ratings</h4>}
        </>
    );
};

export default StoreDashboard;
