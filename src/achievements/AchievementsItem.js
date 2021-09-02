

import styles from './AchievementsItem.module.css';

function AchievementsItem(props) {


    return (
        <div className={props.isDone ? `${styles.achievement}` : `${styles.achievement} ${styles.undone}`}>
            <p>{props.name}</p>
            <p>{props.desc}</p>
            <p>{props.isDone.toString()}</p>
        </div>
    )
}

export default AchievementsItem;