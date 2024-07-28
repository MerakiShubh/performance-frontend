interface MetricCardProps {
  title: string;
  value: string;
}

const MetricCard = ({ title, value }: MetricCardProps) => {
  return (
    <div className="metric-card">
      <p>
        {title}: {value}
      </p>
    </div>
  );
};

export default MetricCard;
