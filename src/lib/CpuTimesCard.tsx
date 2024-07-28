// CpuTimesCard.tsx
interface CpuTimesCardProps {
  title: string;
  value: {
    idle: number;
    irq: number;
    nice: number;
    sys: number;
    user: number;
  }[];
}

const CpuTimesCard = ({ title, value }: CpuTimesCardProps) => {
  return (
    <div className="cpu-times-card w-screen">
      <h3 className="text-lg mb-4 ">{title}</h3>
      <div className="flex flex-row justify-around ">
        {value.map((time, index) => (
          <div key={index}>
            <p>Core {index + 1}:</p>
            <p>Idle: {time.idle}</p>
            <p>IRQ: {time.irq}</p>
            <p>Nice: {time.nice}</p>
            <p>Sys: {time.sys}</p>
            <p>User: {time.user}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CpuTimesCard;
