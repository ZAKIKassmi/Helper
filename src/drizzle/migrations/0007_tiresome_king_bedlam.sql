CREATE TABLE IF NOT EXISTS "email_verification_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar NOT NULL,
	"user_id" uuid,
	"email" varchar(255) NOT NULL,
	"expirest_at" date,
	CONSTRAINT "email_verification_table_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "email_verification_table" ADD CONSTRAINT "email_verification_table_user_id_user_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
