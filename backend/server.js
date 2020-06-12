

const express = require('express');

const cors = require('cors');
// connect our server.js to mongodb database via mongoose
const mongoose = require('mongoose')

// this configures so that we can have our env variables in dotenv file
require('dotenv').config();

const app = express ();
const port = process.env.PORT || 5000;

//midlleware
app.use(cors());
app.use(express.json());


// database uri - where our databse is stored.
const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true});
// this line is to deal w the updates that mongoDB has in its tools. 

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDb database connection established successfully.')
})

//Router files
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users')

// whenever someone goes to root url plus adds a path of exercises, it will load everything in the exercisesRouter. 
// when someone goes to the root url + path users, it will load everything in the usersRouter

app.use('/exercises',exercisesRouter);
app.use('/users',usersRouter);
app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});
