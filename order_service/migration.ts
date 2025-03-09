import { Pool } from "pg"
import { DB_URL } from "./src/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { migrate } from "drizzle-orm/node-postgres/migrator"

async function runMigrations() {
    try {
        // console.log('hello')
        console.log('Migrations started.......')
        const pool=new Pool({connectionString:DB_URL})
        const db=drizzle(pool)
        await migrate(db, { migrationsFolder: "./src/db/migrations" });
        console.log('Migrations are successfull')
        pool.end()
    } catch (error) {
        console.log('Migrations error',error)
    }
}


runMigrations()