import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap

import { useNavigate } from "react-router-dom";

const UserByStore = ({ storeId, storeName }) => {

    const [userRates, setUserRates] = useState([]);

    useEffect(() => {

        const getCompleteData = async () => {
            await axios.post("http://localhost:5000/api/stores/byStore", { store_id: storeId })
                .then((res) => {
                    if (res.data.message === 'Error Rates')
                        console.log("Ayyayo");
                    else
                        setUserRates(res.data.rdata)
                })
        }

        getCompleteData()
    }, [storeId, storeName])

    return (
        <>
            <h3>User Ratings of {storeName}</h3>

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>User Name</th>
                        <th>User Mail</th>
                        <th>User Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {userRates !== undefined && userRates.length > 0 ? (
                        userRates.map((item) => (
                            <tr key={item.id}>
                                <td>{item.u_name}</td>
                                <td>{item.email}</td>
                                <td>{item.rating}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center text-muted">
                                No Ratings Given
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export default UserByStore;
