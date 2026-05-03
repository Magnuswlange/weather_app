import { motion } from "motion/react";
import type { OneCallData } from "../schemas/weatherSchema";
import WeatherIcon from "./WeatherIcon";
import Card from "./Card";
import { dayFmt } from "../utils/formatters";
import { parentVariant, childVariant } from "../utils/animations";

type Props = {
  data: OneCallData;
  className?: string;
};

export default function DailyWeather({ data, className = "" }: Props) {
  return (
    <Card title="Daily Forecast" className={className}>
      <div className="h-full overflow-y-auto overflow-x-hidden pr-4">
        <table className="w-full table-fixed text-sm">
          <thead className="sticky top-0 bg-primary hover:bg-secondary">
            <tr className="text-left">
              <th>Day</th>
              <th>Temperature</th>
              <th>Feels like</th>
              <th>Weather</th>
            </tr>
          </thead>
          <motion.tbody
            variants={parentVariant}
            initial="hidden"
            animate="visible"
          >
            {data?.daily.map((day) => (
              <motion.tr
                variants={childVariant}
                key={day.dt}
                className="border-t border-white/10"
              >
                <td className="tabular-nums">
                  {dayFmt.format(new Date(day.dt * 1000))}
                </td>
                <td className="tabular-nums">{Math.round(day.temp.day)}°C</td>
                <td className="text-muted-foreground tabular-nums">
                  {Math.round(day.feels_like.day)}°C
                </td>
                <WeatherIcon
                  className="inline-block h-8 w-8"
                  src={day.weather[0].icon}
                  alt="Daily weather icon"
                />
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
    </Card>
  );
}
