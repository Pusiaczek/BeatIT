import { useContext } from 'react';
import GameContext from '../store/game-context';
import styles from './ShopItem.module.css';

function ShopItem(props) {
    const context = useContext(GameContext)
    const realCost = props.data.cost + ((props.data.cost / 10) * props.quantity);
    const unaffordable = (context.getCurrentBeats < realCost) ? true : false;



    const onClickHandler = () => {
        // console.log("ShopItem.js - onClickHandler");
        if (!unaffordable) {
            context.onItemBuy(props.data.id, realCost)
        }
    }

    return (
        <div className={`${styles.shopItem} ${unaffordable ? styles.unaffordable : '' }`}
            onClick={onClickHandler}>

            <p>{`'${props.data.name}'`}</p>
            <p>cost: {Math.round(realCost)}</p>
            <p>Additional BPM: {props.data.bpmPower}</p>
            <p>Owned: {props.quantity}</p>
            {/* <p>{props.data.imgUrl}</p> */}
        </div>
    )
}

export default ShopItem;