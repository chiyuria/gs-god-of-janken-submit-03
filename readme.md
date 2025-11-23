# ①課題名

**SLOT – God of Janken（じゃんけんスロット）**

---

# ②課題内容（どんな作品か）

* じゃんけんとスロットを合体させた **jQuery製ブラウザゲーム**
* 勝敗ポイント＋レア抽選で天井到達 → **ボーナスラッシュ突入**
* **Chart.js** によるスランプグラフをリアルタイム描画
* クレジット / ペイアウト の **セグメント表示** を筐体風に実装
* Oracle（神語録）メッセージと **色変化によるモード示唆** で演出強化
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
* **スマホロングタップデバッグ**、PCデバッグキー（B / D / C / **M**）
* じゃんけん勝利時の **レア役抽選テーブル** と
  内部モードテーブル（通常 / 高確 / 低確）による“勝ちやすさ / 負けやすさ”の変化
* メインディスプレイ上に **セグメント液晶を重ねるUI構成** と
  Oracleの**色変化（赤＝高確示唆 / 青＝低確示唆）**によるスロット風演出

---

# ⑥難しかった点・次回トライしたいこと

* Chart.js のサイズ制御が難しい
* メイン表示に各UIを重ねるレイアウト調整
* ボーナス抽選と天井抽選のバランス最適化
* Oracle メッセージの JSON 外部管理
* **内部モードと示唆演出の“体感バランス”調整**
* 前兆・フェイク前兆など “スロット的な期待感” を追加したい

---

# ⑦フリー項目（感想等）

* jQuery と Chart.js を組み合わせた UI 制御の理解が深まった
* スロットの “体感” を再現するための演出作りが特に楽しかった
* 可変天井やレア役、モードテーブルなど、
  「見えない内部値でプレイ体験を変える」確率設計が学びになった

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

※内部的には「通常 / 高確 / 低確」のモードテーブルが存在し、
ラウンドごとに **CPUの手が“勝ちやすい / 負けやすい”状態へ偏る**ことがあります。

---

## 5. 天井ポイントに到達すると…

ゲーム中に貯まる **gamePoint** が
可変天井（1 / 50 / 100 / 200 / 400 pt）に達すると演出発生：

* メインディスプレイに **「RUSH IN」**
* スマホは **vibrate（ぶぶぶーん）** 演出
* Oracle がボーナス用メッセージに切り替わる
* 内部モード・モードゲーム（高確/低確の保持G）は **リセット**

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
* **M** → console で **modeTable / modeGame（内部モード状態）** を確認

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

Internally, the game has **mode tables** (normal / high / low),
which slightly bias the CPU’s hand toward **more wins or more losses** for the player.

---

## 5. Reach the Point Ceiling

The game has a **variable ceiling**
(1 / 50 / 100 / 200 / 400 pts).

When your total points reach the ceiling:

* Bonus entrance animation appears
* Smartphone vibrates
* Oracle displays special Bonus messages
* Internal mode state is **reset**

The game enters **Bonus Ready mode (mode 9)**.

---

## 6. Bonus Rush

Press BET again to enter a **20-round Bonus Rush**.

During Bonus:

| Content   | Normal      | Bonus                        |
| --------- | ----------- | ---------------------------- |
| Payout    | 4 / 3 / 0   | **15 / 3 / 0**               |
| CPU bias  | Random      | Favors player (2/3 win rate) |
| Rush Lamp | Off / Blink | **Always On**                |

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

You can visually track upward/downward trends in real time.

---

## 9. Debug Tools

### For PC

* **B** → Force Bonus
* **D** → Force Ceiling
* **C** → Show Current Ceiling
* **M** → Log **modeTable / modeGame** (internal mode state) to console

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

今回のバージョンでは **スランプグラフ（差枚推移）** を Chart.js でリアルタイム描画し、
UI面でもメインディスプレイに **クレジット・ペイアウトのセグメント表示** を重ねるなど、筐体らしい世界観を作り込みました。

さらに、内部的には **モードテーブル（通常 / 高確 / 低確）** を持ち、
Oracle の色変化でさりげなく示唆を出すことで、
「ただのじゃんけん」ではない遊技感を目指しています。

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
* **内部モードテーブル（通常 / 高確 / 低確）による勝率変動**

### ▼ UI / 演出

* メイン画面にセグメント風の Credit / Payout 表示
* Oracle（神語録）のランダムメッセージ表示
* Oracleの**色変化（赤／青）によるモード示唆**
* 払い出し（payout）とコイン増加の段階アニメーション
* スランプグラフ（差枚）をリアルタイム更新
* スマホ向けにレイアウト最適化

### ▼ デバッグ

* **Bキー：強制ボーナス**
* **Dキー：天井到達**
* **Cキー：天井ポイント確認**
* **Mキー：modeTable / modeGame を console 出力**
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

### 4. モードテーブル & Oracle色示唆

```js
// modeTable: 0=通常, 1=高確, 2=低確
// modeGame: 高確/低確を保持するゲーム数
function drawModeTable () {
  if (mode === 1 || mode === 9) return;

  if (modeGame > 0) {
    modeGame--;
    return;
  }

  const rand = Math.random();

  if (modeTable === 0) {
    if (rand < 0.05) {
      modeTable = 1;      // 高確
      modeGame = 10;
    } else if (rand < 0.1) {
      modeTable = 2;      // 低確
      modeGame = 10;
    }
  } else if (modeTable === 1) {
    if (rand < 0.8) {
      modeTable = 0;
      modeGame = 0;
    }
  } else if (modeTable === 2) {
    if (rand < 0.5) {
      modeTable = 0;
      modeGame = 0;
    }
  }
}
```

```js
function chanceOracle() {
  const rand = Math.random();

  if (modeTable === 1) {
    // 高確示唆（赤）
    $("#oracle").css("color", rand < 0.1 ? "#ff4545" : "#ffffff");
  } else if (modeTable === 2) {
    // 低確示唆（青）
    $("#oracle").css("color", rand < 0.1 ? "#0055ff" : "#ffffff");
  } else {
    $("#oracle").css("color", "#ffffff");
  }
}
```

---

### 5. バイブレーション

* 通常：25ms
* ボーナス：`[20,20,20,20,300]`
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
* **内部モード & 示唆演出の設計**

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
When the player reaches a **variable point ceiling**, the game enters **Bonus Rush (20 rounds)**.

The game includes a **real-time Slump Graph (net gain curve)** using Chart.js,
as well as **segment-style displays** for Credit and Payout to emulate a real slot machine UI.

Internally, it also features **mode tables (normal / high / low)** and
**Oracle color hints** to subtly indicate internal states.

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
* Bonus Ready → **Bonus Rush (20 rounds)**
* **Internal mode tables (normal / high / low) affecting win bias**

### ▼ UI / Effects

* Segment-style Credit / Payout display
* Random Oracle messages (Win / Lose / Draw / Bonus)
* **Oracle color hints (red / blue) for mode indication**
* One-by-one coin payout animation
* Real-time Slump Graph using Chart.js
* Responsive layout for mobile

### ▼ Debug Tools

* **B** → Force Bonus Mode
* **D** → Force Point Ceiling
* **C** → Check current ceiling
* **M** → Log `modeTable` / `modeGame` to console
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

### 4. Mode Table & Oracle Color Hint

```js
// 0: normal, 1: high, 2: low
function drawModeTable () { /* ...see Japanese section... */ }
```

```js
function chanceOracle() {
  const rand = Math.random();
  if (modeTable === 1) {
    $("#oracle").css("color", rand < 0.1 ? "#ff4545" : "#ffffff");
  } else if (modeTable === 2) {
    $("#oracle").css("color", rand < 0.1 ? "#0055ff" : "#ffffff");
  } else {
    $("#oracle").css("color", "#ffffff");
  }
}
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
* Designing **hidden mode systems + hint UIs**

---

## 📄 License

Created for educational purposes.
All images are **AI-generated**.

---

## ✨ Author

Chiyuria

---
