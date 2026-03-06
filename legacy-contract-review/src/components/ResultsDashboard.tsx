"use client";

import { motion } from "framer-motion";
import { mockAnalysisResult } from "@/lib/mock-data";
import ScoreGauge from "./ScoreGauge";
import ClauseCard from "./ClauseCard";

interface ResultsDashboardProps {
  onReset: () => void;
}

export default function ResultsDashboard({ onReset }: ResultsDashboardProps) {
  const result = mockAnalysisResult;
  const riskyClauses = result.clauses.filter((c) => c.risk === "risky").length;
  const favorableClauses = result.clauses.filter((c) => c.risk === "favorable").length;
  const neutralClauses = result.clauses.filter((c) => c.risk === "neutral").length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            分析結果
          </h1>
          <p className="text-gray-500 mt-1">業務委託基本契約書の分析が完了しました</p>
        </div>
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 text-gray-600 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          新しい契約書を分析
        </button>
      </div>

      {/* Score + Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center"
        >
          <h2 className="text-sm font-medium text-gray-500 mb-4">総合スコア</h2>
          <ScoreGauge score={result.overallScore} />
        </motion.div>

        {/* Risk Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-sm font-medium text-gray-500 mb-5">リスク内訳</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span className="text-sm text-gray-700">危険</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-red-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(riskyClauses / result.clauses.length) * 100}%` }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900 w-6 text-right">{riskyClauses}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-sm text-gray-700">中立</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-amber-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(neutralClauses / result.clauses.length) * 100}%` }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900 w-6 text-right">{neutralClauses}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-sm text-gray-700">有利</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(favorableClauses / result.clauses.length) * 100}%` }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-900 w-6 text-right">{favorableClauses}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">分析条項数</span>
              <span className="font-semibold text-gray-900">{result.clauses.length}条</span>
            </div>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-sm font-medium text-gray-500 mb-3">AI総合評価</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{result.summary}</p>
        </motion.div>
      </div>

      {/* Clauses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mb-8"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-6">条項別分析</h2>
        <div className="space-y-3">
          {result.clauses.map((clause, i) => (
            <ClauseCard key={clause.id} clause={clause} index={i} />
          ))}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 sm:p-8 text-white"
      >
        <h2 className="text-lg font-semibold mb-5 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          優先対応事項
        </h2>
        <div className="space-y-3">
          {result.recommendations.map((rec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-start gap-3 bg-white/10 rounded-xl p-4"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white/20 text-sm font-semibold shrink-0">
                {i + 1}
              </span>
              <p className="text-sm text-primary-50 leading-relaxed">{rec}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
