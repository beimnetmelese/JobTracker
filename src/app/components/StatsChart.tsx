"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
  ChartOptions,
} from "chart.js";
import { JobApplication } from "../lib/constants";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatsChart({ jobs }: { jobs: JobApplication[] }) {
  const statusCounts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const data = {
    labels: Object.keys(statusCounts).map((key) => {
      const statusMap: Record<string, string> = {
        applied: "Applied",
        interview: "Interview",
        rejected: "Rejected",
        offer: "Offer",
      };
      return statusMap[key] || key;
    }),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(168, 85, 247, 0.7)",
          "rgba(239, 68, 68, 0.7)",
          "rgba(16, 185, 129, 0.7)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(168, 85, 247, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(16, 185, 129, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"pie">) => {
            const label = context.label || "";
            const value = (context.raw ?? 0) as number;
            const total = context.dataset.data.reduce(
              (a, b) => a + (typeof b === "number" ? b : 0),
              0
            );
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="h-64">
      <Pie data={data} options={options} />
    </div>
  );
}
