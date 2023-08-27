import * as dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  TODOIST_TOKEN: z.string().length(40),
  TODOIST_PROJECT: z.string().min(1),
  GITHUB_TARGET_REVIEWER: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);

if (parsedEnv.success === false) {
  console.error("❌ Invalid environment variables:");

  const errorsFlattened = parsedEnv.error.flatten();
  if (errorsFlattened.formErrors.length > 0) {
    console.error(errorsFlattened.formErrors[0]);
  }
  if (Object.values(errorsFlattened.fieldErrors).length > 0) {
    console.error(errorsFlattened.fieldErrors);
  }

  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
