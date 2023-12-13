"use client";

import './styles.css';
import './chessboard-1.0.0.min.css';

// @ts-ignore
import {Game} from 'js-chess-engine';
import {useEffect, useState} from "react";

import {ChessBoard} from './chessbrd/chessbrd';
import {Modal} from "@/components/modal/Modal";


var message_data = {};

var board: any = null
const game = new Game();





export const ChessGameAI = () => {

    const [viewAlert, setViewAlert] = useState(false);

    function onDragStart (source: any, piece: any, position: any, orientation: any) {
        // do not pick up pieces if the game is over
        if (isGameOver()) return false;

        // only pick up pieces for White
        if (piece.search(/^b/) !== -1) return false;

        return true;
    }

    function isGameOver() : boolean
    {
        let obj: any = game.exportJson();

        return obj.isFinished;
    }

    function isCheckMate() : boolean
    {
        let obj: any = game.exportJson();

        if (obj.isFinished && obj.checkMate){
            return true;
        }

        return false;
    }

    function makeRandomMove () {

        game.aiMove();
        board.position(game.exportFEN());

        if (isGameOver()){

            if (isCheckMate()){
                showAlert("Увы!!! Вы Проиграли!!!", "ПОРАЖЕНИЕ");
            }else {
                showAlert("Игра завершилась в ничью", "Ничья!!!");
            }

        }

    }


    function onDrop (source: string, target: string) {
        // see if the move is legal

        console.log("onDrop", source, target);

        try {
            var move = game.move(source.toUpperCase(), target.toUpperCase());

            console.log("onDrop move", move);

            if (!isGameOver()){
                setTimeout(makeRandomMove, 250);
            }else {

                if (isCheckMate()){
                    showAlert("Поздравляем!!! Вы Выиграли!!!", "ПОБЕДА");
                }else {
                    showAlert("Игра завершилась в ничью", "Ничья!!!");
                }

            }

        }catch (e){
            return 'snapback';
        }



    }

// update the board position after the piece snap
// for castling, en passant, pawn promotion
    function onSnapEnd () {
        board.position(game.exportFEN());
    }

    const onAlertClose = () => {
        setViewAlert(false);
    };


    const showAlert = (cont: string, title: string): void => {

        message_data = {
            title: title,
            content: cont
        };

        setViewAlert(true);

    };

    const onClickCall = () => {
        showAlert("Игра началась!!!", "Шахматный клуб");
    };

    var config = {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd
    };


    useEffect(() => {

        console.log("call use effect!!!");
        board = ChessBoard('myBoard', config);

    }, []);



    return(
        <>
            <div id="myBoard" className={"bsize"}></div>
            {viewAlert && <Modal datap={message_data} onClose={onAlertClose}/>}
            <button onClick={onClickCall}>Alert call</button>
        </>
    );



};
