import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const cars = pgTable('cars', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  manufacturer: text('manufacturer'),
  model: text('model'),
  points: integer('points'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});