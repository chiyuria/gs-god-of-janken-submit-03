# ①課題名

**SLOT – God of Janken（じゃんけんスロット）**

---

# ②課題内容（どんな作品か）

* じゃんけんとスロットを合体させた **jQuery製ブラウザゲーム**
* 勝敗ポイント＋レア抽選で天井到達 → **ボーナスラッシュ突入**
* **Chart.js** によるスランプグラフをリアルタイム描画
* クレジット / ペイアウト の **セグメント表示** を筐体風に実装
* Oracle（神語録）メッセージで演出強化
* 画像は **AI生成素材** を使用

---

# ③アプリのデプロイURL

[https://chiyuria.github.io/gs-god-of-janken-submit-03/](https://chiyuria.github.io/gs-god-of-janken-submit-03/)

---

# ④アプリのログイン用IDまたはPassword

なし

---

# ⑤工夫した点・こだわった点

* **スランプグラフのリアルタイム更新（Chart.js）**
* **1枚ずつ増えるコイン払出しアニメーション**
* **可変天井システム**（1 / 50 / 100 / 200 / 400pt）
* **スマホロングタップデバッグ**、PCデバッグキー（B / D / C）
* じゃんけん勝利時の **レア役抽選テーブル** を自作
* メインディスプレイ上に **セグメント液晶を重ねるUI構成**

---

# ⑥難しかった点・次回トライしたいこと

* Chart.js のサイズ制御が難しい
* メイン表示に各UIを重ねるレイアウト調整
* ボーナス抽選と天井抽選のバランス最適化
* Oracle メッセージの JSON 外部管理
* 前兆・フェイク前兆など “スロット的な期待感” を追加したい

---

# ⑦フリー項目（感想等）

* jQuery と Chart.js を組み合わせた UI 制御の理解が深まった
* スロットの “体感” を再現するための演出作りが特に楽しかった
* 可変天井やレア役など、ちょっとした確率設計が学びになった

---

# 🎮 **How to Play（遊び方）**

## 1. コインを貸し出す

画面左上の **「Lending」ボタン** を押すと、
一度に **+50 コイン** が追加されます。

最初の軍資金として必要なので、まずは貸し出しからスタート。

---

## 2. BET（ベット）する

**「BET」ボタン** を押すと、
**3コイン消費 → 1ゲーム開始** になります。

BETすると画面中央のメインディスプレイで
「じゃん→けん」演出が始まり、操作を受け付ける状態に。

---

## 3. 手を選ぶ

手札ボタン
✊ グー
✌ チョキ
✋ パー

のいずれかをタップ。

---

## 4. 勝敗判定

勝敗によって以下が決まります：

| 結果      | ポイント         | コイン(通常)  |
| ------- | ------------ | -------- |
| **勝ち**  | +3pt（＋レア役抽選） | +4       |
| **あいこ** | +0pt         | +3（リプレイ） |
| **負け**  | +0pt         | +0       |

勝ったときのみレア役抽選が発生し、
大量ポイント獲得のチャンスも存在します。

---

## 5. 天井ポイントに到達すると…

ゲーム中に貯まる **gamePoint** が
可変天井（1 / 50 / 100 / 200 / 400 pt）に達すると演出発生：

* メインディスプレイに **「RUSH IN」**
* スマホは **vibrate（ぶぶぶーん）** 演出
* Oracle がボーナス用メッセージに切り替わる

この状態（mode=9）で次のゲームに備えます。

---

## 6. 次の BET でボーナスラッシュ突入

天井到達後、再度 BET を押すと
**20G のボーナスラッシュ** が開始（mode=1）。

ボーナス中は以下のように強化：

| 内容      | 通常        | ボーナス            |
| ------- | --------- | --------------- |
| ペイアウト   | 4 / 3 / 0 | **15 / 3 / 0**  |
| CPU手の補正 | 完全ランダム    | 2/3でプレイヤー勝利に寄せる |
| ランプ     | RUSHランプ点灯 | 常時点灯            |

---

## 7. ボーナス終了 → 通常へ戻る

20G消化でボーナス終了。

* モードが通常に戻り
* カウンタ表示リセット
* **新しい天井が再抽選される**

この繰り返し。

---

## 8. スランプグラフで差枚をチェック

画面下部にチャートがあり、
「貸出枚数 vs 現在のコイン」の差＝差枚（diff）をリアルタイムで反映。

スロットのように
**右肩上がり・右肩下がり** を楽しみながら遊べる。

---

## 9. スマホ & PC のデバッグ（開発者用）

### ▼ PC

* **B** → 強制ボーナスモード
* **D** → 天井即到達
* **C** → 現在の天井（pointCeiling）を確認

### ▼ スマホ

* **ラッシュランプ長押し2秒** → 天井到達
* バイブ通知で成功がわかる

---

# 🟦 **How to Play**

## 1. Add Coins

Press the **“Lending”** button to add **+50 coins** at once.
Use this as your initial bankroll.

---

## 2. Place a BET

Press **“BET”** to start a game.
BET consumes **3 coins** and begins the round.

---

## 3. Choose Your Hand

Tap one of the hand buttons:

* ✊ Rock
* ✌ Scissors
* ✋ Paper

---

## 4. Battle Result

Your outcome determines points and payouts:

| Result   | Points              | Coins (Normal) |
| -------- | ------------------- | -------------- |
| **Win**  | +3pt (+Rare Chance) | +4             |
| **Draw** | +0pt                | +3             |
| **Lose** | +0pt                | 0              |

Rare bonuses may occur **only when you win**.

---

## 5. Reach the Point Ceiling

The game has a **variable ceiling**
(1 / 50 / 100 / 200 / 400 pts).

When your total points reach the ceiling:

* Bonus entrance animation appears
* Smartphone vibrates
* Oracle displays special Bonus messages

The game enters **Bonus Ready mode (mode 9)**.

---

## 6. Bonus Rush

Press BET again to enter a **20-round Bonus Rush**.

During Bonus:

| Content   | Normal    | Bonus                        |
| --------- | --------- | ---------------------------- |
| Payout    | 4 / 3 / 0 | **15 / 3 / 0**               |
| CPU bias  | Random    | Favors player (2/3 win rate) |
| Rush Lamp | Off       | **On**                       |

---

## 7. Bonus Ends

When 20 rounds finish:

* Mode returns to normal
* Counters reset
* A **new ceiling is drawn**

---

## 8. Slump Graph

The bottom chart displays **current coin – total lending**,
just like a pachislot “net gain graph”.

Tracks upward/downward trends in real time.

---

## 9. Debug Tools

### For PC

* **B** → Force Bonus
* **D** → Force Ceiling
* **C** → Show Current Ceiling

### For Mobile

* **Long Press (2 sec) the Rush Lamp** → Force Ceiling
* Vibration feedback indicates success

---

# SLOT – God of Janken

じゃんけん × スロットゲーム（jQuery課題作品）

---

## 📝 概要

本リポジトリは、**jQuery を用いて制作したスロット風じゃんけんゲーム**です。
通常じゃんけんに「ポイント管理」「天井」「ボーナスラッシュ」「レア役抽選」などの要素を追加し、スロットのゲーム性を再現しています。

さらに今回のアップデートでは **スランプグラフ（差枚推移）** を Chart.js でリアルタイム描画し、
UI面でもメインディスプレイに **クレジット・ペイアウトのセグメント表示** を重ねるなど、筐体らしい世界観を作り込みました。

※画像素材はすべて **AI生成** を使用。

---

## 🎮 機能一覧

### ▼ 基本ゲーム

* グー / チョキ / パー の選択
* BET（3コイン消費）
* コイン貸出（+50）
* 勝敗に応じたポイント & コイン処理
* **勝利時のみレア抽選が発生**
* 天井ポイントに到達するとボーナス準備（mode=9）
* 次回BETで **20Gボーナスラッシュ** に突入

### ▼ UI / 演出

* メイン画面にセグメント風の Credit / Payout 表示
* Oracle（神語録）のランダムメッセージ表示
* 払い出し（payout）とコイン増加の段階アニメーション
* スランプグラフ（差枚）をリアルタイム更新
* スマホ向けにレイアウト最適化

### ▼ デバッグ

* **Bキー：強制ボーナス**
* **Dキー：天井到達**
* **Cキー：天井ポイント確認**
* スマホは **ラッシュランプ長押し（2秒）で天井到達**

---

## 🔥 主なアップデート

### 1. 可変天井（pointCeiling）

```js
function drawCeiling() {
  const r = Math.random();
  if (r < 0.02) pointCeiling = 1;
  else if (r < 0.10) pointCeiling = 50;
  else if (r < 0.35) pointCeiling = 100;
  else if (r < 0.70) pointCeiling = 200;
  else pointCeiling = 400;
}
```

---

### 2. レア役抽選のテーブル強化

```js
if (result == 1) {
  const rare = Math.ceil(Math.random() * 8192);
  if (rare >= 8180) gamePoint = pointCeiling;
  else if (rare >= 8080) gamePoint += 147;
  else if (rare >= 7800) gamePoint += 67;
  else if (rare >= 6200) gamePoint += 12;
}
```

---

### 3. スマホ用ロングタップデバッグ

```js
$(".rush-lamp").on("touchstart", function () {
  longTap = 0;
  debugTimer = setTimeout(function () {
    gamePoint = pointCeiling;
    vibrateLong();
    longTap = 1;
  }, 2000);
});

$(".rush-lamp").on("touchend touchmove touchcancel", function () {
  clearTimeout(debugTimer);
});
```

---

### 4. バイブレーション

* 通常：25ms
* ボーナス： [20,20,20,20,300]
* ロングタップ成功：100ms

---

## 🧩 使用技術

* HTML / CSS
* jQuery
* Chart.js
* CSS animation
* AI生成素材（img/）

---

## 🕹 ゲームフロー

1. 貸出（+50）
2. BET（3枚消費）
3. じゃんけん
4. ポイント + レア抽選
5. 天井到達で mode=9
6. 次のBETでボーナスラッシュ（20G）
7. スランプグラフがリアルタイム更新

---

## 🗂 ディレクトリ構成

```
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── img/   ← AI生成画像
└── font/
```

---

## ▶ 動作方法

1. このリポジトリをクローン
2. ブラウザで `index.html` を開くだけ

---

## 📘 学習ポイント

* jQuery の DOM 操作・イベント制御
* 状態管理とモード遷移の設計
* ランダム処理・確率抽選
* Chart.js を使ったリアルタイムグラフ描画
* UI/UX の作り込み
* スロット風のアニメーション・演出

---

## 📄 ライセンス

学習目的で制作。
画像はすべて **AI生成素材**。

---

## ✨ Author

Chiyuria

---

# SLOT – God of Janken

Rock–Paper–Scissors × Slot Machine Game (jQuery Project)

---

## 📝 Overview

This project is a **jQuery-based Rock–Paper–Scissors slot machine game**.

Players bet coins, choose their hand, and accumulate points.
When the player reaches a variable point ceiling, the game enters **Bonus Rush (20 rounds)**.

The game includes a **real-time Slump Graph (net gain curve)** using Chart.js,
as well as **segment-style displays** for Credit and Payout to emulate a real slot machine UI.

All graphic assets are **AI-generated**.

---

## 🎮 Features

### ▼ Gameplay

* Rock / Scissors / Paper selection
* BET (costs 3 coins)
* Add Coins (+50)
* Point calculation based on RPS result
* **Rare bonuses only on wins**
* Variable point ceiling system
* Bonus Rush (20 rounds)

### ▼ UI / Effects

* Segment-style Credit / Payout display
* Random Oracle messages (Win / Lose / Draw / Bonus)
* One-by-one coin payout animation
* Real-time Slump Graph using Chart.js
* Responsive layout for mobile

### ▼ Debug Tools

* **B** → Force Bonus Mode
* **D** → Force Point Ceiling
* **C** → Check current ceiling
* Mobile: long press (2 sec) on Rush Lamp → Force ceiling

---

## 🔥 Major Update

### 1. Variable Point Ceiling

```js
function drawCeiling() {
  const r = Math.random();
  if (r < 0.02) pointCeiling = 1;
  else if (r < 0.10) pointCeiling = 50;
  else if (r < 0.35) pointCeiling = 100;
  else if (r < 0.70) pointCeiling = 200;
  else pointCeiling = 400;
}
```

### 2. Rare Bonus Table

```js
if (result == 1) {
  const rare = Math.ceil(Math.random() * 8192);
  if (rare >= 8180) gamePoint = pointCeiling;
  else if (rare >= 8080) gamePoint += 147;
  else if (rare >= 7800) gamePoint += 67;
  else if (rare >= 6200) gamePoint += 12;
}
```

### 3. Mobile Long Press Debug

```js
$(".rush-lamp").on("touchstart", function () {
  longTap = 0;
  debugTimer = setTimeout(function () {
    gamePoint = pointCeiling;
    vibrateLong();
    longTap = 1;
  }, 2000);
});
```

---

## 🔧 Tech Stack

* HTML5 / CSS3
* jQuery
* Chart.js
* CSS Animation
* AI-generated images

---

## 🕹 Game Flow

1. Add Coins
2. BET
3. Select Hand
4. Points + Optional Rare Bonus
5. Reach Ceiling → Bonus Ready
6. Next BET → Bonus Rush (20 rounds)
7. Slump graph updates dynamically

---

## 🗂 Directory Structure

```
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── img/   ← AI-generated
└── font/
```

---

## ▶ How to Run

1. Clone the repository
2. Open `index.html` in your browser (no server required)

---

## 📘 Learning Points

* jQuery event handling & DOM manipulation
* State & mode management
* Randomized probability implementation
* Real-time graph rendering with Chart.js
* UI layout construction
* Animation control for coin payout

---

## 📄 License

Created for educational purposes.
All images are **AI-generated**.

---

## ✨ Author

Chiyuria
