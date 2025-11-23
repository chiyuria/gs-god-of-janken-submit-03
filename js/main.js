//----ゲーム管理定義---- //
let gameCount = 0; //ゲーム数のカウント
let gamePoint = 0; //勝敗によるポイントカウント
let lendingTotal = 0; //総貸出枚数
let bet = 0; //BET状態を管理する変数
let handLock = 0;//クリック連打回避用
let coin = 0; //コインポイント
let payout = 0; //払い出し枚数
let mode = 0; //モード変数
let bonusGame = 0; //ボーナスゲーム数管理変数
let diff; //スランプグラフ描画のためupdateDiff()からグローバルへ

//----コイン増加アニメ用変数群----//
let payStartValue;
let payEndValue;
let coinStartValue;
let coinEndValue;

//----スランプグラフ用変数群----//
let gameLog = [];
let diffLog = [];
let slumpGameCount = 0;
let slumpChart = null;
let upperDiffScale = 100;
let lowerDiffScale = -100;

const pointTable = {
  1: 3, //勝ちは3pt
  2: 1, //あいこも1pt
  3: 1, //負けでも1pt
};
const cpuHandsTable = {
  1: "グー",
  2: "チョキ",
  3: "パー",
};
const judgementTable = {
  1: "勝ち",
  2: "あいこ",
  3: "負け",
};
const coinTable = {
  1: 4,
  2: 3, //リプレイ
  3: 0,
};
const coinTableBonus = {
  1: 15, //ボーナス時は純増アップ
  2: 3, //リプレイ
  3: 0,
};

// ----ORACLE----//
const oracles = {

  win: [
    "Well done, mortal. Victory is but a fleeting spark—enjoy it while it lasts.<br><br>よくやったな、汝。勝利とは一瞬の煌めきである。今のうちに誇れ。",
    "You won as you were meant to. But don’t get cocky—you could easily lose next.<br><br>勝つべくして勝った。だが油断するな。次は普通に負ける可能性がある。",
    "That victory was half skill, half luck, and the remaining half was pure illusion.<br><br>今の勝利、半分は実力、半分は運、残り半分は気のせいである。",
    "I witnessed your win. Not brag-worthy, but not bad.<br><br>その勝利、我は見ていた。威張るほどではないが悪くない。",
    "Your hand seems in good spirits today. Tomorrow? Uncertain.<br><br>汝の手、今日は機嫌が良いようだ。明日は知らぬがな。",
    "Victory is like the wind—today it just happened to blow your way.<br><br>勝利とは風のようなものだ。たまたま吹いただけである。",
    "That win was a bit too perfect. Be wary.<br><br>今の勝ち方、正直少し出来すぎである。気をつけよ。",
    "A fluke is still a win. Be proud, but not for too long.<br><br>まぐれの勝利でも勝ちは勝ちだ。誇れ、ただし長くは誇るな。",
    "Even a god said ‘Oh?’ at that win. Nicely done.<br><br>神すら『お？』となる勝ち方だったぞ。よくやった。",
    "You seem strong today… or maybe it was only that moment.<br><br>今日の汝は強い。…いや、さっきだけ強かった可能性もある。",
  ],

  lose: [
    "You lost, mortal. That hand was weak. Look stronger next time.<br><br>負けたな、汝。その手は……弱かった。次はもう少し強そうな顔をせよ。",
    "Defeat teaches little in rock-paper-scissors. Don’t overthink it.<br><br>敗北は学びの母と言う。だがじゃんけんでは特に学べることはない。気にするな。",
    "Humans choose nonsense hands sometimes… especially you.<br><br>それは仕方ない。人は時々、意味不明な手を出すものだ。特に汝はな。",
    "Your loss wasn’t bad—there was a certain beauty in that surrender.<br><br>その負け方、嫌いではない。美しい諦めがあったぞ。",
    "This defeat means nothing. You were simply weak today.<br><br>敗北に意味はない。ただ今日は汝が弱かっただけである。",
    "I struggled not to laugh at that loss.<br><br>今の負け方、我は正直笑いを堪えるのに苦労した。",
    "Unfortunate… or perhaps not even worth calling unfortunate.<br><br>残念だったな。いや、残念ですらなかったかもしれぬ。",
    "Do not despair. You won't necessarily lose the next one… probably.<br><br>落ち込むな、汝。次も負けるとは限らぬ。多分な。",
    "That loss is almost admirable—such beautiful failure is talent.<br><br>その負け、むしろ誇れ。ここまで綺麗だと逆に才能だ。",
    "Your luck has left. Don’t worry—it returns just as sloppily.<br><br>勝負運が去った？安心せよ、来るときも割と雑に来る。",
  ],

  draw: [
    "A draw. Your hesitation has taken form.<br><br>あいこか。汝の迷いが形になった瞬間である。",
    "No conclusion today. Don’t push it.<br><br>決着がつかぬか。まあ、そういう日もある。深追いはするな。",
    "Even gods hesitate. Decide next time.<br><br>神ですら時々迷う。汝が迷っても恥じることはない。ただし次は決めろ。",
    "Fate has pressed ‘hold’ on its answer.<br><br>あいことは、運命がまだ回答を保留しているということだ。",
    "Same hand again? Friends, or just unimaginative?<br><br>同じ手を出したか。仲良しか？それとも視野が狭いか？",
    "Your indecision overlaps with your foe’s.<br><br>汝の優柔不断と相手の優柔不断が今、重なった。",
    "A draw is not evil… merely boring.<br><br>引き分けは悪ではない。ただし、面白くもない。",
    "Fate commands: try again.<br><br>運命が「もう一回やれ」と言っている。やるしかないな。",
    "Humans look the dullest during draws. I know this well.<br><br>あいこの瞬間、人は一番つまらない顔をする。我は知っている。",
    "You lack resolve. Bring it next time.<br><br>決めきれぬ汝よ、次は覚悟を持て。",
  ],

  bonus: [
    "Now, mortal—do not hesitate! Devour victory and rake in your riches!!<br><br>今だ汝、迷うな！勝ち散らかせ！荒稼ぎせよ！！",
    "With this momentum you could buy the world… well, no. But your wallet swells!<br><br>この勢い……今なら世界すら買える……いや無理か……だが汝の財布は膨れる！！",
    "There is no turning back. Only gold-drunk souls walk this road—advance!!<br><br>汝よ、もう戻れぬぞ？ここからは金の亡者だけが歩める道……進めッ！！",
    "The numbers leap… unstoppable… THIS is bonus!!<br><br>数字が跳ねる……止まらぬ……ッ！これがボーナス……！！",
    "Earn! Ravage the payout! Abandon reason—spin with desire!!<br><br>稼げ、荒稼ぎせよ！理性など捨てろ！欲望のままに回すのだ！！",
    "No return now… your fate is gilded!!<br><br>もう後戻りできぬ……だが構わぬ……汝の運命は金に染まった！！",
    "Remember this high… you may never feel it again!!<br><br>汝よ…この高揚を覚えておけ……二度と味わえぬ可能性もある故になッ！！",
    "Earn, earn, earn!! Money runs fast—catch it!!<br><br>稼げ稼げ稼げェェ！！！金は逃げ足が速いぞ！！",
  ],

};

function getOracle(type) {
  const list = oracles[type];
  return list[Math.floor(Math.random() * list.length)];
}

//---振動機能---//
function vibrate() {
  navigator.vibrate(40);
  console.log("vibrated");
}

function vibrateBonus() {
  navigator.vibrate(400);
  console.log("vibrated bonus");
}

//----コイン貸出イベント----//
$("#lending").on("click", function () {
  coin += 50;
  $("#coin .value").html(coin);

  lendingTotal += 50;
  $("#lendTotal .value").html(lendingTotal);
  $(".data-value.lend").html(lendingTotal); //データ表示用に追加

  vibrate();
  updateDiff();

  $("#sub-msg").html("Place Your Bet");
});

//----BETイベント----//
$("#bet").on("click", function () {
  if (bet == 1) {
    alert("すでにBETしています");
    return;
  }

  if (coin < 3) {
    alert("コインが足りません");
    return;
  }

  //BET状態に
  bet = 1;
  vibrate();
  $(".hands img").addClass("no-click");
  $("#bet").addClass("no-click");
  $("#lending").addClass("no-click");
  $(".rush-in").removeClass("rush-in-animate");

  if (mode == 9) {
    mode = 1; //ボーナス突入
    $(".rush-lamp").addClass("on");
    gamePoint = 0;
    $("#point .value").html(gamePoint);
    $("#point .value").css("color", "#6a6a6a");
    gameCount = 0;
    bonusGame = 20;
    $("#count .label").html("LAST");
    const rushCount = String(bonusGame).padStart(3, "0");
    $("#count .value").html(rushCount);
    $("#count .value").css("color", "#b73bff");
  }
  payout = 0;
  $("#payout .value").html("00");

  coin -= 3;
  $("#coin .value").html(coin);

  updateDiff();

  $("#sub-msg").html("");

  $("#mdisplay").attr("src", "./img/jan.png").removeClass("initial");
  setTimeout(function () {
    $("#mdisplay").attr("src", "./img/ken.png");
    $(".hands img").removeClass("no-click");
    $("#sub-msg").html("Choose Your Hands");
    handLock = 0;//handsロック解除
  }, 800);
});

function playGame(userHand) {
  if (bet != 1) {
    alert("BETしてください");
    return;
  }
  if (handLock == 1) {
    return;
  } else if (handLock == 0) {
    handLock = 1;
  }

  slumpGameCount++; //スランプグラフ描画用にインクリメント追加
  gameLog.push(slumpGameCount);

  vibrate();

  let result;
  let cpuHand; //bonusロジック搭載のため宣言のみ

  payStartValue = 0; //payout初期値
  coinStartValue = Number($("#coin .value").text());

  $("#sub-msg").html("");

  if (mode == 0) {
    cpuHand = Math.ceil(Math.random() * 3);
    gameCount += 1;
    const displayCount = String(gameCount).padStart(3, "0");
    $("#count .value").html(displayCount);
  } else if (mode == 1) {
    const bonusRandom = Math.ceil(Math.random() * 3);
    if (bonusRandom >= 2) {
      if (userHand == 1) {
        cpuHand = 2;
      } else if (userHand == 2) {
        cpuHand = 3;
      } else if (userHand == 3) {
        cpuHand = 1;
      }
    } else {
      cpuHand = userHand;
    }
  }

  //ユーザーがグー
  if (userHand == 1 && cpuHand == 1) {
    result = 2;
    $("#mdisplay").attr("src", "./img/gu_draw.jpg");
  } else if (userHand == 1 && cpuHand == 2) {
    result = 1;
    $("#mdisplay").attr("src", "./img/cho_win.jpg");
  } else if (userHand == 1 && cpuHand == 3) {
    result = 3;
    $("#mdisplay").attr("src", "./img/par_lose.jpg");
  }

  //ユーザーがチョキ
  else if (userHand == 2 && cpuHand == 1) {
    result = 3;
    $("#mdisplay").attr("src", "./img/gu_lose.jpg");
  } else if (userHand == 2 && cpuHand == 2) {
    result = 2;
    $("#mdisplay").attr("src", "./img/cho_draw.jpg");
  } else if (userHand == 2 && cpuHand == 3) {
    result = 1;
    $("#mdisplay").attr("src", "./img/par_win.jpg");
  }

  //ユーザーがパー
  else if (userHand == 3 && cpuHand == 1) {
    result = 1;
    $("#mdisplay").attr("src", "./img/gu_win.jpg");
  } else if (userHand == 3 && cpuHand == 2) {
    result = 3;
    $("#mdisplay").attr("src", "./img/cho_lose.jpg");
  } else if (userHand == 3 && cpuHand == 3) {
    result = 2;
    $("#mdisplay").attr("src", "./img/par_draw.jpg");
  }

  if (mode == 0) {
    payout = coinTable[result];
    payEndValue = coinTable[result];
    gamePoint += pointTable[result];
    if (result == 1) {
      const rare = Math.ceil(Math.random() * 8192);
      if (rare >= 8190) {
        gamePoint = 200;
      } else if (rare >= 8109) {
        gamePoint += 97;
      } else if (rare >= 7947) {
        gamePoint += 47;
      } else if (rare >= 6327) {
        gamePoint += 7;
      }
    }
  } else if (mode == 1) {
    payout = coinTableBonus[result];
    payEndValue = coinTableBonus[result];
    bonusGame -= 1;
    $("#count .value").html(String(bonusGame).padStart(3, "0"));
  }

  if (payout > 0) {
    payAnime(); //payout=0でpayAnime()呼ぶと1増えてしまう
  }

  coin += payout;
  coinEndValue = coin;

  if (payout > 0) {
    coinAnime();
  } else {
    updateDiff();
    diffLog.push(diff);
    slumpChart.options.scales.y.max = upperDiffScale;
    slumpChart.options.scales.y.min = lowerDiffScale;
    slumpChart.update();
  }

  $("#point .value").html(gamePoint);

  let oracle = "";
  if (result === 1) {
    oracle = getOracle("win");
  } else if (result === 2) {
    oracle = getOracle("draw");
  } else if (result === 3) {
    oracle = getOracle("lose");
  }

  $("#oracle").html(oracle);

  if (gamePoint >= 200) {
    setTimeout(function () {
      $(".rush-in").addClass("rush-in-animate");
      vibrateBonus();
      $("#oracle").html(getOracle("bonus"));
    }, 800);
    mode = 9; //一時的にボーナス準備状態にする、次のBETでボーナスに
  }

  //ボーナス終了判定
  if (mode == 1 && bonusGame == 0) {
    mode = 0;
    $(".rush-lamp").removeClass("on");
    $("#point .value").css("color", "#ff0000");
    $("#count .label").html("Game");
    $("#count .value").html("000");
    $("#count .value").css("color", "#ff0000");
  }

  //BET状態解除（演出用ウエイト追加）
  setTimeout(function () {
    bet = 0;
    $("#bet").removeClass("no-click");
    $("#lending").removeClass("no-click");
    $("#sub-msg").html("Place Your Bet");
  }, 1400);
}

//クリックイベント
$("#gu_btn").on("click", function () {
  playGame(1);
});

$("#cho_btn").on("click", function () {
  playGame(2);
});

$("#par_btn").on("click", function () {
  playGame(3);
});

function updateDiff() {
  diff = coin - lendingTotal;
  if (diff > 0) {
    $("#diffCoin .value").html("+" + diff);
    $(".data-value.diff").html("+" + diff); //データ表示用
  } else {
    $("#diffCoin .value").html(diff);
    $(".data-value.diff").html(diff); //データ表示用
  }
  if (diff >= upperDiffScale) {
    upperDiffScale += 100;
  }
  if (diff <= lowerDiffScale) {
    lowerDiffScale -= 100;
  }
}

function payAnime() {
  let current = payStartValue;

  function loop() {
    current++;
    const displayPayout = String(current).padStart(2, "0");
    $("#payout .value").html(displayPayout);

    if (current < payEndValue) {
      setTimeout(loop, 60);
    } else {
    }
  }
  loop();
}

function coinAnime() {
  let current = coinStartValue;

  function loop() {
    current++;
    $("#coin .value").html(current);

    if (current < coinEndValue) {
      setTimeout(loop, 60);
    } else {
      updateDiff();
      diffLog.push(diff);
      console.log("diffLog:", diffLog);

      slumpChart.options.scales.y.max = upperDiffScale;
      slumpChart.options.scales.y.min = lowerDiffScale;
      slumpChart.update();
    }
  }
  loop();
}

$(function () {
  gameLog.push(0);
  diffLog.push(0);

  const ctx = document.getElementById("slumpGraph");
  slumpChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: gameLog,
      datasets: [
        {
          data: diffLog,
          borderColor: "#ffeb9c",
          pointRadius: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 0,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          min: lowerDiffScale,
          max: upperDiffScale,
          grid: {
            display: false,
          },
        },
      },
    },
  });
});


//---debug mode---//
$(window).on("keydown", function(e){
  if(e.key === "b" || e.key === "B") {
    if (bet === 1){
      return;
    }
    if (mode === 1 || mode === 9){
      return;
    }
    mode = 9;
    console.log("bonus mode on (debug mode)");
  }
});

$(window).on("keydown", function(e){
  if(e.key === "d" || e.key === "D") {
    if (bet === 1){
      return;
    }
    if (mode === 1 || mode === 9){
      return;
    }
    gamePoint = 199;
    $("#point .value").html(gamePoint);
    console.log("add point (debug mode)");
  }
});