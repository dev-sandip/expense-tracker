import app from "./app";
const server = Bun.serve({
  hostname: "localhost",
  port: process.env.PORT || 3000,
  fetch: app.fetch,
});
console.log(`Server started at http://localhost:${server.port}`);
