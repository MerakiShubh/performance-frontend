// CpuInfoCard.tsx
interface CpuInfoCardProps {
  title: string;
  value: {
    totalTick: number;
    totalIdle: number;
    totalActive: number;
    totalCpuPercentage: number;
  };
}

const CpuInfoCard = ({ title, value }: CpuInfoCardProps) => {
  return (
    <div className="metric-card">
      <h3 className="text-lg mb-4">{title}</h3>
      <p>Total Tick: {value.totalTick}</p>
      <p>Total Idle: {value.totalIdle}</p>
      <p>Total Active: {value.totalActive}</p>
      <p>Total CPU Percentage: {value.totalCpuPercentage.toFixed(2)}%</p>
    </div>
  );
};

export default CpuInfoCard;
