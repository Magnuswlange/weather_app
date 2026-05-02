import { useEffect, useState } from "react";
import CardContainer from "./components/CardContainer";
import type { OneCallData } from "./schemas/weatherSchema";
import CurrentWeather from "./components/CurrentWeather";
import DailyWeather from "./components/DailyWeather";
import HourlyWeather from "./components/HourlyWeather";
import GoogleMapsCard from "./components/GoogleMapsCard";
import { getUserCoords } from "./services/location";
import { getWeatherData } from "./services/weather";
import { loadWeatherData, saveWeatherData } from "./storage/weatherStorage";
import { shouldRefreshData } from "./utils/weather";

const initialData = loadWeatherData();

export default function App() {
  const [data, setData] = useState<OneCallData | null>(initialData);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const [lat, lon] = await getUserCoords();
        const freshData = await getWeatherData({ lat, lon });
        setData(freshData);
        saveWeatherData(freshData);
      } catch (e) {
        if (e instanceof Error) console.error(e.message);
        else console.error("Unknown error occured");
      }
    };

    if (shouldRefreshData(initialData)) fetchWeather();
  }, []);

  return (
    <main>
      <CardContainer>
        {data && <GoogleMapsCard lat={data.lat} lon={data.lon} />}
        {data && <CurrentWeather data={data} />}
        {data && <DailyWeather data={data} />}
        {data && <HourlyWeather data={data} />}
      </CardContainer>
    </main>
  );
}
