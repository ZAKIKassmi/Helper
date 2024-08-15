ALTER TABLE "user_table" RENAME COLUMN "username" TO "first_name";--> statement-breakpoint
ALTER TABLE "user_table" ADD COLUMN "last_name" varchar(255) NOT NULL;