import { createTRPCRouter, publicProcedure } from "./trpc";

export const appRouter = createTRPCRouter({
  // post: postRouter,
  // auth: authRouter,
  hello: publicProcedure.query(() => {
    return { text: "Hello World" };
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
