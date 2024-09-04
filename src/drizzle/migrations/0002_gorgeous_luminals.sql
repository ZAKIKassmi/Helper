ALTER TABLE "countries" RENAME COLUMN "country_name" TO "name";--> statement-breakpoint
ALTER TABLE "countries" DROP CONSTRAINT "countries_country_name_unique";--> statement-breakpoint
ALTER TABLE "countries" ADD COLUMN "dial_code" varchar(8) NOT NULL;--> statement-breakpoint
ALTER TABLE "countries" ADD COLUMN "code" varchar(3) NOT NULL;--> statement-breakpoint
ALTER TABLE "countries" ADD CONSTRAINT "countries_name_unique" UNIQUE("name");