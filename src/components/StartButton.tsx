import React, { FC } from "react";
import * as S from "../styles";

interface StartButtonProps {
    callback(): void;
    gameOver: boolean;
}

export const StartButton: FC<StartButtonProps> = ({
    callback,
    gameOver,
}: StartButtonProps) => {
    return (
        <S.StyledStartButton onClick={callback}>
            {gameOver ? "Restart Game" : "Start Game"}
        </S.StyledStartButton>
    );
};
