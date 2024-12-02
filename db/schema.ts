import { AVAILABLE_STATUSES } from "@/data/invoices";
import {
  pgTable,
  serial,
  timestamp,
  integer,
  text,
  pgEnum,
} from "drizzle-orm/pg-core";
// export const statusEnum = pgEnum("status", [
//   "paid",
//   "open",
//   "void",
//   "uncollectible",
// ]);

export type Status = (typeof AVAILABLE_STATUSES)[number]["id"];
const statuses = AVAILABLE_STATUSES.map((status) => status.id) as Array<Status>;

export const statusEnum = pgEnum(
  "status",
  statuses as [Status, ...Array<Status>]
);
export const Invoices = pgTable("invoices", {
  id: serial("id").primaryKey().notNull(),
  createTs: timestamp("createTs").notNull().defaultNow(),
  value: integer("value").notNull(),
  description: text("description").notNull(),
  userId: text("userId").notNull(),
  customerId: integer("customerId")
    .notNull()
    .references(() => Customers.id),
  status: statusEnum("status").notNull(),
});

export const Customers = pgTable("customers", {
  id: serial("id").primaryKey().notNull(),
  createTs: timestamp("createTs").notNull().defaultNow(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  userId: text("userId").notNull(),
});
