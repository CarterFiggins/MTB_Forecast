import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import axios, { AxiosError } from "axios";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/weather", async (req: Request, res: Response) => {
  try {
    const lat = 38.5733;
    const lon = -109.5498;
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
