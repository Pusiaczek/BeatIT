import AchievementsItem from './AchievementsItem';
import styles from './Achievements.module.css';

function Achievements(props) {

    const content = props.data.map((achi, index) => {

        return (
            <AchievementsItem key={achi.id} name={achi.name} desc={achi.description} isDone={achi.isDone} />
        )
    })


    return (
        <div className={styles.achievementsList}>
            {props.data && content}
        </div>
    )
}

export default Achievements;