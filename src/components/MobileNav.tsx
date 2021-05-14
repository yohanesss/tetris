import * as S from "../styles";
import { MobileActionNav } from "./MobileActionNav";
import { Display } from "./Display";
import { StartButton } from "./StartButton";

import logo from "../assets/tetris.png";

interface MobileNavProps {
    upAction: any;
    leftAction: any;
    rightAction: any;
    downAction: any;
    startGame: any;
    gameOver: boolean;
    score: number;
    rows: number;
    level: number;
}

export const MobileNav = ({
    upAction,
    leftAction,
    rightAction,
    downAction,
    startGame,
    gameOver,
    score,
    rows,
    level,
}: MobileNavProps) => {
    return (
        <S.MobileOuterActionContainer>
            <MobileActionNav
                upAction={() => upAction()}
                leftAction={() => leftAction()}
                rightAction={() => rightAction()}
                downAction={() => downAction()}
            />
            <S.MobileActionContainer>
                <S.MobileActionInnerContainer>
                    <S.TetrisTitle className="desktop-logo" src={logo} />
                    {gameOver ? (
                        <Display text="Game Over" gameOver={gameOver} />
                    ) : null}
                </S.MobileActionInnerContainer>
                <S.MobileActionInnerContainer>
                    <Display text={`Score: ${score}`} />
                    <Display text={`Rows: ${rows}`} />
                    <Display text={`Level: ${level}`} />
                </S.MobileActionInnerContainer>
                <StartButton gameOver={gameOver} callback={startGame} />
                <S.CreatorLink href="https://yoh.netlify.app">
                    https://yoh.netlify.app
                </S.CreatorLink>
            </S.MobileActionContainer>
        </S.MobileOuterActionContainer>
    );
};
