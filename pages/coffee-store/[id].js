import coffeeStoreData from "../coffee-stores.json";
import styles from "../../styles/Id.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Loading from "../../Components/Loading";
import classNames from "classnames";
import coffeeStore from "../../lib/coffeeStore";


export async function getStaticProps({ params }) {
    const LatLong = "19.12,72.89";
    const limit = 9;
    const Query = "Coffee";
    const CoffeeStoreData = await coffeeStore(Query, LatLong, limit);
    return {
        props: {
            coffeeStore: CoffeeStoreData.find((coffeeStore) => {
                return coffeeStore.id.toString() === params.id;
            }),
        },
    };
}
export async function getStaticPaths() {
    const LatLong = "19.12,72.89";
    const limit = 9;
    const Query = "Coffee";
    
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

const id = ({ coffeeStore}) => {


    const router = useRouter();

    if (router.isFallback) {
        return <Loading />;
    }
    const onVoteClick = (e) => {
        console.log("clicked");
    }

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
                        <h3 className={styles.title}>{coffeeStore.name}</h3>
                    </div>
                    <div>
                        <a href={coffeeStore.websiteUrl || ""} target="_blank" >
                            <Image className={styles.img} src={ coffeeStore.imgUrl ||"https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"} height={550} width={650} />
                        </a>
                    </div>
                </div>
                <div className={classNames(styles.col2, "glass")}>
                    {coffeeStore.neighborhood && <p className={styles.desc}> <div><Image className={styles.img} src="/icons/home.svg" height={24} width={24} /></div> {coffeeStore.neighborhood}</p>}
                    <p className={styles.desc} > <div><Image className={styles.img} src="/icons/locationMarker.svg" height={24} width={24} /></div> {coffeeStore.address}</p>
                    <p className={styles.desc} > <div><Image className={styles.img} src="/icons/star.svg" height={24} width={24} /></div> 1 </p>
                    <button onClick={onVoteClick} className={classNames(styles.btn, "glass")}>Vote</button>
                </div>
            </div>
        </div>
    );
};

export default id;
