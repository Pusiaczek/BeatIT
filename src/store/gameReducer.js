import achievementsList from "../pseudoBackend/achievementsList";


const saveProgressInLocalStorage = (gameProgress) => {
    // console.log('Zapisujemy progres:', gameProgress);
    localStorage.setItem('beatit_progress', JSON.stringify(gameProgress));
}

const checkAchiCompletion = (achievements, totalClicks, bpmPower) => {
    const newAchievements = achievements.map((achi, index) => {
        if (!achi.isDone) {

            switch (achi.condition) {
                case 'clicks':
                    if (totalClicks >= achi.conditionValue) {
                        // console.log('zaliczamy kliki');
                        alert(`Zaliczamy achi: ${achi.name}`)

                        console.log(achi.id);
                        return {
                            ...achi,
                            isDone: true
                        }
                    }
                    return achi

                case 'bpm':
                    if (bpmPower >= achi.conditionValue) {
                        // console.log('zaliczamy bpmy');
                        alert(`Zaliczamy achi: ${achi.name}`)
                        console.log(achi.id);

                        return {
                            ...achi,
                            isDone: true
                        }
                    }
                    return achi

                default:
                    throw new Error("Wrong achievement case.")
            }



        } else {
            // console.log(achi.id, "Juz było zrobione");
            return achi
        }
    })

    return newAchievements
}


function gameReducer(state, action) {
    switch (action.type) {
        case 'MOUSE_CLICK':
            const mouseClickNewState = {
                ...state,
                currentBeats: state.currentBeats + state.clickPower,
                totalClicks: state.totalClicks + 1,
            }

            saveProgressInLocalStorage(mouseClickNewState)
            return mouseClickNewState


        case 'BEATS_UPDATE':
            const autoBeatsNewState = {
                ...state,
                currentBeats: state.currentBeats + (state.bpmPower / 10)
            }

            saveProgressInLocalStorage(autoBeatsNewState)
            return autoBeatsNewState



        case 'ITEM_BUY':
            // console.log('koszt:', action.data.itemCost);

            let newInventory = state.inventory.map((item, index) => {
                if (action.data.itemId === index) {
                    return { quantity: item.quantity + 1 }
                }
                else {
                    return item
                }
            })

            let newBeats = state.currentBeats -= action.data.itemCost

            const itemBuyNewState = {
                ...state,
                currentBeats: newBeats,
                inventory: newInventory
            }

            saveProgressInLocalStorage(itemBuyNewState)
            return itemBuyNewState



        case 'UPDATE_POWERS':
            const newBpmPower = (state.inventory.reduce((acc, item, index) => {
                if (action.shopData[index].type === "bpmBoost") {
                    return acc + item.quantity * action.shopData[index].boostValue
                }
                return acc
            }, 0))

            const newClickPower = (state.inventory.reduce((acc, item, index) => {
                if (action.shopData[index].type === "clickBoost") {
                    return acc + item.quantity * action.shopData[index].boostValue
                }
                return acc
            }, 0))

            const updateBpmNewState = {
                ...state,
                bpmPower: newBpmPower,
                clickPower: newClickPower + 1
            }

            saveProgressInLocalStorage(updateBpmNewState)

            return updateBpmNewState


        case 'CHECK_ACHI_COMPLETION':
            const newAchievementsArray = checkAchiCompletion(state.achievements, state.totalClicks, state.bpmPower)

            return {
                ...state,
                achievements: newAchievementsArray
            }


        case 'LOAD_PROGRESS':
            console.log("Ładujemy progres:", action.data);

            return action.data

        case 'DELETE_PROGRESS':
            const clearState = {
                currentBeats: 0,
                totalClicks: 0,
                clickPower: 1,
                inventory: new Array(state.inventory.length).fill({
                    quantity: 0
                }),
                achievements: achievementsList
            }

            saveProgressInLocalStorage(clearState)
            return clearState;


        default:
            // console.log(action);
            throw new Error('Wrong gameState reducer case.');
    }
}

export default gameReducer;