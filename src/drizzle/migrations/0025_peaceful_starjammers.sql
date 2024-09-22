ALTER TABLE "user_table" DROP CONSTRAINT "user_table_blood_type_blood_types_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_table" ADD CONSTRAINT "user_table_blood_type_blood_types_id_fk" FOREIGN KEY ("blood_type") REFERENCES "public"."blood_types"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
