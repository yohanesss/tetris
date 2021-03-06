import styled from "styled-components";
import bgImage from "./assets/background.jpg";
import soundOn from "./assets/soundon.svg";
import help from "./assets/help.svg";
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

export const StyledTetrisWrapper = styled.div`
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
        margin-left: 10px;
        width: 100%;
        max-width: 250px;
        display: block;
        padding: 0 20px;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 20px;
        padding-top: 60px;
        justify-content: flex-start;

        aside {
            display: none;
        }
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
    @media (max-width: 768px) {
        max-width: 100%;
        margin-top: 0px;
        margin-bottom: 5px;
        grid-template-rows: repeat(
            ${({ height }) => height},
            calc(60vw / ${({ width }) => width})
        );

        grid-template-columns: repeat(${({ width }) => width}, 1fr);
    }
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
    color: ${({ gameOver }) => (gameOver ? "white" : "hotpink")};
    text-shadow: 0.25px 0.25px 0 #0ff, -0.25px 0.25px 0 #f00;
    font-weight: bold;
    background: ${({ gameOver }) =>
        gameOver ? "rgba(255, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.75)"};
    font-size: 1rem;
    @media (max-width: 768px) {
        padding: 5px;
        margin: 10px 5px;
        font-size: 12px;
    }
`;

export const StyledStartButton = styled.button`
    box-sizing: border-box;
    margin: 0 0 20px 0;
    padding: 20px;
    min-height: 30px;
    width: 100%;
    border-radius: 10px;
    font-weight: bold;
    font-family: "Cutive Mono", monospace;
    /* text-shadow: 1.25px 1.25px 0 #0ff, -1.25px 1.25px 0 #f00; */
    border: 2px solid aqua;
    color: #ff0074;
    background: rgba(0, 0, 0, 0.75);
    text-shadow: 0.25px 0.25px 0 #0ff, -0.25px 0.25px 0 #f00;
    font-size: 1.25rem;
    outline: none;
    cursor: pointer;
    transition: 0.3s ease;
    &:hover {
        text-decoration: underline;
    }
    &:active {
        transform: translateY(5px);
        color: white;
        background-color: rgba(0, 0, 0, 0.9);
    }

    @media (max-width: 768px) {
        padding: 5px;
    }
`;

export const ShowMobileGuideButton = styled.button`
    background-image: url(${help});
    padding: 20px;
    border-radius: 50%;
    position: absolute;
    right: 0;
    top: 10px;
    left: 10px;
    background-repeat: no-repeat;
    background-position: center;
    outline: none;
    background-size: 60%;
    background-color: white;
    border: 2px solid hotpink;
    cursor: pointer;

    @media (max-width: 768px) {
        padding: 10px;
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

    @media (max-width: 768px) {
        padding: 10px;
    }
`;

export const TetrisTitle = styled.img`
    width: 100%;
    margin-bottom: 20px;
    @media (max-width: 768px) {
        display: none;
    }
`;

export const TetrisTitleMobile = styled.img`
    display: none;
    position: absolute;
    width: 100px;
    margin-left: calc(50vw - 50px);
    top: 10px;
    @media (max-width: 768px) {
        display: block;
    }
`;

export const ShowGuideButton = styled.button`
    font-size: 1.1rem;
    margin: 10px;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    font-family: "Cutive Mono", monospace;
    font-weight: bold;
    width: fit-content;
    margin: auto;
    padding: 5px 10px;
    border-radius: 53px;
    cursor: pointer;
    border: 2px solid hotpink;
    &:hover {
        text-decoration: underline;
    }
`;

export const StageWrapper = styled.div`
    width: 100%;
    max-width: 25vw;
    width: 100%;
    transition: 0.3s ease-in-out;
    margin-bottom: 5px;

    &.cleared {
        box-shadow: 0px 0px 11px 11px hotpink;
    }

    &.gameover {
        box-shadow: 0px 0px 11px 11px red;
    }
    @media (max-width: 768px) {
        max-width: 85%;
    }
`;

export const GuideModalTitle = styled.h1`
    margin-top: 0;
    text-align: center;
`;

export const GuideContentContainer = styled.div`
    display: flex;
    justify-content: center;
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

export const GuideContentInnerContainer = styled.div`
    margin-left: 20px;
    font-weight: bold;
    @media (max-width: 768px) {
        text-align: center;
        margin-left: 0;
    }
`;

export const GuideArrowImage = styled.img`
    width: 200px;
`;

export const CloseGuideModalButton = styled.button`
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: 4px solid black;
    font-weight: bold;
    font-size: 1rem;
`;

export const CreatorLink = styled.a`
    color: white;
    font-weight: bold;
    margin-top: 50px;
    display: block;
    font-size: 1rem;
    @media (max-width: 768px) {
        font-size: 12px;
        margin-top: -5px;
    }
`;

export const SummaryInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    @media (max-width: 768px) {
        flex-direction: row;
    }
`;

export const MobileOuterActionContainer = styled.div`
    display: flex;
`;

export const MobileActionContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
export const MobileActionInnerContainer = styled.div`
    display: flex;
`;

export const MobileArrowContainer = styled.div`
    margin-top: 5px;
    width: 100px;
    margin-right: 5px;
    margin-left: -5px;

    button {
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        border: 2px solid hotpink;
        margin: 2px;
        width: 35px;
        height: 35px;

        &:focus {
            background-color: rgba(255, 255, 255, 0.5);
        }

        svg {
            margin-top: 3px;
            /* margin-left: -3px; */
        }
    }
`;
