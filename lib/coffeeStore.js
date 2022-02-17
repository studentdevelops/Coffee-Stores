import { createApi } from 'unsplash-js';

const CoffeeStorePhotos = async (limit) => {
  const query = "Coffee Shops";
  const unsplashApi = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY
  });
  const photos = await unsplashApi.search.getPhotos({
    query: query,
    perPage: limit,
    page: 1
  })
  const photoUrl = photos.response.results.map(results => results.urls["regular"])
  return photoUrl
}

export const coffeeStore = async (LatLong="18.53,73.83", limit=9) => {
  const Query = "Coffee";
  const photoUrl = await CoffeeStorePhotos(limit)
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_KEY,
    },
  };

  const response = await fetch(
    `https://api.foursquare.com/v3/places/search?query=${Query}&ll=${LatLong.replace(",", "%2C")}&radius=5000&sort=DISTANCE&limit=${limit}&client_id=${process.env.NEXT_PUBLIC_FORSQUARE_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_FORSQUARE_CLIENT_ID}`,
    options
  );
  const data = await response.json();
  return data.results.map((response, i) => {
    return ({
      name: response.name,
      id: response.fsq_id,
      address: (response.location.address + response.location.cross_street) && response.location.formatted_address,
      neighborhood: response.location.neighborhood || "",
      imgUrl: photoUrl[i]
    })
  })


};

export default coffeeStore