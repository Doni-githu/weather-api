import axios from "axios";

export default async function (city) {
    const url = "https://api.openweathermap.org/data/2.5/weather"
    const data = await axios.get(url, {
        params: {
            q: city,
            appid: process.env.OPEN_WEATHER_API_KEY
        }
    })

    if (data.data.cod !== "200") {
        return {
            message: data.data.message,
            status: data.data.cod
        }
    }

    return {
        result: data.data.weather[0]
    }

}