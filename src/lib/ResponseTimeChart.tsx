import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface ResponseTimeData {
  time: string;
  responseTime: number;
}

interface ResponseTimeChartProps {
  data: ResponseTimeData[];
  title: string;
}

function ResponseTimeChart({ data, title }: ResponseTimeChartProps) {
  return (
    <div className="line-chart">
      <h2 className="text-lg mb-4">{title}</h2>
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
        <YAxis />
        <Tooltip
          labelFormatter={(label) => new Date(label).toLocaleTimeString()}
        />
        <Line
          type="monotone"
          dataKey="responseTime"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </RechartsLineChart>
    </div>
  );
}

export default ResponseTimeChart;
