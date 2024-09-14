ALTER TABLE "events" RENAME COLUMN "event_time" TO "startsAt";--> statement-breakpoint
ALTER TABLE "events" ADD COLUMN "endsAt" time with time zone NOT NULL;