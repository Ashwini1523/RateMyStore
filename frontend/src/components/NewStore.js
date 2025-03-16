import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../styles/StoreDashboard.css'
const NewStore = ({ setStores }) => {
    const [formData, setFormData] = useState({ name: "", email: "", address: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleStore = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/stores/addStore", {
            name: formData.name, email: formData.email,
            address: formData.address, token: localStorage.getItem("token")
        })
            .then((res) => {
                if (res.data.message === 'Error registering store')
                    console.log("Ayyayo")
                else
                    setStores((prevStores) => {
                        let upd = [...prevStores]
                        upd.push(res.data.sendArray)

                        return upd;
                    })
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
        <div className="new-store-container">
            <h2 className="new-store-heading">New Store</h2>
            <form className="new-store-form" onSubmit={handleStore}>
                <input type="text" name="name" placeholder="Store Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Store Email" onChange={handleChange} required />
                <input type="text" name="address" placeholder="Store Address" onChange={handleChange} required />

                <button className="new-store-btn" type="submit">Register Store</button>
            </form>
        </div>
    );
};

export default NewStore;
