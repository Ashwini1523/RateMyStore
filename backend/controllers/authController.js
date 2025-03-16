const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail, getAll, updatePassword } = require('../models/userModel');
const { default: axios } = require('axios');
require('dotenv').config();


const decode = async (req, res) => {
  let { token } = req.body;

  let decoded = jwt.decode(token)
  return res.json(decoded);
}

const register = async (req, res) => {
  const { name, email, password, address, role } = req.body;

  if (name.length < 20 || name.length > 60)
    return res.json({ message: "name-error" })

  if (address.length > 400)
    return res.json({ message: "address-error" })

  if (password.length < 8 || password.length > 16)
    return res.json({ message: "password-error" })

  let pattern = new RegExp(
    "^(?=.*[A-Z])"
  );

  if (!pattern.test(password))
    return res.json({ message: "password-error" })

  pattern = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  if (!pattern.test(password))
    return res.json({ message: "password-error" })

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await createUser(name, email, hashedPassword, address, role);
    return res.json(user);
  } catch (error) {
    return res.json({ message: 'Error registering user' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user)
      return res.json({ message: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, user });
  }
  catch (err) {
    return res.json({ message: "Error-Fetching User Data" })
  }
};

const changePassword = async (req, res) => {

  const { prev, newP, token } = req.body;

  const { data } = await axios.post("http://localhost:5000/api/auth/decode", { token });


  const user = await getUserByEmail(data.email);

  const validPassword = await bcrypt.compare(prev, user.password);

  if (!validPassword)
    return res.status(400).json({ message: 'Previous Password is Incorrect' });

  const hashedPassword = await bcrypt.hash(newP, 10);

  let result = updatePassword(hashedPassword, data.email)

  return res.json({ message: 'Password Changed' })

}

const getFullData = async (req, res) => {
  const { users, stores } = await getAll();

  res.json({ users: users.users, stores: stores.stores, ratings: 0 })
}

module.exports = { register, login, decode, getFullData, changePassword };
