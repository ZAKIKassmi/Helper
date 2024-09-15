import "dotenv/config";
import {drizzle} from 'drizzle-orm/postgres-js'
import * as schema from './schema';
import postgres from 'postgres';
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";

declare global {
  var db: PostgresJsDatabase<typeof schema> | undefined;
}

let db: PostgresJsDatabase<typeof schema>;
const queryClient = postgres(process.env.DATABASE_URL as string);

if(process.env.NODE_ENV === "production"){
  db = drizzle(queryClient, {schema, logger: true});
}
else{
  if(!global.db) global.db = drizzle(queryClient, {schema, logger: true});
  db = global.db;
}

export {db};
