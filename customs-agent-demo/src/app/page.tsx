"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const steps = [
  { icon: "📧", title: "書類受領", desc: "顧客メール＋添付書類（Invoice / PL / B/L）をAgentが受け取る" },
  { icon: "🤖", title: "Agent分析", desc: "項目抽出・不備検知・確認メール草案を自動生成" },
  { icon: "✅", title: "レビュー準備完了", desc: "通関士が判断すべき部分だけを抽出したサマリーを提供" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚢</span>
            <span className="font-bold text-lg">通関前処理Agent</span>
            <span className="text-slate-400 text-sm ml-2">by AccelShift</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="bg-slate-900 text-white pt-20 pb-28 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 text-blue-300 text-sm mb-8">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                通関業者向け AI Agent デモ
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                輸入通関の前処理を、
                <br />
                <span className="text-blue-400">AIで。</span>
              </h1>
              <p className="text-xl text-slate-300 mb-4">
                書類受領から案件サマリーまで、担当者の手を止めない。
              </p>
              <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
                書類確認・項目抽出・不備検知・確認メール草案生成を自動化。
                <br />
                担当者1人あたりの処理件数を増やし、採用を増やさずに売上を伸ばす。
              </p>
              <Link href="/demo">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-lg shadow-blue-500/30 transition-colors"
                >
                  デモを試す →
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
              3ステップで前処理が完了
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <div className="text-xs text-blue-500 font-semibold uppercase tracking-wider mb-2">
                    Step {i + 1}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="py-20 px-6 bg-slate-50">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              担当者1人あたりの処理能力を上げる
            </h2>
            <p className="text-gray-500 mb-12">
              前処理の繰り返し作業を削減することで、より多くの案件をさばける体制へ。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { metric: "45分 → 5分", label: "前処理作業時間/案件", color: "text-blue-600" },
                { metric: "×3", label: "1人あたり処理件数", color: "text-emerald-600" },
                { metric: "即日", label: "顧客への初回返答", color: "text-purple-600" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className={`text-3xl font-bold mb-2 ${item.color}`}>{item.metric}</div>
                  <div className="text-gray-500 text-sm">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 bg-slate-900 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">実際に動くデモで体験してください</h2>
          <p className="text-slate-400 mb-8">
            3つのサンプル案件（正常系・書類不足・不整合）を用意しています。
          </p>
          <Link href="/demo">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              デモを試す →
            </motion.button>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 text-sm py-6 text-center">
        © 2024 AccelShift. This is a sales demo.
      </footer>
    </div>
  );
}
