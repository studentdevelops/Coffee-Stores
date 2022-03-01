import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from 'react';
import useSWR from "swr";

import { StoreContext } from "../../context/StoreContext";
import coffeeStore from "../../lib/coffeeStore";
import { isEmpty } from "../../utils";

import Loading from "../../Components/Loading";
import styles from "../../styles/Id.module.css";

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
    const CoffeeStoreData = await coffeeStore();
    const paths = CoffeeStoreData.map((data) => {
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

const CoffeeStore = (initialProps) => {
    const CoffeeStoreFromInitialProp = initialProps.coffeeStore;
    const Router = useRouter();
    const id = Router.query.id || "";
    const { state: { CoffeeStores } } = useContext(StoreContext);
    const [CoffeeStoreData, SetCoffeeStoreData] = useState(CoffeeStoreFromInitialProp || {});
    const [votes, setVotes] = useState(1);
    const fetcher = (url) => fetch(url).then((res) => res.json());
    const { data, error } = useSWR(`/api/fetchById?id=${id}`, fetcher)

    useEffect(() => {
        if (data && data.length > 0) {
            SetCoffeeStoreData(data[0]);
            setVotes(data[0].votes);
        }
    }, [data])

    const handleCreateCoffeeStore = async (handleCoffeeStore) => {
        try {
            const response = await fetch("/api/createCoffeeStore", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(handleCoffeeStore)
            })
        } catch (error) {
            console.error({ error })
        }
    }

    useEffect(() => {
        (async function () {
            if (isEmpty(CoffeeStoreData)) {
                if (CoffeeStores.length > 0) {
                    const findCoffeeStores = CoffeeStores.find((coffeeStore) => {
                        return coffeeStore.id.toString() === id;
                    })
                    handleCreateCoffeeStore(findCoffeeStores);
                    SetCoffeeStoreData(findCoffeeStores);
                    return
                }
            }
        })

    }, [id, initialProps, initialProps.coffeeStore])



    const onVoteClick = async (e) => {
        try {
            const response = await fetch("/api/UpdateById", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            })
        } catch (error) {
            console.error({ error })
        }
        let count = votes + 1;
        setVotes(count);
    }


    if (Router.isFallback) {
        return <Loading />;
    }
    const { name = "", imgUrl = "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80", neighborhood = "", address = "" } = CoffeeStoreData
    return (
        <div className={styles.layout}>
            <div className={styles.container}>
                <div className={styles.col}>
                    <div className={styles.link}>
                        <Link href="/">
                            <a>
                                <span>
                                    <span className={styles.backKey}><span>&#8592;</span> Back To Home</span>
                                </span>
                            </a>
                        </Link>
                        <h3 className={styles.title}>{name}</h3>
                    </div>
                    <div>

                        <Image className={styles.img} alt={"Coffee Store Image"} src={imgUrl} height={550} width={650}/>
                    </div>
                </div>
                <div className={classNames(styles.col2, "glass")}>
                    {neighborhood !== " " && <p className={styles.desc}> <Image className={styles.img} src="/icons/home.svg" height={24} width={24} alt={""}/>{neighborhood}</p>}
                    <p className={styles.desc} > <Image className={styles.img} src="/icons/locationMarker.svg" height={24} width={24} alt={""} /> {address}</p>
                    <p className={styles.desc} > <Image className={styles.img} src="/icons/star.svg" height={24} width={24} alt={""} /> {votes} </p>
                    <button onClick={onVoteClick} className={classNames(styles.btn, "glass")}>Vote</button>
                </div>
            </div>
        </div>
    );
};

export default CoffeeStore;
