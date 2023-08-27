import * as trpcExpress from "@trpc/server/adapters/express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import { appRouter, createContext } from "@sync-tasks/trpc";

import { githubRouter } from "./routes/github.routes";

export const createServer = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use(
      "/trpc",
      trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
      }),
    )
    .use("/github", githubRouter)
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/healthz", (req, res) => {
      return res.json({ ok: true });
    });

  return app;
};
