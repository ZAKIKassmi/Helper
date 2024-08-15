CREATE TABLE IF NOT EXISTS "user_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(255) NOT NULL,
	"user_email" varchar(255) NOT NULL,
	"user_password" text NOT NULL,
	CONSTRAINT "user_table_user_email_unique" UNIQUE("user_email")
);
