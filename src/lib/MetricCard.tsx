interface MetricCardProps {
  title: string;
  value: string;
}

const MetricCard = ({ title, value }: MetricCardProps) => {
  return (
    <div className="metric-card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default MetricCard;
