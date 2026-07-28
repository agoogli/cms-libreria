import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "editori" (
      "id" serial PRIMARY KEY NOT NULL,
      "nome" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS "editori_nome_idx" ON "editori" USING btree ("nome");

    CREATE TABLE IF NOT EXISTS "novita_in_risalto" (
      "id" serial PRIMARY KEY NOT NULL,
      "titolo" varchar DEFAULT 'Novità in risalto' NOT NULL,
      "sottotitolo" varchar DEFAULT 'Kit Lettura Estiva' NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "novita_in_risalto_immagini" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "immagine_id" integer NOT NULL
    );

    ALTER TABLE "settori" ADD COLUMN IF NOT EXISTS "nome_visualizzato" varchar DEFAULT 'Nome settore' NOT NULL;
    ALTER TABLE "settori" ADD COLUMN IF NOT EXISTS "ordine_visuale" numeric;
    ALTER TABLE "libri" ADD COLUMN IF NOT EXISTS "mese_pubblicazione" varchar;

    ALTER TABLE "libri" DROP COLUMN IF EXISTS "editore";
    ALTER TABLE "libri" ADD COLUMN IF NOT EXISTS "editore_id" integer;

    DO $$ BEGIN
      ALTER TABLE "libri" ADD CONSTRAINT "libri_editore_id_editori_id_fk" FOREIGN KEY ("editore_id") REFERENCES "public"."editori"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "novita_in_risalto_immagini" ADD CONSTRAINT "novita_in_risalto_immagini_immagine_id_media_id_fk" FOREIGN KEY ("immagine_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "novita_in_risalto_immagini" ADD CONSTRAINT "novita_in_risalto_immagini_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."novita_in_risalto"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "novita_in_risalto_immagini" CASCADE;
    DROP TABLE IF EXISTS "novita_in_risalto" CASCADE;
    DROP TABLE IF EXISTS "editori" CASCADE;
  `)
}
