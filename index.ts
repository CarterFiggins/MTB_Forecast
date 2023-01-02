import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import axios, { AxiosError } from "axios";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/weather", async (req: Request, res: Response) => {
  try {
    const ipResults = await axios.get("https://api.ipify.org/");
    const ip = ipResults.data;
    const locationResults = await axios.get(`http://ip-api.com/json/${ip}`);
    const { lat, lon } = locationResults.data;
    const weatherResults = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_KEY}`
    );

    res.json(weatherResults.data);
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      res.send(error.message);
    }

    throw error;
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
