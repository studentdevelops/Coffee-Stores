import { createApi } from 'unsplash-js';

const CoffeeStorePhotos = async (query = "Coffee Shops") => {
  const unsplashApi = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY
  });
  const photos = await unsplashApi.search.getPhotos({
    query: query,
    perPage: 9,
    page: 1
  })
  const photoUrl = photos.response.results.map(results => results.urls["regular"])
  return photoUrl
}

export const coffeeStore = async (Query, LatLong, limit) => {
  const photoUrl = await CoffeeStorePhotos()
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.KEY,
    },
  };

  const response = await fetch(
    `https://api.foursquare.com/v3/places/search?query=${Query}&ll=${LatLong.replace(",", "%2C")}&radius=1000&sort=DISTANCE&limit=${limit}&client_id=${process.env.FORSQUARE_CLIENT_ID}&client_secret=${process.env.FORSQUARE_CLIENT_SECRET}`,
    options
  );
  const data = await response.json();
  return data.results.map((response, i) => {
    console.log(response.location)
    return ({
      name: response.name,
      id: response.fsq_id,
      address: response.location.address + response.location.cross_street ,
      neighborhood: response.location.neighborhood || "",
      imgUrl: photoUrl[i]
    })
  })


};

export default coffeeStore