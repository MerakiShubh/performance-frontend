import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Pie, PieChart, LabelList } from "recharts";

interface MemoryPieChartProps {
  data: {
    name: string;
    value: number;
    fill: string;
  }[];
  title: string;
}

const CpuPieChart: React.FC<MemoryPieChartProps> = ({ data, title }) => {
  const chartConfig = {
    totalCpu: {
      label: "Total Cpu",
      color: "#82ca9d",
    },
    currentCpu: {
      label: "Current Cpu",
      color: "#8884d8",
    },
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <h3 className="text-lg mb-4">{title}</h3>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="name" hideLabel />}
            />
            <Pie data={data} dataKey="value" nameKey="name" label>
              <LabelList
                dataKey="name"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default CpuPieChart;
