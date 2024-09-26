import axios from "axios";
import client from "../redis.js";
import weather from "../service/weather.js";

export default async function (req, res) {
    const { city } = req.query
    const cache = await client.get("weathers")
    if(cache){
        const response = JSON.parse(cache)
        res.status(200).json(response)
        return
    }
    const data = await weather(city)
    if(data.message && data.status){
        return res.status(parseInt(data.status)).json({message: data.message})
    }
    await client.set("weathers", JSON.stringify(data.result), "EX", 60 * 60 * 4)
    res.status(200).json(data)
}