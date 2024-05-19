import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { api } from "./lib/api";

const App = () => {
  const [totalSpent, setTotalSpent] = useState(0);
  useEffect(() => {
    async function fetchTotalSpent() {
      const res = await api.expenses["total-spent"].$get();
      const data = await res.json();
      setTotalSpent(data.total);
    }
    fetchTotalSpent();
  });
  return (
    <div>
      <Card className="w-[350px] m-auto">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>The total amount you have spent</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{totalSpent}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
