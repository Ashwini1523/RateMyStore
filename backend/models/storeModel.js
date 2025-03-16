const pool = require("./db");

const addStore = async (name, email, address, rating) => {
  const query = `INSERT INTO stores (name, email, address, rating) VALUES (?, ?, ?, ?)`;
  const [result] = await pool.query(query, [name, email, address, rating]);
  return { id: result.insertId, name, email, address, rating };
};

const getAllStores = async () => {
  const query = `SELECT * FROM stores`;
  const [rows] = await pool.query(query);
  return rows;
};

const change = async (rate, u_id, s_id) => {

  // console.log(rate)
  let query = `
    SELECT * FROM ratings WHERE user_id = ? AND store_id = ?
  `

  let [rows] = await pool.query(query, [u_id, s_id])

  if (rows.length == 0) {
    let q = `INSERT INTO ratings (store_id, user_id, rating) VALUES (?, ?, ?)`
    let [fr] = await pool.query(q, [s_id, u_id, rate])

    // console.log(fr)
  }


  query = `
    UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?
  `
  let [result] = await pool.query(query, [rate, u_id, s_id])
  // console.log(result)

  query = `
    SELECT AVG(rating) AS avg_rate FROM ratings WHERE store_id = ?
  `

  let [upRating] = await pool.query(query, [s_id])

  query = `
    UPDATE stores SET rating = ? WHERE id = ?
  `

  let [done] = await pool.query(query, [upRating[0].avg_rate, s_id])

  return done;
}

// const getAll = async () => {
//   const query = `SELECT COUNT(*) AS 'stores' FROM stores`;
//   const [rows] = await pool.query(query); 

//   console.log(rows)

//   return rows.length ? rows[0] : null;
// }

module.exports = { addStore, getAllStores, change };
