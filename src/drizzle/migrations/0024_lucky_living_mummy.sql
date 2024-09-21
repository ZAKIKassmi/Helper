ALTER TABLE "user_table" ADD COLUMN "country_code" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "user_table" ADD COLUMN "zip" varchar(20);--> statement-breakpoint
ALTER TABLE "user_table" ADD COLUMN "province" varchar(255);--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_table" ADD CONSTRAINT "user_table_country_code_countries_id_fk" FOREIGN KEY ("country_code") REFERENCES "public"."countries"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_id_index" ON "user_table" USING btree ("id");