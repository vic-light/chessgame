"use client";

import './styles.css';
import './chessboard-1.0.0.min.css';

import {Chess} from "chess.js";
import {useEffect} from "react";

export const ChessGame = () => {
    
    
    let board: any = null
    let game = new Chess()
    
    
    
    function onDragStart (source: any, piece: any, position: any, orientation: any) {
        // do not pick up pieces if the game is over
        if (game.isGameOver()) return false;
        
        // only pick up pieces for White
        if (piece.search(/^b/) !== -1) return false;
        
        return true;
    }
    
    function makeRandomMove () {
        var possibleMoves = game.moves();
        
        // game over
        if (possibleMoves.length === 0) return;
        
        var randomIdx = Math.floor(Math.random() * possibleMoves.length);
        game.move(possibleMoves[randomIdx]);
        board.position(game.fen());
    }
    
    
    function onDrop (source:any, target:any) {
        // see if the move is legal
        
        console.log("onDrop", source, target);
        
        try {
            var move = game.move({
                from: source,
                to: target,
                promotion: 'q' // NOTE: always promote to a queen for example simplicity
            });
            
            console.log("onDrop move", move);
        }catch (e){
            return 'snapback';
        }
        
        setTimeout(makeRandomMove, 250);
        
    }

// update the board position after the piece snap
// for castling, en passant, pawn promotion
    function onSnapEnd () {
        board.position(game.fen());
    }
    
    var config = {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd
    };
    
    
    useEffect(() => {
        // @ts-ignore
        board = Chessboard('myBoard', config);
    });
 
    
    
    return(
        <>
            <script src="/js/jquery-3.4.1.min.js"></script>
            <div id="myBoard" className={"bsize"}></div>
            <script src="/js/chessboard-1.0.0.min.js"></script>
            
        </>
    );

};
