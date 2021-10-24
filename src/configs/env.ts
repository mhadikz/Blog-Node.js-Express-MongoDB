require('dotenv').config()

export function dbAddress() {
   return process.env.DB_ADDRESS
}

export function dbUser() {
   return process.env.DB_USER
}

export function dbPass() {
   return process.env.DB_PASS
}

export function port() {
   return process.env.PORT
}
