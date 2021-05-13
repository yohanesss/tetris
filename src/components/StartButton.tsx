import React, { FC } from "react";
import * as S from "../styles";

interface StartButtonProps {
    callback(): void;
}

export const StartButton: FC<StartButtonProps> = ({
    callback,
}: StartButtonProps) => {
    return (
        <S.StyledStartButton onClick={callback}>Start Game</S.StyledStartButton>
    );
};
