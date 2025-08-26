import { z } from "zod";
export const exampleSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(100, { message: "Name must be at most 100 characters long" }),
});

export type ExampleDTO = z.infer<typeof exampleSchema>;
