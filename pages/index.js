import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react"

import Banner from "../Components/Banner";
import Card from "../Components/Card";
import styles from "../styles/Home.module.css";

import coffeeStore from "../lib/coffeeStore";
import useTrackLocation from "../hooks/use-track-location";

import { useContext } from "react";
import { StoreContext } from '../context/StoreContext';
import { ACTION_TYPES } from "../context/containts";


export async function getStaticProps(context) {
  const CoffeeStoreData = await coffeeStore();
  return {
    props: {
      coffeeStoreData: CoffeeStoreData,
    }, // will be passed to the page component as props
  };
}

export default function Home(initialProps) {

  const { handleLocation, LocationErrorMsg, FindingLocation } = useTrackLocation();
  const [defaultState, SetDefaultState] = useState(false);
  const [coffeeFetchError, SetCoffeeFetchError] = useState(null);

  const { Dispatch, state } = useContext(StoreContext);
  const { CoffeeStores, LatLong } = state;

  const [coffeeStores, SetCoffeeStores] = useState(initialProps.coffeeStoreData);

  useEffect(() => {
    const fetchStores = async () => {
      if (LatLong) {
        try {
          const response = await fetch(`api/fetchStores?LatLong=${LatLong}&limit=21`)
          const FetchedCoffeeStore = await response.json();
          SetCoffeeStores(FetchedCoffeeStore);
          SetDefaultState(true);

          Dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
              CoffeeStores: FetchedCoffeeStore,
            }
          });

        } catch (error) {
          SetCoffeeFetchError(error.message);
          console.log("Internal Error 404");

        }
      }
    }
    fetchStores();
  }, [LatLong, Dispatch]);

  const onClickFind = (e) => {
    handleLocation();
  }



  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/hero-icon.png" />
        <meta name="description" key="ogdesc" content="Come and Find Your Coffee Store to make it your every Adda. Explore Coffee Stores Near you." />
        <meta property="og:image" content="/metaImage.jpg" key="ogimage"/>
      </Head>
      <Banner LocationErrorMsg={LocationErrorMsg} coffeeFetchError={coffeeFetchError} ButtonText={FindingLocation ? "Locating" : "View stores nearby"} onClickFind={onClickFind} />
      <div className={styles.bannerImage}>
        <Image src="/static/hero-image.png" height={380} width={1024} alt={"banner-Image"} />
      </div>
      <div className={styles.title}>{defaultState ? <h2>Stores Near You</h2> : <h2>Pune Stores</h2>}</div>
      <div className={styles.cardList}>
        {coffeeStores.map((data) => {
          return (
            <Card
              key={data.id}
              name={data.name}
              address={data.address}
              imgUrl={
                data.imgUrl}
              Url={data.id}
            />
          );
        })}
      </div>
    </div>
  );
}
