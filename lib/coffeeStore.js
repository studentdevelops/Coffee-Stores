import { createApi } from 'unsplash-js';

const CoffeeStorePhotos = async (Query = "Coffee Shops", numOfPhotos=9) => {
  const unsplashApi = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY
  });
  const photos = await unsplashApi.search.getPhotos({
    query: Query,
    perPage: numOfPhotos,
    page: 1
  })
  const photoUrl = photos.response.results.map(results => results.urls["regular"])
  return photoUrl
}

export const coffeeStore = async (Query="Coffee", LatLong="19.12,72.89", limit=9) => {
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
    return ({
      name: response.name,
      id: response.fsq_id,
      address: (response.location.address + response.location.cross_street) && response.location.formatted_address ,
      neighborhood: response.location.neighborhood || "",
      imgUrl: photoUrl[i]
    })
  })


};

export default coffeeStore