CREATE TABLE "registry" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "name" text NOT NULL,
        "type" text NOT NULL,
        "registry_item" jsonb NOT NULL,
        "created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "author" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "name" text NOT NULL,
        "email" text,
        "created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "commit" (
        "hash" text PRIMARY KEY NOT NULL,
        "message" text NOT NULL,
        "author_id" uuid NOT NULL,
        "created_at" timestamp DEFAULT now(),
        CONSTRAINT "commit_author_id_author_id_fk" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE cascade ON UPDATE no action
);
--> statement-breakpoint
CREATE TABLE "theme" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        "name" text NOT NULL,
        "commit_hash" text NOT NULL,
        "config" jsonb NOT NULL,
        "created_at" timestamp DEFAULT now(),
        CONSTRAINT "theme_commit_hash_commit_hash_fk" FOREIGN KEY ("commit_hash") REFERENCES "commit"("hash") ON DELETE cascade ON UPDATE no action
);
