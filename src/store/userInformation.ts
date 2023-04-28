import { UserInformation } from "@/models/User.model";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const myMiddlewares: any = (f: any) =>
  devtools(persist<userState>(f, { name: "user-info" }));

interface userState {
  userInfo: UserInformation;
  updateUserInfo: (userInformation: UserInformation) => void;
}

export const useInfoUserStore = create<userState>()(
  myMiddlewares((set: any) => ({
    userInfo: {
      id: 0,
      name: "",
    },
    updateUserInfo: (userInformation: UserInformation) =>
      set(({ state }: { state: any }) => ({
        userInfo: {
          ...(state?.userInfo || {}),
          ...userInformation,
        },
      })),
  }))
);
