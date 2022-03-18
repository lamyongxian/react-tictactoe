import React, { useState } from "react";

function Game(props) {

    const [count, setCount] = useState(0);
    const [cells, setCells] = useState(Array(9).fill(null));
    const [XWins, setXWins] = useState(0);
    const [OWins, setOWins] = useState(0);
    const [ended, setEnded] = useState(false);
    const [hover, setHover] = useState(-1);

    const checkWinner = (player, cells) => {
        const LINES = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < LINES.length; i++) {
            // Iterate all winning conditions
            const W = LINES[i];
            let found = W.every(c => cells[c] == player);
            if (found) {
                return true;
            }
        }
        
        return false;
    }

    const onCellClick = e => {
        let id = e.target.id;
        //console.log(id);

        if (ended) {
            return;
        }
        
        let player = null;
        let playerCount = null;
        let playerWinFunc = null;

        // Count even O, odd X
        if (count % 2 == 0) { //even
            player = 'O';
            playerCount = OWins;
            playerWinFunc = setOWins;
        } else {
            player = 'X';
            playerCount = XWins;
            playerWinFunc = setXWins;
        }

        let newCells = cells.slice();
        newCells[id] = player;

        setCells(newCells);
        setCount(count + 1);

        // Check winner
        const found = checkWinner(player, newCells);
        if (found) { // end game
            playerWinFunc(playerCount + 1);
            //alert(player + " is winner!");
            props.onWin(player);
        } else if (count+1 >= 9) {
            props.onError("Stale mate!");
        }

        setEnded(found);
    }

    const onRestartClick = e => {
        setCount(0);
        setEnded(false);
        setCells(Array(9).fill(null));
        props.onRestart();
    }

    const onHoverIn = e => {
        let id = e.target.id;
        //console.log(id);
        setHover(id);
    }

    const onHoverOut = e => {
        //let id = e.target.id;
        //console.log(id);
        setHover(-1);
    }


    return (
    <div id="tic-tac-toe">
        <div className="span3 new_span">
            <div className="row">
                <h1 className="span3">Tic Tac Toe</h1>
                <div className="span3">
                    <div className="input-prepend input-append">
                        <span className="add-on win_text">O won</span>
                        <strong id="o_win" className="win_times add-on">{OWins}</strong>
                        <span className="add-on">time(s)</span>
                    </div>
                    <div className="input-prepend input-append">
                        <span className="add-on win_text">X won</span>
                        <strong id="x_win" className="win_times add-on">{XWins}</strong>
                        <span className="add-on">time(s)</span>
                    </div>

                </div>
            </div>

            <ul className="row" id="game">
                {
                    cells.map((cell, i) => {
                        if (cell) {
                            return <li id={i} 
                                className={"btn span1" + (cell == 'X' ? " btn-info" : " btn-primary") } 
                                key={i}>
                                    {cell}
                                </li>
                        } else {
                            return <li id={i}
                                className="btn span1"
                                key={i}
                                onClick={onCellClick}
                                onMouseEnter={onHoverIn}
                                onMouseLeave={onHoverOut}
                                >{i == hover ? 
                                    (count % 2 == 0 ? 'O' : 'X') : '+'}</li>
                        }
                    })
                }
                {/*<li id="one" className="btn span1">+</li>
                <li id="two" className="btn span1">+</li>
                <li id="three" className="btn span1">+</li>
                <li id="four" className="btn span1">+</li>
                <li id="five" className="btn span1">+</li>
                <li id="six" className="btn span1">+</li>
                <li id="seven" className="btn span1">+</li>
                <li id="eight" className="btn span1">+</li>
                <li id="nine" className="btn span1">+</li>*/}
            </ul>

            <div className="clr">&nbsp;</div>
            <div className="row">
                <a href="#" id="reset" onClick={onRestartClick} className="btn-success btn span3">Restart</a>
            </div>
        </div>
    </div>)
}

export default Game;