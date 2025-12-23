const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});