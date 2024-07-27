import { useState, useEffect } from "react";
import MetricCard from "./MetricCard";
import CpuChart from "./CpuChart";
import ControlButtons from "./ControlButtons";
import { io } from "socket.io-client";

const socketUrl = import.meta.env.VITE_BACKEND_URL;
console.log("Attempting to connect to:", socketUrl);

const socket = io(socketUrl, {
  transports: ["websocket", "polling"],
  autoConnect: false,
});

// Define the CpuData type
interface CpuData {
  time: string;
  cpuPercentage: number;
}

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    cpuPercentage: 0,
    memoryUsage: 0,
    freeMemory: 0,
    totalMemory: 0,
    uptime: 0,
    responseTime: 0,
  });

  const [cpuData, setCpuData] = useState<CpuData[]>([]);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("serverStats", (data) => {
      console.log("Received data:", data);
      setMetrics(data);

      // Add new CPU data point
      setCpuData((prevData) => [
        ...prevData,
        { time: new Date().toISOString(), cpuPercentage: data.cpuPercentage },
      ]);
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected, reason:", reason);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="dashboard">
      <div className="metric-cards">
        <MetricCard
          title="CPU Usage"
          value={`${metrics.cpuPercentage.toFixed(2)}%`}
        />
        <MetricCard
          title="Memory Usage"
          value={`${metrics.memoryUsage.toFixed(2)} MB`}
        />
        <MetricCard
          title="Free Memory"
          value={`${metrics.freeMemory.toFixed(2)} MB`}
        />
        <MetricCard
          title="Total Memory"
          value={`${metrics.totalMemory.toFixed(2)} MB`}
        />
        <MetricCard title="Uptime" value={`${metrics.uptime.toFixed(2)} s`} />
        <MetricCard
          title="Response Time"
          value={`${metrics.responseTime.toFixed(2)} ms`}
        />
      </div>
      <div className="charts">
        <CpuChart data={cpuData} title="CPU Usage Over Time" />
      </div>
      <ControlButtons />
    </div>
  );
};

export default Dashboard;
