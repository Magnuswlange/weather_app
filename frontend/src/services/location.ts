// getUserCoords return a promise that will be resolved to a number[].
export const getUserCoords = async (): Promise<number[]> => {
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
