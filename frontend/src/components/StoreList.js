import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import '../styles/Dashboard.css'

const StoreList = () => {
    const [stores, setStores] = useState([]);

    const [sName, setSName] = useState("")
    const [sAddress, setSAddress] = useState("")


    const fetchStoresByCondition = async () => {
        let token = localStorage.getItem("token")
        const res = await axios.post("http://localhost:5000/api/stores/allUserStores", { token, sName, sAddress });
        setStores(res.data);
    };

    const fetchStores = async () => {
        let token = localStorage.getItem("token")
        const res = await axios.post("http://localhost:5000/api/stores/allUserStores", { token, sName, sAddress });
        setStores(res.data);
    };

    useEffect(() => {
        const fetchStores = async () => {
            let token = localStorage.getItem("token")
            const res = await axios.post("http://localhost:5000/api/stores/allUserStores", { token, sName, sAddress });
            setStores(res.data);
        };
        fetchStores();
    }, [sName, sAddress]);

    const changeRating = async (index, item) => {
        let token = localStorage.getItem("token")

        // console.log(s_id + " " + value)
        await axios.post("http://localhost:5000/api/stores/changeRating", { rating: item.defaults, store_id: item.id, token })
            .then((res) => {
                console.log(res.data)
                fetchStores();
            })
            .catch((err) => {
                console.log(err)
            })

    }

    const getList = async (event) => {
        setSName(event.target.value);

        fetchStoresByCondition()
    }

    const getList2 = async (event) => {
        setSAddress(event.target.value);

        fetchStoresByCondition()
    }

    return (
        <div>
            <h2>Store List</h2>

            <div class="search-container">
                <input placeholder="Search By Name" value={sName} onChange={(event) => getList(event)} />
                <input placeholder="Search By Address" value={sAddress} onChange={(event) => getList2(event)} />
    
            </div>
            <div class="table-container">
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Store Name</th>
                            <th scope="col">Store Email</th>
                            <th scope="col">Store Address</th>
                            <th scope="col">Store Rating</th>
                            <th scope="col">Your Rating</th>
                            <th scope="col">Rate the Store</th>
                        </tr>
                    </thead>
                    {stores.length > 0 &&
                        (
                            stores.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.address}</td>
                                    <td>{item.s_rating}</td>
                                    <td>{item.u_rating === null ? "Not Rated" : item.u_rating}</td>
                                    <td>
                                        <Box sx={{ '& > legend': { mt: 2 } }}>
                                            <Rating
                                                name="simple-controlled"
                                                value={item.defaults}
                                                onChange={(event, newValue) => {
                                                    const updatedStores = [...stores];
                                                    updatedStores[index].defaults = newValue;  // Update the value correctly
                                                    setStores(updatedStores);
                                                }}
                                            />
                                        </Box>
    
                                        <button onClick={() => changeRating(index, item)}
                                            style={{ borderStyle: "solid", backgroundColor: "grey" }}>Submit Rating</button>
                                    </td>
                                </tr>
                            ))
                        )
                    }
                </table>
            </div>
        </div >
    );
};

export default StoreList;
