const pool = require("./db");

const createUser = async (name, email, password, address, role) => {

  let check = await getUserByEmail(email)

  if (check !== null)
    return result.json({ message: "email-exists" });


  const query = `INSERT INTO users (name, email, password, address, role) VALUES (?, ?, ?, ?, ?)`;
  const [result] = await pool.query(query, [name, email, password, address, role]);
  return { id: result.insertId, name, email, address, role };
};

const getUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  const [rows] = await pool.query(query, [email]);
  return rows.length ? rows[0] : null;
};

const getAll = async () => {
  let query = `SELECT COUNT(*) AS 'users' FROM users`;
  let [rows] = await pool.query(query);

  let users = rows.length ? rows[0] : null;

  query = `SELECT COUNT(*) AS 'stores' FROM stores`;
  [rows] = await pool.query(query);

  let stores = rows.length ? rows[0] : null;

  return { users, stores }

}

const updatePassword = async (hashed, email) => {
  const [result] = await pool.query("UPDATE users SET password = ? WHERE email = ?", [hashed, email])

  return result
}


module.exports = { createUser, getUserByEmail, getAll, updatePassword };
