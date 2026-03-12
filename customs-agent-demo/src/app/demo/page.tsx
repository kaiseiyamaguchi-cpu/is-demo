"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cases, type Case } from "@/lib/cases";

type Phase = "select" | "input" | "analyzing" | "results";

const ANALYSIS_STEPS = [
  "書類を確認中...",
  "項目を抽出中...",
  "不備・不整合を検知中...",
  "確認メール草案を生成中...",
  "オペレーターメモを作成中...",
  "完了 ✓",
];

type ResultTab = "summary" | "issues" | "email" | "memo";
type InputTab = "email" | "docs";

export default function DemoPage() {
  const [phase, setPhase] = useState<Phase>("select");
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [activeTab, setActiveTab] = useState<ResultTab>("summary");
  const [activeInputTab, setActiveInputTab] = useState<InputTab>("email");
  const [activeDocIdx, setActiveDocIdx] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);

  const selectCase = useCallback((c: Case) => {
    setSelectedCase(c);
    setPhase("input");
  }, []);

  const startAnalysis = useCallback(() => {
    setPhase("analyzing");
    setAnalysisStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setAnalysisStep(step);
      if (step >= ANALYSIS_STEPS.length - 1) {
        clearInterval(interval);
        setTimeout(() => {
          setPhase("results");
          setActiveTab("summary");
        }, 600);
      }
    }, 600);
  }, []);

  const reset = useCallback(() => {
    setPhase("select");
    setSelectedCase(null);
    setAnalysisStep(0);
  }, []);

  const copyEmail = useCallback(() => {
    if (!selectedCase) return;
    navigator.clipboard.writeText(selectedCase.result.customerEmail.body);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  }, [selectedCase]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <span className="text-xl">🚢</span>
            <span className="font-bold">通関前処理Agent</span>
          </a>
          {phase !== "select" && (
            <button
              onClick={reset}
              className="text-slate-300 hover:text-white text-sm transition-colors flex items-center gap-1"
            >
              ← 案件選択に戻る
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-10">
        <AnimatePresence mode="wait">

          {/* Phase: Select */}
          {phase === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center mb-10">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">案件を選択してください</h1>
                <p className="text-gray-500">3種類のサンプル案件を用意しています。実際にAgentの動きを体験できます。</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {cases.map((c) => (
                  <motion.div
                    key={c.id}
                    whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
                    className={`bg-white rounded-2xl border-l-4 ${c.borderColor} border border-gray-100 shadow-sm p-6 cursor-pointer flex flex-col`}
                    onClick={() => selectCase(c)}
                  >
                    <span className={`inline-flex self-start text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${c.badgeColor}`}>
                      {c.label}
                    </span>
                    <p className="text-gray-600 text-sm flex-1 mb-6">{c.scenario}</p>
                    <button className="w-full bg-slate-900 hover:bg-slate-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors">
                      このケースで試す →
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Phase: Input */}
          {phase === "input" && selectedCase && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="max-w-3xl mx-auto"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full ${selectedCase.badgeColor}`}>
                  {selectedCase.label}
                </span>
                <span className="text-gray-400 text-sm">添付書類 {selectedCase.rawDocuments.length}件</span>
              </div>

              {/* Input Tabs */}
              <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-5 w-fit">
                {([
                  { id: "email" as InputTab, label: "📧 受信メール" },
                  { id: "docs" as InputTab, label: `📄 添付書類 (${selectedCase.rawDocuments.length})` },
                ]).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveInputTab(tab.id)}
                    className={`text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                      activeInputTab === tab.id
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeInputTab === "email" && (
                  <motion.div key="email-tab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-5">
                      <div className="bg-gray-50 border-b border-gray-200 px-5 py-3">
                        <h2 className="text-sm font-semibold text-gray-700">受信メール</h2>
                      </div>
                      <div className="p-5">
                        <div className="space-y-2 mb-4 text-sm text-gray-600">
                          <div className="flex gap-3">
                            <span className="font-medium text-gray-500 w-14 flex-shrink-0">差出人:</span>
                            <span className="text-gray-800">{selectedCase.inputEmail.from}</span>
                          </div>
                          <div className="flex gap-3">
                            <span className="font-medium text-gray-500 w-14 flex-shrink-0">件名:</span>
                            <span className="text-gray-800 font-medium">{selectedCase.inputEmail.subject}</span>
                          </div>
                        </div>
                        <div className="border-t border-gray-100 pt-4">
                          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
                            {selectedCase.inputEmail.body}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeInputTab === "docs" && (
                  <motion.div key="docs-tab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {/* Doc selector */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {selectedCase.rawDocuments.map((doc, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveDocIdx(i)}
                          className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
                            activeDocIdx === i
                              ? "bg-slate-900 text-white border-slate-900"
                              : "bg-white text-gray-600 border-gray-200 hover:border-slate-400"
                          }`}
                        >
                          📄 {doc.type} #{doc.docNumber}
                        </button>
                      ))}
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-5">
                      <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-700">
                          {selectedCase.rawDocuments[activeDocIdx]?.type}
                        </span>
                        <span className="text-xs text-gray-400 font-mono">
                          #{selectedCase.rawDocuments[activeDocIdx]?.docNumber}
                        </span>
                      </div>
                      <div className="p-5 overflow-x-auto">
                        <pre className="text-xs text-gray-800 whitespace-pre font-mono leading-relaxed">
                          {selectedCase.rawDocuments[activeDocIdx]?.content}
                        </pre>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                onClick={startAnalysis}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold py-4 rounded-xl text-lg shadow-lg shadow-blue-500/20 transition-colors"
              >
                🤖 分析開始
              </motion.button>
            </motion.div>
          )}

          {/* Phase: Analyzing */}
          {phase === "analyzing" && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center min-h-[60vh]"
            >
              <div className="relative mb-8">
                <div className="w-20 h-20 border-4 border-blue-500/20 rounded-full" />
                <motion.div
                  className="absolute inset-0 w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-2xl">🤖</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-8">Agent 分析中...</h2>
              <div className="space-y-3 w-full max-w-xs">
                {ANALYSIS_STEPS.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: i <= analysisStep ? 1 : 0.3, x: 0 }}
                    className={`flex items-center gap-3 text-sm ${i <= analysisStep ? "text-gray-800" : "text-gray-400"}`}
                  >
                    {i < analysisStep ? (
                      <span className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">✓</span>
                    ) : i === analysisStep ? (
                      <motion.span
                        className="w-5 h-5 bg-blue-500 rounded-full flex-shrink-0"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.8, repeat: Infinity }}
                      />
                    ) : (
                      <span className="w-5 h-5 bg-gray-200 rounded-full flex-shrink-0" />
                    )}
                    {step}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Phase: Results */}
          {phase === "results" && selectedCase && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">分析完了</h1>
                  <span className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full mt-1 ${selectedCase.badgeColor}`}>
                    {selectedCase.label}
                  </span>
                </div>
                {selectedCase.result.issues.length === 0 ? (
                  <span className="bg-emerald-100 text-emerald-700 font-semibold text-sm px-4 py-2 rounded-xl">
                    ✅ 問題なし — 通常処理可
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-700 font-semibold text-sm px-4 py-2 rounded-xl">
                    ⚠️ {selectedCase.result.issues.length}件の要確認事項
                  </span>
                )}
              </div>

              {/* Tabs */}
              <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 overflow-x-auto">
                {([
                  { id: "summary", label: "📋 案件サマリー" },
                  { id: "issues", label: `${selectedCase.result.issues.length === 0 ? "✅" : "⚠️"} 不備・不整合` },
                  { id: "email", label: "✉️ 確認メール草案" },
                  { id: "memo", label: "📝 オペレーターメモ" },
                ] as { id: ResultTab; label: string }[]).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-shrink-0 text-sm font-medium px-4 py-2 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {/* Summary Tab */}
                {activeTab === "summary" && (
                  <motion.div key="summary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                      <table className="w-full text-sm">
                        <tbody>
                          {selectedCase.result.summary.map((field, i) => (
                            <tr key={i} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                              <td className="px-5 py-3 font-medium text-gray-600 w-48">{field.label}</td>
                              <td className={`px-5 py-3 font-medium ${
                                field.status === "error" ? "text-red-600" :
                                field.status === "warning" ? "text-amber-600" :
                                field.status === "missing" ? "text-gray-400 italic" :
                                "text-gray-900"
                              }`}>
                                {field.status === "error" && <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2" />}
                                {field.status === "warning" && <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mr-2" />}
                                {field.value}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                )}

                {/* Issues Tab */}
                {activeTab === "issues" && (
                  <motion.div key="issues" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {selectedCase.result.issues.length === 0 ? (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center">
                        <div className="text-4xl mb-4">✅</div>
                        <h3 className="text-lg font-bold text-emerald-800 mb-2">不備・不整合なし</h3>
                        <p className="text-emerald-700 text-sm">全書類を確認しました。問題なく通関処理を進められます。</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {selectedCase.result.issues.map((issue, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`rounded-2xl border p-5 ${
                              issue.severity === "error"
                                ? "bg-red-50 border-red-200"
                                : "bg-amber-50 border-amber-200"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <span className="text-2xl">{issue.severity === "error" ? "🔴" : "⚠️"}</span>
                              <div>
                                <h4 className={`font-bold mb-1 ${issue.severity === "error" ? "text-red-800" : "text-amber-800"}`}>
                                  {issue.title}
                                </h4>
                                <p className={`text-sm ${issue.severity === "error" ? "text-red-700" : "text-amber-700"}`}>
                                  {issue.detail}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Email Tab */}
                {activeTab === "email" && (
                  <motion.div key="email" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                      <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-700">顧客確認メール草案</h3>
                        <button
                          onClick={copyEmail}
                          className="text-xs bg-slate-900 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg transition-colors"
                        >
                          {emailCopied ? "✓ コピー済み" : "コピー"}
                        </button>
                      </div>
                      <div className="p-5 text-sm text-gray-600 space-y-2">
                        <div><span className="font-medium text-gray-800 w-12 inline-block">To:</span> {selectedCase.result.customerEmail.to}</div>
                        <div><span className="font-medium text-gray-800 w-12 inline-block">件名:</span> {selectedCase.result.customerEmail.subject}</div>
                      </div>
                      <div className="border-t border-gray-100 px-5 py-4">
                        <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">
                          {selectedCase.result.customerEmail.body}
                        </pre>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Memo Tab */}
                {activeTab === "memo" && (
                  <motion.div key="memo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                      <div className="bg-gray-50 border-b border-gray-200 px-5 py-3">
                        <h3 className="text-sm font-semibold text-gray-700">オペレーターレビューメモ</h3>
                        <p className="text-xs text-gray-500 mt-0.5">通関士が確認・判断すべき事項をまとめたメモです</p>
                      </div>
                      <div className="p-5">
                        <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed bg-gray-50 rounded-xl p-4">
                          {selectedCase.result.operatorMemo}
                        </pre>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Before/After */}
              <div className="mt-8 bg-slate-900 text-white rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-slate-300 mb-4">Before / After — 前処理作業時間</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Before（手作業）</span>
                      <span className="text-slate-300 font-medium">平均 45分</span>
                    </div>
                    <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-500 rounded-full w-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">After（Agent）</span>
                      <span className="text-blue-400 font-bold">約 5分</span>
                    </div>
                    <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-blue-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "11%" }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-slate-400 text-xs mt-4">※ 担当者の確認・送付時間は含まず。実際の効果は業務環境により異なります。</p>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={reset}
                  className="text-gray-500 hover:text-gray-800 text-sm underline transition-colors"
                >
                  ← 別の案件を試す
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-slate-950 text-slate-500 text-xs py-4 text-center">
        © 2024 AccelShift. This is a sales demo.
      </footer>
    </div>
  );
}
