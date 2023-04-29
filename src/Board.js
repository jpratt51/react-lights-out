import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

const Board = ({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.5 }) => {
    const randomBoolean = (chanceLightStartsOn) => {
        const num = chanceLightStartsOn * 10;
        const randNum = Math.floor(Math.random() * 10) + 1;
        const boolVal = randNum < num ? true : false;
        return boolVal;
    };

    const [board, setBoard] = useState(createBoard());

    /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
    function createBoard() {
        let initialBoard = [];
        // TODO: create array-of-arrays of true/false values

        for (let i = 0; i < ncols; i++) {
            initialBoard.push([]);
            for (let j = 0; j < nrows; j++) {
                initialBoard[i].push({
                    boolVal: randomBoolean(chanceLightStartsOn),
                    idx: `${i}-${j}`,
                });
            }
        }
        return initialBoard;
    }

    function hasWon() {
        // TODO: check the board in state to determine whether the player has won.
        let status = "won";
        for (let i of board) {
            for (let j of i) {
                if (j.boolVal === true) {
                    status = "keep trying";
                }
            }
        }
        return status;
    }

    function flipCellsAround(coord) {
        const [y, x] = coord.split("-").map(Number);
        const flipCell = (y, x, boardCopy) => {
            // if this coord is actually on board, flip it
            // console.log(x, x >= 0 ? true : false);
            // console.log(x, ncols, x < ncols ? true : false);
            // console.log(y, y >= 0 ? true : false);
            // console.log(y, y < nrows ? true : false);
            if (x >= 0 && x <= ncols && y >= 0 && y <= nrows) {
                try {
                    boardCopy[y][x].boolVal = !boardCopy[y][x].boolVal;
                } catch {}
            }
            if (x + 1 >= 0 && x + 1 <= ncols && y >= 0 && y <= nrows) {
                try {
                    boardCopy[y][x + 1].boolVal = !boardCopy[y][x + 1].boolVal;
                } catch {}
            }
            if (x - 1 >= 0 && x - 1 <= ncols && y >= 0 && y <= nrows) {
                try {
                    boardCopy[y][x - 1].boolVal = !boardCopy[y][x - 1].boolVal;
                } catch {}
            }
            if (x >= 0 && x <= ncols && y + 1 >= 0 && y + 1 <= nrows) {
                try {
                    boardCopy[y + 1][x].boolVal = !boardCopy[y + 1][x].boolVal;
                } catch {}
            }
            if (x >= 0 && x <= ncols && y - 1 >= 0 && y - 1 <= nrows) {
                try {
                    boardCopy[y - 1][x].boolVal = !boardCopy[y - 1][x].boolVal;
                } catch {}
            }
            return boardCopy;
        };
        // TODO: Make a (deep) copy of the oldBoard
        const boardCopy = board.slice();

        // TODO: in the copy, flip this cell and the cells around it
        const newBoard = flipCell(y, x, boardCopy);

        // TODO: return the copy
        setBoard(newBoard);
        return newBoard;
    }

    // if the game is won, just show a winning msg & render nothing else

    // TODO

    if (hasWon() === "won") {
        return <div>You win!</div>;
    } else {
        // make table board
        return board.map((col, index) => (
            <table key={index}>
                <tbody>
                    <tr>
                        {col.map((val) => (
                            <Cell
                                value={val.boolVal}
                                index={val.idx}
                                key={val.idx}
                                flipCellsAround={flipCellsAround}
                            />
                        ))}
                    </tr>
                </tbody>
            </table>
        ));
    }
};

export default Board;
