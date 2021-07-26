//this file connects DB and starts server
import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;
MongoClient.connect(
  process.env.RESTREVIEWS_DB_URI,
  { //options or setting when connecting
    poolSize: 50, //50 connections
    wtimeout: 2500,
    useUnifiedTopology: true
  }
)
.catch(err => { //using
  console.error(err.stack);
  process.exit(1);
})
.then(async client => { //this is a promise thus we use .then()
  await RestaurantsDAO.injectDB(client) //promise behavior: pauses until response
  await ReviewsDAO.injectDB(client)
  app.listen(port,()=> {
    console.log(`listening on port ${port}`)
  })
})
