import { OPENWEATHER_API_KEY } from "../config";
import { OneCallSchema, type OneCallData } from "../schemas/weatherSchema";

export const getWeatherData = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}): Promise<OneCallData> => {
  const url: string = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${OPENWEATHER_API_KEY}`;
  const res = await fetch(url);

  if (!res.ok) throw new Error(`Weather request failed: ${res.status}`);

  const parsedJson = await res.json();
  const result = OneCallSchema.safeParse(parsedJson);
  console.log(result);

  if (!result.success)
    throw new Error("Weather data failed OneCallData schema validation");

  return result.data;
};
