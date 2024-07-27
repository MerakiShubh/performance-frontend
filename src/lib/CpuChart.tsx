import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface CpuData {
  time: string;
  cpuPercentage: number;
}

interface CpuChartProps {
  data: CpuData[];
  title: string;
}

function CpuChart({ data, title }: CpuChartProps) {
  return (
    <div className="line-chart">
      <h2>{title}</h2>
      <RechartsLineChart
        width={1800}
        height={500}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tickFormatter={(time) => new Date(time).toLocaleTimeString()}
        />
        <YAxis domain={[0, 100]} />
        <Tooltip
          labelFormatter={(label) => new Date(label).toLocaleTimeString()}
        />
        <Line
          type="monotone"
          dataKey="cpuPercentage"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </RechartsLineChart>
    </div>
  );
}

export default CpuChart;
