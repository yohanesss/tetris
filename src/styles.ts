import styled from "styled-components";
import bgImage from "./assets/background.jpg";
import soundOn from "./assets/soundon.svg";
import soundOff from "./assets/soundoff.svg";

type StyledCellProps = {
    color: string | number;
    type: string | number;
};

export const StyledCell = styled.div<StyledCellProps>`
    width: auto;
    background: rgba(${({ color }) => (color ? color : "0,0,0")}, 0.8);
    border: ${({ type }) => (type === 0 ? "0px solid" : "4px solid")};
    border-bottom-color: rgba(${({ color }) => color}, 0.1);
    border-right-color: rgba(${({ color }) => color}, 1);
    border-top-color: rgba(${({ color }) => color}, 1);
    border-left-color: rgba(${({ color }) => color}, 0.3);
`;

export const StyledTestrisWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url(${bgImage});
    background-size: cover;
    background-position: center;
    overflow: hidden;
`;

export const StyledTetris = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    height: 100vh;
    padding: 40px;
    margin: 0 auto;
    max-width: 900px;

    aside {
        width: 100%;
        max-width: 200px;
        display: block;
        padding: 0 20px;
    }
`;

interface StyledStageProps {
    height: string | number;
    width: string | number;
}

export const StyledStage = styled.div<StyledStageProps>`
    display: grid;
    grid-template-rows: repeat(
        ${({ height }) => height},
        calc(25vw / ${({ width }) => width})
    );
    grid-template-columns: repeat(${({ width }) => width}, 1fr);
    grid-gap: 1px;
    border: 2px solid #333;
    width: 100%;
    max-width: 25vw;
    background: rgba(0, 0, 0, 0.75);
`;

interface StyledDisplayProps {
    gameOver?: boolean;
}

export const StyledDisplay = styled.div<StyledDisplayProps>`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin: 0 0 20px 0;
    padding: 20px;
    border: 2px solid mediumspringgreen;
    min-height: 30px;
    width: 100%;
    border-radius: 10px;
    color: ${({ gameOver }) => (gameOver ? "red" : "hotpink")};
    text-shadow: 0.25px 0.25px 0 #0ff, -0.25px 0.25px 0 #f00;
    font-weight: bold;
    background: rgba(0, 0, 0, 0.75);
    font-size: 1rem;
`;

export const StyledStartButton = styled.button`
    box-sizing: border-box;
    margin: 0 0 20px 0;
    padding: 20px;
    min-height: 30px;
    width: 100%;
    border-radius: 10px;
    font-weight: bold;
    /* text-shadow: 1.25px 1.25px 0 #0ff, -1.25px 1.25px 0 #f00; */
    border: 2px solid aqua;
    color: #ff0074;
    background: rgba(0, 0, 0, 0.75);
    text-shadow: 0.25px 0.25px 0 #0ff, -0.25px 0.25px 0 #f00;
    font-size: 1rem;
    outline: none;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

export const SoundControlButton = styled.button`
    background-image: url(${soundOn});
    padding: 20px;
    border-radius: 50%;
    position: absolute;
    right: 0;
    top: 10px;
    right: 10px;
    background-repeat: no-repeat;
    background-position: center;
    outline: none;
    background-size: 60%;
    background-color: fuchsia;
    border: 2px solid hotpink;
    cursor: pointer;
    &.off {
        background-image: url(${soundOff});
    }
`;

export const TetrisTitle = styled.img`
    width: 100%;
    margin-bottom: 20px;
`;
