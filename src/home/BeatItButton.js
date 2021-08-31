import { useContext } from 'react';
import GameContext from '../store/game-context';


import styles from './BeatItButton.module.css';

function BeatItButton() {
    const ctx = useContext(GameContext)


    return (
        <button
            className={styles.beatItButton}
            onClick={ctx.onBeatClick}
        >
            
        </button>
    )
}

export default BeatItButton;