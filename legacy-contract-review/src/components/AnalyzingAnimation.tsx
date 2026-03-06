"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const steps = [
  "契約書を読み込んでいます...",
  "条項を抽出しています...",
  "リスク分析を実行中...",
  "修正提案を生成中...",
  "レポートを作成しています...",
];

export default function AnalyzingAnimation() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 650);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center min-h-[60vh]"
    >
      <div className="text-center">
        {/* Pulsing rings */}
        <div className="relative w-32 h-32 mx-auto mb-10">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 border-2 border-primary-400 rounded-full"
              animate={{
                scale: [1, 1.5 + i * 0.3],
                opacity: [0.6, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeOut",
              }}
            />
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full"
            />
          </div>
        </div>

        <motion.h2
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl font-bold text-gray-900 mb-6"
        >
          AI分析中
        </motion.h2>

        <div className="space-y-3 max-w-xs mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: i <= currentStep ? 1 : 0.3,
                x: 0,
              }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 text-sm"
            >
              {i < currentStep ? (
                <svg className="w-5 h-5 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : i === currentStep ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-primary-200 border-t-primary-600 rounded-full shrink-0"
                />
              ) : (
                <div className="w-5 h-5 rounded-full border-2 border-gray-200 shrink-0" />
              )}
              <span className={i <= currentStep ? "text-gray-900" : "text-gray-400"}>
                {step}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
