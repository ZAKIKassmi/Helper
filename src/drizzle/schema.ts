import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";


export const userTable = pgTable('user_table',{
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    firstName: varchar('first_name',{length: 255}).notNull(),
    lastName: varchar('last_name',{length: 255}).notNull(),
    email: varchar('user_email',{length: 255}).unique().notNull(),
    password: text('user_password').notNull(),
});

export const sessions = pgTable('sessions',{
    id: text('id').primaryKey(),
    userId: uuid('user_id').references(()=>userTable.id,{
        onDelete: 'cascade'
    }).notNull(),
    expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull(),
}); 