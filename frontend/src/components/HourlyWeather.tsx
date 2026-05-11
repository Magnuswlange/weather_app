import Card from "./Card";
import type { OneCallData } from "../schemas/weatherSchema";
import { motion } from "motion/react";
import WeatherIcon from "./WeatherIcon";
import { timeFmt } from "../utils/formatters";
import { parentVariant, childVariant } from "../utils/animations";

type Props = {
  data: OneCallData;
  className?: string;
};

export default function HourlyWeather({ data, className = "" }: Props) {
  return (
    <Card title="Hourly Forecast (48h)" className={className}>
      <div className="flex gap-4 overflow-x-auto overflow-y-hidden h-full pb-4">
        {data?.hourly.map((hour) => (
          <motion.ul
            key={hour.dt}
            className="flex flex-col items-center"
            initial="hidden"
            animate="visible"
            variants={parentVariant}
          >
            <motion.li
              variants={childVariant}
              className="text-muted-foreground"
            >
              {timeFmt.format(new Date(hour.dt * 1000))}
            </motion.li>
            <motion.li variants={childVariant}>
              <WeatherIcon
                src={hour.weather[0].icon}
                alt="Hourly weather icon"
                className="h-full w-full"
              />
            </motion.li>
            <motion.li variants={childVariant}>
              {Math.round(hour.temp)}°C
            </motion.li>
            <motion.li
              variants={childVariant}
              className="text-muted-foreground"
            >
              {Math.round(hour.feels_like)}°C
            </motion.li>
          </motion.ul>
        ))}
      </div>
    </Card>
  );
}
