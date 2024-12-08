import { searchSchema } from "./searchSchema";

export const searchCardSchema = searchSchema.pick({
  country: true,
  region: true,
  city: true,
  dateRange: true,
});
