const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8008;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
DB_URL = "mongodb+srv://desh:deshan1998@cluster0.gcx9ahk.mongodb.net/"

mongoose.connect(DB_URL)
.then(()=>{
    console.log('Db Connected');
})
.catch((err)=>{
    console.log('Db connection error')
})

// Routes
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
