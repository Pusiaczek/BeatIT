import React, { useEffect, useReducer, useState } from "react";
import gameReducer from "./gameReducer";

import shopItems from "../pseudoBackend/shopItems";

const GameContext = React.createContext({
    onBeatClick: () => { },
    onBuyItem: () => { },

    getCurrentBeats: 0,
    getCurrentLevel: 0,
    getBpmPower: 0,
    getShopItemsData: [],
    getInventory: [],

});


export function GameContextProvider(props) {
    const [gameState, dispatch] = useReducer(gameReducer, {
        currentBeats: 0,
        clickPower: 1,
        inventory: new Array(shopItems.length).fill({
            bpmPower: 0,
            quantity: 0
        }),
    })


    const [currentLevel, setCurrentLevel] = useState(1)
    const [nextLevel, setNextLevel] = useState(10)
    const [bpmPower, setBpmPower] = useState(0)


    const onBeatClickHandler = () => dispatch({ type: 'MOUSE_CLICK' })

    const buyItemHandler = (itemId, itemPower) => {
        console.log('Kupujemy', shopItems[itemId].name);
        dispatch({
            type: 'ITEM_BUY',
            data: {
                itemId
            },
        })
    }



    const sumBpmPower = () => {
        return (gameState.inventory.reduce((acc, itemsSet ) => {
            console.log(itemsSet.quantity, itemsSet.bpmPower);
            return acc + (itemsSet.quantity * itemsSet.bpmPower)
        }, 0))
    }

    useEffect(() => {
        // console.log('beats', gameState.currentBeats);
        // console.log('level: ', currentLevel);
        // console.log('next level: ', nextLevel);

        if (gameState.currentBeats >= nextLevel) {
            setCurrentLevel((prev) => prev + 1)
            setNextLevel(Math.pow(2, currentLevel) * 10)
        }


        sumBpmPower()
        // console.log(sumBpmPower());



    },
        [gameState.currentBeats, currentLevel, nextLevel, gameState.inventory])




    useEffect(() => {
        console.log("Wykonam sie raz! \n", "Tu sprawdzimy czy jest cos w localStorage");

        if (localStorage.getItem('score') > 0) {
            dispatch({
                type: 'GET_SCORE_FROM_LS',
                data: {
                    score: localStorage.getItem('score')
                }
            })
        }
    }, [])


    return (
        <GameContext.Provider value={
            {
                onBeatClick: onBeatClickHandler,
                onBuyItem: buyItemHandler,

                getCurrentBeats: gameState.currentBeats,
                getCurrentLevel: currentLevel,
                getBpmPower: bpmPower,
                getShopItemsData: shopItems,
                getInventory: gameState.inventory,


            }
        }>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameContext;


