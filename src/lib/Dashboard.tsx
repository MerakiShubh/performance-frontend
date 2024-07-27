import { useState, useEffect } from "react";
import MetricCard from "./MetricCard";
import CpuChart from "./CpuChart";
import MemoryChart from "./MemoryChart";
import UptimeChart from "./UptimeChart";
import ResponseTimeChart from "./ResponseTimeChart";
import ControlButtons from "./ControlButtons";
import MemoryPieChart from "./MemoryPieChart";
import { io } from "socket.io-client";

const socketUrl = import.meta.env.VITE_BACKEND_URL;
console.log("Attempting to connect to:", socketUrl);

const socket = io(socketUrl, {
  transports: ["websocket", "polling"],
  autoConnect: false,
});

interface CpuData {
  time: string;
  cpuPercentage: number;
}

interface MemoryData {
  time: string;
  memoryUsage: number;
}

interface UptimeData {
  time: string;
  uptime: number;
}

interface ResponseTimeData {
  time: string;
  responseTime: number;
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
  const [memoryData, setMemoryData] = useState<MemoryData[]>([]);
  const [uptimeData, setUptimeData] = useState<UptimeData[]>([]);
  const [responseTimeData, setResponseTimeData] = useState<ResponseTimeData[]>(
    []
  );

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    socket.on("serverStats", (data) => {
      // console.log("Received data:", data);
      setMetrics(data);

      // Add new data points
      const currentTime = new Date().toISOString();
      setCpuData((prevData) => [
        ...prevData,
        { time: currentTime, cpuPercentage: data.cpuPercentage },
      ]);
      setMemoryData((prevData) => [
        ...prevData,
        { time: currentTime, memoryUsage: data.memoryUsage },
      ]);
      setUptimeData((prevData) => [
        ...prevData,
        { time: currentTime, uptime: data.uptime },
      ]);
      setResponseTimeData((prevData) => [
        ...prevData,
        { time: currentTime, responseTime: data.responseTime },
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

  const memoryPieData = [
    { name: "Memory Usage", value: metrics.memoryUsage, fill: "#82ca9d" },
    { name: "Free Memory", value: metrics.freeMemory, fill: "#8884d8" },
    { name: "Total Memory", value: metrics.totalMemory, fill: "#ffc658" },
  ];

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
        <MemoryChart data={memoryData} title="Memory Usage Over Time" />
        <UptimeChart data={uptimeData} title="Uptime Over Time" />
        <ResponseTimeChart
          data={responseTimeData}
          title="Response Time Over Time"
        />
        <MemoryPieChart data={memoryPieData} title="Memory Distribution" />
      </div>
      <ControlButtons />
    </div>
  );
};

export default Dashboard;
