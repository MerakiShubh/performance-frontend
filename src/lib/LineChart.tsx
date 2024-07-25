import { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: number[];
  title: string;
}

const LineChart = ({ data, title }: LineChartProps) => {
  const chartRef = useRef<Chart<"line"> | null>(null);

  const chartData = {
    labels: data.map((_, index) => index + 1),
    datasets: [
      {
        label: title,
        data: data,
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.update();
    }
  }, [data]);

  return (
    <div className="line-chart">
      <h3>{title}</h3>
      <Line data={chartData} ref={chartRef} />
    </div>
  );
};

export default LineChart;
