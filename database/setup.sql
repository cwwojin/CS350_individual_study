CREATE SCHEMA IF NOT EXISTS customer;
CREATE SCHEMA IF NOT EXISTS "order";

CREATE TABLE customer."user" (
  "id" SERIAL PRIMARY KEY,
  "user_name" varchar(50) NOT NULL,
  "address" varchar(255) default '',
  "created_at" timestamp DEFAULT (current_timestamp),
  "updated_at" timestamp DEFAULT (current_timestamp)
);

CREATE TABLE "order"."product" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50) NOT NULL,
  "price" integer not null,
  "available" boolean default true,
  "created_at" timestamp DEFAULT (current_timestamp),
  "updated_at" timestamp DEFAULT (current_timestamp)
);

CREATE TABLE "order"."order" (
  "id" SERIAL PRIMARY KEY,
  "customer_id" integer NOT NULL,
  "product_id" integer not null,
  "amount" integer not null,
  "price" integer not null,
  "address" varchar(255) default '',
  "created_at" timestamp DEFAULT (current_timestamp),
  "updated_at" timestamp DEFAULT (current_timestamp)
);

-- FOREIGN KEY

ALTER TABLE "order"."order" ADD FOREIGN KEY ("customer_id") REFERENCES customer."user" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "order"."order" ADD FOREIGN KEY ("product_id") REFERENCES "order"."product" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- TRIGGER : auto update 'updated_at' columns

CREATE OR REPLACE FUNCTION customer.trigger_set_timestamp()
  RETURNS trigger
  LANGUAGE plpgsql
AS $function$
  BEGIN
  NEW.updated_at=now();
  RETURN NEW;
  END;
$function$
;

CREATE TRIGGER set_timestamp BEFORE UPDATE ON customer."user" FOR EACH row EXECUTE PROCEDURE customer.trigger_set_timestamp();

CREATE OR REPLACE FUNCTION "order".trigger_set_timestamp()
  RETURNS trigger
  LANGUAGE plpgsql
AS $function$
  BEGIN
  NEW.updated_at=now();
  RETURN NEW;
  END;
$function$
;

CREATE TRIGGER set_timestamp BEFORE UPDATE ON "order".product FOR EACH row EXECUTE PROCEDURE "order".trigger_set_timestamp();
CREATE TRIGGER set_timestamp BEFORE UPDATE ON "order"."order" FOR EACH row EXECUTE PROCEDURE "order".trigger_set_timestamp();