import coffeeStoreData from "../coffee-stores.json";
import styles from "../../styles/Id.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Loading from "../../Components/Loading";
import classNames from "classnames";
import coffeeStore from "../../lib/coffeeStore";
import { StoreContext } from "../../context/StoreContext";
import { useContext, useState, useEffect } from 'react';
import { isEmpty } from "../../utils";

export async function getStaticProps({ params }) {
    const CoffeeStoreData = await coffeeStore();
    const findCoffeeStores = CoffeeStoreData.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id;
    })
    return {
        props: {
            coffeeStore: findCoffeeStores ? findCoffeeStores : {},
        },
    };
}
export async function getStaticPaths() {

    const paths = coffeeStoreData.map((data) => {
        return data.id
    })
    return {
        paths: [
            {
                params: { id: paths.toString() },
            },
        ],
        fallback: true, // false or 'blocking'
    };
}

const id = (initialProps) => {
    const { coffeeStore } = initialProps;
    const router = useRouter();

    if (router.isFallback) {
        return <Loading />;
    }
    const onVoteClick = (e) => {
        console.log("clicked");
    }

    const id = router.query.id;
    const { state: { CoffeeStores } } = useContext(StoreContext);

    const [CoffeeStoreData, SetCoffeeStoreData] = useState(coffeeStore);

    useEffect(async () => {
        if (isEmpty(coffeeStore)) {
            if (CoffeeStores.length > 0) {
                const findCoffeeStores = CoffeeStores.find((coffeeStore) => {
                    return coffeeStore.id.toString() === id;
                })
                SetCoffeeStoreData(findCoffeeStores);
            }
        }
    },[id])


    return (
        <div className={styles.layout}>
            <div className={styles.container}>
                <div className={styles.col}>
                    <div className={styles.link}>
                        <Link href="/">
                            <a>
                                <span>
                                    <span className={styles.goBack}><span>&#8592;</span> Back To Home</span>
                                </span>
                            </a>
                        </Link>
                        <h3 className={styles.title}>{CoffeeStoreData.name}</h3>
                    </div>
                    <div>
                        <a href={CoffeeStoreData.websiteUrl || ""} target="_blank" >
                            <Image className={styles.img} src={CoffeeStoreData.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"} height={550} width={650} />
                        </a>
                    </div>
                </div>
                <div className={classNames(styles.col2, "glass")}>
                    {CoffeeStoreData.neighborhood && <p className={styles.desc}> <Image className={styles.img} src="/icons/home.svg" height={24} width={24} />{CoffeeStoreData.neighborhood}</p>}
                    <p className={styles.desc} > <Image className={styles.img} src="/icons/locationMarker.svg" height={24} width={24} /> {CoffeeStoreData.address}</p>
                    <p className={styles.desc} > <Image className={styles.img} src="/icons/star.svg" height={24} width={24} /> 1 </p>
                    <button onClick={onVoteClick} className={classNames(styles.btn, "glass")}>Vote</button>
                </div>
            </div>
        </div>
    );
};

export default id;
