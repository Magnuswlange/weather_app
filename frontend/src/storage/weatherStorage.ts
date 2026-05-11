import { OneCallSchema, type OneCallData } from "../schemas/weatherSchema";

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
