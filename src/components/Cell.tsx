import React, { FC, memo } from "react";
import { TETROMINOS } from "../utils/tetrominos";
import * as S from "../styles";

interface CellProps {
    type: any[];
}

const Cell: FC<CellProps> = ({ type }: CellProps) => {
    const tetroColor = TETROMINOS[type[0]].color;
    return <S.StyledCell type={type[0]} color={tetroColor} />;
};

export default memo(Cell);
