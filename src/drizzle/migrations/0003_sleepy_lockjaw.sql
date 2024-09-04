ALTER TABLE "email_verification_table" ADD COLUMN "blood_bank_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "email_verification_table" ADD CONSTRAINT "email_verification_table_blood_bank_id_blood_banks_id_fk" FOREIGN KEY ("blood_bank_id") REFERENCES "public"."blood_banks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
