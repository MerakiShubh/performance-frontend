// CpuCard.tsx
interface CpuCardProps {
  title: string;
  model: string;
  cores: number;
  speed: number;
}

const CpuCard = ({ title, model, cores, speed }: CpuCardProps) => {
  return (
    <div className="metric-card">
      <h3 className="text-lg mb-4">{title}</h3>
      <p>Model: {model}</p>
      <p>Cores: {cores}</p>
      <p>Speed: {speed} MHz</p>
    </div>
  );
};

export default CpuCard;
