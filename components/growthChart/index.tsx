import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Dummy data for the chart
const generateData = (timeRange: string) => {
  const now = new Date();
  let data = [];

  if (timeRange === "week") {
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      data.push({
        date: format(date, "EEE"),
        balance: Math.floor(Math.random() * (15000000 - 8000000 + 1)) + 8000000,
      });
    }
  } else if (timeRange === "month") {
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      data.push({
        date: format(date, "d MMM"),
        balance: Math.floor(Math.random() * (15000000 - 5000000 + 1)) + 5000000,
      });
    }
  } else {
    // year
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(now.getMonth() - i);
      data.push({
        date: format(date, "MMM yyyy"),
        balance: Math.floor(Math.random() * (20000000 - 3000000 + 1)) + 3000000,
      });
    }
  }

  return data;
};

export const GrowthChart = () => {
  const [timeRange, setTimeRange] = React.useState("month");
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [chartData, setChartData] = React.useState(generateData("month"));

  React.useEffect(() => {
    setChartData(generateData(timeRange));
  }, [timeRange]);

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Balance Growth
            </h2>
            <p className="text-sm text-gray-500">
              Track your financial progress
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <Select
              value={timeRange}
              onValueChange={(value) => setTimeRange(value)}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="w-[150px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                tickFormatter={(value) =>
                  `Rp${(value / 1000000).toFixed(1)}M`
                }
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 rounded-lg shadow-md border">
                        <p className="font-medium">{payload[0].payload.date}</p>
                        <p className="text-sm">
                          Balance:{" "}
                          <span className="text-orange-500">
                            Rp{payload[0].value?.toLocaleString()}
                          </span>
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#F97316"
                strokeWidth={2}
                dot={{ r: 4, fill: "#F97316" }}
                activeDot={{ r: 6, fill: "#EA580C" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Summary */}
        <div className="flex justify-between items-center pt-2 border-t">
          <div className="text-sm text-gray-500">
            {timeRange === "week"
              ? "Weekly growth"
              : timeRange === "month"
              ? "Monthly growth"
              : "Yearly growth"}
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-900 mr-1">
              +12.5%
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 4L12 8L8 12"
                stroke="#10B981"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 8H4"
                stroke="#10B981"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};