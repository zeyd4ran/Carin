import { pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";

export const careerProfilesTable = pgTable("career_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  degree: text("degree").notNull(),
  school: text("school").notNull(),
  skills: jsonb("skills").$type<string[]>().notNull(),
  interests: jsonb("interests").$type<string[]>().notNull(),
  resume: text("resume"),
  completedPrep: jsonb("completed_prep").$type<string[]>().notNull().default([]),
  savedProjects: jsonb("saved_projects").$type<string[]>().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export type CareerProfile = typeof careerProfilesTable.$inferSelect;
export type NewCareerProfile = typeof careerProfilesTable.$inferInsert;