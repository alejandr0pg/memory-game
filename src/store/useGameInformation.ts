import { shuffleArray } from "@/helpers/shuffle.helper";
import { PlayerCard } from "@/models/PlayerCard.model";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface GameState {
  cards: PlayerCard[];
  setCards: (cards: PlayerCard[]) => void;
  resetCards: () => void;
}

const myMiddlewares: any = (f: any) =>
  devtools(persist<GameState>(f, { name: "game-info" }));

export const useGameInfoStore = create<GameState>()(
  myMiddlewares((set: any) => ({
    cards: [],
    setCards: (cards: PlayerCard[]) => set(() => ({ cards: cards })),
    resetCards: () =>
      set((state: GameState) => ({
        cards: shuffleArray(state.cards).map((card: PlayerCard, index) => ({
          ...card,
          index,
          show: false,
        })),
      })),
  }))
);
