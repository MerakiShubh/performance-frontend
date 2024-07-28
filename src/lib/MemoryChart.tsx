import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface MemoryData {
  time: string;
  memoryUsage: number;
}

interface MemoryChartProps {
  data: MemoryData[];
  title: string;
}

function MemoryChart({ data, title }: MemoryChartProps) {
  return (
    <div className="line-chart">
      <h2 className="text-lg mb-4">{title}</h2>
      <RechartsLineChart
        width={800}
        height={500}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tickFormatter={(time) => new Date(time).toLocaleTimeString()}
        />
        <YAxis />
        <Tooltip
          labelFormatter={(label) => new Date(label).toLocaleTimeString()}
        />
        <Line
          type="monotone"
          dataKey="memoryUsage"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </RechartsLineChart>
    </div>
  );
}

export default MemoryChart;
