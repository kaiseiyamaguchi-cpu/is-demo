export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-3">
              株式会社レガシー
            </h3>
            <p className="text-sm leading-relaxed">
              AIを活用した契約書レビューで、
              <br />
              ビジネスリスクを最小化します。
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">製品</h3>
            <ul className="text-sm space-y-2">
              <li>AI契約書レビュー</li>
              <li>リスク分析エンジン</li>
              <li>条項データベース</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">お問い合わせ</h3>
            <ul className="text-sm space-y-2">
              <li>info@legacy-corp.example.jp</li>
              <li>03-XXXX-XXXX</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            &copy; 2024 株式会社レガシー. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Powered by</span>
            <span className="font-semibold text-primary-400">AccelShift</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
