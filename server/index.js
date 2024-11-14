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

app.use((error, req, res, next) => {
    const message = error.message || 'Server error';
    const statusCode = error.statusCode || 500
    res.status(statusCode).json({message: message})
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
