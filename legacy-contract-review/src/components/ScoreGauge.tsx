"use client";

import { motion } from "framer-motion";

interface ScoreGaugeProps {
  score: number;
  size?: number;
}

export default function ScoreGauge({ score, size = 180 }: ScoreGaugeProps) {
  const radius = (size - 20) / 2;
  const circumference = Math.PI * radius;
  const progress = (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 70) return { stroke: "#22c55e", text: "text-green-600", label: "低リスク" };
    if (s >= 40) return { stroke: "#f59e0b", text: "text-amber-500", label: "中リスク" };
    return { stroke: "#ef4444", text: "text-red-500", label: "高リスク" };
  };

  const color = getColor(score);

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
        {/* Background arc */}
        <path
          d={`M 10 ${size / 2 + 10} A ${radius} ${radius} 0 0 1 ${size - 10} ${size / 2 + 10}`}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={10}
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <motion.path
          d={`M 10 ${size / 2 + 10} A ${radius} ${radius} 0 0 1 ${size - 10} ${size / 2 + 10}`}
          fill="none"
          stroke={color.stroke}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="text-center -mt-14">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span className={`text-5xl font-bold ${color.text}`}>{score}</span>
          <span className="text-lg text-gray-400 ml-1">/100</span>
        </motion.div>
        <p className={`text-sm font-medium mt-1 ${color.text}`}>{color.label}</p>
      </div>
    </div>
  );
}
