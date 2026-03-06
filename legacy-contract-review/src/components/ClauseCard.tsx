"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { Clause } from "@/lib/mock-data";

interface ClauseCardProps {
  clause: Clause;
  index: number;
}

const riskConfig = {
  favorable: {
    bg: "bg-green-50",
    border: "border-green-200",
    badge: "bg-green-100 text-green-700",
    label: "有利",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
  neutral: {
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    label: "中立",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
      </svg>
    ),
  },
  risky: {
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700",
    label: "危険",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
  },
};

export default function ClauseCard({ clause, index }: ClauseCardProps) {
  const [expanded, setExpanded] = useState(false);
  const config = riskConfig[clause.risk];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`rounded-xl border ${config.border} overflow-hidden`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:${config.bg} transition-colors`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium shrink-0 ${config.badge}`}>
            {config.icon}
            {config.label}
          </span>
          <span className="font-medium text-gray-900 truncate">
            {clause.title}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  backgroundColor:
                    clause.score >= 70 ? "#22c55e" : clause.score >= 40 ? "#f59e0b" : "#ef4444",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${clause.score}%` }}
                transition={{ delay: index * 0.08 + 0.3, duration: 0.8 }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600 w-8">
              {clause.score}
            </span>
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className={`px-4 sm:px-5 pb-5 ${config.bg} border-t ${config.border}`}
        >
          <div className="pt-4 space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-1">
                AI分析
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {clause.explanation}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <h4 className="text-sm font-semibold text-primary-700 mb-1 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                修正提案
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {clause.counterProposal}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
