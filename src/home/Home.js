
import BeatItButton from './BeatItButton';
import styles from './Home.module.css';

function Home(props) {
    

    return (
        <div className={styles.home}>
            <div className={styles.info}>
                <p className={styles.currentLevel}>Level: {props.level}</p>
                <p className={styles.beats}>Beats: {Math.round(props.beats)}</p>
                <p className={styles.bpm}>BPM: {props.bpmPower}</p>
            </div>
            
            <BeatItButton />
        </div>
    )
}

export default Home;