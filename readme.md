# ①課題名

**SLOT – God of Janken（じゃんけんスロット）**

---

# ②課題内容（どんな作品か）

* じゃんけんゲームにスロットの要素を組み合わせた **jQueryベースのゲーム**
* 勝敗に応じたポイントとコインを管理し、200pt 到達でボーナスラッシュに突入
* **Chart.js を使用したスランプグラフ（差枚推移）のリアルタイム描画機能を実装**
* メインディスプレイ内に **Credit / Payout のセグメント風表示** を埋め込み
* Oracle（神語録）として、勝敗ごとにランダムテキストを表示する演出付き

---

# ③アプリのデプロイURL

https://chiyuria.github.io/gs-god-of-janken-submit-03/

---

# ④アプリのログイン用IDまたはPassword（ある場合）

* なし

---

# ⑤工夫した点・こだわった点

* **スランプグラフの実装（今回のアップデートの主軸）**

  * ゲームごとに差枚を記録し、Chart.jsでリアルタイム更新
  * アスペクト比・親要素との干渉などを調整し、崩れずに描画されるよう最適化
* **コイン払出しを“1枚ずつ増えて見える”アニメーションに**

  * スロットらしい体験のために setInterval を用いて段階的に反映
* **UIの筐体化**

  * メイン画面にセグメント風の Credit / Payout 表示を埋め込み
  * Oracle パネルを左カラムに追加してゲーム性を強化
* **勝敗・ボーナスに応じた Oracle メッセージのランダム生成**

  * Win / Draw / Lose / Bonus の4カテゴリで文章を大量に定義

---

# ⑥難しかった点・次回トライしたいこと（又は機能）

* Chart.js の縦伸び・リサイズ挙動を制御する点
* メインディスプレイへ UI を重ねる際の position 調整
* Oracleメッセージを外部JSON化して管理性を上げたい
* スロット演出をさらに強化（前兆・フェイク前兆・点滅アニメなど）

---

# ⑦フリー項目（感想、シェアしたいこと等なんでも）

* **[感想]**
  jQueryのイベント処理・状態管理に加え、Chart.js の導入で
  「UIの動的変化」「アニメーション」「リアルタイムグラフ」など幅広い学びが得られた。
  単なるじゃんけんではなく、スロット的な“遊び感”をどこまで再現できるかをテーマに制作した。

* **[参考記事]**
　特になし

---

ちゆ、これ提出フォーマットとしては完璧な形だよ😏✨
必要なら **画像（スクショ）追加用セクション** も作るし、
**英語版課題フォーマット** も生成できる。

どうする？このまま README の下にコピペ版も作っとく？



---

# SLOT – God of Janken

じゃんけんスロットアプリ（課題作品）

---

## 📝 概要

本リポジトリは、スクール課題として制作した **jQueryベースのじゃんけんスロットゲーム** です。
じゃんけんにスロット要素を組み合わせ、コイン管理・ボーナスラッシュなどを実装しています。

今回のアップデートでは **スランプグラフ（差枚推移）** を新規実装し、
さらに **コイン払い出しが1枚ずつ増えていくアニメーション** を追加することで、
より“筐体らしい体験”を再現しました。

---

## 🎮 機能一覧

* グー / チョキ / パー の選択
* BET（3コイン消費）
* コイン貸出（+50）
* 勝敗とレア抽選によるポイント加算
* 200pt 到達でボーナス準備
* 次の BET で 20G ボーナスラッシュ
* **スランプグラフ（差枚推移）のリアルタイム描画**
* **コイン払出しの段階的アニメーション**
* Oracle（神語録）ランダム表示（Win / Lose / Draw / Bonus）

---

## 🔥 今回の主なアップデート

* **スランプグラフ（Chart.js）を導入し、差枚推移をリアルタイム可視化**
* **コイン1枚ずつ増えるアニメーションを新実装**（払い出し演出を強化）
* Oracle（神語録）システムを追加してゲーム性を拡張
* UIレイアウトの調整（左カラムに Oracle パネル追加、セグ液晶をメイン画面に配置）

---

## 🧩 使用技術

* HTML5 / CSS3
* jQuery 2.1.3
* Chart.js
* CSSアニメーション
* セグメント風フォント

---

## 🕹 ゲームの流れ

1. コイン貸出（+50）
2. BET（3コイン消費）
3. じゃんけん選択
4. ポイント・コイン処理（勝敗＋レア抽選）
5. 200pt → ボーナス準備（mode=9）
6. 次のBET → ボーナスラッシュ（20G）
7. スランプグラフ・Oracle がリアルタイムで更新

---

## 🗂 ディレクトリ構成

```
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── img/
└── font/
```

---

## ▶ 動作方法

1. リポジトリをクローン
2. `index.html` をブラウザで開くだけ
   （ローカルサーバ不要）

---

## 📘 学習ポイント

* jQuery のイベント処理・DOM操作
* モード遷移と状態管理
* ランダム抽選の実装
* Chart.js を用いたリアルタイム描画
* スロット風UIの構築
* アニメーション制御（コイン増加など）

---

## 📄 ライセンス

本作品は学習目的で制作されたものです。
画像素材・コードの無断使用はご遠慮ください。

---

## ✨ Author

Chiyuria

---

---

# SLOT – God of Janken

Rock–Paper–Scissors Slot Game (Assignment Project)

---

## 📝 Overview

This repository contains a **jQuery-based Rock–Paper–Scissors slot game** created as a school assignment.

In this update, a **Slump Graph (Net Gain Curve)** was newly implemented
to visualize point progression in real time.
Additionally, a **coin payout animation that increases one coin at a time**
was added to enhance the slot-machine feel.

---

## 🎮 Features

* Rock / Scissors / Paper selection
* BET (costs 3 coins)
* Add Coins (+50)
* Point calculation & rare chance bonuses
* 200pt → Bonus Ready → Bonus Rush (20 rounds)
* **Real-time Slump Graph (Chart.js)**
* **Animated coin payout (increment one-by-one)**
* Oracle message system (randomized Win / Lose / Draw / Bonus messages)

---

## 🔥 Major Update

* **Added Slump Graph using Chart.js**
* **Added one-by-one coin payout animation**
* Implemented Oracle Message System
* Added Oracle panel and segment-style displays to the layout
* UI refinements

---

## 🔧 Tech Stack

* HTML5 / CSS3
* jQuery 2.1.3
* Chart.js
* CSS animation
* Seven-segment-style font

---

## 🕹 Game Flow

1. Add coins (+50)
2. BET (costs 3 coins)
3. Choose a hand
4. Point & coin handling
5. 200pt → Bonus Ready (mode=9)
6. Next BET → Bonus Rush (20 rounds)
7. Graph & Oracle update dynamically

---

## 🗂 Directory Structure

```
.
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── img/
└── font/
```

---

## ▶ How to Run

1. Clone the repository
2. Open `index.html` in your browser (no server required)

---

## 📘 Learning Highlights

* jQuery: events and DOM manipulation
* State management
* Random probability handling
* Real-time visualization with Chart.js
* UI layout construction
* Animation control (coin payout)

---

## 📄 License

This project was created for educational purposes.
Unauthorized redistribution of code or image assets is prohibited.

---

## ✨ Author

Chiyuria
