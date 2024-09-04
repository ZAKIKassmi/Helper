ALTER TABLE "blood_banks_sessions" RENAME COLUMN "blood_bank_id" TO "user_id";--> statement-breakpoint
ALTER TABLE "blood_banks_sessions" DROP CONSTRAINT "blood_banks_sessions_blood_bank_id_blood_banks_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blood_banks_sessions" ADD CONSTRAINT "blood_banks_sessions_user_id_blood_banks_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."blood_banks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
