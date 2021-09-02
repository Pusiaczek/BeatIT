import React, { useEffect, useReducer, useState } from "react";
import gameReducer from "./gameReducer";

import shopItems from "../pseudoBackend/shopItems";
import achievementsList from "../pseudoBackend/achievementsList";

const GameContext = React.createContext({
    onBeatClick: () => { },
    onItemBuy: () => { },
    onDeleteProgress: () => { },
    onToggleAchiPopup: () => { },

    getCurrentBeats: 0,
    getCurrentLevel: 0,
    getBpmPower: 0,
    getShopItemsData: [],
    getInventory: [],
    getTotalClicks: 0,
    getAchievements: [],
    getShowAchiPopup: false,

});


export function GameContextProvider(props) {
    const GAME_TICK = 100;

    const [gameState, dispatch] = useReducer(gameReducer, {
        currentBeats: 0,
        totalClicks: 0,
        clickPower: 1,
        bpmPower: 0,
        inventory: new Array(shopItems.length).fill({
            quantity: 0
        }),
        achievements: achievementsList
    })

    const [currentLevel, setCurrentLevel] = useState(1)
    const [nextLevel, setNextLevel] = useState(10)
    const [showAchiPopup, setShowAchiPopup] = useState(false)


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
        if (gameState.currentBeats >= nextLevel) {
            setCurrentLevel((prev) => prev + 1)
            setNextLevel(Math.pow(2, currentLevel) * 10)
        }

        dispatch({
            type: 'UPDATE_BPMPOWER',
            shopData: shopItems
        })

        dispatch({
            type: 'CHECK_ACHI_COMPLETION',
        })


        const tick = setInterval(() => {
            dispatch({ type: 'BEATS_UPDATE', })

        }, GAME_TICK)



        return (() => {
            clearInterval(tick)
        })

    }, [gameState.inventory, gameState.bpmPower, gameState.currentBeats, currentLevel, nextLevel])



    return (
        <GameContext.Provider value={
            {
                onBeatClick: onBeatClickHandler,
                onItemBuy: buyItemHandler,
                onDeleteProgress: deleteProgressHandler,
                // onToggleAchiPopup: toggleAchiPopup,

                getCurrentBeats: gameState.currentBeats,
                getCurrentLevel: currentLevel,
                getBpmPower: gameState.bpmPower,
                getShopItemsData: shopItems,
                getInventory: gameState.inventory,
                getTotalClicks: gameState.totalClicks,
                getAchievements: gameState.achievements,
                getShowAchiPopup: showAchiPopup,

            }
        }>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameContext;


