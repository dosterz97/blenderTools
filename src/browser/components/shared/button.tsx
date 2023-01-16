import styles from './button.module.scss'

type Props = {
  title: string
  onClick: () => void
}

export const Button = ({ title, onClick }: Props) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {title}
    </button>
  )
}
