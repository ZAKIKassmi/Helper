ALTER TABLE "user_table" ADD COLUMN "github_id" integer;--> statement-breakpoint
ALTER TABLE "user_table" ADD COLUMN "username" varchar;--> statement-breakpoint
ALTER TABLE "user_table" ADD CONSTRAINT "user_table_github_id_unique" UNIQUE("github_id");