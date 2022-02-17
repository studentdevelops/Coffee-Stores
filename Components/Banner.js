import styles from "./Banner.module.css";

const Banner = ({ LocationErrorMsg, coffeeFetchError, ButtonText, onClickFind }) => {
  return (
    <div className={styles.container}>
      <h2>
        <span>Coffee</span> <span>Connoisseur</span>
      </h2>
      <h4>Discover your local coffee shops!</h4>
      <button onClick={onClickFind} className={styles.btn}>{ButtonText}</button>
      <div className={styles.error}>{LocationErrorMsg && <p>Location was not detected</p>}
        {coffeeFetchError && <p>Couldn't Fetch Coffee Stores</p>}</div>
    </div>
  );
};

export default Banner;
