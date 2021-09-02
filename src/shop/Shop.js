import ShopItem from './ShopItem';
import styles from './Shop.module.css';

function Shop(props) {

    const shopContent = props.data.map((item, index) =>
        <ShopItem key={index} data={item} beats={props.beats} />
    )

    const inventoryContent = props.inventory.map( (item, index) => 
        <p key={index}>{`${props.data[index].name}: ${item.quantity}`}</p>
    )

    return (
        <div>
            <p>Ya beats mon! {Math.round(props.beats)}</p>
            <div className={styles.inventoryList}>
                {inventoryContent}
            </div>
            <div className={styles.shop}>
                {props.data && shopContent}
            </div>
        </div>

    )
}

export default Shop;