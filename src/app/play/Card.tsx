import React from "react";
import Image from "next/image";
import styles from "./Card.module.scss";
import { PlayerCard } from "@/models/PlayerCard.model";

interface IProps {
  animating: boolean;
  handleClick: (card: PlayerCard) => void;
  card: PlayerCard;
}

const Card = ({ animating, handleClick, card }: IProps) => {
  return (
    <div
      className={styles.card}
      onClick={() => !card.show && !animating && handleClick(card)}
    >
      <div
        className={`${styles["card-inner"]} ${
          card.show && styles["card-flipped"]
        }`}
      >
        <div className={styles["card-back"]}></div>
        <div className={styles["card-front"]}>
          <Image
            fill={true}
            src={card.image}
            className="object-cover rounded-lg"
            alt={`${card.title} picture`}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
