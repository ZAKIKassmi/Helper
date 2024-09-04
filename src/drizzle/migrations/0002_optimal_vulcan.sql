CREATE TABLE IF NOT EXISTS "blood_banks_sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"blood_bank_id" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blood_banks_sessions" ADD CONSTRAINT "blood_banks_sessions_blood_bank_id_blood_banks_id_fk" FOREIGN KEY ("blood_bank_id") REFERENCES "public"."blood_banks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
