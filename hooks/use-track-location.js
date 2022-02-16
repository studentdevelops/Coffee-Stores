import react, { useEffect, useState } from 'react'


const useTrackLocation = () => {
  const [GeoAvailable, SetGeoAvailable] = useState(false);
  const [LatLong, SetLatLong] = useState("");
  const [LocationErrorMsg, SetLocationErrorMsg] = useState("");
  useEffect(() => {
    if ('geolocation' in navigator) {
      SetGeoAvailable(true);
      SetLocationErrorMsg("");
    }
  }, [])


  const success = (location) => {
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;
    SetLatLong(`${latitude},${longitude}`);
  }
  const error = (error) => {
    SetLocationErrorMsg({error})
  }
  const handleLocation = () => {
    if (GeoAvailable) {
      navigator.geolocation.getCurrentPosition(success, error);
    }

  }
  return {
    handleLocation,
    LatLong,
    LocationErrorMsg
  }

}

export default useTrackLocation