import React, { useEffect, useReducer, useState } from "react";
import gameReducer from "./gameReducer";

import shopItems from "../pseudoBackend/shopItems";

const GameContext = React.createContext({
    onBeatClick: () => { },
    onItemBuy: () => { },
    onDeleteProgress: () => { },

    getCurrentBeats: 0,
    getCurrentLevel: 0,
    getBpmPower: 0,
    getShopItemsData: [],
    getInventory: [],

});


export function GameContextProvider(props) {
    const GAME_TICK = 2500;


    const [gameState, dispatch] = useReducer(gameReducer, {
        currentBeats: 0,
        clickPower: 10,
        bpmPower: 0,
        inventory: new Array(shopItems.length).fill({
            quantity: 0
        }),
    })


    const [currentLevel, setCurrentLevel] = useState(1)
    const [nextLevel, setNextLevel] = useState(10)


    const onBeatClickHandler = () => dispatch({ type: 'BEATS_UPDATE', value: gameState.clickPower })

    const buyItemHandler = (itemId, itemCost) => {
        console.log('Kupujemy', shopItems[itemId].name);
        dispatch({
            type: 'ITEM_BUY',
            data: {
                itemId,
                itemCost
            },
        })
    }

    const deleteProgressHandler = () => {
        dispatch({ type: 'DELETE_PROGRESS' })
    }

    useEffect(() => {
        console.log("Wykonam sie raz! \n", "Tu sprawdzimy czy jest cos w localStorage");
        // console.log(!!localStorage.getItem('beatit_progress'));

        if (localStorage.getItem('beatit_progress')) {
            dispatch({
                type: 'LOAD_PROGRESS',
                data: JSON.parse(localStorage.getItem('beatit_progress'))
            })
        }

    }, [])
    

    useEffect(() => {
        console.log('Odświeżamy gameState');

        if (gameState.currentBeats >= nextLevel) {
            setCurrentLevel((prev) => prev + 1)
            setNextLevel(Math.pow(2, currentLevel) * 10)
        }

    },
        [gameState, currentLevel, nextLevel])





    useEffect(() => {
        dispatch({
            type: 'UPDATE_BPMPOWER',
            shopData: shopItems
        })


        const tick = setInterval(() => {
            dispatch({ type: 'BEATS_UPDATE', value: (gameState.bpmPower) })


        }, GAME_TICK)



        return (() => {
            clearInterval(tick)
        })

    }, [gameState.inventory, gameState.bpmPower])




    


    return (
        <GameContext.Provider value={
            {
                onBeatClick: onBeatClickHandler,
                onItemBuy: buyItemHandler,
                onDeleteProgress: deleteProgressHandler,

                getCurrentBeats: gameState.currentBeats,
                getCurrentLevel: currentLevel,
                getBpmPower: gameState.bpmPower,
                getShopItemsData: shopItems,
                getInventory: gameState.inventory,


            }
        }>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameContext;


