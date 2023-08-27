import type { AppRouter } from "@sync-tasks/trpc";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import superjson from "superjson";

const getBaseUrl = () => {
  // express server URL
  if (typeof window !== "undefined") return ""; // browser should use relative url
  // if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:4000`; // default to localhost
};

export const api = createTRPCNext<AppRouter>({
  config() {
    return {
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `http://localhost:5001/trpc`,
        }),
      ],
    };
  },
  ssr: false,
});

// export { type RouterInputs, type RouterOutputs } from "@sync-tasks/api";
