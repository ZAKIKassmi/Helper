CREATE INDEX IF NOT EXISTS "appointments_blood_bank_index" ON "appointments" USING btree ("blood_bank_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "appointments_user_id_index" ON "appointments" USING btree ("blood_bank_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "certifications_blood_bank_index" ON "certifications" USING btree ("blood_bank_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "event_blood_bank_index" ON "events" USING btree ("blood_bank_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "facility_blood_bank_index" ON "facility_details" USING btree ("blood_bank_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "services_blood_bank_index" ON "services" USING btree ("blood_bank_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "working_blood_bank_index" ON "working_days_hours" USING btree ("blood_bank_id");