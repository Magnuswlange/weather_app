import { motion } from "motion/react";
import type { OneCallData } from "../schemas/weatherSchema";
import { childVariant, parentVariant } from "../animationUtils";
import WeatherIcon from "./WeatherIcon";
import Card from "./Card";
import { dayFmt } from "../utils";

type Props = {
  data: OneCallData;
};

export default function DailyWeather({ data }: Props) {
  return (
    <Card title="Daily Forecast" expand={true}>
      <motion.ul
        key={data?.daily?.[0]?.dt ?? "daily-loading"} // while fetching data from api sets key to loading, then once the api finishes fetching, the key will change and trigger child elements to re-render, causing the child elements to animate in.
        variants={parentVariant}
        initial="hidden"
        animate="visible"
      >
        <motion.li
          className="grid grid-cols-[1fr_1fr_1fr_1fr] font-semibold"
          variants={childVariant}
        >
          <span>Day</span>
          <span>Temperature</span>
          <span>Feels Like</span>
          <span>Weather</span>
        </motion.li>

        {data?.daily.map((day) => (
          <motion.li
            className="grid grid-cols-[1fr_1fr_1fr_1fr] items-center"
            key={day.dt}
            variants={childVariant}
          >
            <span>{dayFmt.format(new Date(day.dt * 1000))}</span>
            <span>{Math.round(day.temp.day)}°C</span>
            <span className="text-muted-foreground">
              {Math.round(day.feels_like.day)}°C
            </span>
            <motion.div variants={childVariant}>
              <WeatherIcon
                className="h-15 w-15"
                src={day.weather[0].icon}
                alt="Daily weather icon"
              />
            </motion.div>
          </motion.li>
        ))}
      </motion.ul>
    </Card>
  );
}
