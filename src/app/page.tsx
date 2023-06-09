"use client";

import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useInfoUserStore } from "@/store/userInformation";
import { useState } from "react";
import { useUserScoreStore } from "@/store/userScore";
import { useGameInfoStore } from "@/store/useGameInformation";
import { UserInformation } from "@/models/User.model";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();
  const updateUserInfo = useInfoUserStore((state) => state.updateUserInfo);
  const resetPoints = useUserScoreStore((state) => state.resetPoints);
  const resetCards = useGameInfoStore((state) => state.resetCards);

  const playGame = () => {
    if (!name) return alert("Ingresa tu nombre de usuario");
    // Reset all the game
    resetPoints();
    resetCards();
    // Update the user information
    updateUserInfo({ name } as UserInformation);
    // Redirect to the game
    router.push("/play");
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center pt-24 ${inter.className}`}
    >
      <Image width={566} height={299} src="/logo.webp" alt="logo" />

      <h1>Ingresa tu nombre de usuario</h1>

      <input
        type="text"
        placeholder="Nombre de usuario"
        className="border-2 text-black border-gray-300 rounded-md mt-5 p-2 w-96"
        onChange={(e) => setName(e.target.value)}
      />

      <button
        onClick={playGame}
        className="bg-blue-500 hover:bg-blue-700 text-white rounded-md p-2 mt-5 w-96"
      >
        Ingresar
      </button>
    </main>
  );
}
