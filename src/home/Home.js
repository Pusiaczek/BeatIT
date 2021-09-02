import InfoPanel from '../components/InfoPanel';
import BeatItButton from './BeatItButton';
import styles from './Home.module.css';

function Home(props) {
    

    return (
        <div className={styles.home}>
            <InfoPanel />
            
            <BeatItButton />
        </div>
    )
}

export default Home;