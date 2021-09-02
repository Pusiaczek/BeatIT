
import { useContext, useEffect } from 'react';
import GameContext from '../store/game-context';
import styles from './Footer.module.css';


function Footer(){
    const ctx = useContext(GameContext)


    return (
        <div className={styles.footer}>
            <button className={styles.deleteProgress} onClick={ctx.onDeleteProgress}>Delete progress</button>
            {/* pasuje dodac jakiegos alerta */}
        </div>
    )
}

export default Footer;