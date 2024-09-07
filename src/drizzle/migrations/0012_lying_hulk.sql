ALTER TYPE "blood_types_enum" ADD VALUE 'unknown';--> statement-breakpoint
ALTER TABLE "user_table" ALTER COLUMN "address" DROP NOT NULL;