import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "utenti_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "utenti" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "settori" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nome" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "libri" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titolo" varchar NOT NULL,
  	"autore" varchar,
  	"prezzo" numeric NOT NULL,
  	"prezzo_scontato" numeric,
  	"editore" varchar NOT NULL,
  	"ean" varchar,
  	"settore_id" integer,
  	"anno_pubblicazione" numeric,
  	"img_copertina_id" integer,
  	"descrizione" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "utenti_registrati" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nome" varchar NOT NULL,
  	"cognome" varchar NOT NULL,
  	"cellulare" varchar NOT NULL,
  	"email" varchar,
  	"scuola" varchar,
  	"classe" numeric,
  	"sezione" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"utenti_id" integer,
  	"media_id" integer,
  	"settori_id" integer,
  	"libri_id" integer,
  	"utenti_registrati_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"utenti_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "offerta_speciale_immagini" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"immagine_id" integer NOT NULL
  );
  
  CREATE TABLE "offerta_speciale" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titolo" varchar DEFAULT 'Offerta Speciale' NOT NULL,
  	"sottotitolo" varchar DEFAULT 'Kit Lettura Estiva' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "utenti_sessions" ADD CONSTRAINT "utenti_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."utenti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "libri" ADD CONSTRAINT "libri_settore_id_settori_id_fk" FOREIGN KEY ("settore_id") REFERENCES "public"."settori"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "libri" ADD CONSTRAINT "libri_img_copertina_id_media_id_fk" FOREIGN KEY ("img_copertina_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_utenti_fk" FOREIGN KEY ("utenti_id") REFERENCES "public"."utenti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_settori_fk" FOREIGN KEY ("settori_id") REFERENCES "public"."settori"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_libri_fk" FOREIGN KEY ("libri_id") REFERENCES "public"."libri"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_utenti_registrati_fk" FOREIGN KEY ("utenti_registrati_id") REFERENCES "public"."utenti_registrati"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_utenti_fk" FOREIGN KEY ("utenti_id") REFERENCES "public"."utenti"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "offerta_speciale_immagini" ADD CONSTRAINT "offerta_speciale_immagini_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "offerta_speciale_immagini" ADD CONSTRAINT "offerta_speciale_immagini_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."offerta_speciale"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "utenti_sessions_order_idx" ON "utenti_sessions" USING btree ("_order");
  CREATE INDEX "utenti_sessions_parent_id_idx" ON "utenti_sessions" USING btree ("_parent_id");
  CREATE INDEX "utenti_updated_at_idx" ON "utenti" USING btree ("updated_at");
  CREATE INDEX "utenti_created_at_idx" ON "utenti" USING btree ("created_at");
  CREATE UNIQUE INDEX "utenti_email_idx" ON "utenti" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "settori_nome_idx" ON "settori" USING btree ("nome");
  CREATE INDEX "settori_updated_at_idx" ON "settori" USING btree ("updated_at");
  CREATE INDEX "settori_created_at_idx" ON "settori" USING btree ("created_at");
  CREATE INDEX "libri_settore_idx" ON "libri" USING btree ("settore_id");
  CREATE INDEX "libri_img_copertina_idx" ON "libri" USING btree ("img_copertina_id");
  CREATE INDEX "libri_updated_at_idx" ON "libri" USING btree ("updated_at");
  CREATE INDEX "libri_created_at_idx" ON "libri" USING btree ("created_at");
  CREATE INDEX "utenti_registrati_updated_at_idx" ON "utenti_registrati" USING btree ("updated_at");
  CREATE INDEX "utenti_registrati_created_at_idx" ON "utenti_registrati" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_utenti_id_idx" ON "payload_locked_documents_rels" USING btree ("utenti_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_settori_id_idx" ON "payload_locked_documents_rels" USING btree ("settori_id");
  CREATE INDEX "payload_locked_documents_rels_libri_id_idx" ON "payload_locked_documents_rels" USING btree ("libri_id");
  CREATE INDEX "payload_locked_documents_rels_utenti_registrati_id_idx" ON "payload_locked_documents_rels" USING btree ("utenti_registrati_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_utenti_id_idx" ON "payload_preferences_rels" USING btree ("utenti_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "offerta_speciale_immagini_order_idx" ON "offerta_speciale_immagini" USING btree ("_order");
  CREATE INDEX "offerta_speciale_immagini_parent_id_idx" ON "offerta_speciale_immagini" USING btree ("_parent_id");
  CREATE INDEX "offerta_speciale_immagini_immagine_idx" ON "offerta_speciale_immagini" USING btree ("immagine_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "utenti_sessions" CASCADE;
  DROP TABLE "utenti" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "settori" CASCADE;
  DROP TABLE "libri" CASCADE;
  DROP TABLE "utenti_registrati" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "offerta_speciale_immagini" CASCADE;
  DROP TABLE "offerta_speciale" CASCADE;`)
}
