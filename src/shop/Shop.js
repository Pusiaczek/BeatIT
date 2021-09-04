import ShopItem from './ShopItem';
import styles from './Shop.module.css';
import InfoPanel from '../components/InfoPanel';
import React from 'react';

function Shop(props) {
    const shopContent = props.data.map((item, index) =>
        <ShopItem key={index} data={item} beats={props.beats} quantity={props.inventory[index].quantity} />
    )

    return (
        <React.Fragment>
            <InfoPanel />

            <div className={styles.shop}>
                {props.data && shopContent}
            </div>

        </React.Fragment>


    )
}

export default Shop;