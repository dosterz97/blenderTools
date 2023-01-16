import styles from './loading.module.scss'

export const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  )
}
