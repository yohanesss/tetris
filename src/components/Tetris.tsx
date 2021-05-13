import React, { FC } from "react";
import { Stage } from "./Stage";
import { Display } from "./Display";
import { StartButton } from "./StartButton";
import { createStage } from "../utils/gameHelper";
import * as S from "../styles";
import logo from "../assets/tetris.png";

interface TetrisProps {}

export const Tetris: FC<TetrisProps> = ({}: TetrisProps) => {
    return (
        <S.StyledTestrisWrapper>
            <S.StyledTetris>
                <Stage stage={createStage()} />
                <aside>
                    <S.TetrisTitle src={logo} />
                    <Display text="Score" />
                    <Display text="Rows" />
                    <Display text="Level" />
                    <StartButton
                        callback={() => console.log("Game has Started")}
                    />
                </aside>
            </S.StyledTetris>
        </S.StyledTestrisWrapper>
    );
};
