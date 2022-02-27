import react, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { ACTION_TYPES } from '../context/containts';
import { StoreContext } from '../context/StoreContext';

const useTrackLocation = () => {
  const [GeoAvailable, SetGeoAvailable] = useState(false);
  const [FindingLocation, SetFindingLocation] = useState(false);
  const [LocationErrorMsg, SetLocationErrorMsg] = useState(null);
  useEffect(() => {
    if ('geolocation' in navigator) {
      SetGeoAvailable(true);
      SetLocationErrorMsg("");
    }
  }, [])

  const { Dispatch } = useContext(StoreContext);
  const success = (location) => {
    SetFindingLocation(false);
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;

    Dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: { LatLong: `${latitude},${longitude}` }
    })

    SetLocationErrorMsg("")
  }
  const error = (error) => {
    SetFindingLocation(false);
    SetLocationErrorMsg({ error })
  }
  const handleLocation = () => {
    SetFindingLocation(true);
    if (GeoAvailable) {
      navigator.geolocation.getCurrentPosition(success, error);
    }

  }
  return {
    handleLocation,
    LocationErrorMsg,
    FindingLocation
  }

}

export default useTrackLocation