import { useState, useEffect } from "react";
import CpuChart from "./CpuChart";
import MemoryChart from "./MemoryChart";
import UptimeChart from "./UptimeChart";
import ResponseTimeChart from "./ResponseTimeChart";
import ControlButtons from "./ControlButtons";
import MemoryPieChart from "./MemoryPieChart";
import { io } from "socket.io-client";
import CpuCard from "./CpuCard";
import CpuInfoCard from "./CpuInfoCard";
import CpuTimesCard from "./CpuTimesCard";
import MainCpuCard from "./MainCpuCard";
import CpuPieChart from "./CpuPieChart";
import MetricCard from "./MetricCard";

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

interface Metrics {
  currentCpuPercentage: number;
  totalCpuPercentage: number;
  memoryUsage: number;
  freeMemory: number;
  totalMemory: number;
  uptime: number;
  responseTime: number;
  cpuInfo: {
    totalTick: number;
    totalIdle: number;
    totalActive: number;
    totalCpuPercentage: number;
  };
  cpuModel: string;
  cpuSpeed: number;
  cpuTimes: {
    idle: number;
    irq: number;
    nice: number;
    sys: number;
    user: number;
  }[];
  totalCPUs: number;
}

const Dashboard = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    currentCpuPercentage: 0,
    totalCpuPercentage: 0,
    memoryUsage: 0,
    freeMemory: 0,
    totalMemory: 0,
    uptime: 0,
    responseTime: 0,
    cpuInfo: {
      totalTick: 0,
      totalIdle: 0,
      totalActive: 0,
      totalCpuPercentage: 0,
    },
    cpuModel: "",
    cpuSpeed: 0,
    cpuTimes: [],
    totalCPUs: 0,
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
      console.log("Received data:", data);
      setMetrics(data);

      // Add new data points
      const currentTime = new Date().toISOString();
      setCpuData((prevData) => [
        ...prevData,
        { time: currentTime, cpuPercentage: data.currentCpuPercentage },
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

  const cpuPieChart = [
    { name: "Total Cpu", value: metrics.totalCpuPercentage, fill: "#82ca9d" },
    {
      name: "Current Cpu",
      value: metrics.currentCpuPercentage,
      fill: "#8884d8",
    },
  ];

  return (
    <div className="dashboard">
      <div className="w-screen flex flex-row justify-around ">
        <CpuCard
          title="CPU"
          model={metrics.cpuModel}
          cores={metrics.totalCPUs}
          speed={metrics.cpuSpeed}
        />

        <MainCpuCard
          title="CPU Usage"
          totalValue={metrics.totalCpuPercentage.toFixed(2)}
          currentValue={metrics.currentCpuPercentage.toFixed(2)}
        />

        <CpuInfoCard title="CPU Info" value={metrics.cpuInfo} />
        <CpuPieChart data={cpuPieChart} title="Cpu Distribution" />
      </div>
      <div className="cpu-times-row">
        <CpuTimesCard title="CPU Times" value={metrics.cpuTimes} />
      </div>
      <CpuChart data={cpuData} title="CPU Usage Over Time" />

      <div className="w-screen flex flex-row flex-wrap justify-around">
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
        <MemoryPieChart data={memoryPieData} title="Memory Distribution" />
      </div>
      <MemoryChart data={memoryData} title="Memory Usage Over Time" />
      <div className="w-screen flex flex-row flex-wrap justify-around">
        <MetricCard title="Uptime" value={`${metrics.uptime.toFixed(2)} s`} />
        <MetricCard
          title="Response Time"
          value={`${metrics.responseTime.toFixed(2)} ms`}
        />
      </div>
      <UptimeChart data={uptimeData} title="Uptime Over Time" />
      <ResponseTimeChart
        data={responseTimeData}
        title="Response Time Over Time"
      />

      <ControlButtons />
    </div>
  );
};

export default Dashboard;
