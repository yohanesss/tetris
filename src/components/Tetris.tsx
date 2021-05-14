import React, { useState } from "react";

import { Stage } from "./Stage";
import { Display } from "./Display";
import { StartButton } from "./StartButton";

import { createStage, checkCollission } from "../utils/gameHelper";
import { useInterval } from "../hooks/useInterval";
import { usePlayer } from "../hooks/usePlayer";
import { useStage } from "../hooks/useStage";
import { useGameStatus } from "../hooks/useGameStatus";
import Modal from "react-modal";

import * as S from "../styles";
import logo from "../assets/tetris.png";
import arrows from "../assets/arrows.png";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

type DropTime = null | number;

export const Tetris = () => {
    const [dropTime, setDropTime] = useState<DropTime>(null);
    const [gameOver, setGameOver] = useState(false);
    const [showGuide, setShowGuide] = useState(false);

    const [player, updatePlayerPos, resetPlayer, rotateActiveTetromino] =
        usePlayer();
    const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
    const [
        score,
        setScore,
        rows,
        setRows,
        level,
        setLevel,
        isSuccessRowsCleared,
        setIsSuccessRowsCleared,
    ] = useGameStatus(rowsCleared);

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
        setLevel(1);
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
        if (isSuccessRowsCleared) {
            setIsSuccessRowsCleared(false);
        }
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
                <S.StageWrapper
                    className={
                        gameOver
                            ? "gameover"
                            : isSuccessRowsCleared
                            ? "cleared"
                            : ""
                    }
                >
                    <Stage stage={stage} />
                </S.StageWrapper>
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
                    <StartButton gameOver={gameOver} callback={startGame} />
                    <S.ShowGuideButton onClick={() => setShowGuide(true)}>
                        How to play
                    </S.ShowGuideButton>
                    <S.CreatorLink href="https://yoh.netlify.app">
                        https://yoh.netlify.app
                    </S.CreatorLink>
                    <Modal isOpen={showGuide} style={customStyles}>
                        <S.CloseGuideModalButton
                            onClick={() => setShowGuide(false)}
                        >
                            X
                        </S.CloseGuideModalButton>
                        <S.GuideModalTitle>Navigation</S.GuideModalTitle>
                        <S.GuideContentContainer>
                            <S.GuideArrowImage src={arrows} alt="nav" />
                            <S.GuideContentInnerContainer>
                                <p>Up: Rotate</p>
                                <p>Left: Go Left</p>
                                <p>Right: Go Right</p>
                                <p>Down: Go Down</p>
                                <p>Hold Down: Go Down Faster</p>
                            </S.GuideContentInnerContainer>
                        </S.GuideContentContainer>
                    </Modal>
                </aside>
            </S.StyledTetris>
        </S.StyledTestrisWrapper>
    );
};
