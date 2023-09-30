// install dotenv, express, morgan, bcrypt,jsonwebtoken, joi, lodash, cors

//Connect MongoBB

// Run Server

const dotenv = require('dotenv')
dotenv.config();

const app = require('./app')

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL_ATLAS, {
      useNewURLParser: true,
})
      .then(() => console.log("Connected to MongoDB"))
      .catch(err => console.log(err))

const port = process.env.PORT || 3001;

app.listen(port, () => {
      console.log("Listening to port ", port)
})

