import bcrypt from 'bcrypt'

export async function hashPassword(password: string, saltRounds: number) {
   return bcrypt.hash(password, saltRounds).then(hash => {
      return hash
   })
}

export async function isPasswordValid(password: string, hashedPassword: string) {
   return bcrypt.compare(password, hashedPassword).then(isValid => {
      return isValid
   })
}
