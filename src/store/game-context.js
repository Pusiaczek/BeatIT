import React, { useEffect, useReducer, useState } from "react";
import gameReducer from "./gameReducer";
import { toast } from 'react-toastify';


import shopItems from "../pseudoBackend/shopItems";
import achievementsList from "../pseudoBackend/achievementsList";
import sendUpdatedBeats from "../requests/sendUpdatedBeats";

const GameContext = React.createContext({
    onBeatClick: () => { },
    onItemBuy: () => { },
    onDeleteProgress: () => { },

    getCurrentBeats: 0,
    getCurrentLevel: 0,
    getBpmPower: 0,
    getShopItemsData: [],
    getInventory: [],
    getTotalClicks: 0,
    getAchievements: [],
    getClickPower: 0,

});





export function GameContextProvider(props) {
    const GAME_TICK = 100;

    const [gameState, dispatch] = useReducer(gameReducer, {
        currentBeats: 0,
        totalClicks: 0,
        clickPower: 1,
        bpmPower: 0,
        inventory: new Array(shopItems.length).fill({
            quantity: 0,
            type: ''
        }),
        achievements: achievementsList
    })

    const [currentLevel, setCurrentLevel] = useState(1)
    // const [nextLevel, setNextLevel] = useState(10)


    const onBeatClickHandler = () => dispatch({ type: 'MOUSE_CLICK' })

    const deleteProgressHandler = () => {
        dispatch({ type: 'DELETE_PROGRESS' })
    }

    const buyItemHandler = (itemId, itemCost) => {
        // console.log('Kupujemy', shopItems[itemId].name);
        dispatch({
            type: 'ITEM_BUY',
            data: {
                itemId,
                itemCost
            },
        })
    }

    const triggerPopupHandler = (toastText) => {
        toast(toastText, {
            position: 'top-center',
            autoClose: 2000,
            draggable: true
        })
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

        console.log("start interwalu");
        const tick = setInterval(() => {
            // sendUpdatedBeats( gameState.currentBeats, dispatch({ type: 'BEATS_UPDATE', }))
            // prawdopodobnie trzebaby uzyc useCallback odnosnie sendUpdatedBeats

            dispatch({ type: 'BEATS_UPDATE', })

        }, GAME_TICK)


        return (() => {
            clearInterval(tick)
        })


    }, [])


    useEffect(() => {
        let levels = [0];

        while (gameState.currentBeats + 1 > levels[levels.length - 1]) {
            levels.push(Math.pow(2, levels.length - 1) * 10);
        }
        setCurrentLevel(levels.length - 1)

        // if (gameState.currentBeats >= nextLevel) {
        //     setCurrentLevel((prev) => prev + 1)
        //     setNextLevel(Math.pow(2, currentLevel) * 10)
        // }

        dispatch({
            type: 'UPDATE_POWERS',
            shopData: shopItems
        })

        dispatch({
            type: 'CHECK_ACHI_COMPLETION',
            triggerPopup: triggerPopupHandler
        })




    }, [gameState.inventory, gameState.bpmPower, gameState.currentBeats, currentLevel])



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
                getTotalClicks: gameState.totalClicks,
                getAchievements: gameState.achievements,
                getClickPower: gameState.clickPower,

            }
        }>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameContext;


