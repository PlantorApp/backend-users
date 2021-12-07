import express from 'express'
import mongoose from 'mongoose'
import UserModel from './models/Users'
// import bodyParser from 'body-parser'
// import RateLimit from 'express-rate-limit'
// import helmet from 'helmet'
import cors from 'cors'
require("dotenv").config()

const app = express();
const PORT = process.env.PORT || 3003
app.use(cors())

/// DATABASE CONNECTION
mongoose.connect(
//  "mongodb+srv://users-admin:3CqZS2kaNf7hQRVU@cluster0.jblkf.mongodb.net/dimpledesk?retryWrites=true&w=majority",
"mongodb+srv://userColl:Vancouver123@cluster0.g9hsd.mongodb.net/PlantorDB?retryWrites=true&w=majority",
  { useNewUrlParser: true }
)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function() {
	console.log("connected successfully");
});

app.get("/users", async (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send("users are", result);
    }
  });
});

app.listen(PORT, () => {
  console.log("You are connected!");
});
