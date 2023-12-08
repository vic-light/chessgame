"use client";

import './styles.css';
import './chessboard-1.0.0.min.css';

// @ts-ignore
import {Game} from 'js-chess-engine';
import {useEffect} from "react";

import {ChessBoard} from './chessbrd/chessbrd';

export const ChessGameAI = () => {
    
    let board: any = null
    let game = new Game();
    
    
    
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
    
    function makeRandomMove () {
        
        game.aiMove();
        board.position(game.exportFEN());
    }
    
    
    function onDrop (source: string, target: string) {
        // see if the move is legal
        
        console.log("onDrop", source, target);
        
        try {
            var move = game.move(source.toUpperCase(), target.toUpperCase());
            
            console.log("onDrop move", move);
            
            setTimeout(makeRandomMove, 250);
            
        }catch (e){
            return 'snapback';
        }
        
        
        
    }

// update the board position after the piece snap
// for castling, en passant, pawn promotion
    function onSnapEnd () {
        board.position(game.exportFEN());
    }
    
    var config = {
        draggable: true,
        position: 'start',
        onDragStart: onDragStart,
        onDrop: onDrop,
        onSnapEnd: onSnapEnd
    };
    
    
    useEffect(() => {
       
        board = ChessBoard('myBoard', config);
    });
    
    
    
    return(
        <>
            <div id="myBoard" className={"bsize"}></div>
        </>
    );
    
    
    
};
