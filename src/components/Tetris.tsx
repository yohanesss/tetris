import React, { FC, useState } from "react";

import { Stage } from "./Stage";
import { Display } from "./Display";
import { StartButton } from "./StartButton";

import * as S from "../styles";
import logo from "../assets/tetris.png";

import { createStage, checkCollission } from "../utils/gameHelper";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";

interface TetrisProps {}

export const Tetris: FC<TetrisProps> = ({}: TetrisProps) => {
    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const [stage, setStage] = useStage(player, resetPlayer);
    // const [stage, setStage] = useStage(player);

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
        resetPlayer();
        setGameOver(false);
    };

    const drop = () => {
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

    const dropPlayer = () => {
        drop();
    };

    const move = ({ keyCode }: React.KeyboardEvent<HTMLDivElement>) => {
        if (!gameOver) {
            if (keyCode === 37) {
                moveActiveTetromino(-1);
            } else if (keyCode === 39) {
                moveActiveTetromino(1);
            } else if (keyCode === 40) {
                dropPlayer();
            }
        }
    };

    return (
        <S.StyledTestrisWrapper
            role="button"
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => move(e)}
        >
            <S.StyledTetris>
                <Stage stage={stage} />
                <aside>
                    <S.TetrisTitle src={logo} />
                    {gameOver ? (
                        <Display text="Game Over" gameOver={gameOver} />
                    ) : (
                        <>
                            <Display text="Score" />
                            <Display text="Rows" />
                            <Display text="Level" />
                        </>
                    )}
                    <StartButton callback={startGame} />
                </aside>
            </S.StyledTetris>
        </S.StyledTestrisWrapper>
    );
};
