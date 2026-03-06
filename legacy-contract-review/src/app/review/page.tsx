"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sampleContract } from "@/lib/mock-data";
import ResultsDashboard from "@/components/ResultsDashboard";
import AnalyzingAnimation from "@/components/AnalyzingAnimation";

type Phase = "upload" | "analyzing" | "results";

export default function ReviewPage() {
  const [phase, setPhase] = useState<Phase>("upload");
  const [contractText, setContractText] = useState("");

  const loadSample = useCallback(() => {
    setContractText(sampleContract);
  }, []);

  const startAnalysis = useCallback(() => {
    if (!contractText.trim()) return;
    setPhase("analyzing");
    setTimeout(() => setPhase("results"), 3500);
  }, [contractText]);

  const reset = useCallback(() => {
    setPhase("upload");
    setContractText("");
  }, []);

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <AnimatePresence mode="wait">
        {phase === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
          >
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                契約書をアップロード
              </h1>
              <p className="text-gray-600">
                契約書のテキストを貼り付けるか、サンプルを読み込んで分析を開始できます。
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-700">
                  契約書テキスト
                </label>
                <button
                  onClick={loadSample}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1.5 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  サンプル契約書を読み込む
                </button>
              </div>

              <textarea
                value={contractText}
                onChange={(e) => setContractText(e.target.value)}
                placeholder="ここに契約書のテキストを貼り付けてください..."
                className="w-full h-80 p-4 border border-gray-200 rounded-xl text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-gray-50 placeholder:text-gray-400"
              />

              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-500">
                  {contractText.length > 0
                    ? `${contractText.length.toLocaleString()} 文字`
                    : "テキストが入力されていません"}
                </p>
                <button
                  onClick={startAnalysis}
                  disabled={!contractText.trim()}
                  className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AIで分析する
                </button>
              </div>
            </div>

            {/* Upload hint */}
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-blue-700">
                <span className="font-medium">ヒント：</span>
                「サンプル契約書を読み込む」をクリックすると、業務委託基本契約書のサンプルが自動で読み込まれます。デモ用のモックデータを使用して分析結果を表示します。
              </p>
            </div>
          </motion.div>
        )}

        {phase === "analyzing" && (
          <AnalyzingAnimation key="analyzing" />
        )}

        {phase === "results" && (
          <ResultsDashboard key="results" onReset={reset} />
        )}
      </AnimatePresence>
    </div>
  );
}
