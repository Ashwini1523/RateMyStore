const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const storeRoutes = require('./routes/storeRoutes');
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log("DB_HOST:", process.env.DB_HOST); // Debugging output
    console.log("DB_PORT:", process.env.DB_PORT);
    console.log("DB_USER:", process.env.DB_USER);
    console.log("DB_PASS:", process.env.DB_PASSWORD);
    console.log("DB_NAME:", process.env.DB_NAME);
});
