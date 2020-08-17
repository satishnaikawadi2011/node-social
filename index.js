require('dotenv').config();

const express = require('express');
const connectDB = require('./db/db');
const cors = require('cors');
const HttpError = require('./models/http-error');
const userRoutes = require('./routes/user');
const screamRoutes = require('./routes/scream');
// /Users/satish/mongodb/bin/mongod.exe  --dbpath=/users/satish/mongodb-data
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.use('/api/user', userRoutes);
app.use('/api/scream', screamRoutes);

// middleware for route request which doesn't exist
app.use((req, res, next) => {
	const error = new HttpError('Could not find this route', 404);
	throw error;
});

// error handling midleware
app.use((err, req, res, next) => {
	if (res.headerSent) {
		return next(err);
	}
	res.status(err.code || 500);
	res.json({ message: err.message || 'An unknown error occurred' });
});

// Serve static assets in production

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
