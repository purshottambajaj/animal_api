const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const animalRoutes = require('./routes/animalRoutes');


const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());

// Database connection
mongoose.connect(DATABASE_URL="mongodb://localhost:27017/animal-directory"
    , { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

// Routes
app.use('/animals', animalRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
