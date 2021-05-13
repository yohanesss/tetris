import { useState, useEffect } from "react";
import { createStage } from "../utils/gameHelper";

interface playerArgs {
    pos: {
        x: number;
        y: number;
    };
    tetromino: any[];
    collided: boolean;
}

export const useStage = (player: playerArgs, resetPlayer: () => void) => {
    const [stage, setStage] = useState(createStage());

    useEffect(() => {
        const updateStage = (prevStage: [][][]) => {
            // flush the stage
            const newStage = prevStage.map((row: [][]) =>
                row.map((cell: any[]) =>
                    cell[1] === "clear" ? [0, "clear"] : cell
                )
            );

            // draw the tetromino
            player.tetromino.forEach((row: [], y: number) => {
                row.forEach((value: number, x: number) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? "merged" : "clear"}`,
                        ];
                    }
                });
            });

            // check if we collided
            if (player.collided) {
                resetPlayer();
            }

            return newStage;
        };

        setStage((prev) => updateStage(prev));
    }, [player, resetPlayer]);

    return [stage, setStage] as const;
};
