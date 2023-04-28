"use client";

import { useInfoUserStore } from "@/store/userInformation";
import { useEffect, useState } from "react";
import { PlayerCard } from "@/models/PlayerCard.model";
import { getCardTypeAnimals } from "@/services/getAnimals";
import { Card } from "@/models/Card.model";
import Board from "./Board";
import { shuffleArray } from "@/helpers/shuffle.helper";
import Marker from "./Marker";
import { shallow } from "zustand/shallow";
import { useUserScoreStore } from "@/store/userScore";
import { useGameInfoStore } from "@/store/useGameInformation";

export default function Play() {
  const { name } = useInfoUserStore((state: any) => state.userInfo);
  const { success, errors } = useUserScoreStore((state: any) => state.score);

  const { addPointSuccess, addPointError, resetPoints } = useUserScoreStore(
    (state: any) => ({
      addPointSuccess: state.addPointSuccess,
      addPointError: state.addPointError,
      resetPoints: state.resetPoints,
    }),
    shallow
  );

  const { cards, setCards, resetCards } = useGameInfoStore(
    (state) => ({
      cards: state.cards,
      setCards: state.setCards,
      resetCards: state.resetCards,
    }),
    shallow
  );

  const [mounted, setMounted] = useState(false);
  const [cardSelected, setCardSelected] = useState<PlayerCard | null>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);

    getCardTypeAnimals().then((animals) => {
      const shuffledCards = shuffleArray([...animals, ...animals]).map(
        (card: Card, index: number) => ({
          ...card,
          index,
          show: false,
        })
      );

      setCards(shuffledCards);
    });

    return () => setMounted(false);
  }, [setCards]);

  const onClick = (card: PlayerCard) => {
    const cardShowed = { ...card, show: true };

    const showedCardsCopy = [...cards];
    // remplace the card in the array
    showedCardsCopy.splice(card.index, 1, cardShowed);
    // update the state of cards
    setCards(showedCardsCopy);

    if (cardSelected === null) {
      setCardSelected(cardShowed);
    } else if (cardSelected.slug === card.slug) {
      setCardSelected(null);
      addPointSuccess();

      setTimeout(() => {
        // check if all cards are showed
        // if all cards are showed, the game is over and the user win
        if (showedCardsCopy.every((card) => card.show)) {
          alert(`You win ${name}!`);
          resetGame({ force: true });
        }
      }, 500);
    } else {
      setAnimating(true);

      setTimeout(() => {
        showedCardsCopy.splice(card.index, 1, { ...card, show: false });
        showedCardsCopy.splice(cardSelected.index, 1, {
          ...cardSelected,
          show: false,
        });
        // update the state of cards
        setCards(showedCardsCopy);
        setCardSelected(null);
        // add error point
        addPointError();
        setAnimating(false);
      }, 800);
    }
  };

  // reset the game
  const resetGame = (props?: any) => {
    const { force } = props || {};

    if (animating && !force) {
      alert(
        "No puedes reiniciar el juego mientras se están mostrando las cartas"
      );

      return;
    }

    resetPoints();
    resetCards();
    setCardSelected(null);
  };

  return (
    mounted && (
      <main className={`flex min-h-screen flex-col items-center pt-5`}>
        <Marker
          name={name}
          success={success}
          errors={errors}
          resetGame={resetGame}
        />
        <section className="w-11/12">
          <Board cards={cards} animating={animating} handleClick={onClick} />
        </section>
      </main>
    )
  );
}
