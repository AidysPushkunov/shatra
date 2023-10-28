import { Field } from "@/entities/field";
import { Pawn } from "@/entities/pawn";
import { Board } from "@/widgets/board";

export default function Home() {
  return (
    <>
      <div className="text-red-700">Telengit Shatra</div>
      <p className="text-gray-400">
        Shatra is an intellectual board game of the Telengit people. The goal of
        this project is to create an Internet platform for the game “Shatra” in
        real time between two people or with artificial intelligence.
      </p>
      <Board />
      <Pawn intent="whiteShatra" />
      <Pawn intent="blackShatra" />
      <Pawn intent="whiteBiy" />
      <Pawn intent="blackBiy" />
      <Pawn intent="blackBaatyr" />
      <Pawn intent="whiteBaatyr" />
    </>
  );
}
