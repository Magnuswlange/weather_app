import { REFRESH_INTERVAL } from "../config";
import type { OneCallData } from "../schemas/weatherSchema";

export const shouldRefreshData = (data: OneCallData | null) => {
  if (!data) return true;

  const lastUpdate = data.current.dt * 1000;
  const msSinceLastUpdate = Date.now() - lastUpdate;
  console.log(
    "Minutes since update: ",
    (msSinceLastUpdate / 1000 / 60).toFixed(1),
  );

  if (msSinceLastUpdate > REFRESH_INTERVAL) {
    console.log("time to update... fetching data");
    return true;
  } else return false;
};
