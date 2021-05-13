import React, { FC } from "react";
import { TETROMINOS } from "../utils/tetrominos";
import * as S from "../styles";

interface CellProps {
    type: any;
}

export const Cell: FC<CellProps> = ({ type }: CellProps) => {
    const tetroColor = TETROMINOS[type[0]].color;
    return <S.StyledCell type={"L"} color={tetroColor} />;
};
