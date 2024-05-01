"use client";

import { useState, useEffect, Suspense } from "react";

import { BoardWidget } from "@/widgets/board";
import { Board } from "@/models/Board";
import { Player } from "@/models/Player";
import { Colors } from "@/models/Colors";
import { useSearchParams } from 'next/navigation';
import { useSocket } from '@/contexts/socketContext';
import { useRouter } from 'next/navigation';
import { Menu } from "@/widgets/menu";
import Loading from "@/app/loading";


let historyMovements: any[] = [];


export default function Home() {
    const socket = useSocket();
    const searchParams = useSearchParams();

    const [historyMovementsState, setHistoryMovementsState] = useState(historyMovements);
    const [whitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    const [board, setBoard] = useState<Board | null>(null);
    const gameId = searchParams.get('gameId')
    const playerId = searchParams.get('playerId');
    const playerColor = searchParams.get('playerColor');


    useEffect((): void => {
        restart();
        setCurrentPlayer(whitePlayer);
    }, []);


    function updateBoard(): void {
        if (board) {
            const newBoard = board.getCopyBoard();
            setBoard(newBoard)
        }
    }


    function swapPlayer(): void {
        const swapCurrentPlayer = (currentPlayer === whitePlayer) ? blackPlayer : whitePlayer
        setCurrentPlayer(swapCurrentPlayer);
        updateBoard();
    }

    function reverseBoardAndFigures(board: Board): Board {
        const reversedBoard = new Board();
        const numRows = board.cells.length;
        const numCols = numRows > 0 ? board.cells[0].length : 0;

        reversedBoard.cells = [];

        for (let i = numRows - 1; i >= 0; i--) {
            const originalRow = board.cells[i];
            const reversedRow = [];

            for (let j = numCols - 1; j >= 0; j--) {
                reversedRow.push(originalRow[j]);
            }

            reversedBoard.cells.push(reversedRow);
        }

        return reversedBoard;
    }

    function handlePlayerMove() {

    }


    function restart(): void {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        if (playerColor && playerColor === Colors.BLACK) {
            const originalBoard = newBoard;
            const reversedBoard = reverseBoardAndFigures(originalBoard);
            setBoard(reversedBoard);
        } else {
            setBoard(newBoard);
        }
        setHistoryMovementsState([]);
        historyMovements = [];
    }

    if (board) {
        return (
            <>

                <Suspense fallback={<Loading />}>
                    <Menu />
                    <div className="flex justify-center">
                        <div className="flex justify-center">

                            <BoardWidget
                                board={board}
                                setHistoryMovementsState={setHistoryMovementsState}
                                historyMovements={historyMovements}
                                setBoard={setBoard}
                                currentPlayer={currentPlayer}
                                updateBoard={updateBoard}
                                swapPlayer={swapPlayer}
                                onUpdateBoard={(updatedBoard: any) => setBoard(updatedBoard)}
                                handlePlayerMove={handlePlayerMove}
                                socket={socket}
                                playerColor={playerColor}
                                multiplayer={false}
                            />
                        </div>
                    </div>
                </Suspense>
            </>
        )
    } else {
        return (
            <h1>404</h1>
        )
    }
}
