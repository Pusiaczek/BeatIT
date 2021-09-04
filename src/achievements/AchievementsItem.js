

import styles from './AchievementsItem.module.css';

function AchievementsItem(props) {


    return (
        <div className={props.isDone ? `${styles.achievement}` : `${styles.achievement} ${styles.undone}`}>
            <div className={styles.labelContainer}>
                <p className={styles.achiName}>{props.name}</p>
                <p className={styles.achiDescription}>{props.desc}</p>
            </div>
        </div>
    )
}

export default AchievementsItem;