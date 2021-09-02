function saveProgressInLocalStorage(gameProgress) {
    // console.log('Zapisujemy progres:', gameProgress);
    localStorage.setItem('beatit_progress', JSON.stringify(gameProgress));
}

function gameReducer(state, action) {
    switch (action.type) {
        case 'BEATS_UPDATE':
            const mouseClickNewState = {
                ...state,
                currentBeats: state.currentBeats + action.value
            }

            saveProgressInLocalStorage(mouseClickNewState)
            return mouseClickNewState


        case 'ITEM_BUY':
            console.log('koszt:', action.data.itemCost);

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

        case 'UPDATE_BPMPOWER':
            const newBpmPower = (state.inventory.reduce((acc, inventory, index) => {
                return acc + inventory.quantity * action.shopData[index].bpmPower
            }, 0))

            const updateBpmNewState = { ...state, bpmPower: newBpmPower }

            saveProgressInLocalStorage(updateBpmNewState)

            return updateBpmNewState


        case 'LOAD_PROGRESS':
            console.log("Ładujemy progres:", action.data);

            return action.data

        case 'DELETE_PROGRESS':
            const clearState = {
                currentBeats: 0,
                clickPower: 1,
                inventory: new Array(state.inventory.length).fill({
                    quantity: 0
                })
            }

            saveProgressInLocalStorage(clearState)
            return clearState;


        default:
            // console.log(action);
            throw new Error();
    }
}

export default gameReducer;