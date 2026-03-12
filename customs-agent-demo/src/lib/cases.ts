export type IssueLevel = "none" | "warning" | "error";

export interface ExtractedField {
  label: string;
  value: string;
  status: "ok" | "warning" | "error" | "missing";
}

export interface Issue {
  severity: "warning" | "error";
  title: string;
  detail: string;
}

export interface Case {
  id: string;
  label: string;
  badgeColor: string;
  borderColor: string;
  bgColor: string;
  scenario: string;
  level: IssueLevel;
  inputEmail: {
    subject: string;
    from: string;
    body: string;
    attachments: string[];
  };
  result: {
    summary: ExtractedField[];
    issues: Issue[];
    customerEmail: {
      to: string;
      subject: string;
      body: string;
    };
    operatorMemo: string;
  };
}

export const cases: Case[] = [
  {
    id: "case-01",
    label: "✅ 正常案件（全書類そろい）",
    badgeColor: "bg-emerald-100 text-emerald-700",
    borderColor: "border-emerald-400",
    bgColor: "bg-emerald-50",
    scenario: "中国からの電子部品輸入。Invoice・Packing List・B/L すべてあり、整合性も問題なし。通常処理可能。",
    level: "none",
    inputEmail: {
      subject: "【輸入通関依頼】案件No.2024-1122 / 電子部品 / 上海発",
      from: "suzuki@yamada-shoji.co.jp（山田商事株式会社 鈴木）",
      body: `お世話になっております。山田商事の鈴木です。

添付書類の通り通関手続きをお願いします。

・Invoice #INV-2024-1122
・Packing List #PL-2024-1122
・B/L #COSCO-BL-884421

何卒よろしくお願いします。`,
      attachments: ["Invoice #INV-2024-1122", "Packing List #PL-2024-1122", "B/L #COSCO-BL-884421"],
    },
    result: {
      summary: [
        { label: "荷主", value: "山田商事株式会社", status: "ok" },
        { label: "仕向地", value: "東京港", status: "ok" },
        { label: "品名", value: "電子部品（プリント基板 / PCB）", status: "ok" },
        { label: "数量", value: "500個（50箱）", status: "ok" },
        { label: "重量（Invoice）", value: "125.0 kg", status: "ok" },
        { label: "重量（Packing List）", value: "125.0 kg ✅ 一致", status: "ok" },
        { label: "単価 / 合計", value: "USD 45.00 × 500 = USD 22,500", status: "ok" },
        { label: "原産地", value: "中国", status: "ok" },
        { label: "貨物到着予定", value: "2024年11月25日", status: "ok" },
        { label: "HS候補", value: "8534.00（プリント基板）", status: "ok" },
      ],
      issues: [],
      customerEmail: {
        to: "suzuki@yamada-shoji.co.jp",
        subject: "Re: 【輸入通関依頼】案件No.2024-1122 / 電子部品 / 上海発",
        body: `山田商事株式会社
鈴木様

お世話になっております。AccelShift通関チームの山本です。

ご依頼の案件No.2024-1122について、添付書類を確認いたしました。
Invoice・Packing List・B/L すべて揃っており、内容の整合性も問題ございません。

このまま通関手続きを進めさせていただきます。
貨物到着後、速やかに申告を行います。

ご不明な点がございましたらお気軽にお知らせください。

——
AccelShift通関チーム / 山本`,
      },
      operatorMemo: `【案件No.2024-1122】通関士確認事項

ステータス: ✅ 通常処理可

確認済み書類:
- Invoice #INV-2024-1122 ✅
- Packing List #PL-2024-1122 ✅
- B/L #COSCO-BL-884421 ✅

整合性チェック:
- 重量: Invoice 125.0kg = PL 125.0kg ✅
- 数量: Invoice 500個 = PL 500個 ✅

HS候補: 8534.00（通関士最終確認要）
特記事項: なし。貨物到着次第、通常申告処理へ。`,
    },
  },
  {
    id: "case-02",
    label: "⚠️ 書類不足（Packing List 未添付）",
    badgeColor: "bg-amber-100 text-amber-700",
    borderColor: "border-amber-400",
    bgColor: "bg-amber-50",
    scenario: "タイからの食品素材輸入。Invoice と B/L はあるが Packing List が未添付。数量・梱包明細の確認不可。食品衛生法対応も未確認。",
    level: "warning",
    inputEmail: {
      subject: "【輸入通関依頼】案件No.2024-1130 / 食品素材 / バンコク発",
      from: "tanaka@toyo-foods.co.jp（東洋フーズ株式会社 田中）",
      body: `いつもお世話になっております。東洋フーズの田中です。

通関の依頼です。書類を添付しました。

・Invoice #TF-2024-1130
・B/L #THAI-BL-992201

ご確認よろしくお願いします。`,
      attachments: ["Invoice #TF-2024-1130", "B/L #THAI-BL-992201"],
    },
    result: {
      summary: [
        { label: "荷主", value: "東洋フーズ株式会社", status: "ok" },
        { label: "仕向地", value: "大阪港", status: "ok" },
        { label: "品名", value: "タピオカ澱粉", status: "ok" },
        { label: "数量", value: "未確認（Packing List 未添付）", status: "missing" },
        { label: "重量（B/L記載）", value: "800.0 kg", status: "warning" },
        { label: "重量（Packing List）", value: "未添付のため確認不可", status: "missing" },
        { label: "単価 / 合計", value: "USD 1.20/kg（数量未確定のため合計未確認）", status: "warning" },
        { label: "原産地", value: "タイ", status: "ok" },
        { label: "HS候補", value: "1108.14（タピオカ澱粉）", status: "ok" },
        { label: "食品衛生法届出", value: "未確認", status: "missing" },
      ],
      issues: [
        {
          severity: "error",
          title: "Packing List 未添付",
          detail: "数量・梱包明細が確認できません。通関申告に必要な情報が不足しています。",
        },
        {
          severity: "warning",
          title: "食品衛生法対応書類の確認が必要",
          detail: "食品素材（タピオカ澱粉）の輸入につき、食品衛生法に基づく届出書類の準備状況を確認してください。",
        },
      ],
      customerEmail: {
        to: "tanaka@toyo-foods.co.jp",
        subject: "Re: 【輸入通関依頼】案件No.2024-1130 / 食品素材 / バンコク発",
        body: `東洋フーズ株式会社
田中様

お世話になっております。AccelShift通関チームの山本です。

ご依頼の案件No.2024-1130について書類を確認いたしましたところ、
以下の不足・確認事項がございます。

━━━━━━━━━━━━━━━━━━━━━
■ ① Packing List が添付されておりません
━━━━━━━━━━━━━━━━━━━━━
通関申告に必要な数量・梱包明細の確認ができません。
Packing List（品名・数量・重量・梱包数）をご送付いただけますでしょうか。

━━━━━━━━━━━━━━━━━━━━━
■ ② 食品衛生法に基づく届出書類
━━━━━━━━━━━━━━━━━━━━━
タピオカ澱粉（食品素材）の輸入につき、食品衛生法の届出書類の
準備状況をお知らせください。

お手数をおかけしますが、書類のご提供をお願いいたします。
確認でき次第、速やかに手続きを進めます。

——
AccelShift通関チーム / 山本`,
      },
      operatorMemo: `【案件No.2024-1130】通関士確認事項

ステータス: ⚠️ 書類不足・保留中

確認済み書類:
- Invoice #TF-2024-1130 ✅
- B/L #THAI-BL-992201 ✅
- Packing List ❌ 未添付

未確認事項:
- 数量・梱包明細（Packing List 待ち）
- 食品衛生法届出書類の有無
- 重量の整合性（B/L:800kg に対する PL 重量未確認）

対応: 荷主へ確認メール送付済み。書類受領後に再確認し、通常処理へ移行。`,
    },
  },
  {
    id: "case-03",
    label: "🔴 不整合（Invoice ↔ Packing List 重量不一致）",
    badgeColor: "bg-red-100 text-red-700",
    borderColor: "border-red-400",
    bgColor: "bg-red-50",
    scenario: "韓国からの化学品輸入。書類はそろっているが Invoice と Packing List で重量が240kg不一致。化学品のため重量確認が重要。",
    level: "error",
    inputEmail: {
      subject: "【輸入通関依頼】案件No.2024-1205 / 工業用接着剤 / 釜山発",
      from: "sato@nippon-chemical.co.jp（日本ケミカル株式会社 佐藤）",
      body: `お世話になっております。日本ケミカルの佐藤です。

輸入通関の手配をお願いします。

・Invoice #JC-2024-1205
・Packing List #JC-PL-1205
・B/L #KOREX-BL-773304

ご確認よろしくお願いします。`,
      attachments: ["Invoice #JC-2024-1205", "Packing List #JC-PL-1205", "B/L #KOREX-BL-773304"],
    },
    result: {
      summary: [
        { label: "荷主", value: "日本ケミカル株式会社", status: "ok" },
        { label: "仕向地", value: "横浜港", status: "ok" },
        { label: "品名", value: "工業用接着剤（エポキシ系）", status: "ok" },
        { label: "数量（Invoice）", value: "200缶", status: "ok" },
        { label: "数量（Packing List）", value: "200缶 ✅ 一致", status: "ok" },
        { label: "重量（Invoice）", value: "1,200.0 kg", status: "error" },
        { label: "重量（Packing List）", value: "960.0 kg ❌ 不一致（差異: 240kg）", status: "error" },
        { label: "単価 / 合計", value: "USD 8.50/缶 × 200 = USD 1,700", status: "ok" },
        { label: "原産地", value: "韓国", status: "ok" },
        { label: "HS候補", value: "3506.10（接着剤）", status: "ok" },
      ],
      issues: [
        {
          severity: "error",
          title: "重量の不一致（Invoice ↔ Packing List）",
          detail: "Invoice記載重量: 1,200.0kg / Packing List記載重量: 960.0kg / 差異: 240kg。工業用化学品の輸入につき、重量の正確な申告が必要です。",
        },
        {
          severity: "warning",
          title: "化学品規制確認要",
          detail: "エポキシ系接着剤のため、危険物・化審法・安衛法等の法規制該当可能性を確認してください。",
        },
      ],
      customerEmail: {
        to: "sato@nippon-chemical.co.jp",
        subject: "Re: 【輸入通関依頼】案件No.2024-1205 / 工業用接着剤 / 釜山発",
        body: `日本ケミカル株式会社
佐藤様

お世話になっております。AccelShift通関チームの山本です。

ご依頼の案件No.2024-1205について書類を確認いたしましたところ、
以下の不整合を確認いたしました。

━━━━━━━━━━━━━━━━━━━━━
■ 重量の不一致
━━━━━━━━━━━━━━━━━━━━━
・Invoice記載重量:      1,200.0 kg
・Packing List記載重量:   960.0 kg
・差異:                   240.0 kg

工業用化学品の輸入につき、重量の正確な申告が求められます。
正しい重量をご確認の上、訂正書類をご提供いただけますでしょうか。

お手数をおかけいたしますが、早急にご対応いただけると幸いです。
書類が確認でき次第、速やかに手続きを進めます。

——
AccelShift通関チーム / 山本`,
      },
      operatorMemo: `【案件No.2024-1205】通関士確認事項

ステータス: 🔴 不整合・申告保留

確認済み書類:
- Invoice #JC-2024-1205 ✅
- Packing List #JC-PL-1205 ✅
- B/L #KOREX-BL-773304 ✅

不整合内容:
- Invoice重量: 1,200.0kg
- Packing List重量: 960.0kg
- 差異: 240kg（約20%）

要確認事項:
① 荷主に重量訂正書類を要求（メール送付済み）
② エポキシ系接着剤 → 危険物/化審法/安衛法 該当性確認
③ 訂正書類受領後に申告再開

対応: 荷主確認メール送付済み。訂正書類待ち。`,
    },
  },
];
