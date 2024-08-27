DO $$ BEGIN
 CREATE TYPE "public"."blood_types_enum" AS ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."days_enum" AS ENUM('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."gender" AS ENUM('Female', 'Male');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."services_enum" AS ENUM('Blood Donation', 'Plasma Donation', 'Platelets Donation', 'Others');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "appointments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"appointment_date" date NOT NULL,
	"appointment_time" time with time zone,
	"user_id" uuid NOT NULL,
	"blood_bank_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blood_banks" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"address" text NOT NULL,
	"password" text NOT NULL,
	"country" integer NOT NULL,
	CONSTRAINT "blood_banks_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blood_stocks" (
	"blood_type_id" integer NOT NULL,
	"blood_bank_id" integer NOT NULL,
	"level" varchar NOT NULL,
	CONSTRAINT "blood_stocks_blood_type_id_blood_bank_id_pk" PRIMARY KEY("blood_type_id","blood_bank_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blood_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"blood_type_name" "blood_types_enum"
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "certifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"license_number" varchar(1024),
	"certification_url" text,
	"blood_bank_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "countries" (
	"id" serial PRIMARY KEY NOT NULL,
	"country_name" varchar(255) NOT NULL,
	CONSTRAINT "countries_country_name_unique" UNIQUE("country_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "email_verification_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar NOT NULL,
	"user_id" uuid,
	"email" varchar(255) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	CONSTRAINT "email_verification_table_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"address" varchar(1024) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"event_date" date NOT NULL,
	"event_time" time with time zone NOT NULL,
	"blood_bank_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "facility_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"number_of_beds" integer NOT NULL,
	"capacity" integer NOT NULL,
	"emergency_contact" varchar(1024),
	"blood_bank_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "password_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"token_hash" text NOT NULL,
	"user_id" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	CONSTRAINT "password_tokens_token_hash_unique" UNIQUE("token_hash")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"service_name" "services_enum" NOT NULL,
	"blood_bank_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"user_email" varchar(255) NOT NULL,
	"email_verified" boolean NOT NULL,
	"picture_url" text,
	"phone_number" varchar(20) NOT NULL,
	"gender" "gender" NOT NULL,
	"is_eligible" boolean NOT NULL,
	"date_of_birth" date NOT NULL,
	"user_password" text NOT NULL,
	"github_id" integer,
	"username" varchar,
	"google_id" text,
	"blood_type" integer,
	CONSTRAINT "user_table_user_email_unique" UNIQUE("user_email"),
	CONSTRAINT "user_table_github_id_unique" UNIQUE("github_id"),
	CONSTRAINT "user_table_google_id_unique" UNIQUE("google_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "working_days_hours" (
	"id" serial PRIMARY KEY NOT NULL,
	"working_day" "days_enum" NOT NULL,
	"starts_at" time NOT NULL,
	"ends_at" time NOT NULL,
	"blood_bank_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "appointments" ADD CONSTRAINT "appointments_user_id_user_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "appointments" ADD CONSTRAINT "appointments_blood_bank_id_blood_banks_id_fk" FOREIGN KEY ("blood_bank_id") REFERENCES "public"."blood_banks"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blood_banks" ADD CONSTRAINT "blood_banks_country_countries_id_fk" FOREIGN KEY ("country") REFERENCES "public"."countries"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blood_stocks" ADD CONSTRAINT "blood_stocks_blood_type_id_blood_types_id_fk" FOREIGN KEY ("blood_type_id") REFERENCES "public"."blood_types"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blood_stocks" ADD CONSTRAINT "blood_stocks_blood_bank_id_blood_banks_id_fk" FOREIGN KEY ("blood_bank_id") REFERENCES "public"."blood_banks"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "certifications" ADD CONSTRAINT "certifications_blood_bank_id_blood_banks_id_fk" FOREIGN KEY ("blood_bank_id") REFERENCES "public"."blood_banks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "email_verification_table" ADD CONSTRAINT "email_verification_table_user_id_user_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "events" ADD CONSTRAINT "events_blood_bank_id_blood_banks_id_fk" FOREIGN KEY ("blood_bank_id") REFERENCES "public"."blood_banks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "facility_details" ADD CONSTRAINT "facility_details_blood_bank_id_blood_banks_id_fk" FOREIGN KEY ("blood_bank_id") REFERENCES "public"."blood_banks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "password_tokens" ADD CONSTRAINT "password_tokens_user_id_user_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "services" ADD CONSTRAINT "services_blood_bank_id_blood_banks_id_fk" FOREIGN KEY ("blood_bank_id") REFERENCES "public"."blood_banks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_user_table_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user_table"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_table" ADD CONSTRAINT "user_table_blood_type_blood_types_id_fk" FOREIGN KEY ("blood_type") REFERENCES "public"."blood_types"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "working_days_hours" ADD CONSTRAINT "working_days_hours_blood_bank_id_blood_banks_id_fk" FOREIGN KEY ("blood_bank_id") REFERENCES "public"."blood_banks"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
