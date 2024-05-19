import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const expenseSchema = z.object({
  id: z.number().int().positive().min(1),
  title: z.string().min(5).max(100),
  amount: z.number().int().positive(),
});
const createPostSchema = expenseSchema.omit({ id: true });
type Expense = z.infer<typeof expenseSchema>;
const fakeExpenses: Expense[] = [
  { id: 1, title: "Rent", amount: 1000 },
  { id: 2, title: "Groceries", amount: 100 },
  { id: 3, title: "Gas", amount: 50 },
];
export const expensesRouter = new Hono()
  .get("/", (c) => c.json({ expenses: fakeExpenses }))
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const expense = await c.req.valid("json");

    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    console.log({ expense });
    return c.json({ message: "Expense added", data: expense });
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((e) => e.id === id);
    if (!expense) {
      return c.notFound();
    }
    return c.json({ expense });
  })
  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((e) => e.id === id);
    if (!expense) {
      return c.notFound();
    }
    const deletedExpense = fakeExpenses.splice(
      fakeExpenses.indexOf(expense),
      1
    );
    return c.json({ expense });
  });
