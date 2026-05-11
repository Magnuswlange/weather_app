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
        {data && (
          <CurrentWeather
            className="col-span-1 row-span-1 md:row-span-2"
            data={data}
          />
        )}
        {data && (
          <GoogleMapsCard
            className="col-span-1 row-span-1"
            lat={data.lat}
            lon={data.lon}
          />
        )}
        {data && (
          <GoogleMapsCard
            className="col-span-1 row-span-1"
            lat={data.lat}
            lon={data.lon}
          />
        )}
        {data && (
          <DailyWeather
            data={data}
            className="row-span-1 col-span-1 md:col-span-2"
          />
        )}
        {data && (
          <HourlyWeather
            className="row-span-1 col-span-1 md:col-span-2"
            data={data}
          />
        )}
        {data && (
          <GoogleMapsCard
            className="col-span-1 row-span-1"
            lat={data.lat}
            lon={data.lon}
          />
        )}
      </CardContainer>
    </main>
  );
}
