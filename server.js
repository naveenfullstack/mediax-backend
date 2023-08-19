const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

//Database

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI ,{
  useNewUrlParser: true,
  useUnifiedTopology: true ,
})
  .then( () => {
      console.log('Connected to the MongoDB database')
  })
  .catch( (err) => {
      console.error(`Error connecting to the database. n${err}`);
  })

//Middlewares

const ReqDomain = require ('./middlewares/ReqDomain')
app.use(ReqDomain);

//Routes

const TestData = require('./routes/TestData');
app.use('/testdata/', TestData);

const GetMovies = require('./routes/GetMovies');
app.use('/getmovies/', GetMovies);


const port = 3001;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });