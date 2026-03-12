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

export interface RawDocument {
  type: "Invoice" | "Packing List" | "B/L";
  docNumber: string;
  content: string;
}

export interface Case {
  id: string;
  label: string;
  badgeColor: string;
  borderColor: string;
  scenario: string;
  level: IssueLevel;
  inputEmail: {
    subject: string;
    from: string;
    body: string;
    attachments: string[];
  };
  rawDocuments: RawDocument[];
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
  // ─────────────────────────────────────────────────────
  // Case 1: 正常系
  // ─────────────────────────────────────────────────────
  {
    id: "case-01",
    label: "✅ 正常案件（全書類そろい）",
    badgeColor: "bg-emerald-100 text-emerald-700",
    borderColor: "border-emerald-400",
    scenario: "中国・深圳からのプリント基板輸入。Invoice・Packing List・B/Lすべてあり、整合性も問題なし。",
    level: "none",
    inputEmail: {
      subject: "【輸入通関依頼】案件No.2024-1122 / PCB / 上海発 COSCO SHIPPING ORCHID",
      from: "suzuki.k@yamada-shoji.co.jp（山田商事株式会社 鈴木一郎）",
      body: `お世話になっております。山田商事 輸入管理部の鈴木です。

下記案件の輸入通関をお願いします。

■ 案件概要
- 品名: プリント基板（PCB）
- 仕入先: SHENZHEN TECH COMPONENTS CO., LTD（深圳）
- 船名/航路: COSCO SHIPPING ORCHID / V.024W
- 船積港: SHANGHAI / 揚げ港: TOKYO
- 到着予定: 2024年11月25日（月）

■ 添付書類
  1. Invoice #SZ-INV-2024-1122
  2. Packing List #SZ-PL-2024-1122
  3. B/L #COSU6884421390

ご確認のほどよろしくお願いいたします。

──────────────────────────────
山田商事株式会社 輸入管理部
鈴木 一郎 / Ichiro Suzuki
Tel: 03-XXXX-XXXX
──────────────────────────────`,
      attachments: [
        "Invoice #SZ-INV-2024-1122",
        "Packing List #SZ-PL-2024-1122",
        "B/L #COSU6884421390",
      ],
    },
    rawDocuments: [
      {
        type: "Invoice",
        docNumber: "SZ-INV-2024-1122",
        content: `COMMERCIAL INVOICE

Shipper / Exporter:
  SHENZHEN TECH COMPONENTS CO., LTD
  Building 7, Longhua Science Park, Longhua District,
  Shenzhen, Guangdong 518131, China
  Tel: +86-755-8800-XXXX

Consignee:
  山田商事株式会社
  〒103-0012 東京都中央区日本橋堀留町1-X-X
  Tel: 03-XXXX-XXXX

Notify Party: (Same as Consignee)

Invoice No.:   SZ-INV-2024-1122
Invoice Date:  November 8, 2024
L/C No.:       N/A (T/T at sight)
Payment Terms: T/T 30 days after B/L date

Port of Loading:    SHANGHAI, CHINA
Port of Discharge:  TOKYO, JAPAN
Vessel / Voyage:    COSCO SHIPPING ORCHID / V.024W
ETD:                Nov 12, 2024
ETA:                Nov 25, 2024

Marks & Numbers:   YSK/TYO
                   CASE NO. 1-50

─────────────────────────────────────────────────────────
No. | Description                  | HS Code  | Qty  | Unit   | Unit Price | Amount
─────────────────────────────────────────────────────────
 1  | Printed Circuit Board (PCB)  | 8534.00  | 500  | PCS    | USD 45.00  | USD 22,500.00
    | (FR-4 double-sided, 100×80mm)|          |      |        |            |
─────────────────────────────────────────────────────────
                             Total  Qty: 500 PCS          Total: USD 22,500.00

Country of Origin: CHINA
Incoterms:         FOB SHANGHAI
Net Weight:        120.0 KGS
Gross Weight:      125.0 KGS
Measurement:       0.35 CBM  (50 CTNS)

Signed by: Zhang Wei, Export Manager
We hereby certify that the information on this invoice is true and correct.`,
      },
      {
        type: "Packing List",
        docNumber: "SZ-PL-2024-1122",
        content: `PACKING LIST

Shipper:    SHENZHEN TECH COMPONENTS CO., LTD
Consignee:  山田商事株式会社
P/L No.:    SZ-PL-2024-1122
Date:       November 8, 2024
Invoice No. SZ-INV-2024-1122

Marks & Numbers: YSK/TYO / CASE NO. 1-50

──────────────────────────────────────────────────────────────────────────
Ctn  | Description          | Qty/Ctn | Total Qty | N.W.(kg) | G.W.(kg) | Meas.(CBM)
──────────────────────────────────────────────────────────────────────────
1-50 | PCB (FR-4 100×80mm)  | 10 PCS  | 500 PCS   | 2.20     | 2.50     | 0.007
──────────────────────────────────────────────────────────────────────────
     TOTAL: 50 CTNS         |         | 500 PCS   | 110.0 kg | 125.0 kg | 0.35 CBM
──────────────────────────────────────────────────────────────────────────

Note: Each carton: 45cm × 35cm × 22cm`,
      },
      {
        type: "B/L",
        docNumber: "COSU6884421390",
        content: `BILL OF LADING  (ORIGINAL)
                                   B/L No.: COSU6884421390

Shipper:
  SHENZHEN TECH COMPONENTS CO., LTD
  Building 7, Longhua Science Park, Shenzhen, China

Consignee:  TO ORDER OF SHIPPER

Notify Party:
  山田商事株式会社
  〒103-0012 東京都中央区日本橋堀留町1-X-X
  Tel: 03-XXXX-XXXX

Vessel / Voyage:   COSCO SHIPPING ORCHID / V.024W
Port of Loading:   SHANGHAI, CHINA
Port of Discharge: TOKYO, JAPAN
Place of Delivery: TOKYO CY

Marks &  | No. & Kind  | Description of Goods           | Gross Weight  | Measurement
Numbers  | of Packages |                                 |               |
─────────────────────────────────────────────────────────────────────────────────
YSK/TYO  | 50 CTNS     | PRINTED CIRCUIT BOARD (PCB)     | 125.0 KGS     | 0.35 CBM
CASE 1-50|             | HS CODE: 8534.00                |               |
         |             | COUNTRY OF ORIGIN: CHINA        |               |
─────────────────────────────────────────────────────────────────────────────────

Freight:    PREPAID
Issue Date: November 12, 2024
Place of Issue: SHANGHAI

COSCO SHIPPING LINES CO., LTD
As Carrier`,
      },
    ],
    result: {
      summary: [
        { label: "荷主", value: "山田商事株式会社", status: "ok" },
        { label: "輸出者（Shipper）", value: "SHENZHEN TECH COMPONENTS CO., LTD（中国・深圳）", status: "ok" },
        { label: "仕向地", value: "東京港（TOKYO CY）", status: "ok" },
        { label: "品名", value: "プリント基板 PCB（FR-4 double-sided 100×80mm）", status: "ok" },
        { label: "数量", value: "500 PCS / 50 CTNS", status: "ok" },
        { label: "重量 — Invoice 総重量", value: "125.0 KGS", status: "ok" },
        { label: "重量 — Packing List 総重量", value: "125.0 KGS ✅ 一致", status: "ok" },
        { label: "重量 — B/L 記載重量", value: "125.0 KGS ✅ 一致", status: "ok" },
        { label: "金額", value: "USD 22,500.00（USD 45.00 × 500 PCS）", status: "ok" },
        { label: "HS コード", value: "8534.00（プリント基板）", status: "ok" },
        { label: "原産地", value: "中国", status: "ok" },
        { label: "Incoterms", value: "FOB SHANGHAI", status: "ok" },
        { label: "本船/航路", value: "COSCO SHIPPING ORCHID / V.024W", status: "ok" },
        { label: "ETA（到着予定）", value: "2024年11月25日", status: "ok" },
        { label: "支払条件", value: "T/T 30 days after B/L date", status: "ok" },
      ],
      issues: [],
      customerEmail: {
        to: "suzuki.k@yamada-shoji.co.jp",
        subject: "Re: 【輸入通関依頼】案件No.2024-1122 / PCB / 上海発",
        body: `山田商事株式会社
輸入管理部 鈴木 一郎 様

お世話になっております。AccelShift通関チームの山本です。

案件No.2024-1122（Invoice #SZ-INV-2024-1122）について、
添付書類（Invoice・Packing List・B/L）を確認いたしました。

書類はすべて揃っており、重量・数量の整合性も問題ございません。
引き続き通関手続きを進めさせていただきます。

貨物到着（ETA: 11/25）後、速やかに輸入申告を行います。
申告内容の確認が必要な場合は改めてご連絡いたします。

ご不明な点がございましたらお気軽にお申し付けください。

——
AccelShift通関チーム / 山本 雄介
Tel: 03-XXXX-XXXX  /  yuske.yamamoto@accelshift.jp`,
      },
      operatorMemo: `【案件 SZ-INV-2024-1122 / 山田商事】通関士確認メモ

ステータス: ✅ 通常処理可

▼ 書類確認
  Invoice    SZ-INV-2024-1122   ✅
  Packing List SZ-PL-2024-1122  ✅
  B/L        COSU6884421390     ✅

▼ 整合性チェック
  重量: Invoice 125.0kg = PL 125.0kg = B/L 125.0kg  ✅
  数量: Invoice 500PCS = PL 500PCS                  ✅
  HS Code: 8534.00（プリント基板）— 通関士最終確認要

▼ 特記事項
  Incoterms: FOB SHANGHAI → 運賃・保険料は着払いか確認
  支払: T/T — L/C 不要
  ETA 11/25 → 到着次第、輸入申告へ移行`,
    },
  },

  // ─────────────────────────────────────────────────────
  // Case 2: 書類不足
  // ─────────────────────────────────────────────────────
  {
    id: "case-02",
    label: "⚠️ 書類不足（Packing List 未添付）",
    badgeColor: "bg-amber-100 text-amber-700",
    borderColor: "border-amber-400",
    scenario: "タイからタピオカ澱粉の輸入。Invoice と B/L はあるが Packing List が未添付。食品素材のため検疫・食品衛生法対応も要確認。",
    level: "warning",
    inputEmail: {
      subject: "【輸入通関依頼】案件No.2024-1130 / タピオカ澱粉 / バンコク発",
      from: "tanaka.h@toyo-foods.co.jp（東洋フーズ株式会社 田中 浩）",
      body: `いつもお世話になっております。東洋フーズ 貿易部の田中です。

下記案件の通関依頼です。書類を添付しましたのでご確認ください。

■ 案件概要
- 品名: タピオカ澱粉（Modified Tapioca Starch）
- 仕入先: THAI AGRO EXPORT CO., LTD（バンコク）
- 本船: EVER GLORY / V.0056-076W
- 船積港: BANGKOK / 揚げ港: OSAKA
- 到着予定: 2024年12月03日（火）

■ 添付書類
  1. Invoice #TH-INV-2024-1130
  2. B/L #EGLV140400987654

※ Packing Listは仕入先から送付されていないため本日中に入手します。

よろしくお願いします。

──────────────────────────────
東洋フーズ株式会社 貿易部
田中 浩 / Hiroshi Tanaka
Tel: 06-XXXX-XXXX
──────────────────────────────`,
      attachments: [
        "Invoice #TH-INV-2024-1130",
        "B/L #EGLV140400987654",
      ],
    },
    rawDocuments: [
      {
        type: "Invoice",
        docNumber: "TH-INV-2024-1130",
        content: `COMMERCIAL INVOICE

Shipper / Exporter:
  THAI AGRO EXPORT CO., LTD
  289 Silom Road, Bangrak, Bangkok 10500, Thailand
  Tel: +66-2-XXX-XXXX

Consignee:
  東洋フーズ株式会社
  〒556-0011 大阪府大阪市浪速区難波中2-X-X
  Tel: 06-XXXX-XXXX

Notify Party: (Same as Consignee)

Invoice No.:   TH-INV-2024-1130
Invoice Date:  November 20, 2024
Payment Terms: L/C at sight (L/C No.: XXXX-XXXXXXXXXX)

Port of Loading:    BANGKOK, THAILAND
Port of Discharge:  OSAKA, JAPAN
Vessel / Voyage:    EVER GLORY / V.0056-076W
ETD:                Nov 25, 2024
ETA:                Dec 03, 2024

─────────────────────────────────────────────────────────────
No. | Description                   | HS Code  | Qty  | Unit | Unit Price | Amount
─────────────────────────────────────────────────────────────
 1  | Modified Tapioca Starch       | 1108.14  | ——   | KGS  | USD 1.20   | ——
    | (Food grade, Bag packing)     |          |      |      |            |
─────────────────────────────────────────────────────────────
    ※ 数量・合計金額は Packing List 参照

Country of Origin: THAILAND
Incoterms:         CIF OSAKA
Gross Weight:      Refer to Packing List
Measurement:       Refer to Packing List

Signed by: Somchai Pornprasert, Export Director`,
      },
      {
        type: "B/L",
        docNumber: "EGLV140400987654",
        content: `SEA WAYBILL
                                   B/L No.: EGLV140400987654

Shipper:
  THAI AGRO EXPORT CO., LTD
  289 Silom Road, Bangkok 10500, Thailand

Consignee:
  東洋フーズ株式会社
  〒556-0011 大阪府大阪市浪速区難波中2-X-X

Notify Party: (Same as Consignee)

Vessel / Voyage:   EVER GLORY / V.0056-076W
Port of Loading:   BANGKOK, THAILAND
Port of Discharge: OSAKA, JAPAN

Marks &  | No. & Kind  | Description of Goods           | Gross Weight  | Measurement
Numbers  | of Packages |                                 |               |
─────────────────────────────────────────────────────────────────────────────────
TF/OSK   | ---         | MODIFIED TAPIOCA STARCH         | 800.0 KGS     | ---
         |             | (FOOD GRADE)                    |               |
         |             | HS CODE: 1108.14                |               |
         |             | COUNTRY OF ORIGIN: THAILAND     |               |
─────────────────────────────────────────────────────────────────────────────────

Freight:    PREPAID (CIF)
Issue Date: November 25, 2024

EVERGREEN MARINE CORP. As Carrier`,
      },
    ],
    result: {
      summary: [
        { label: "荷主", value: "東洋フーズ株式会社", status: "ok" },
        { label: "輸出者（Shipper）", value: "THAI AGRO EXPORT CO., LTD（タイ・バンコク）", status: "ok" },
        { label: "仕向地", value: "大阪港", status: "ok" },
        { label: "品名", value: "Modified Tapioca Starch（タピオカ澱粉・食品グレード）", status: "ok" },
        { label: "数量", value: "未確認（Packing List 未添付）", status: "missing" },
        { label: "重量（B/L 記載）", value: "800.0 KGS", status: "warning" },
        { label: "重量（Packing List）", value: "未添付のため確認不可", status: "missing" },
        { label: "単価", value: "USD 1.20/KGS", status: "ok" },
        { label: "合計金額", value: "数量未確定のため未確認", status: "missing" },
        { label: "HS コード", value: "1108.14（タピオカ澱粉）", status: "ok" },
        { label: "原産地", value: "タイ", status: "ok" },
        { label: "Incoterms", value: "CIF OSAKA", status: "ok" },
        { label: "本船/航路", value: "EVER GLORY / V.0056-076W", status: "ok" },
        { label: "ETA（到着予定）", value: "2024年12月03日", status: "ok" },
        { label: "食品衛生法届出", value: "未確認", status: "missing" },
      ],
      issues: [
        {
          severity: "error",
          title: "Packing List 未添付",
          detail: "梱包数・正味重量・総重量・容積が確認できません。Invoice にも「Refer to Packing List」と記載あり。数量・合計金額の確定不可。",
        },
        {
          severity: "warning",
          title: "食品衛生法届出書類の確認が必要",
          detail: "Modified Tapioca Starch（食品素材）の輸入につき、食品衛生法第27条に基づく届出が必要です。届出書類の準備状況を確認してください。",
        },
      ],
      customerEmail: {
        to: "tanaka.h@toyo-foods.co.jp",
        subject: "Re: 【輸入通関依頼】案件No.2024-1130 / タピオカ澱粉 / バンコク発",
        body: `東洋フーズ株式会社
貿易部 田中 浩 様

お世話になっております。AccelShift通関チームの山本です。

案件No.2024-1130（Invoice #TH-INV-2024-1130）について
書類を確認いたしましたところ、以下の不足・確認事項がございます。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ ① Packing List が未添付です
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
梱包数・重量・容積の確認ができません。
Invoice にも「Refer to Packing List」と記載されており、
数量・合計金額の確定には Packing List が必要です。

本日中に入手予定とのこと、ご準備でき次第ご送付ください。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ ② 食品衛生法届出書類の確認
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Modified Tapioca Starch（タピオカ澱粉・食品グレード）の
輸入につき、食品衛生法第27条に基づく食品等輸入届出書の
準備状況をお知らせいただけますでしょうか。

ETA まで時間がございますので、Packing List と合わせて
ご準備いただけますと幸いです。

ご不明な点はお気軽にお申し付けください。

——
AccelShift通関チーム / 山本 雄介
Tel: 03-XXXX-XXXX  /  yuske.yamamoto@accelshift.jp`,
      },
      operatorMemo: `【案件 TH-INV-2024-1130 / 東洋フーズ】通関士確認メモ

ステータス: ⚠️ 書類不足・保留中

▼ 書類確認
  Invoice      TH-INV-2024-1130  ✅
  B/L          EGLV140400987654  ✅
  Packing List ❌ 未受領（荷主側で仕入先に請求中）

▼ 未確認事項
  - 正確な梱包数・容積（PL 待ち）
  - 合計金額（単価 USD 1.20/KGS × 数量 未確定）
  - 食品衛生法届出書類の有無（要確認）

▼ 対応
  - 荷主へ確認メール送付済み
  - Packing List 受領後に整合性チェックを実施
  - 食品衛生法届出書 確認後、検疫手続きと並行して輸入申告へ
  - ETA: 12/03 → 12/01 までにはPL受領が望ましい`,
    },
  },

  // ─────────────────────────────────────────────────────
  // Case 3: 不整合（重量不一致）
  // ─────────────────────────────────────────────────────
  {
    id: "case-03",
    label: "🔴 不整合（Invoice ↔ Packing List 重量不一致）",
    badgeColor: "bg-red-100 text-red-700",
    borderColor: "border-red-400",
    scenario: "韓国・釜山から工業用エポキシ接着剤の輸入。書類はそろっているが Invoice と Packing List で重量が 240kg 不一致。化学品のため申告保留。",
    level: "error",
    inputEmail: {
      subject: "【輸入通関依頼】案件No.2024-1205 / エポキシ接着剤 / 釜山発",
      from: "sato.m@nippon-chemical.co.jp（日本ケミカル株式会社 佐藤 誠）",
      body: `お世話になっております。日本ケミカル 資材部の佐藤です。

下記案件の輸入通関をお願いします。

■ 案件概要
- 品名: 工業用エポキシ接着剤
- 仕入先: KOREA ADHESIVES CO., LTD（釜山）
- 本船: PANCON HIGHWAY / V.031E
- 船積港: BUSAN / 揚げ港: YOKOHAMA
- 到着予定: 2024年12月10日（火）

■ 添付書類
  1. Invoice #KR-INV-2024-1205
  2. Packing List #KR-PL-2024-1205
  3. B/L #KOREABLL7733042

よろしくお願いします。

──────────────────────────────
日本ケミカル株式会社 資材部
佐藤 誠 / Makoto Sato
Tel: 045-XXXX-XXXX
──────────────────────────────`,
      attachments: [
        "Invoice #KR-INV-2024-1205",
        "Packing List #KR-PL-2024-1205",
        "B/L #KOREABLL7733042",
      ],
    },
    rawDocuments: [
      {
        type: "Invoice",
        docNumber: "KR-INV-2024-1205",
        content: `COMMERCIAL INVOICE

Shipper / Exporter:
  KOREA ADHESIVES CO., LTD
  47 Sinpyeong-dong, Saha-gu, Busan 49441, Republic of Korea
  Tel: +82-51-XXX-XXXX

Consignee:
  日本ケミカル株式会社
  〒221-0001 神奈川県横浜市神奈川区西神奈川1-X-X
  Tel: 045-XXXX-XXXX

Invoice No.:   KR-INV-2024-1205
Invoice Date:  November 28, 2024
Payment Terms: T/T 60 days after B/L date

Port of Loading:    BUSAN, KOREA
Port of Discharge:  YOKOHAMA, JAPAN
Vessel / Voyage:    PANCON HIGHWAY / V.031E
ETD:                Dec 03, 2024
ETA:                Dec 10, 2024

─────────────────────────────────────────────────────────────────────────
No. | Description                        | HS Code  | Qty  | Unit | Unit Price | Amount
─────────────────────────────────────────────────────────────────────────
 1  | Industrial Epoxy Adhesive          | 3506.10  | 200  | CAN  | USD 8.50   | USD 1,700.00
    | (Two-component, 1kg/can)           |          |      |      |            |
─────────────────────────────────────────────────────────────────────────
                                    Total Qty: 200 CANS               Total: USD 1,700.00

Country of Origin: KOREA
Incoterms:         FOB BUSAN
Net Weight:        1,080.0 KGS
Gross Weight:      1,200.0 KGS   ← ★Invoice記載重量
Measurement:       1.80 CBM  (20 CTNS)

Signed by: Kim Jungho, Export Sales Manager`,
      },
      {
        type: "Packing List",
        docNumber: "KR-PL-2024-1205",
        content: `PACKING LIST

Shipper:    KOREA ADHESIVES CO., LTD
Consignee:  日本ケミカル株式会社
P/L No.:    KR-PL-2024-1205
Date:       November 28, 2024
Invoice No. KR-INV-2024-1205

─────────────────────────────────────────────────────────────────────────────────
Ctn  | Description                  | Qty/Ctn  | Total Qty | N.W.(kg) | G.W.(kg)
─────────────────────────────────────────────────────────────────────────────────
1-20 | Industrial Epoxy Adhesive    | 10 CANS  | 200 CANS  | 43.2     | 48.0
     | (1kg/can, 55×55×25 cm/ctn)  |          |           |          |
─────────────────────────────────────────────────────────────────────────────────
     TOTAL: 20 CTNS                |          | 200 CANS  | 864.0 kg | 960.0 kg  ← ★PL記載重量
─────────────────────────────────────────────────────────────────────────────────

  ❌  Invoice 総重量: 1,200.0 kg
  ❌  Packing List 総重量: 960.0 kg
  ⚠️  差異: 240.0 kg（約 20%）`,
      },
      {
        type: "B/L",
        docNumber: "KOREABLL7733042",
        content: `BILL OF LADING  (ORIGINAL)
                                   B/L No.: KOREABLL7733042

Shipper:
  KOREA ADHESIVES CO., LTD
  47 Sinpyeong-dong, Saha-gu, Busan 49441, Korea

Consignee:  TO ORDER OF SHIPPER

Notify Party:
  日本ケミカル株式会社
  〒221-0001 神奈川県横浜市神奈川区西神奈川1-X-X

Vessel / Voyage:   PANCON HIGHWAY / V.031E
Port of Loading:   BUSAN, KOREA
Port of Discharge: YOKOHAMA, JAPAN

Marks &  | No. & Kind  | Description of Goods              | Gross Weight  | Measurement
Numbers  | of Packages |                                    |               |
─────────────────────────────────────────────────────────────────────────────────────────
NK/YOK   | 20 CTNS     | INDUSTRIAL EPOXY ADHESIVE          | 960.0 KGS     | 1.80 CBM
CASE 1-20|             | (TWO-COMPONENT)                    |               |
         |             | HS CODE: 3506.10                   |               |
         |             | COUNTRY OF ORIGIN: KOREA           |               |
─────────────────────────────────────────────────────────────────────────────────────────

Freight:    COLLECT
Issue Date: December 3, 2024

KOREA MARITIME EXPRESS CO., LTD As Carrier`,
      },
    ],
    result: {
      summary: [
        { label: "荷主", value: "日本ケミカル株式会社", status: "ok" },
        { label: "輸出者（Shipper）", value: "KOREA ADHESIVES CO., LTD（韓国・釜山）", status: "ok" },
        { label: "仕向地", value: "横浜港", status: "ok" },
        { label: "品名", value: "Industrial Epoxy Adhesive（工業用エポキシ接着剤・2液型 1kg/缶）", status: "ok" },
        { label: "数量（Invoice）", value: "200 CANS / 20 CTNS", status: "ok" },
        { label: "数量（Packing List）", value: "200 CANS / 20 CTNS ✅ 一致", status: "ok" },
        { label: "重量（Invoice 総重量）", value: "1,200.0 KGS", status: "error" },
        { label: "重量（Packing List 総重量）", value: "960.0 KGS ❌ 不一致（差異: 240kg）", status: "error" },
        { label: "重量（B/L 記載）", value: "960.0 KGS（PL と一致、Invoice と不一致）", status: "warning" },
        { label: "金額", value: "USD 1,700.00（USD 8.50 × 200 CANS）", status: "ok" },
        { label: "HS コード", value: "3506.10（接着剤）", status: "ok" },
        { label: "原産地", value: "韓国", status: "ok" },
        { label: "Incoterms", value: "FOB BUSAN（Freight: COLLECT）", status: "ok" },
        { label: "本船/航路", value: "PANCON HIGHWAY / V.031E", status: "ok" },
        { label: "ETA（到着予定）", value: "2024年12月10日", status: "ok" },
      ],
      issues: [
        {
          severity: "error",
          title: "重量の不一致（Invoice ↔ Packing List / B/L）",
          detail: "Invoice 記載: 1,200.0kg ／ Packing List・B/L 記載: 960.0kg ／ 差異: 240kg（約20%）。化学品のため重量の正確な申告が必要。申告前に荷主へ訂正書類を要求してください。",
        },
        {
          severity: "warning",
          title: "化学品規制の確認が必要",
          detail: "エポキシ系接着剤（HS 3506.10）は、化審法・安衛法・消防法（引火性液体）の該当可能性あり。成分・SDS（Safety Data Sheet）を確認してください。",
        },
      ],
      customerEmail: {
        to: "sato.m@nippon-chemical.co.jp",
        subject: "Re: 【輸入通関依頼】案件No.2024-1205 / エポキシ接着剤 / 釜山発",
        body: `日本ケミカル株式会社
資材部 佐藤 誠 様

お世話になっております。AccelShift通関チームの山本です。

案件No.2024-1205（Invoice #KR-INV-2024-1205）について
書類を確認いたしましたところ、以下の不整合を確認いたしました。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
■ 重量の不一致（Invoice ↔ Packing List）
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
・Invoice 記載 総重量:      1,200.0 kg
・Packing List 記載 総重量:   960.0 kg
・差異:                       240.0 kg（約 20%）

なお、B/L の重量（960.0kg）は Packing List と一致しています。

工業用化学品の輸入につき、重量を正確に申告する必要がございます。
正しい重量（1,200kg か 960kg か）をご確認の上、
訂正が必要な場合は訂正書類（Amended Invoice または Letter of Correction）
をご提供いただけますでしょうか。

お手数をおかけいたしますが、ETA（12/10）までに
ご対応いただけますようお願いいたします。

——
AccelShift通関チーム / 山本 雄介
Tel: 03-XXXX-XXXX  /  yuske.yamamoto@accelshift.jp`,
      },
      operatorMemo: `【案件 KR-INV-2024-1205 / 日本ケミカル】通関士確認メモ

ステータス: 🔴 不整合・申告保留

▼ 書類確認
  Invoice      KR-INV-2024-1205   ✅
  Packing List KR-PL-2024-1205   ✅
  B/L          KOREABLL7733042    ✅

▼ 不整合内容
  Invoice 重量:      1,200.0 kg
  Packing List 重量:   960.0 kg  ← B/L と一致
  差異: 240.0 kg（約20%）

▼ 要確認事項
  ① 荷主に正しい重量を確認 → 訂正書類（Amended Invoice）待ち
  ② エポキシ系接着剤 → 化審法・安衛法・消防法 該当性確認
     SDS（Safety Data Sheet）を荷主/メーカーから入手要
  ③ HS 3506.10 → 該当法令確認後、申告書作成

▼ 対応
  - 荷主へ確認メール送付済み
  - 訂正書類受領まで輸入申告保留
  - ETA: 12/10 → 12/07 までに訂正書類受領が望ましい`,
    },
  },
];
