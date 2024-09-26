import express from "express";
import client from "./redis.js";
import cors from "cors";
import dotenv from "dotenv"
import expressRateLimit from "express-rate-limit"
import weatherController from "./controllers/weatherController.js";
dotenv.config()
const app = express();

app.use(express.json());
app.use(cors());
app.use(expressRateLimit({
    limit: 50,
    windowMs: 5 * 1000,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
}))

app.get("/api/weather", weatherController)

const startApp = () => {
    const port = process.env.PORT || 8000;
    client
        .connect()
        .then(() => console.log("Connected to redis!"))
        .catch((err) => console.log("Error Redis ", err))
    app.listen(port, () => {
        console.log(`Server running on port ${port}`)
    });
};

startApp();