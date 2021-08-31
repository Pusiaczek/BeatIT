import { useContext } from 'react';
import GameContext from '../store/game-context';
import styles from './ShopItem.module.css';

function ShopItem(props) {
    const context = useContext(GameContext)
    const unaffordable = (props.beats < props.data.cost) ? true : false;

    const onClickHandler = () => {
        // console.log("ShopItem.js - onClickHandler");
        if (!unaffordable) {
            context.onBuyItem(props.data.id)
        }
    }

    return (
        <div className={`${styles.shopItem} ${unaffordable ? styles.unaffordable : '' }`}
            onClick={onClickHandler}
        >
            {/* <p>{props.data.id}</p> */}
            <p>{props.data.name}</p>
            <p>cost: {props.data.cost}</p>
            <p>power: {props.data.bpmPower}</p>
            {/* <p>{props.data.imgUrl}</p> */}
        </div>
    )
}

export default ShopItem;