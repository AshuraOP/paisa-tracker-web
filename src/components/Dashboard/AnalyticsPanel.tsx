import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart } from "lucide-react";

interface AnalyticsPanelProps {
  categoryData?: {
    category: string;
    amount: number;
    color: string;
  }[];
  monthlyData?: {
    month: string;
    income: number;
    expenses: number;
  }[];
  trendData?: {
    date: string;
    balance: number;
  }[];
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({
  categoryData = [
    { category: "Food", amount: 450, color: "#FF6384" },
    { category: "Housing", amount: 1200, color: "#36A2EB" },
    { category: "Transportation", amount: 250, color: "#FFCE56" },
    { category: "Entertainment", amount: 180, color: "#4BC0C0" },
    { category: "Utilities", amount: 320, color: "#9966FF" },
  ],
  monthlyData = [
    { month: "Jan", income: 3200, expenses: 2800 },
    { month: "Feb", income: 3400, expenses: 2900 },
    { month: "Mar", income: 3100, expenses: 2750 },
    { month: "Apr", income: 3800, expenses: 3100 },
    { month: "May", income: 3500, expenses: 2950 },
    { month: "Jun", income: 3900, expenses: 3200 },
  ],
  trendData = [
    { date: "Jan 1", balance: 1200 },
    { date: "Feb 1", balance: 1500 },
    { date: "Mar 1", balance: 1350 },
    { date: "Apr 1", balance: 2050 },
    { date: "May 1", balance: 2600 },
    { date: "Jun 1", balance: 3300 },
  ],
}) => {
  const [activeTab, setActiveTab] = useState("category");

  // Calculate total for pie chart
  const totalExpenses = categoryData.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  return (
    <Card className="w-full bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex items-center">
          <span>Spending Analytics</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          defaultValue="category"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="category" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              <span>By Category</span>
            </TabsTrigger>
            <TabsTrigger value="monthly" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>Monthly Comparison</span>
            </TabsTrigger>
            <TabsTrigger value="trend" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span>Balance Trend</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="category" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 relative">
                {/* Pie chart visualization */}
                <div className="aspect-square max-w-[300px] mx-auto relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-[180px] w-[180px] rounded-full overflow-hidden relative">
                      {categoryData.map((item, index) => {
                        const percentage = (item.amount / totalExpenses) * 100;
                        const previousPercentages = categoryData
                          .slice(0, index)
                          .reduce(
                            (sum, prevItem) =>
                              sum + (prevItem.amount / totalExpenses) * 100,
                            0,
                          );

                        return (
                          <div
                            key={item.category}
                            className="absolute inset-0"
                            style={{
                              background: item.color,
                              clipPath: `conic-gradient(from ${previousPercentages * 3.6}deg, ${item.color} 0deg, ${item.color} ${percentage * 3.6}deg, transparent ${percentage * 3.6}deg)`,
                            }}
                          />
                        );
                      })}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white dark:bg-gray-800 h-[120px] w-[120px] rounded-full flex items-center justify-center">
                          <span className="text-lg font-medium">
                            ₹{totalExpenses}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-medium mb-4">
                  Spending by Category
                </h3>
                <div className="space-y-3">
                  {categoryData.map((item) => (
                    <div
                      key={item.category}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span>{item.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">₹{item.amount}</span>
                        <span className="text-sm text-gray-500">
                          {((item.amount / totalExpenses) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            <div className="h-[300px] w-full">
              {/* Bar chart visualization */}
              <div className="h-full flex items-end justify-between gap-2">
                {monthlyData.map((item) => (
                  <div
                    key={item.month}
                    className="flex-1 flex flex-col items-center gap-2"
                  >
                    <div className="w-full flex justify-center gap-1 h-[220px] items-end">
                      <div
                        className="w-5 bg-green-500 rounded-t"
                        style={{ height: `${(item.income / 4000) * 220}px` }}
                      />
                      <div
                        className="w-5 bg-red-500 rounded-t"
                        style={{ height: `${(item.expenses / 4000) * 220}px` }}
                      />
                    </div>
                    <div className="text-sm">{item.month}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span>Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span>Expenses</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="trend" className="space-y-4">
            <div className="h-[300px] w-full relative">
              {/* Line chart visualization */}
              <div className="absolute inset-0 flex flex-col">
                <div className="flex-1 border-b border-gray-200 relative">
                  {trendData.map((item, index) => {
                    const nextItem = trendData[index + 1];
                    if (!nextItem) return null;

                    const x1 = (index / (trendData.length - 1)) * 100;
                    const y1 = 100 - (item.balance / 3500) * 100;
                    const x2 = ((index + 1) / (trendData.length - 1)) * 100;
                    const y2 = 100 - (nextItem.balance / 3500) * 100;

                    return (
                      <svg
                        key={item.date}
                        className="absolute inset-0 h-full w-full"
                        preserveAspectRatio="none"
                      >
                        <line
                          x1={`${x1}%`}
                          y1={`${y1}%`}
                          x2={`${x2}%`}
                          y2={`${y2}%`}
                          stroke="#3b82f6"
                          strokeWidth="2"
                        />
                      </svg>
                    );
                  })}

                  {trendData.map((item, index) => {
                    const x = (index / (trendData.length - 1)) * 100;
                    const y = 100 - (item.balance / 3500) * 100;

                    return (
                      <div
                        key={`point-${item.date}`}
                        className="absolute h-3 w-3 rounded-full bg-blue-500 border-2 border-white dark:border-gray-800 transform -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${x}%`, top: `${y}%` }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2">
                {trendData.map((item) => (
                  <div key={item.date} className="text-xs">
                    {item.date}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Balance Trend</div>
              <div className="text-sm font-medium text-blue-500">
                {(
                  ((trendData[trendData.length - 1].balance -
                    trendData[0].balance) /
                    trendData[0].balance) *
                  100
                ).toFixed(1)}
                % growth
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnalyticsPanel;
