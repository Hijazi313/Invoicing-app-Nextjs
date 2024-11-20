CREATE TYPE "public"."status" AS ENUM('paid', 'open', 'void', 'uncollectible');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoices" (
	"id" serial PRIMARY KEY NOT NULL,
	"createTs" timestamp DEFAULT now() NOT NULL,
	"value" integer NOT NULL,
	"description" text NOT NULL,
	"status" "status" NOT NULL
);
