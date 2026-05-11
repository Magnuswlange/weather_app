import { OneCallSchema, type OneCallData } from "../schemas/weatherSchema";
const BASE_URL = import.meta.env.DEV
  ? "http://localhost:3000/api/weather"
  : "/api/weather";

export const getWeatherData = async ({
  lat,
  lon,
}: {
  lat: number;
  lon: number;
}): Promise<OneCallData> => {
  const url: string = `${BASE_URL}?lat=${lat}&lon=${lon}`;
  const res = await fetch(url);

  if (!res.ok) throw new Error(`Weather request failed: ${res.status}`);

  const parsedJson = await res.json();
  const result = OneCallSchema.safeParse(parsedJson);
  console.log(result);

  if (!result.success)
    throw new Error("Weather data failed OneCallData schema validation");

  return result.data;
};
