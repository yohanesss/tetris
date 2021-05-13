import React, { FC } from "react";
import { Cell } from "./Cell";
import * as S from "../styles";

interface StageProps {
    stage: [][][];
}

export const Stage: FC<StageProps> = ({ stage }: StageProps) => {
    return (
        <S.StyledStage width={stage[0].length} height={stage.length}>
            {stage.map((row) =>
                row.map((cell, x) => <Cell key={x} type={cell} />)
            )}
        </S.StyledStage>
    );
};
