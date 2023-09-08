import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    age: v.number(),
    email: v.string(),
  }),
  course: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.number(),
  }),
  session: defineTable({
    date: v.string(),
    startTime: v.string(),
    endTime: v.string(),
    duration: v.string(),
    venue: v.string(),
  }),
});
