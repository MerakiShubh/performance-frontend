import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const ControlButtons = () => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleControl = async (action: string) => {
    setLoading(action);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/pm2/${action}/start`
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        if (
          error.response?.status === 400 &&
          error.response?.data?.error === "Script already running"
        ) {
          alert("The script is already running.");
        } else {
          alert(`Error: ${error.response?.data.error || error.message}`);
        }
      } else {
        alert("An unexpected error occurred.");
      }
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="control-buttons">
      <Button
        onClick={() => handleControl("start")}
        disabled={loading === "start"}
      >
        {loading === "start" ? "Starting..." : "Start"}
      </Button>
      <Button
        onClick={() => handleControl("stop")}
        disabled={loading === "stop"}
      >
        {loading === "stop" ? "Stopping..." : "Stop"}
      </Button>
      <Button
        onClick={() => handleControl("restart")}
        disabled={loading === "restart"}
      >
        {loading === "restart" ? "Restarting..." : "Restart"}
      </Button>
    </div>
  );
};

export default ControlButtons;
