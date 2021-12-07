import routes from "./src-server/data/routes/userRoutes.js";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import RateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import { config } from "dotenv";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3003;

// Helmet Setup
app.use(helmet());

// Rate Limit Setup
const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minites
  max: 100, // limit # of requests per IP address
  delayMs: 0, // disable delays
});
app.use(limiter);

// Users Mongoose Connecion
//const userUri =
//  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000";
const userUri = "mongodb+srv://sumeet:vancouver123@cluster0.g9hsd.mongodb.net/PlantorDB?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(userUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// BodyParser Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// Serving static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(`Node and Express server running on port: ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
