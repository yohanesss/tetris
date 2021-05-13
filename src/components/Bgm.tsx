import React, { useState } from "react";
import tetrisMp3 from "../assets/tetris.mp3";
import Sound from "react-sound";
import * as S from "../styles";

export const Bgm = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <>
            <Sound
                url={tetrisMp3}
                playStatus={isPlaying ? "PLAYING" : "STOPPED"}
            />
            <S.SoundControlButton
                className={!isPlaying ? "off" : ""}
                onClick={() => setIsPlaying(!isPlaying)}
            />
        </>
    );
};
