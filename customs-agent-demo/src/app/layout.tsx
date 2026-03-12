import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "通関前処理Agent | AccelShift",
  description: "輸入通関の前処理をAI Agentで自動化。書類受領から案件サマリーまで、担当者の手を止めない。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900 antialiased">{children}</body>
    </html>
  );
}
