const express = require('express');
const cors = require('cors');
require('dotenv').config();  // Load environment variables
const { connectDB } = require('./config/db');  // Import the connectDB function
const userRoutes = require('./routes/user');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use('/user', userRoutes);

// Connect to MongoDB
connectDB();

// Define the port with a fallback
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
