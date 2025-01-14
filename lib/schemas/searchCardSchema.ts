import { searchSchema } from "./searchSchema";

export const searchCardSchema = searchSchema.pick({
  city: true,
  dateRange: true,
});
