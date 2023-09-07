import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: { name: v.string(), age: v.number(), email: v.string() },
  handler(ctx, args) {
    return ctx.db.insert("users", {
      name: args.name,
      age: args.age,
      email: args.email,
    });
  },
});

export const deleteUser = mutation({
  args: { id: v.id("users") },
  handler(ctx, args) {
    return ctx.db.delete(args.id);
  },
});
