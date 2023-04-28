import React from "react";
import styles from "./Marker.module.scss";

interface IProps {
  name: string;
  success: number;
  errors: number;
  resetGame: () => void;
}

const Marker = ({ name, success, errors, resetGame }: IProps) => {
  return (
    <section className={`flex justify-center gap-11 mb-5 ${styles.marker}`}>
      <h2>
        Welcome <strong>{name}</strong>
      </h2>
      <h2>
        Score: (Successful: <strong>{Number(success)}</strong>, Errors:{" "}
        <strong>{Number(errors)}</strong>)
      </h2>
      <button
        disabled={success === 0 && errors === 0}
        onClick={resetGame}
        className="bg-red-500 disabled:bg-gray-400 rounded-lg px-6 py-0.5"
      >
        Reset
      </button>
    </section>
  );
};

export default Marker;
