
import BeatItButton from './BeatItButton';
import styles from './Home.module.css';

function Home(props) {
    


    return (
        <div className={styles.home}>
            <p>Current level: {props.level}</p>
            <p>Current beats: {props.beats}</p>
            <p>Current BPM: {props.bpmPower}</p>
            <BeatItButton />
        </div>
    )
}

export default Home;