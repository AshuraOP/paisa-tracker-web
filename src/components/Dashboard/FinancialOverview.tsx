import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FinancialOverviewProps {
  totalIncome?: number;
  totalExpenses?: number;
  balance?: number;
  monthlyChange?: number;
  month?: string;
}

const FinancialOverview = ({
  totalIncome = 5250.0,
  totalExpenses = 3720.5,
  balance = totalIncome - totalExpenses,
  monthlyChange = 8.2,
  month = "June 2023",
}: FinancialOverviewProps) => {
  const percentSpent = Math.min(
    100,
    Math.round((totalExpenses / totalIncome) * 100),
  );
  const isPositiveChange = monthlyChange >= 0;

  return (
    <div className="w-full bg-background">
      <h2 className="text-2xl font-bold mb-4">Financial Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <span className="h-4 w-4 text-green-500 font-bold">₹</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalIncome.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">{month}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <span className="h-4 w-4 text-red-500 font-bold">₹</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{totalExpenses.toFixed(2)}
            </div>
            <div className="mt-2">
              <Progress value={percentSpent} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {percentSpent}% of income spent
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Current Balance
            </CardTitle>
            <div className="flex items-center space-x-1">
              {isPositiveChange ? (
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-500" />
              )}
              <span
                className={`text-xs ${isPositiveChange ? "text-green-500" : "text-red-500"}`}
              >
                {isPositiveChange ? "+" : ""}
                {monthlyChange}%
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{balance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {isPositiveChange ? "Increased" : "Decreased"} since last month
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialOverview;
