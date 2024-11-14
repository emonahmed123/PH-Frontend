import { z } from "zod";

export const academicSemesterSchma = z.object({
  name: z.string({ required_error: "This field is e Required" }),
  year: z.string({ required_error: "This field is e Required" }),
  start: z.string({ required_error: "This field is e Required" }),
  end: z.string({ required_error: "This field is e Required" }),
});
