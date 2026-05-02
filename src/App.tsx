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
      // getUserCoords return a promise that will be resolved to a number[].
      const getUserCoords = async (): Promise<number[]> => {
        return new Promise((resolve, reject) => {
          window.navigator.geolocation.getCurrentPosition(
            // success callback
            (position) => {
              resolve([position.coords.latitude, position.coords.longitude]);
            },
            // error callback
            (error) => {
              reject(error);
            },
            // options object
            {
              enableHighAccuracy: true,
            },
          );
        });
      };

      try {
        const coords: number[] = await getUserCoords();
        const [lat, lon] = coords;
        console.log(coords);

        const data = await getWeatherData({ lat: lat, lon: lon });
        setData(data);
      } catch (e) {
        if (e instanceof Error) console.error(e.message);
        console.error("Unknown error occured");
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
