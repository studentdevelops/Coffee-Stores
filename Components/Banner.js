import styles from "./Banner.module.css";

const Banner = () => {
  return (
    <div className={styles.container}>
      <h2>
        <span>Coffee</span> <span>Connoisseur</span>
      </h2>
      <h4>Discover your local coffee shops!</h4>
      <button className={styles.btn}>View stores nearby</button>
    </div>
  );
};

export default Banner;
