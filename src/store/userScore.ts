import { Score } from "@/models/Score.model";
import { UserInformation } from "@/models/User.model";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface userScoreState {
  score: Score;
  addPointSuccess: () => void;
  addPointError: () => void;
  resetPoints: () => void;
}

const myMiddlewares: any = (f: any) =>
  devtools(persist<userScoreState>(f, { name: "score-info" }));

export const useUserScoreStore = create<userScoreState>()(
  myMiddlewares((set: any) => ({
    score: {
      success: 0,
      errors: 0,
    },
    addPointSuccess: () =>
      set((state: any) => ({
        score: {
          ...state.score,
          success: state.score.success + 1,
        },
      })),
    addPointError: () =>
      set((state: any) => ({
        score: {
          ...state.score,
          errors: state.score.errors + 1,
        },
      })),
    resetPoints: () =>
      set(() => ({
        score: {
          success: 0,
          errors: 0,
        },
      })),
  }))
);
