
export const coffeeStore = async ( Query, LatLong, limit ) => {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.KEY,
    },
  };

  const response = await fetch(
    `https://api.foursquare.com/v3/places/search?query=${Query}&ll=${LatLong.replace(",","%2C")}&radius=1000&sort=DISTANCE&limit=${limit}&client_id=${process.env.FORSQUARE_CLIENT_ID}&client_secret=${process.env.FORSQUARE_CLIENT_SECRET}`,
    options
  );
  const data = await response.json();
  return await data.results;
}

export default coffeeStore