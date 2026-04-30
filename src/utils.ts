import { OneCallSchema, type OneCallData } from "./schemas/weatherSchema";

export const getWeatherData = async ({
  lon,
  lat,
}: {
  lon: number;
  lat: number;
}): Promise<OneCallData> => {
  const url: string = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${import.meta.env.OPENWEATHER_API_KEY}`;
  const res = await fetch(url);

  if (!res.ok) throw new Error(`Weather request failed: ${res.status}`);

  const parsedJson = await res.json();
  const result = OneCallSchema.safeParse(parsedJson);

  if (!result.success)
    throw new Error("Weather data failed OneCallData schema validation");

  return result.data;
};

export const saveWeatherData = (data: OneCallData): void => {
  const result = OneCallSchema.safeParse(data);
  if (!result.success) return;

  localStorage.setItem("weatherData", JSON.stringify(result.data));
};

export const loadWeatherData = (): OneCallData | null => {
  const stored: string | null = localStorage.getItem("weatherData");
  if (!stored) return null;

  // try catch block because JSON.parse() can fail at runtime (SyntaxError) if the stored data is malformed
  try {
    const parsedJson = JSON.parse(stored);
    const result = OneCallSchema.safeParse(parsedJson);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
};

export const timeFmt = new Intl.DateTimeFormat("da-DK", {
  hour: "2-digit",
  minute: "2-digit",
});

export const dayFmt = new Intl.DateTimeFormat("da-DK", {
  weekday: "short",
});
