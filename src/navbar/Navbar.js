import { Link } from 'react-router-dom';

import styles from './Navbar.module.css';

function Navbar(props) {

    return (
        <div className={styles.navbar}>
            <Link to="/home" className={styles.navbarItem}>HOME</Link>
            <Link to="/achievements" className={styles.navbarItem}>ACHIEVEMENTS</Link>
            <Link to="/shop" className={styles.navbarItem}>SHOP</Link>
        </div>

    )
}

export default Navbar;