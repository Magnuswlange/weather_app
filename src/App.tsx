import { useEffect, useState } from "react";
import { getWeatherData } from "./utils";
import CardContainer from "./components/CardContainer";
import type { OneCallData } from "./schemas/weatherSchema";
import { saveWeatherData, loadWeatherData } from "./utils";
import CurrentWeather from "./components/CurrentWeather";
import DailyWeather from "./components/DailyWeather";
import HourlyWeather from "./components/HourlyWeather";

export default function App() {
  const [data, setData] = useState<OneCallData | null>(() => {
    // initially set data to what's stored in localStorage
    console.log("Initial useState: loading localStorage weatherData...");
    const storedData = loadWeatherData();
    return storedData;
  });

  // initially check if data is empty or more than 10 min old and fetch new data
  useEffect(() => {
    console.log("Running useEffect");

    const fetchWeatherData = async () => {
      try {
        const data = await getWeatherData({ lon: 10.38831, lat: 55.39594 });
        setData(data);
      } catch (e) {
        console.error(e);
      }
    };

    // if no locally stored data, fetch data
    if (!data) {
      console.log("no stored data... fetching data");
      fetchWeatherData();
      return;
    }

    // if more than 10 min since last update, fetch data
    const lastUpdate = data.current.dt * 1000;
    const refreshInterval = 1000 * 60 * 10; // 10 min
    const msSinceLastUpdate = Date.now() - lastUpdate;
    console.log(
      "Minutes since update: ",
      (msSinceLastUpdate / 1000 / 60).toFixed(1),
    );

    if (msSinceLastUpdate > refreshInterval) {
      console.log("time to update... fetching data");
      fetchWeatherData();
      return;
    }
  });

  // when data updates, save to localStorage
  useEffect(() => {
    if (!data) return;
    saveWeatherData(data);
  }, [data]);

  return (
    <main>
      <CardContainer>
        {data && <CurrentWeather data={data} />}
        {data && <DailyWeather data={data} />}
        {data && <HourlyWeather data={data} />}
      </CardContainer>
    </main>
  );
}
