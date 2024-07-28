// MainCpuCard.tsx
interface MainCpuCardProps {
  title: string;
  totalValue: string;
  currentValue: string;
}

const MainCpuCard = ({ title, totalValue, currentValue }: MainCpuCardProps) => {
  return (
    <div className="metric-card">
      <h3 className="text-lg mb-4">{title}</h3>
      <p>Current CPU%: {currentValue}</p>
      <p>Total CPU%: {totalValue}</p>
    </div>
  );
};

export default MainCpuCard;
