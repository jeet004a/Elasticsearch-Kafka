require('dotenv').config()


export const DB_URL=process.env.DB_URL
export const PORT=process.env.PORT || 5000
export const JWT_SECRET=process.env.JWT_SECRET || 'user_service_secret'
export const JWT_EXPIRES_IN=process.env.JWT_EXPIRES_IN