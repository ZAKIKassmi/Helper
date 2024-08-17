ALTER TABLE "user_table" ADD COLUMN "google_id" text;--> statement-breakpoint
ALTER TABLE "user_table" ADD CONSTRAINT "user_table_google_id_unique" UNIQUE("google_id");