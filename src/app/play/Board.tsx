import React from "react";
import Card from "./Card";
import styles from "./Board.module.scss";
import { PlayerCard } from "@/models/PlayerCard.model";

interface IProps {
  animating: boolean;
  handleClick: (card: PlayerCard) => void;
  cards: PlayerCard[];
}

const Board = ({ animating, handleClick, cards }: IProps) => {
  return (
    <main className={styles.board}>
      {cards.map((card: PlayerCard, i: number) => {
        return (
          <Card
            key={`${i}_${card.id}`}
            animating={animating}
            handleClick={handleClick}
            card={card}
          />
        );
      })}
    </main>
  );
};

export default Board;
