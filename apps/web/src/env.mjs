import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app isn't
   * built with invalid env vars.
   */
  server: {
    // DATABASE_URL: z.string().url(),
    TODOIST_TOKEN: z.string().length(40),
    TODOIST_PROJECT: z.string().min(1),
    GITHUB_TARGET_REVIEWER: z.string().min(1),
    GITHUB_TOKEN: z.string().min(1),
  },
  /**
   * Specify your client-side environment variables schema here.
   * For them to be exposed to the client, prefix them with `NEXT_PUBLIC_`.
   */
  client: {},
  /**
   * Destructure all variables from `process.env` to make sure they aren't tree-shaken away.
   */
  runtimeEnv: {
    TODOIST_PROJECT: process.env.TODOIST_PROJECT,
    TODOIST_TOKEN: process.env.TODOIST_TOKEN,
    GITHUB_TARGET_REVIEWER: process.env.GITHUB_TARGET_REVIEWER,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
