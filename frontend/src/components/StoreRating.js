import { useState, useEffect } from "react";
import axios from "axios";

const StoreRating = ({ storeId, userId }) => {
    const [rating, setRating] = useState(0);
    const [userRating, setUserRating] = useState(null);

    useEffect(() => {
        const fetchUserRating = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/stores/${storeId}/ratings/${userId}`);
                if (res.data.rating) {
                    setUserRating(res.data.rating);
                    setRating(res.data.rating);
                }
            } catch (error) {
                console.error("Error fetching user rating", error);
            }
        };
        fetchUserRating();
    }, [storeId, userId]);

    const handleRatingSubmit = async () => {
        try {
            const payload = { rating };
            if (userRating) {
                await axios.put(`http://localhost:5000/api/stores/${storeId}/ratings/${userId}`, payload);
            } else {
                await axios.post(`http://localhost:5000/api/stores/${storeId}/ratings`, { userId, rating });
            }
            alert("Rating submitted successfully!");
        } catch (error) {
            console.error("Error submitting rating", error);
        }
    };

    return (
        <div>
            <h3>Rate this Store</h3>
            {[1, 2, 3, 4, 5].map((num) => (
                <button key={num} onClick={() => setRating(num)} style={{ fontWeight: num === rating ? "bold" : "normal" }}>
                    {num} ⭐
                </button>
            ))}
            <button onClick={handleRatingSubmit}>Submit</button>
        </div>
    );
};

export default StoreRating;
