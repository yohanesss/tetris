import React, { FC, useState } from "react";

import { Stage } from "./Stage";
import { Display } from "./Display";
import { StartButton } from "./StartButton";

import * as S from "../styles";
import logo from "../assets/tetris.png";

import { createStage, checkCollission } from "../utils/gameHelper";
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";

interface TetrisProps {}

type DropTime = null | number;

export const Tetris: FC<TetrisProps> = ({}: TetrisProps) => {
    const [dropTime, setDropTime] = useState<DropTime>(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer, rotateActiveTetromino] =
        usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [score, setScore, rows, setRows, level, setLevel] =
        useGameStatus(rowsCleared);

    console.log("rerender");

    const moveActiveTetromino = (dir: number) => {
        if (!checkCollission(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({
                x: dir,
                y: 0,
            });
        }
    };

    const startGame = () => {
        // reset everythingg
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    };

    const drop = () => {
        // increase level when player clear 10 rows
        if (rows > (level + 1) * 10) {
            setLevel((prev) => prev + 1);
            setDropTime(1000 / (level + 1) + 200);
        }
        if (!checkCollission(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({
                x: 0,
                y: 1,
                collided: false,
            });
        } else {
            if (player.pos.y < 1) {
                console.log("GAME OVER");
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({
                x: 0,
                y: 0,
                collided: true,
            });
        }
    };

    const keyUp = ({ keyCode }: React.KeyboardEvent<HTMLDivElement>) => {
        if (!gameOver) {
            if (keyCode === 40) {
                console.log("interval on");
                // down key
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    };

    const dropPlayer = () => {
        console.log("interval off");
        setDropTime(null);
        drop();
    };

    const move = ({ keyCode }: React.KeyboardEvent<HTMLDivElement>) => {
        if (!gameOver) {
            if (keyCode === 37) {
                // left arrow
                moveActiveTetromino(-1);
            } else if (keyCode === 39) {
                // right arrow
                moveActiveTetromino(1);
            } else if (keyCode === 40) {
                // down arrow
                dropPlayer();
            } else if (keyCode === 38) {
                // up arrow
                rotateActiveTetromino(stage, 1);
            }
        }
    };

    useInterval(() => {
        drop();
    }, dropTime);

    return (
        <S.StyledTestrisWrapper
            role="button"
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => move(e)}
            onKeyUp={keyUp}
        >
            <S.StyledTetris>
                <Stage stage={stage} />
                <aside>
                    <S.TetrisTitle src={logo} />
                    {gameOver ? (
                        <Display text="Game Over" gameOver={gameOver} />
                    ) : (
                        <>
                            <Display text={`Score: ${score}`} />
                            <Display text={`Rows: ${rows}`} />
                            <Display text={`Level: ${level}`} />
                        </>
                    )}
                    <StartButton callback={startGame} />
                </aside>
            </S.StyledTetris>
        </S.StyledTestrisWrapper>
    );
};
