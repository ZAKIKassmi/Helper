ALTER TABLE "sessions" ALTER COLUMN "expires_at" TYPE timestamp with time zone
USING to_timestamp(expires_at);