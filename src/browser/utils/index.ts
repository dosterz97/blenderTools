export function validateEmail(email: string) {
  const emailRegex = /^([a-zA-Z0-9+_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})$/
  const result = email.match(emailRegex)
  return result !== null
}

export function validateUsername(username: string) {
  const result = username.match(/^[a-zA-Z0-9]{4,20}$/)
  return result !== null
}
