const express = require("express");
const dbConnect = require('./config/database')
const routes = require('./routes/blog')
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use('/api/v1', routes);

// Connect to MongoDB
dbConnect();

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
});

app.get('/', (req,res) => {
    res.send('Hello World!');
})