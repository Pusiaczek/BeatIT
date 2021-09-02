import styles from './AchievementCompleteAlert.module.css';

function AchievementCompleteAlert(props) {


    return (
        <div className={styles.achievementCompletedAlert}>
            {props.id}
        </div>
    )
}

export default AchievementCompleteAlert;