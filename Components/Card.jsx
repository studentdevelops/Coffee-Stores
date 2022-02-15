import styles from "./Card.module.css";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";

const Card = ({ name, imgUrl, Url }) => {
  return (
    <Link href={`/coffee-store/${Url}`}>
      <a>
        <div className={classNames(styles.card, "glass", "g")}>
          {name}
          <Image className={styles.img} src={imgUrl} height={180} width={300} />
        </div>
      </a>
    </Link>
  );
};

export default Card;
