import Card from "./Card";
import { motion } from "motion/react";
import type { OneCallData } from "../schemas/weatherSchema";
import WeatherIcon from "./WeatherIcon";
import { timeFmt } from "../utils/formatters";
import { parentVariant, childVariant } from "../utils/animations";

type Props = {
  data: OneCallData;
  className?: string;
};

export default function CurrentWeather({ data, className = "" }: Props) {
  return (
    <Card title="Current Weather" className={className}>
      <div className="overflow-y-auto overflow-x-hidden h-full pr-4">
        <motion.ul
          variants={parentVariant}
          // needs initial and animate to work
          initial="hidden"
          animate="visible"
        >
          <motion.li variants={childVariant}>
            <WeatherIcon
              src={data?.current.weather?.[0]?.icon ?? ""}
              alt="Current weather icon"
              className="h-25 w-25"
            />
          </motion.li>
          <motion.li
            className="flex flex-row justify-between"
            variants={childVariant}
          >
            Last update:{" "}
            <span>{timeFmt.format(new Date(data?.current.dt * 1000))}</span>
          </motion.li>
          <motion.li
            className="flex flex-row justify-between"
            variants={childVariant}
          >
            Current temperature: <span>{Math.round(data?.current.temp)}°C</span>
          </motion.li>
          <motion.li
            className="flex flex-row justify-between"
            variants={childVariant}
          >
            Feels like: <span>{Math.round(data?.current.feels_like)}°C</span>
          </motion.li>
          <motion.li
            className="flex flex-row justify-between"
            variants={childVariant}
          >
            Max temperature:{" "}
            <span>{Math.round(data?.daily[0].temp.max)}°C</span>
          </motion.li>
          <motion.li
            className="flex flex-row justify-between"
            variants={childVariant}
          >
            Min temperature:{" "}
            <span>{Math.round(data?.daily[0].temp.min)}°C</span>
          </motion.li>
          <motion.li
            className="flex flex-row justify-between"
            variants={childVariant}
          >
            UV index: <span>{data.current.uvi.toFixed(1)}</span>
          </motion.li>

          <motion.li
            className="flex flex-row justify-between"
            variants={childVariant}
          >
            Sunrise:{" "}
            <span>{timeFmt.format(new Date(data.current.sunrise * 1000))}</span>
          </motion.li>
          <motion.li
            className="flex flex-row justify-between"
            variants={childVariant}
          >
            Sunset:{" "}
            <span>{timeFmt.format(new Date(data.current.sunset * 1000))}</span>
          </motion.li>

          <motion.li
            className="flex flex-row justify-between"
            variants={childVariant}
          >
            Wind speed: <span>{data?.current.wind_speed.toFixed(1)} m/s</span>
          </motion.li>
        </motion.ul>
      </div>
    </Card>
  );
}
