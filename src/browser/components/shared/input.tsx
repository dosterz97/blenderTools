import styles from './input.module.scss'

type Props = {
  type?: string
  label?: string
  value?: string
  placeholder?: string
  onChange?: (value: string) => void
}

export const Input = ({ type, label, value, placeholder, onChange }: Props) => {
  return (
    <div className={styles.layout}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={styles.input}
        type={type || 'text'}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange?.(e.target.value)}
      ></input>
    </div>
  )
}
