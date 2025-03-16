const { default: axios } = require("axios");
const pool = require("../models/db");
const { change } = require("../models/storeModel");

// Create Store
const createStore = async (req, res) => {
  try {
    const { name, email, address, token } = req.body;
    const { data } = await axios.post("http://localhost:5000/api/auth/decode", { token });

    const owner_id = data.id;

    if (!name || !email || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [result] = await pool.query(
      "INSERT INTO stores (name, email, address, rating, owner_id) VALUES (?, ?, ?, ?, ?)",
      [name, email, address, 0, owner_id]
    );

    const sendArray = { id: result.insertId, name, email, address, rating: 0, owner_id }

    // console.log(result)

    res.status(201).json({ message: "Store added successfully", sendArray });
  } catch (error) {
    console.error("Error adding store:", error);
    res.json({ message: "Error registering store" });
  }
};

const changeRating = async (req, res) => {
  const { rating, store_id, token } = req.body


  const { data } = await axios.post("http://localhost:5000/api/auth/decode", { token });
  const user_id = data.id

  const finals = await change(rating, user_id, store_id)

  // console.log(finals)

  return res.json({ message: "Changed" })

}

// Get Stores
const getStores = async (req, res) => {
  try {
    const [stores] = await pool.query("SELECT * FROM stores");
    res.json(stores);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving stores" });
  }
};

const allUserStores = async (req, res) => {
  try {
    const { token, sName, sAddress } = req.body;

    const decodedRes = await axios.post("http://localhost:5000/api/auth/decode", { token });

    // Ensure we get a valid response
    if (!decodedRes.data || !decodedRes.data.id) {
      return res.status(401).json({ message: "Invalid token or user not found" });
    }

    const userId = decodedRes.data.id; // Extract user ID from the response



    let query =
      `
      SELECT s.id, s.name, s.email, s.address, s.rating AS s_rating, 
             r.rating AS u_rating, 2 AS defaults
      FROM stores AS s
      LEFT JOIN ratings AS r
      ON s.id = r.store_id AND r.user_id = ?
      WHERE s.name LIKE ? AND s.address LIKE ?
    `

    const [result] = await pool.query(
      query,
      [userId, `%${sName}%`, `%${sAddress}%`]
    );

    console.log(result)


    return res.json(result);
  } catch (error) {
    console.error("Error retrieving stores:", error);
    return res.status(500).json({ message: "Error retrieving stores" });
  }
};

const byStore = async (req, res) => {
  try {
    const { store_id } = req.body

    let query =
      `
    SELECT u.id, u.name AS u_name, u.email, r.rating FROM users AS u
    INNER JOIN ratings AS r 
    ON u.id = r.user_id
    WHERE store_id = ?
  `

    const [result] = await pool.query(query, [store_id]);

    return res.json({ rdata: result })
  }
  catch(err)
  {
    return res.json({message: "Error Rates"})
  }
}

// Get User Rating
const getUserRating = async (req, res) => {
  try {
    const { storeId, userId } = req.params;
    const [rows] = await pool.query("SELECT rating FROM ratings WHERE store_id = ? AND user_id = ?", [storeId, userId]);
    res.json(rows.length ? rows[0] : { rating: null });
  } catch (error) {
    res.status(500).json({ message: "Error fetching rating" });
  }
};

// Submit Rating
const submitRating = async (req, res) => {
  try {
    const { storeId } = req.params;
    const { userId, rating } = req.body;
    await pool.query("INSERT INTO ratings (store_id, user_id, rating) VALUES (?, ?, ?)", [storeId, userId, rating]);
    res.json({ message: "Rating submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting rating" });
  }
};

// Update Rating
const updateRating = async (req, res) => {
  try {
    const { storeId, userId } = req.params;
    const { rating } = req.body;
    await pool.query("UPDATE ratings SET rating = ? WHERE store_id = ? AND user_id = ?", [rating, storeId, userId]);
    res.json({ message: "Rating updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating rating" });
  }
};

const byOwner = async (req, res) => {
  const { token } = req.body

  const { data } = await axios.post("http://localhost:5000/api/auth/decode", { token });

  const store_owner_id = data.id

  let query =
    `
    SELECT * FROM stores
    WHERE owner_id = ?
  `

  const [resi] = await pool.query(query, [store_owner_id]);
  console.log(resi)

  return res.json({ stores: resi })

}

// Ensure all functions are exported
module.exports = { byStore, byOwner, createStore, getStores, changeRating, getUserRating, submitRating, updateRating, allUserStores };
