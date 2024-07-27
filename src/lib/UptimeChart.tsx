import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface UptimeData {
  time: string;
  uptime: number;
}

interface UptimeChartProps {
  data: UptimeData[];
  title: string;
}

function UptimeChart({ data, title }: UptimeChartProps) {
  return (
    <div className="line-chart">
      <h2>{title}</h2>
      <RechartsLineChart
        width={600}
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
          dataKey="uptime"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </RechartsLineChart>
    </div>
  );
}

export default UptimeChart;