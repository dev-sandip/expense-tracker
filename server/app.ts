import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";
import { expensesRouter } from "./routes/expenses";
const app = new Hono();
app.use(logger());
app.get("/", (c) =>
  c.json({
    name: "Expense Tracker Api",
    developer: "Sandip Sapkota",
    github: "dev-sandip",
    status: "API is running successfully.",
  })
);
const apiRoutes = app.basePath("/api").route("/expenses", expensesRouter);

app.use("*", serveStatic({ root: "./frontend/dist" }));
app.get("*", serveStatic({ path: "./frontend/dist/index.html" }));
export default app;
export type ApiRoutes = typeof apiRoutes;
