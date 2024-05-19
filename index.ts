import app from "./app";
Bun.serve({
  hostname: "localhost",
  fetch: app.fetch,
});
console.log("Server started at http://localhost:3000");
