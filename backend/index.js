require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const booksRoutes = require('./routes/books');
const myBooksRoutes = require('./routes/mybooks');

const app = express();
connectDB();
console.log("SERVER STARTING - CLIENT_URL:", process.env.CLIENT_URL);


app.use(express.json());
app.use(cookieParser()); 

// Define the list of allowed origins for your project
const allowedOrigins = [
  process.env.CLIENT_URL,      // Your Vercel frontend URL
  'http://localhost:3000',     // Your local dev server (if using Create React App)
  'http://localhost:5173',     // Your local dev server (if using Vite)
  // Add any other local ports you might use
];

app.use(cors({
  origin: function (origin, callback) {
    // Check if the incoming origin is in our allowed list
    // or if there's no origin (like a request from Postman)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // This is essential for cookies
}));


app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/mybooks', myBooksRoutes);

app.get('/', (req, res) => res.send('API running'));

app.listen(process.env.PORT || 5000, () => console.log('Server Started'));