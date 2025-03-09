import { Pool } from "pg";
import { DB_URL } from "../config";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const pool=new Pool({
    connectionString: DB_URL
})

export const DB:NodePgDatabase<typeof schema>=drizzle(pool,{schema})