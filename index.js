const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
const app = express();
const cors = require('cors');

dotenv.config({ path: './confing/.env' });

app.use(fileUpload());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors());
const PORT = 8000;

app.use('/uploads', express.static('uploads'));

app.use('/', require('./routes'));
app.use('/posts', require('./routes/posts'))

const CONNECTION_URI = "mongodb+srv://tnithin9640:21731a3547@cluster0.k2gfe2c.mongodb.net/"


mongoose.connect(CONNECTION_URI)
    .then(() => console.log("database connected"))
    .catch(err => console.log(err))

app.listen(PORT, () => {
    console.log(`server running on port: ${PORT}`);
})
