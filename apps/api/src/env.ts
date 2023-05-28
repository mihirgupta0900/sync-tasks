import { createEnv } from "@t3-oss/env-core";
import * as dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

export const env = createEnv({
  clientPrefix: "",
  client: {},
  server: {
    TODOIST_TOKEN: z.string().length(40),
    TODOIST_PROJECT: z.string().min(1),
    GITHUB_TARGET_REVIEWER: z.string().min(1),
  },
  /**
   * What object holds the environment variables at runtime.
   * Often `process.env` or `import.meta.env`
   */
  runtimeEnv: process.env,
});
