function saveProgressInLocalStorage(score) {
    localStorage.setItem('score', score);
}

function gameReducer(state, action) {
    switch (action.type) {
        case 'MOUSE_CLICK':
            saveProgressInLocalStorage(state.currentBeats)
            //tak, wiem ze zapisze przed obecnym kliknieciem - poki co zostawiam. Wystarczy tu dodac state.clickPower. Ale nie wiem jak to bedzie wygladac w przyszlosci

            // console.log(state);
            return {
                ...state,
                currentBeats: state.currentBeats + state.clickPower
            }

        case 'GET_SCORE_FROM_LS':
            return {
                ...state,
                currentBeats: Number(action.data.score)
            }

        case 'ITEM_BUY':

            let tempArr = state.inventory.map( (val, index) => {
                if(action.data.itemId === index) {
                    return {...val, quantity: val.quantity + 1}
                }
                else{
                    return val
                }
            })

            return {
                ...state,
                inventory: tempArr
            }

        default:
            // console.log(action);
            throw new Error();
    }
}

export default gameReducer;