const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const rescueRoutes = require('./routes/rescueRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'strayhaven'
});

db.connect(err => {
    if (err) {
        console.error('MySQL connection error:', err);
    } else {
        console.log('MySQL connected');
    }
});

// Pass db to routes
app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use('/api/rescue', rescueRoutes);
app.use('/api/event', eventRoutes);

app.listen(5000, () => {
    console.log('Server running on port 5000');
});