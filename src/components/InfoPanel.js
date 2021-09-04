import styles from './InfoPanel.module.css';
import { useContext } from 'react';
import GameContext from '../store/game-context';


function InfoPanel(props) {
    const ctx = useContext(GameContext)


    return (
        <div className={styles.info}>
            <p className={styles.currentLevel}>Level: {ctx.getCurrentLevel}</p>
            <p className={styles.beats}>Beats: {Math.round(ctx.getCurrentBeats)}</p>
            <p className={styles.clikPowah}></p>
            <p className={styles.powah}>BPM: {ctx.getBpmPower} | Click Powah: {ctx.getClickPower}</p>
        </div>
    )
}

export default InfoPanel;