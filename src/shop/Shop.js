import ShopItem from './ShopItem';
import styles from './Shop.module.css';
import InfoPanel from '../components/InfoPanel';

function Shop(props) {
    const shopContent = props.data.map((item, index) =>
        <ShopItem key={index} data={item} beats={props.beats} quantity={props.inventory[index].quantity} />
    )

    return (
        <div>
            <InfoPanel />

            <div className={styles.shop}>
                {props.data && shopContent}
            </div>
        </div>

    )
}

export default Shop;