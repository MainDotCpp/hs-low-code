import styles from './group-item.module.css'

const GroupItem = ({name, icon}: { name: string, icon: string }) => {
    return <div className={styles.item}>
        <img src={icon} alt=""/>
        <div className={styles.itemName}>{name}</div>
    </div>
}
export default GroupItem