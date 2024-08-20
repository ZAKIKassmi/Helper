import { relations } from "drizzle-orm";
import { bigserial, boolean, date, integer, pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";


export const userTable = pgTable('user_table',{
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    firstName: varchar('first_name',{length: 255}).notNull(),
    lastName: varchar('last_name',{length: 255}).notNull(),
    email: varchar('user_email',{length: 255}).unique().notNull(),
    emailVerified: boolean('email_verified').notNull(),
    password: text('user_password').notNull(),
    githubId: integer('github_id').unique(),
    username: varchar('username'),
    googleId: text("google_id").unique(),

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


export const emailVerificationTable = pgTable('email_verification_table',{
    id: serial('id').primaryKey().notNull(),
    code: varchar('code').notNull(),
    userId: uuid('user_id').references(()=>userTable.id,{
        onDelete: 'cascade'
    }).unique(),
    email: varchar('email',{length: 255}).notNull(),
    expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull(),
})

export const passwordTokensTable = pgTable('password_tokens',{
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    tokenHash: text('token_hash').unique().notNull(),
    userId: uuid('user_id').references(()=>userTable.id,{
        onDelete: 'cascade',
    }).notNull(),
    expiresAt: timestamp("expires_at", {
		withTimezone: true,
		mode: "date"
	}).notNull(),
});

//Setting up relation for drizzle orm.
export const usersRelations = relations(userTable, ({ many, one }) => ({
    sessions: many(sessions),
    emailVerification: one(emailVerificationTable),
    passwordReset: one(passwordTokensTable)
  }));

export const emailVerificationTableRelations = relations(emailVerificationTable,({one})=>{
    return {
        user: one(userTable,{
            fields: [emailVerificationTable.userId],
            references: [userTable.id],
        })
    }
});

export const passwordTokensTableRelations = relations(passwordTokensTable,({one})=>{
    return {
        user: one(userTable,{
            fields: [passwordTokensTable.userId],
            references: [userTable.id]
        })
    }
} )

export const sessionsRelation = relations(sessions, ({ one }) => ({
    author: one(userTable, {
        fields: [sessions.userId],
        references: [userTable.id],
    }),
}));