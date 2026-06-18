(() => {
  "use strict";

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  const tileSize = 48;
  const cols = Math.floor(canvas.width / tileSize);
  const rows = Math.floor(canvas.height / tileSize);

  const $ = (id) => document.getElementById(id);

  const ui = {
    startScreen: $("startScreen"),
    gameScreen: $("gameScreen"),
    endScreen: $("endScreen"),
    languageSelect: $("languageSelect"),
    languageOptions: () => document.querySelectorAll("[data-lang-option]"),
    playerNameInput: $("playerNameInput"),
    classInput: $("classInput"),
    modeSelect: $("modeSelect"),
    levelSelect: $("levelSelect"),
    speedSelect: $("speedSelect"),
    startBtn: $("startBtn"),
    muteBtn: $("muteBtn"),
    pauseBtn: $("pauseBtn"),
    endBtn: $("endBtn"),
    restartBtn: $("restartBtn"),
    backToMenuBtn: $("backToMenuBtn"),
    exportBtn: $("exportBtn"),
    bgMusic: $("bgMusic"),
    score: $("score"),
    question: $("question"),
    feedback: $("feedback"),
    correctAnswerBubble: $("correctAnswerBubble"),
    countdownOverlay: $("countdownOverlay"),
    countdownText: $("countdownText"),
    countdownSubtext: $("countdownSubtext"),
    answerBurst: $("answerBurst"),
    timer: $("timer"),
    attemptsValue: $("attemptsValue"),
    correctValue: $("correctValue"),
    accuracyValue: $("accuracyValue"),
    streakValue: $("streakValue"),
    starRating: $("starRating"),
    masteryMessage: $("masteryMessage"),
    finalScore: $("finalScore"),
    finalAccuracy: $("finalAccuracy"),
    recommendation: $("recommendation"),
    controlsHint: $("controlsHint"),
    liveScoreboardTitle: $("liveScoreboardTitle"),
    liveScoreboardSubtitle: $("liveScoreboardSubtitle"),
    scoreboardStatus: $("scoreboardStatus"),
    scoreboardBody: $("scoreboardBody"),
    scoreboardRefreshBtn: $("scoreboardRefreshBtn"),
    scoreboardPrivacyNote: $("scoreboardPrivacyNote"),
    endLiveScoreboardTitle: $("endLiveScoreboardTitle"),
    endScoreboardStatus: $("endScoreboardStatus"),
    endScoreboardBody: $("endScoreboardBody"),
    endScoreboardRefreshBtn: $("endScoreboardRefreshBtn")
  };

  const translations = {
    en: {
      title: "Multither 2.0",
      tagline: "Multither 2.0: Multiply and Play!",
      purpose: "Guide the snake to the correct answer apple and build multiplication fluency through accuracy, speed, and repeated practice.",
      missionBadge: "Multiplication Fluency Game",
      missionStep1: "Read the question",
      missionStep2: "Find the answer apple",
      missionStep3: "Check your progress",
      languageFirstTitle: "Tick the Language First / 先勾选语言",
      languageFirstSubtitle: "Tick your language before reading How to Play. / 阅读玩法说明前，请先勾选语言。",
      rulesSubtitle: "Follow the colourful steps and get ready to play.",
      setupTitle: "Set Up Your Game",
      setupSubtitle: "Choose your details, level, mode and speed.",
      identityTitle: "Pupil Details",
      gameChoicesTitle: "Game Choices",
      practiceCardTitle: "Practice",
      practiceCardText: "30 questions. You may stop after 10.",
      challengeCardTitle: "Challenge",
      challengeCardText: "60 seconds to show fluency.",
      controlCardTitle: "Control",
      controlCardText: "Use Arrow Keys or WASD keys. On tablets/phones, use the on-screen buttons.",
      rulesTitle: "How to Play",
      rules: [
        "Choose your times table or mixed tables.",
        "Pick a mode: Practice Mode or Challenge Mode.",
        "Read the multiplication question at the top.",
        "Move the snake to the correct answer apple.",
        "Practice Mode ends after 30 questions. You may stop after 10.",
        "Challenge Mode lasts 60 seconds. Then check your score and mastery."
      ],
      language: "Language",
      pupilName: "Pupil name",
      className: "Class",
      optional: "Optional",
      mode: "Mode",
      level: "Times table",
      speed: "Snake speed",
      practice: "Practice Mode",
      challenge: "Challenge Mode",
      table: "Table",
      focus34: "Tables 3 & 4",
      focus67: "Tables 6 & 7",
      focus89: "Tables 8 & 9",
      mixed: "Mixed Tables 2–9",
      slow: "Slow",
      moderate: "Moderate",
      fast: "Fast",
      veryFast: "Very Fast",
      start: "Start Game",
      soundOn: "🔈 Sound",
      soundOff: "🔇 Sound",
      teacherHint: "Teacher tip: Practice Mode stops automatically after 30 questions. Pupils may stop after at least 10 questions.",
      controlsHint: "Move the snake using Arrow Keys or WASD keys. On tablets/phones, use the on-screen buttons.",
      learningTracker: "Learning Tracker",
      feedbackTitle: "Game Feedback",
      attempts: "Attempts",
      correct: "Correct",
      accuracy: "Accuracy",
      streak: "Streak",
      score: "Score",
      pause: "Pause",
      resume: "Resume",
      endGame: "End Game",
      stopLocked: (min) => `Practice Mode: answer at least ${min} questions before stopping.`,
      timeLeft: "Time Left",
      time: "Time",
      ready: "Get ready!",
      go: "START!",
      correctFeedback: () => `✅ Correct! Well done!`,
      correctBurst: "✅ Correct!",
      wrongFeedback: () => `❌ Incorrect. Try again!`,
      wallFeedback: "⚠️ Careful! Wall hit. New question loaded.",
      paused: "Paused",
      loading: "Loading...",
      gameOver: "Game Over",
      gameScore: "Game Score",
      learningPerformance: "Learning Performance",
      playAgain: "Play Again",
      backToMenu: "Back to Menu",
      exportCsv: "Export CSV",
      finalScore: (score, bonus) => `
        <div class="score-summary">
          <div class="score-label">Final Score</div>
          <div class="score-highlight">${score}</div>
          <div class="bonus-pill">Snake length bonus: +${bonus}</div>
        </div>
      `,
      resultLines: (r) => `
        Mode: ${r.modeLabel}<br>
        Level: ${r.levelLabel}<br>
        Time played: ${r.timePlayed}s<br>
        Attempts: ${r.totalAnswered}<br>
        Correct answers: ${r.correctAnswers}<br>
        Accuracy: ${r.accuracy}%<br>
        Speed: ${r.speedPerMinute} correct/min<br>
        Average response time: ${r.avgTimeSec}s<br>
        Fluency rate: ${r.fluencyRate} correct/min
      `,
      mastery: {
        master: "Master badge earned. Fast and accurate — this table is looking strong.",
        good: "Good progress. Accuracy is strong; now improve speed through short repeated practice.",
        developing: "Developing. The basic idea is there, but the table still needs guided practice.",
        support: "Needs support. Practise with visual grouping or skip counting before another challenge."
      },
      recommendation: {
        master: "Next step: Try Mixed Tables 2–9 in Challenge Mode.",
        good: "Next step: Replay once in Challenge Mode and aim for 90% accuracy.",
        developing: "Next step: Use Practice Mode again before moving to a harder table.",
        support: "Next step: Start with Practice Mode and allow pupils to say the facts aloud while moving the snake."
      },
      csvSaved: "CSV file downloaded with all saved play attempts.",
      savedAttempts: (count) => `Saved attempts in this browser: ${count}. Export CSV after all pupils have played.`,
      exportedAttempts: (count) => `Total attempts exported: ${count}.`,
      noResult: "No result to export yet.",
      liveScoreboardTitle: "Live Scoreboard",
      liveScoreboardSubtitle: "Online ranking appears here after Firebase is connected.",
      scoreboardConnected: "Live scoreboard connected",
      scoreboardOffline: "Offline setup mode",
      scoreboardLoading: "Loading live results...",
      scoreboardNoData: "No online result yet. Play a round to submit a score.",
      scoreboardNotReady: "Connect Firebase to show live results.",
      scoreboardSubmitted: "Score submitted to live scoreboard.",
      scoreboardSubmitFailed: "Score saved locally. Online scoreboard not updated.",
      scoreboardPrivacyNote: "Use pupil codes or nicknames rather than full names when playing online.",
      rank: "Rank",
      pupil: "Pupil",
      class: "Class",
      tableHead: "Table",
      speedHead: "Speed",
      refresh: "Refresh"
    },
    zh: {
      title: "乘法表贪吃蛇挑战2.0",
      tagline: "乘法表贪吃蛇挑战2.0",
      purpose: "操控乘蛇，找出正确答案苹果，一步一步提升乘法流畅度。",
      missionBadge: "乘法流畅度游戏",
      missionStep1: "读题目",
      missionStep2: "找答案苹果",
      missionStep3: "查看学习进展",
      languageFirstTitle: "Tick the Language First / 先勾选语言",
      languageFirstSubtitle: "Tick your language before reading How to Play. / 阅读玩法说明前，请先勾选语言。",
      rulesSubtitle: "跟着彩色步骤，一步一步开始玩。",
      setupTitle: "设置游戏",
      setupSubtitle: "选择资料、关卡、模式和速度。",
      identityTitle: "学生资料",
      gameChoicesTitle: "游戏选择",
      practiceCardTitle: "练习",
      practiceCardText: "最多30题，完成10题后可停止。",
      challengeCardTitle: "挑战",
      challengeCardText: "60秒展示乘法流畅度。",
      controlCardTitle: "操控",
      controlCardText: "使用方向键或 WASD 键操控；平板/手机可使用屏幕按钮。",
      rulesTitle: "玩法步骤",
      rules: [
        "选择乘法表或混合乘法表。",
        "选择模式：练习模式或挑战模式。",
        "阅读画面上方的乘法题。",
        "操控乘蛇吃掉正确答案苹果。",
        "练习模式共30题，完成10题后可提前结束。",
        "挑战模式限时60秒，结束后查看得分与掌握程度。"
      ],
      language: "语言",
      pupilName: "学生姓名",
      className: "班级",
      optional: "可不填",
      mode: "模式",
      level: "乘法表",
      speed: "乘蛇速度",
      practice: "练习模式",
      challenge: "挑战模式",
      table: "乘法表",
      focus34: "3和4乘法表",
      focus67: "6和7乘法表",
      focus89: "8和9乘法表",
      mixed: "混合乘法表2–9",
      slow: "慢",
      moderate: "中等",
      fast: "快",
      veryFast: "非常快",
      start: "开始游戏",
      soundOn: "🔈 声音",
      soundOff: "🔇 声音",
      teacherHint: "课堂提示：练习模式最多30题后自动结束；学生完成至少10题后可提前结束。",
      learningTracker: "学习记录",
      feedbackTitle: "作答提示",
      attempts: "作答次数",
      correct: "答对",
      accuracy: "准确率",
      streak: "连对",
      score: "得分",
      pause: "暂停",
      resume: "继续",
      endGame: "结束游戏",
      stopLocked: (min) => `练习模式：至少完成${min}题后才可以提前结束。`,
      timeLeft: "剩余时间",
      time: "时间",
      ready: "准备好！",
      go: "开始！",
      correctFeedback: () => `✅ 答对了！做得好！`,
      correctBurst: "✅ 答对了！",
      wrongFeedback: () => `❌ 不正确。再试一次！`,
      wallFeedback: "⚠️ 小心！撞墙了，已换新题。",
      paused: "已暂停",
      loading: "载入中……",
      gameOver: "游戏结束",
      gameScore: "游戏得分",
      learningPerformance: "学习表现",
      playAgain: "再玩一次",
      backToMenu: "返回菜单",
      exportCsv: "导出CSV",
      finalScore: (score, bonus) => `
        <div class="score-summary">
          <div class="score-label">最终得分</div>
          <div class="score-highlight">${score}</div>
          <div class="bonus-pill">乘蛇长度奖励：+${bonus}</div>
        </div>
      `,
      resultLines: (r) => `
        模式：${r.modeLabel}<br>
        关卡：${r.levelLabel}<br>
        游戏时长：${r.timePlayed}秒<br>
        作答次数：${r.totalAnswered}<br>
        答对题数：${r.correctAnswers}<br>
        准确率：${r.accuracy}%<br>
        速度：${r.speedPerMinute}题/分钟<br>
        每题平均耗时：${r.avgTimeSec}秒<br>
        流畅率：${r.fluencyRate}题/分钟
      `,
      mastery: {
        master: "获得掌握徽章。又快又准，这个乘法表很稳。",
        good: "表现不错。准确率已经很好，接下来可以通过短时间重复练习提升速度。",
        developing: "正在发展中。基本概念已有，但还需要更多引导练习。",
        support: "需要支援。建议先用图像分组或跳数练习，再进入挑战。"
      },
      recommendation: {
        master: "下一步：尝试混合乘法表2–9挑战模式。",
        good: "下一步：再挑战一次，目标达到90%准确率。",
        developing: "下一步：先回到练习模式，再挑战较难的乘法表。",
        support: "下一步：使用练习模式，并让学生边移动乘蛇边说出乘法事实。"
      },
      csvSaved: "CSV文件已下载，并包含已保存的所有作答记录。",
      savedAttempts: (count) => `此浏览器已保存作答记录：${count}。请等所有学生完成后再导出CSV。`,
      exportedAttempts: (count) => `已导出作答记录总数：${count}。`,
      noResult: "还没有成绩可以导出。"
    }
  };

  const levelMap = {
    "2": [2], "3": [3], "4": [4], "5": [5], "6": [6], "7": [7], "8": [8], "9": [9],
    focus34: [3, 4],
    focus67: [6, 7],
    focus89: [8, 9],
    mixed: [2, 3, 4, 5, 6, 7, 8, 9]
  };

  let lang = localStorage.getItem("multitherLang") || "en";
  let snake = [];
  let direction = { x: 1, y: 0 };
  let nextDirection = { x: 1, y: 0 };
  let directionQueue = [];
  let activeDirectionButton = null;
  let foodOptions = [];
  let correctAnswer = 0;
  let currentQuestionText = "";
  let score = 0;
  let totalAnswered = 0;
  let correctAnswers = 0;
  let streak = 0;
  let bestStreak = 0;
  let wallsHit = 0;
  let selectedTables = [2];
  let mode = "practice";
  let speedMs = 520;
  let gameRunning = false;
  let paused = false;
  let startTime = 0;
  let pauseStarted = 0;
  let pausedTotal = 0;
  let lastFrameTime = 0;
  let timerInterval = null;
  let currentQuestionStart = 0;
  let totalResponseTime = 0;
  let lastResult = null;
  let pendingNextQuestionTimeout = null;

  // CSV accumulation must not depend on only one storage method.
  // localStorage is the main storage, sessionStorage is a backup for the current browser session,
  // and this in-memory array protects the current play session if browser storage is restricted.
  let inMemoryResultHistory = [];

  const resultHistoryKey = "multither2ResultsHistory";
  const legacyResultHistoryKeys = ["multither2ResultsHistory_v1", "multither2ResultsHistory_backup"];
  const resultHistoryLimit = 1000;

  const defaultScoreboardOptions = {
    enabled: false,
    databasePath: "multither2_scoreboard",
    maxRows: 10
  };

  const liveScoreboard = {
    enabled: false,
    ready: false,
    loading: false,
    ref: null,
    latest: [],
    error: null
  };

  const practiceTarget = 30;
  const practiceMinimumToStop = 10;
  const challengeTarget = 20;
  const challengeSeconds = 60;

  function t(key) {
    return translations[lang][key];
  }

  function setText(id, value) {
    const el = $(id);
    if (el) el.textContent = value;
  }

  function levelLabel(value) {
    const dict = translations[lang];
    if (value === "focus34") return dict.focus34;
    if (value === "focus67") return dict.focus67;
    if (value === "focus89") return dict.focus89;
    if (value === "mixed") return dict.mixed;
    return `${dict.table} ${value}`;
  }

  function speedLabel(value) {
    if (value === "720") return t("slow");
    if (value === "520") return t("moderate");
    if (value === "360") return t("fast");
    if (value === "260") return t("veryFast");
    return t("moderate");
  }

  function updateLanguageOptionUI() {
    ui.languageOptions().forEach((button) => {
      const isSelected = button.dataset.langOption === lang;
      button.classList.toggle("selected", isSelected);
      button.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });
  }

  function applyLanguage() {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.body.classList.toggle("lang-zh", lang === "zh");
    document.body.classList.toggle("lang-en", lang !== "zh");
    localStorage.setItem("multitherLang", lang);
    ui.languageSelect.value = lang;
    updateLanguageOptionUI();

    setText("gameTitle", t("title"));
    setText("tagline", t("tagline"));
    setText("gamePurpose", t("purpose"));
    setText("missionBadge", t("missionBadge"));
    setText("missionStep1", t("missionStep1"));
    setText("missionStep2", t("missionStep2"));
    setText("missionStep3", t("missionStep3"));
    setText("languageFirstTitle", t("languageFirstTitle"));
    setText("languageFirstSubtitle", t("languageFirstSubtitle"));
    setText("rulesTitle", t("rulesTitle"));
    setText("rulesSubtitle", t("rulesSubtitle"));
    setText("setupTitle", t("setupTitle"));
    setText("setupSubtitle", t("setupSubtitle"));
    setText("identityTitle", t("identityTitle"));
    setText("gameChoicesTitle", t("gameChoicesTitle"));
    setText("practiceCardTitle", t("practiceCardTitle"));
    setText("practiceCardText", t("practiceCardText"));
    setText("challengeCardTitle", t("challengeCardTitle"));
    setText("challengeCardText", t("challengeCardText"));
    setText("controlCardTitle", t("controlCardTitle"));
    setText("controlCardText", t("controlCardText"));
    setText("languageLabel", t("language"));
    setText("playerNameLabel", t("pupilName"));
    setText("classLabel", t("className"));
    setText("modeLabel", t("mode"));
    setText("levelLabel", t("level"));
    setText("speedLabel", t("speed"));
    setText("startBtn", t("start"));
    setText("teacherHint", t("teacherHint"));
    setText("controlsHint", t("controlsHint"));
    setText("learningTitle", t("learningTracker"));
    setText("attemptsLabel", t("attempts"));
    setText("correctLabel", t("correct"));
    setText("accuracyLabel", t("accuracy"));
    setText("streakLabel", t("streak"));
    setText("pauseBtn", paused ? t("resume") : t("pause"));
    setText("endBtn", t("endGame"));
    setText("gameOverTitle", t("gameOver"));
    setText("gameScoreTitle", t("gameScore"));
    setText("learningPerformanceTitle", t("learningPerformance"));
    setText("restartBtn", t("playAgain"));
    setText("backToMenuBtn", t("backToMenu"));
    setText("exportBtn", t("exportCsv"));
    setText("liveScoreboardTitle", t("liveScoreboardTitle"));
    setText("liveScoreboardSubtitle", t("liveScoreboardSubtitle"));
    setText("scoreboardPrivacyNote", t("scoreboardPrivacyNote"));
    setText("endLiveScoreboardTitle", t("liveScoreboardTitle"));
    setText("scoreRankHead", t("rank"));
    setText("scorePupilHead", t("pupil"));
    setText("scoreClassHead", t("class"));
    setText("scoreScoreHead", t("score"));
    setText("scoreAccuracyHead", t("accuracy"));
    setText("scoreSpeedHead", t("speedHead"));
    setText("scoreTableHead", t("tableHead"));
    setText("endScoreRankHead", t("rank"));
    setText("endScorePupilHead", t("pupil"));
    setText("endScoreClassHead", t("class"));
    setText("endScoreScoreHead", t("score"));
    setText("endScoreAccuracyHead", t("accuracy"));
    setText("endScoreSpeedHead", t("speedHead"));
    setText("endScoreTableHead", t("tableHead"));
    setText("scoreboardRefreshBtn", t("refresh"));
    setText("endScoreboardRefreshBtn", t("refresh"));
    ui.playerNameInput.placeholder = t("optional");
    ui.classInput.placeholder = t("optional");

    ui.modeSelect.options[0].textContent = t("practice");
    ui.modeSelect.options[1].textContent = t("challenge");

    Array.from(ui.levelSelect.options).forEach((option) => {
      option.textContent = levelLabel(option.value);
    });

    ui.speedSelect.options[0].textContent = t("slow");
    ui.speedSelect.options[1].textContent = t("moderate");
    ui.speedSelect.options[2].textContent = t("fast");
    if (ui.speedSelect.options[3]) ui.speedSelect.options[3].textContent = t("veryFast");

    updateMuteButton();
    renderRules();
    updateScoreDisplay();
    updateTracker();
    updateTimerDisplay();

    if (!gameRunning && !lastResult) {
      ui.question.textContent = t("loading");
    }
    if (lastResult) renderResults(lastResult);
    renderLiveScoreboard();
  }

  function renderRules() {
    const list = $("rulesList");
    list.innerHTML = "";
    t("rules").forEach((rule) => {
      const li = document.createElement("li");
      li.textContent = rule;
      list.appendChild(li);
    });
  }

  function switchScreen(screenName) {
    ui.startScreen.classList.toggle("hidden", screenName !== "start");
    ui.gameScreen.classList.toggle("hidden", screenName !== "game");
    ui.endScreen.classList.toggle("hidden", screenName !== "end");
    document.body.classList.toggle("playing-screen", screenName === "game");
  }

  function resetState() {
    if (pendingNextQuestionTimeout) {
      clearTimeout(pendingNextQuestionTimeout);
      pendingNextQuestionTimeout = null;
    }
    selectedTables = levelMap[ui.levelSelect.value] || [2];
    mode = ui.modeSelect.value;
    speedMs = Number(ui.speedSelect.value);
    snake = [{ x: 5, y: 7 }, { x: 4, y: 7 }, { x: 3, y: 7 }];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    directionQueue = [];
    activeDirectionButton = null;
    foodOptions = [];
    score = 0;
    totalAnswered = 0;
    correctAnswers = 0;
    streak = 0;
    bestStreak = 0;
    wallsHit = 0;
    totalResponseTime = 0;
    pausedTotal = 0;
    lastFrameTime = 0;
    paused = false;
    gameRunning = false;
    lastResult = null;
    clearInterval(timerInterval);
    timerInterval = null;
    ui.feedback.textContent = "";
    if (ui.correctAnswerBubble) {
      ui.correctAnswerBubble.textContent = "";
      ui.correctAnswerBubble.classList.add("hidden");
      ui.correctAnswerBubble.classList.remove("bubble-wrong", "bubble-correct");
    }
    if (ui.correctAnswerBubble) {
      ui.correctAnswerBubble.textContent = "";
      ui.correctAnswerBubble.classList.add("hidden");
      ui.correctAnswerBubble.classList.remove("bubble-wrong", "bubble-correct");
    }
    ui.pauseBtn.textContent = t("pause");
    updateScoreDisplay();
    updateTracker();
  }

  function startGame() {
    resetState();
    switchScreen("game");
    generateQuestion();
    draw();
    beginCountdown();
  }

  function setCountdownDisplay(value, subtext, isStart = false) {
    if (!ui.countdownOverlay || !ui.countdownText) return;

    ui.countdownOverlay.classList.remove("hidden");
    ui.countdownOverlay.setAttribute("aria-hidden", "false");
    ui.countdownText.textContent = value;
    ui.countdownText.classList.toggle("start-word", isStart);

    if (ui.countdownSubtext) {
      ui.countdownSubtext.textContent = subtext || "";
    }

    const card = ui.countdownOverlay.querySelector(".countdown-card");
    if (card) {
      card.classList.remove("pulse");
      void card.offsetWidth;
      card.classList.add("pulse");
    }
  }

  function hideCountdownDisplay() {
    if (!ui.countdownOverlay) return;
    ui.countdownOverlay.classList.add("hidden");
    ui.countdownOverlay.setAttribute("aria-hidden", "true");
  }

  function beginCountdown() {
    const sequence = ["5", "4", "3", "2", "1", t("go")];
    let index = 0;

    ui.feedback.textContent = "";
    setCountdownDisplay(sequence[index], t("ready"), false);

    const countdown = setInterval(() => {
      index += 1;

      if (index < sequence.length) {
        const isStart = index === sequence.length - 1;
        setCountdownDisplay(sequence[index], isStart ? "" : t("ready"), isStart);
        return;
      }

      clearInterval(countdown);
      hideCountdownDisplay();
      ui.feedback.textContent = t("go");
      startTime = Date.now();
      currentQuestionStart = Date.now();
      gameRunning = true;
      timerInterval = setInterval(updateTimerDisplay, 500);
      tryPlayMusic();
      requestAnimationFrame(gameLoop);
      setTimeout(() => {
        if (ui.feedback.textContent === t("go")) ui.feedback.textContent = "";
      }, 800);
    }, 850);
  }

  function generateQuestion() {
    const table = selectedTables[Math.floor(Math.random() * selectedTables.length)];
    const multiplier = Math.floor(Math.random() * 9) + 1;
    correctAnswer = table * multiplier;
    currentQuestionText = `${multiplier} × ${table} = ${correctAnswer}`;
    ui.question.textContent = `${multiplier} × ${table} = ?`;

    const answerPool = buildAnswerPool(table);
    const options = new Set([correctAnswer]);

    const nearDistractors = [correctAnswer - table, correctAnswer + table, correctAnswer + multiplier, correctAnswer - multiplier]
      .filter((n) => n > 0 && n !== correctAnswer);
    shuffle(nearDistractors).forEach((n) => {
      if (options.size < 3) options.add(n);
    });

    let attempts = 0;
    while (options.size < 3 && attempts < 200) {
      options.add(answerPool[Math.floor(Math.random() * answerPool.length)]);
      attempts += 1;
    }

    const placedPositions = new Set();
    foodOptions = Array.from(options).map((value) => {
      const position = randomFreePosition(placedPositions);
      placedPositions.add(`${position.x},${position.y}`);
      return { value, ...position };
    });
    currentQuestionStart = Date.now();
  }

  function buildAnswerPool(table) {
    const pool = new Set();
    selectedTables.forEach((tValue) => {
      for (let i = 1; i <= 9; i += 1) pool.add(i * tValue);
    });
    for (let i = 1; i <= 9; i += 1) pool.add(i * table);
    return Array.from(pool).filter((v) => v > 0);
  }

  function randomFreePosition(extraOccupied = new Set()) {
    const occupied = new Set([
      ...snake.map((s) => `${s.x},${s.y}`),
      ...foodOptions.map((f) => `${f.x},${f.y}`),
      ...extraOccupied
    ]);

    // Keep answer apples away from the outer border.
    // The apple stem and label can be clipped when the food is placed on row 0,
    // so Year 3 pupils may see only part of an answer.
    const minCell = 1;
    const maxCol = cols - 2;
    const maxRow = rows - 2;
    const candidates = [];

    for (let x = minCell; x <= maxCol; x += 1) {
      for (let y = minCell; y <= maxRow; y += 1) {
        const key = `${x},${y}`;
        if (!occupied.has(key)) candidates.push({ x, y });
      }
    }

    if (candidates.length === 0) {
      return { x: minCell, y: minCell };
    }

    return candidates[Math.floor(Math.random() * candidates.length)];
  }

  function gameLoop(currentTime) {
    if (!gameRunning) return;
    requestAnimationFrame(gameLoop);
    if (paused) return;
    if (currentTime - lastFrameTime < speedMs) return;

    lastFrameTime = currentTime;
    direction = consumeQueuedDirection();

    const head = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y
    };

    if (isCollision(head)) {
      handleWallHit();
      return;
    }

    snake.unshift(head);
    const food = foodOptions.find((f) => f.x === head.x && f.y === head.y);

    if (food) {
      handleAnswer(food);
    } else {
      snake.pop();
    }

    draw();
  }

  function isCollision(head) {
    return head.x < 0 || head.y < 0 || head.x >= cols || head.y >= rows || snake.some((s) => s.x === head.x && s.y === head.y);
  }

  function handleWallHit() {
    if (pendingNextQuestionTimeout) {
      clearTimeout(pendingNextQuestionTimeout);
      pendingNextQuestionTimeout = null;
    }
    wallsHit += 1;
    streak = 0;
    if (mode === "challenge") score = Math.max(0, score - 1);
    showFeedback(t("wallFeedback"), "warning");
    snake = [{ x: 5, y: 7 }, { x: 4, y: 7 }, { x: 3, y: 7 }];
    direction = { x: 1, y: 0 };
    nextDirection = { x: 1, y: 0 };
    directionQueue = [];
    activeDirectionButton = null;
    generateQuestion();
    updateScoreDisplay();
    updateTracker();
    draw();
  }

  function handleAnswer(food) {
    totalAnswered += 1;
    const responseTime = Math.max(0, Date.now() - currentQuestionStart);
    totalResponseTime += responseTime;

    const answeredCorrectAnswer = correctAnswer;

    if (food.value === answeredCorrectAnswer) {
      correctAnswers += 1;
      streak += 1;
      bestStreak = Math.max(bestStreak, streak);
      score += 10 + Math.min(streak, 5);
      showFeedback(t("correctFeedback")(), "correct", String(answeredCorrectAnswer));
      flashCorrectAnswer();
    } else {
      streak = 0;
      if (mode === "challenge") score = Math.max(0, score - 1);
      else snake.pop();
      showFeedback(t("wrongFeedback")(), "wrong", String(answeredCorrectAnswer));
    }

    // Keep the previous question on screen while feedback is shown.
    // This prevents the answer bubble from appearing beside the next question.
    foodOptions = [];

    updateScoreDisplay();
    updateTracker();

    if (shouldEndGame()) {
      endGame();
      return;
    }

    scheduleNextQuestionAfterFeedback(food.value === answeredCorrectAnswer ? 1150 : 1950);
  }

  function shouldEndGame() {
    if (mode === "practice") return totalAnswered >= practiceTarget;
    if (totalAnswered >= challengeTarget) return true;
    return getElapsedSeconds() >= challengeSeconds;
  }

  function getElapsedMilliseconds() {
    if (!startTime) return 0;
    const now = Date.now();
    const activePause = paused ? now - pauseStarted : 0;
    return Math.max(0, now - startTime - pausedTotal - activePause);
  }

  function getElapsedSeconds() {
    return Math.floor(getElapsedMilliseconds() / 1000);
  }

  function updateTimerDisplay() {
    if (!ui.timer) return;
    if (mode === "challenge") {
      const left = Math.max(0, challengeSeconds - getElapsedSeconds());
      ui.timer.textContent = `${t("timeLeft")}: ${left}s`;
      if (gameRunning && left <= 0) endGame();
    } else {
      ui.timer.textContent = `${t("time")}: ${getElapsedSeconds()}s | ${t("attempts")}: ${totalAnswered}/${practiceTarget}`;
    }
  }

  function updateScoreDisplay() {
    ui.score.textContent = `${t("score")}: ${score}`;
  }

  function updateTracker() {
    const accuracy = totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;
    ui.attemptsValue.textContent = totalAnswered;
    ui.correctValue.textContent = correctAnswers;
    ui.accuracyValue.textContent = `${accuracy}%`;
    ui.streakValue.textContent = streak;
  }

  function draw() {
    drawBoard();
    foodOptions.forEach(drawApple);
    drawSnake();
  }

  function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        ctx.fillStyle = (x + y) % 2 === 0 ? "#b8e6a3" : "#a8dc92";
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }

    ctx.strokeStyle = "rgba(255,255,255,0.65)";
    ctx.lineWidth = 2;
    for (let x = 0; x <= cols; x += 1) {
      ctx.beginPath();
      ctx.moveTo(x * tileSize, 0);
      ctx.lineTo(x * tileSize, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= rows; y += 1) {
      ctx.beginPath();
      ctx.moveTo(0, y * tileSize);
      ctx.lineTo(canvas.width, y * tileSize);
      ctx.stroke();
    }
  }

  function drawApple(food) {
    const cx = food.x * tileSize + tileSize / 2;
    const cy = food.y * tileSize + tileSize / 2 + 2;

    ctx.save();
    ctx.fillStyle = "#ff5a4f";
    ctx.beginPath();
    ctx.arc(cx, cy, tileSize * 0.43, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#7b3f00";
    ctx.fillRect(cx - 2.6, cy - tileSize * 0.58, 5.2, tileSize * 0.22);

    ctx.fillStyle = "#2f9e44";
    ctx.beginPath();
    ctx.ellipse(cx + tileSize * 0.18, cy - tileSize * 0.5, tileSize * 0.2, tileSize * 0.1, -0.6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = `900 ${Math.round(tileSize * 0.58)}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(0,0,0,0.25)";
    ctx.strokeText(String(food.value), cx, cy + 3);
    ctx.fillText(String(food.value), cx, cy + 3);
    ctx.restore();
  }

  function drawSnake() {
    snake.forEach((part, index) => {
      const x = part.x * tileSize;
      const y = part.y * tileSize;
      const isHead = index === 0;

      ctx.save();
      roundRect(ctx, x + 4, y + 4, tileSize - 8, tileSize - 8, tileSize * 0.22);
      ctx.fillStyle = isHead ? "#1d4ed8" : index % 2 === 0 ? "#2563eb" : "#3b82f6";
      ctx.fill();

      if (isHead) {
        drawEyes(x, y);
        drawTongue(x, y);
      }
      ctx.restore();
    });
  }

  function drawEyes(x, y) {
    const eyeOffset = tileSize * 0.18;
    const forward = tileSize * 0.15;
    const side = tileSize * 0.12;
    const eyeRadius = tileSize * 0.115;
    const pupilRadius = tileSize * 0.05;

    const eyePositions = direction.x !== 0
      ? [[x + tileSize * 0.65, y + tileSize * 0.3], [x + tileSize * 0.65, y + tileSize * 0.7]]
      : [[x + tileSize * 0.3, y + tileSize * 0.32], [x + tileSize * 0.7, y + tileSize * 0.32]];

    eyePositions.forEach(([ex, ey]) => {
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(ex, ey, eyeRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#111827";
      ctx.beginPath();
      ctx.arc(ex + direction.x * side, ey + direction.y * side, pupilRadius, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function drawTongue(x, y) {
    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = Math.max(2, tileSize * 0.05);
    ctx.beginPath();
    const sx = x + tileSize / 2 + direction.x * tileSize * 0.34;
    const sy = y + tileSize / 2 + direction.y * tileSize * 0.34;
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx + direction.x * tileSize * 0.18, sy + direction.y * tileSize * 0.18);
    ctx.stroke();
  }

  function roundRect(context, x, y, width, height, radius) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.arcTo(x + width, y, x + width, y + height, radius);
    context.arcTo(x + width, y + height, x, y + height, radius);
    context.arcTo(x, y + height, x, y, radius);
    context.arcTo(x, y, x + width, y, radius);
    context.closePath();
  }

  function clearFeedbackDisplay() {
    ui.feedback.textContent = "";
    ui.feedback.className = "";
    if (ui.correctAnswerBubble) {
      ui.correctAnswerBubble.textContent = "";
      ui.correctAnswerBubble.classList.add("hidden");
      ui.correctAnswerBubble.classList.remove("bubble-wrong", "bubble-correct");
    }
    const card = ui.feedback.closest(".question-card");
    if (card) card.classList.remove("feedback-card-correct", "feedback-card-wrong", "feedback-card-warning");
  }

  function scheduleNextQuestionAfterFeedback(delay = 1200) {
    if (pendingNextQuestionTimeout) clearTimeout(pendingNextQuestionTimeout);
    pendingNextQuestionTimeout = setTimeout(() => {
      pendingNextQuestionTimeout = null;
      if (!gameRunning) return;
      if (paused) {
        scheduleNextQuestionAfterFeedback(250);
        return;
      }
      clearFeedbackDisplay();
      generateQuestion();
      draw();
    }, delay);
  }

  function showFeedback(message, type = "info", answerText = "") {
    ui.feedback.textContent = message;
    ui.feedback.className = "";
    ui.feedback.classList.add("feedback-message", `feedback-${type}`);

    const hasAnswerBubble = (type === "wrong" || type === "correct") && answerText;
    if (ui.correctAnswerBubble) {
      ui.correctAnswerBubble.textContent = hasAnswerBubble ? answerText : "";
      ui.correctAnswerBubble.classList.toggle("hidden", !hasAnswerBubble);
      ui.correctAnswerBubble.classList.toggle("bubble-wrong", type === "wrong" && hasAnswerBubble);
      ui.correctAnswerBubble.classList.toggle("bubble-correct", type === "correct" && hasAnswerBubble);
    }

    const card = ui.feedback.closest(".question-card");
    if (card) {
      card.classList.remove("feedback-card-correct", "feedback-card-wrong", "feedback-card-warning");
      if (type !== "info") card.classList.add(`feedback-card-${type}`);
    }

    setTimeout(() => {
      if (ui.feedback.textContent === message && !paused) {
        ui.feedback.textContent = "";
        ui.feedback.className = "";
        if (ui.correctAnswerBubble) {
          ui.correctAnswerBubble.textContent = "";
          ui.correctAnswerBubble.classList.add("hidden");
          ui.correctAnswerBubble.classList.remove("bubble-wrong", "bubble-correct");
        }
        if (card) card.classList.remove("feedback-card-correct", "feedback-card-wrong", "feedback-card-warning");
      }
    }, type === "correct" ? 1100 : type === "wrong" ? 1900 : 1300);
  }

  function showAnswerBurst(message, type = "correct") {
    if (!ui.answerBurst) return;
    ui.answerBurst.textContent = message;
    ui.answerBurst.className = `answer-burst ${type}`;
    ui.answerBurst.setAttribute("aria-hidden", "false");

    setTimeout(() => {
      if (!ui.answerBurst) return;
      ui.answerBurst.classList.add("hidden");
      ui.answerBurst.setAttribute("aria-hidden", "true");
    }, 900);
  }

  function flashCorrectAnswer() {
    ui.score.classList.remove("score-pop");
    void ui.score.offsetWidth;
    ui.score.classList.add("score-pop");

    setTimeout(() => {
      ui.score.classList.remove("score-pop");
    }, 520);
  }

  const directionVectors = {
    up: { x: 0, y: -1 },
    down: { x: 0, y: 1 },
    left: { x: -1, y: 0 },
    right: { x: 1, y: 0 }
  };

  function sameDirection(a, b) {
    return a && b && a.x === b.x && a.y === b.y;
  }

  function isOppositeDirection(a, b) {
    return a && b && a.x + b.x === 0 && a.y + b.y === 0;
  }

  function consumeQueuedDirection() {
    while (directionQueue.length > 0) {
      const queued = directionQueue.shift();
      if (!isOppositeDirection(direction, queued)) {
        nextDirection = { ...queued };
        return { ...queued };
      }
    }
    return { ...nextDirection };
  }

  function changeDirection(dir) {
    if (!gameRunning || paused) return;

    const requested = directionVectors[dir];
    if (!requested) return;

    const lastPlannedDirection = directionQueue.length > 0
      ? directionQueue[directionQueue.length - 1]
      : nextDirection;

    // Keep the snake safe, but still allow quick taps such as Up then Left before the next movement frame.
    if (sameDirection(lastPlannedDirection, requested) || isOppositeDirection(lastPlannedDirection, requested)) return;

    if (directionQueue.length >= 2) directionQueue.shift();
    directionQueue.push({ ...requested });
    nextDirection = { ...requested };
  }

  function setPressedMovementButton(button) {
    if (activeDirectionButton && activeDirectionButton !== button) {
      activeDirectionButton.classList.remove("is-pressed");
    }
    activeDirectionButton = button;
    button.classList.add("is-pressed");
  }

  function releasePressedMovementButton(button) {
    button.classList.remove("is-pressed");
    if (activeDirectionButton === button) activeDirectionButton = null;
  }

  function bindMovementButton(button) {
    const dir = button.getAttribute("data-dir");
    if (!dir) return;

    const press = (event) => {
      event.preventDefault();
      setPressedMovementButton(button);
      changeDirection(dir);
      if (event.pointerId !== undefined && button.setPointerCapture) {
        try { button.setPointerCapture(event.pointerId); } catch (_) { /* Some browsers refuse capture after scrolling. */ }
      }
    };

    const release = (event) => {
      if (event) event.preventDefault();
      releasePressedMovementButton(button);
    };

    if (window.PointerEvent) {
      button.addEventListener("pointerdown", press);
      button.addEventListener("pointerup", release);
      button.addEventListener("pointercancel", release);
      button.addEventListener("pointerleave", release);
      // Keyboard activation still triggers click; pointer clicks are already handled by pointerdown.
      button.addEventListener("click", (event) => {
        event.preventDefault();
        if (event.detail === 0) changeDirection(dir);
      });
    } else {
      button.addEventListener("touchstart", press, { passive: false });
      button.addEventListener("touchend", release, { passive: false });
      button.addEventListener("touchcancel", release, { passive: false });
      button.addEventListener("click", (event) => {
        event.preventDefault();
        changeDirection(dir);
      });
    }
  }

  function togglePause() {
    if (!gameRunning) return;
    paused = !paused;
    if (paused) {
      pauseStarted = Date.now();
      if (!ui.feedback.textContent) ui.feedback.textContent = t("paused");
    } else {
      pausedTotal += Date.now() - pauseStarted;
      if (ui.feedback.textContent === t("paused")) ui.feedback.textContent = "";
      lastFrameTime = performance.now();
    }
    ui.pauseBtn.textContent = paused ? t("resume") : t("pause");
    updateTimerDisplay();
  }

  function requestEndGame() {
    if (mode === "practice" && totalAnswered < practiceMinimumToStop) {
      showFeedback(t("stopLocked")(practiceMinimumToStop));
      return;
    }
    endGame();
  }

  function endGame() {
    if (!startTime) return;
    if (pendingNextQuestionTimeout) {
      clearTimeout(pendingNextQuestionTimeout);
      pendingNextQuestionTimeout = null;
    }
    gameRunning = false;
    paused = false;
    clearInterval(timerInterval);
    timerInterval = null;

    const snakeBonus = snake.length * 5;
    score += snakeBonus;

    const elapsedMs = Math.max(1, getElapsedMilliseconds());
    const elapsedSec = elapsedMs / 1000;
    const minutes = elapsedSec / 60;
    const accuracy = totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;
    const speedPerMinute = minutes > 0 ? correctAnswers / minutes : 0;
    const answerRate = minutes > 0 ? totalAnswered / minutes : 0;
    const accuracyRatio = totalAnswered > 0 ? correctAnswers / totalAnswered : 0;
    const fluencyRate = answerRate * accuracyRatio;
    const avgTimeSec = totalAnswered > 0 ? totalResponseTime / totalAnswered / 1000 : 0;
    const stars = calculateStars(accuracy, speedPerMinute);
    const masteryLevel = getMasteryLevel(accuracy, speedPerMinute);

    lastResult = {
      attemptId: `attempt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      date: new Date().toISOString(),
      pupilName: ui.playerNameInput.value.trim(),
      className: ui.classInput.value.trim(),
      mode,
      modeLabel: mode === "practice" ? t("practice") : t("challenge"),
      level: ui.levelSelect.value,
      levelLabel: levelLabel(ui.levelSelect.value),
      selectedTables: selectedTables.join("/"),
      speedSetting: speedLabel(String(speedMs)),
      timePlayed: elapsedSec.toFixed(1),
      totalAnswered,
      correctAnswers,
      wallsHit,
      accuracy,
      speedPerMinute: speedPerMinute.toFixed(2),
      avgTimeSec: avgTimeSec.toFixed(2),
      fluencyRate: fluencyRate.toFixed(2),
      score,
      snakeBonus,
      snakeLength: snake.length,
      bestStreak,
      stars,
      masteryLevel
    };

    saveBestResult(lastResult);
    saveResultHistory(lastResult);
    submitLiveScore(lastResult);
    switchScreen("end");
    renderResults(lastResult);

    const savedCount = getResultHistory().length;
    ui.recommendation.textContent = `${t("recommendation")[lastResult.masteryLevel]} ${t("savedAttempts")(savedCount)}`;
  }

  function calculateStars(accuracy, speedPerMinute) {
    if (accuracy >= 90 && speedPerMinute >= 15) return 3;
    if (accuracy >= 80) return 3;
    if (accuracy >= 60) return 2;
    if (accuracy > 0) return 1;
    return 0;
  }

  function getMasteryLevel(accuracy, speedPerMinute) {
    if (accuracy >= 90 && speedPerMinute >= 15) return "master";
    if (accuracy >= 80) return "good";
    if (accuracy >= 60) return "developing";
    return "support";
  }

  function renderResults(result) {
    ui.starRating.textContent = "★".repeat(result.stars) + "☆".repeat(3 - result.stars);
    ui.masteryMessage.textContent = t("mastery")[result.masteryLevel];
    ui.finalScore.innerHTML = t("finalScore")(result.score, result.snakeBonus);
    ui.finalAccuracy.innerHTML = t("resultLines")(result);
    ui.recommendation.textContent = t("recommendation")[result.masteryLevel];
  }

  function getScoreboardOptions() {
    return {
      ...defaultScoreboardOptions,
      ...(window.MULTITHER_SCOREBOARD_OPTIONS || {})
    };
  }

  function hasFirebaseConfig(config) {
    return Boolean(
      config &&
      config.apiKey &&
      config.databaseURL &&
      !String(config.apiKey).includes("PASTE_") &&
      !String(config.databaseURL).includes("YOUR-PROJECT")
    );
  }

  function setScoreboardStatus(message, state = "offline") {
    [ui.scoreboardStatus, ui.endScoreboardStatus].forEach((el) => {
      if (!el) return;
      el.textContent = message;
      el.classList.remove("online", "offline", "loading", "error");
      el.classList.add(state);
    });
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderScoreboardRows(targetBody, rows) {
    if (!targetBody) return;

    if (!liveScoreboard.ready) {
      targetBody.innerHTML = `<tr><td colspan="7">${escapeHtml(t("scoreboardNotReady"))}</td></tr>`;
      return;
    }

    if (liveScoreboard.loading) {
      targetBody.innerHTML = `<tr><td colspan="7">${escapeHtml(t("scoreboardLoading"))}</td></tr>`;
      return;
    }

    if (!rows.length) {
      targetBody.innerHTML = `<tr><td colspan="7">${escapeHtml(t("scoreboardNoData"))}</td></tr>`;
      return;
    }

    targetBody.innerHTML = rows.map((item, index) => `
      <tr class="${lastResult && item.attemptId === lastResult.attemptId ? "current-player-row" : ""}">
        <td>${index + 1}</td>
        <td>${escapeHtml(item.pupilName || "Player")}</td>
        <td>${escapeHtml(item.className || "-")}</td>
        <td><strong>${escapeHtml(item.score ?? 0)}</strong></td>
        <td>${escapeHtml(item.accuracy ?? 0)}%</td>
        <td>${escapeHtml(item.speedPerMinute ?? "0.00")}</td>
        <td>${escapeHtml(item.levelLabel || item.selectedTables || "-")}</td>
      </tr>
    `).join("");
  }

  function renderLiveScoreboard() {
    const state = liveScoreboard.loading ? "loading" : liveScoreboard.ready ? "online" : liveScoreboard.error ? "error" : "offline";
    const message = liveScoreboard.loading
      ? t("scoreboardLoading")
      : liveScoreboard.ready
        ? t("scoreboardConnected")
        : liveScoreboard.error || t("scoreboardOffline");

    setScoreboardStatus(message, state);

    const rows = [...liveScoreboard.latest]
      .sort((a, b) => {
        const scoreDiff = Number(b.score || 0) - Number(a.score || 0);
        if (scoreDiff) return scoreDiff;
        const accuracyDiff = Number(b.accuracy || 0) - Number(a.accuracy || 0);
        if (accuracyDiff) return accuracyDiff;
        const speedDiff = Number(b.speedPerMinute || 0) - Number(a.speedPerMinute || 0);
        if (speedDiff) return speedDiff;
        return String(b.createdAt || b.date || "").localeCompare(String(a.createdAt || a.date || ""));
      })
      .slice(0, getScoreboardOptions().maxRows || 10);

    renderScoreboardRows(ui.scoreboardBody, rows);
    renderScoreboardRows(ui.endScoreboardBody, rows);
  }

  function initialiseLiveScoreboard() {
    const options = getScoreboardOptions();
    const config = window.MULTITHER_FIREBASE_CONFIG;

    if (!options.enabled) {
      liveScoreboard.ready = false;
      liveScoreboard.error = null;
      renderLiveScoreboard();
      return;
    }

    if (!hasFirebaseConfig(config)) {
      liveScoreboard.ready = false;
      liveScoreboard.error = t("scoreboardNotReady");
      renderLiveScoreboard();
      return;
    }

    if (!window.firebase || !window.firebase.database) {
      liveScoreboard.ready = false;
      liveScoreboard.error = "Firebase scripts could not load.";
      renderLiveScoreboard();
      return;
    }

    try {
      liveScoreboard.loading = true;
      renderLiveScoreboard();

      if (!window.firebase.apps.length) {
        window.firebase.initializeApp(config);
      }

      liveScoreboard.ref = window.firebase.database().ref(options.databasePath || defaultScoreboardOptions.databasePath);
      liveScoreboard.ready = true;
      liveScoreboard.error = null;

      liveScoreboard.ref
        .orderByChild("score")
        .limitToLast(options.maxRows || defaultScoreboardOptions.maxRows)
        .on("value", (snapshot) => {
          const rows = [];
          snapshot.forEach((child) => {
            rows.push({ key: child.key, ...child.val() });
          });
          liveScoreboard.latest = rows;
          liveScoreboard.loading = false;
          renderLiveScoreboard();
        }, (error) => {
          liveScoreboard.loading = false;
          liveScoreboard.ready = false;
          liveScoreboard.error = error?.message || t("scoreboardSubmitFailed");
          renderLiveScoreboard();
        });
    } catch (error) {
      liveScoreboard.loading = false;
      liveScoreboard.ready = false;
      liveScoreboard.error = error?.message || t("scoreboardSubmitFailed");
      renderLiveScoreboard();
    }
  }

  function sanitiseLiveScore(result) {
    return {
      attemptId: result.attemptId,
      createdAt: result.date,
      pupilName: (result.pupilName || "Player").slice(0, 40),
      className: (result.className || "-").slice(0, 30),
      mode: result.mode,
      modeLabel: result.modeLabel,
      level: result.level,
      levelLabel: result.levelLabel,
      selectedTables: result.selectedTables,
      speedSetting: result.speedSetting,
      timePlayed: Number(result.timePlayed),
      totalAnswered: Number(result.totalAnswered),
      correctAnswers: Number(result.correctAnswers),
      accuracy: Number(result.accuracy),
      speedPerMinute: Number(result.speedPerMinute),
      avgTimeSec: Number(result.avgTimeSec),
      fluencyRate: Number(result.fluencyRate),
      score: Number(result.score),
      stars: Number(result.stars),
      masteryLevel: result.masteryLevel,
      wallsHit: Number(result.wallsHit),
      bestStreak: Number(result.bestStreak)
    };
  }

  function submitLiveScore(result) {
    if (!liveScoreboard.ready || !liveScoreboard.ref || !result) {
      renderLiveScoreboard();
      return;
    }

    liveScoreboard.ref.push(sanitiseLiveScore(result))
      .then(() => {
        setScoreboardStatus(t("scoreboardSubmitted"), "online");
      })
      .catch((error) => {
        liveScoreboard.error = error?.message || t("scoreboardSubmitFailed");
        setScoreboardStatus(t("scoreboardSubmitFailed"), "error");
        renderLiveScoreboard();
      });
  }

  function refreshLiveScoreboard() {
    if (!liveScoreboard.ref) {
      initialiseLiveScoreboard();
      return;
    }

    liveScoreboard.loading = true;
    renderLiveScoreboard();

    liveScoreboard.ref
      .orderByChild("score")
      .limitToLast(getScoreboardOptions().maxRows || defaultScoreboardOptions.maxRows)
      .once("value")
      .then((snapshot) => {
        const rows = [];
        snapshot.forEach((child) => rows.push({ key: child.key, ...child.val() }));
        liveScoreboard.latest = rows;
        liveScoreboard.loading = false;
        liveScoreboard.ready = true;
        renderLiveScoreboard();
      })
      .catch((error) => {
        liveScoreboard.loading = false;
        liveScoreboard.error = error?.message || t("scoreboardSubmitFailed");
        renderLiveScoreboard();
      });
  }

  function saveBestResult(result) {
    const key = `multitherBest_${result.level}_${result.mode}`;
    const existing = JSON.parse(localStorage.getItem(key) || "null");
    if (!existing || Number(result.fluencyRate) > Number(existing.fluencyRate)) {
      localStorage.setItem(key, JSON.stringify(result));
    }
  }

  function parseStoredHistory(storage, key) {
    try {
      const saved = JSON.parse(storage.getItem(key) || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch (error) {
      return [];
    }
  }

  function dedupeResults(results) {
    const map = new Map();
    results.forEach((item) => {
      if (!item) return;
      const id = item.attemptId || `${item.date || "noDate"}_${item.pupilName || "noName"}_${item.totalAnswered || 0}_${item.correctAnswers || 0}_${item.score || 0}`;
      map.set(id, item);
    });
    return Array.from(map.values()).sort((a, b) => String(a.date || "").localeCompare(String(b.date || "")));
  }

  function getResultHistory() {
    const combined = [];

    combined.push(...inMemoryResultHistory);

    try {
      combined.push(...parseStoredHistory(localStorage, resultHistoryKey));
      legacyResultHistoryKeys.forEach((key) => combined.push(...parseStoredHistory(localStorage, key)));
    } catch (error) {
      // Some browsers restrict localStorage for local files. The game still keeps session results in memory.
    }

    try {
      combined.push(...parseStoredHistory(sessionStorage, resultHistoryKey));
    } catch (error) {
      // sessionStorage backup may also be unavailable in restricted browser settings.
    }

    if (lastResult) combined.push(lastResult);

    return dedupeResults(combined).slice(-resultHistoryLimit);
  }

  function writeResultHistory(history) {
    const json = JSON.stringify(history.slice(-resultHistoryLimit));

    try {
      localStorage.setItem(resultHistoryKey, json);
      // Backup key is useful if a teacher accidentally uses an older copy of the game later.
      localStorage.setItem("multither2ResultsHistory_backup", json);
    } catch (error) {
      console.warn("MULTITHER: localStorage could not save result history.", error);
    }

    try {
      sessionStorage.setItem(resultHistoryKey, json);
    } catch (error) {
      console.warn("MULTITHER: sessionStorage could not save result history.", error);
    }
  }

  function saveResultHistory(result) {
    const history = dedupeResults([...getResultHistory(), result]).slice(-resultHistoryLimit);
    inMemoryResultHistory = history;
    writeResultHistory(history);
  }

  function exportCSV() {
    const history = getResultHistory();
    const resultsToExport = history.length > 0 ? history : (lastResult ? [lastResult] : []);

    if (resultsToExport.length === 0) {
      showEndMessage(t("noResult"));
      return;
    }

    const headers = [
      "attemptNo", "date", "pupilName", "className", "mode", "level", "selectedTables", "snakeSpeed",
      "timePlayedSeconds", "attempts", "correctAnswers", "accuracyPercent", "speedCorrectPerMinute",
      "averageResponseTimeSeconds", "fluencyRate", "score", "stars", "masteryLevel", "wallsHit", "bestStreak"
    ];

    const rows = resultsToExport.map((result, index) => [
      index + 1,
      result.date,
      result.pupilName,
      result.className,
      result.modeLabel,
      result.levelLabel,
      result.selectedTables,
      result.speedSetting,
      result.timePlayed,
      result.totalAnswered,
      result.correctAnswers,
      result.accuracy,
      result.speedPerMinute,
      result.avgTimeSec,
      result.fluencyRate,
      result.score,
      result.stars,
      result.masteryLevel,
      result.wallsHit,
      result.bestStreak
    ]);

    // Add UTF-8 BOM so Microsoft Excel reads Simplified Chinese correctly.
    // The export now includes all play attempts saved in this browser/device.
    const csv = [headers, ...rows].map((line) => line.map(csvEscape).join(",")).join("\r\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const safeName = (lastResult?.pupilName || "class_results").replace(/[^a-z0-9_-]+/gi, "_");
    const dateCode = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `multither_2_0_all_attempts_${safeName}_${dateCode}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showEndMessage(`${t("csvSaved")} ${t("exportedAttempts")(resultsToExport.length)}`);
  }

  function csvEscape(value) {
    const text = String(value ?? "");
    return `"${text.replace(/"/g, '""')}"`;
  }

  function showEndMessage(message) {
    ui.recommendation.textContent = message;
    setTimeout(() => {
      if (lastResult) ui.recommendation.textContent = t("recommendation")[lastResult.masteryLevel];
    }, 1500);
  }

  function tryPlayMusic() {
    if (!ui.bgMusic) return;
    ui.bgMusic.volume = 0.45;
    ui.bgMusic.play().then(() => {
      if (!localStorage.getItem("multitherMuted")) {
        ui.bgMusic.muted = false;
      }
      updateMuteButton();
    }).catch(() => {
      updateMuteButton();
    });
  }

  function updateMuteButton() {
    ui.muteBtn.textContent = ui.bgMusic.muted ? t("soundOff") : t("soundOn");
  }

  function toggleMute() {
    ui.bgMusic.muted = !ui.bgMusic.muted;
    localStorage.setItem("multitherMuted", ui.bgMusic.muted ? "1" : "");
    updateMuteButton();
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function isTypingField(element) {
    if (!element) return false;
    const tagName = element.tagName?.toLowerCase();
    return tagName === "input" || tagName === "textarea" || tagName === "select" || element.isContentEditable;
  }

  document.addEventListener("keydown", (event) => {
    // Do not hijack keyboard input when pupils are typing their name or class.
    // This allows letters such as "a", "w", "s", and "d" to be entered normally.
    if (isTypingField(event.target)) return;

    const keyMap = {
      ArrowUp: "up",
      ArrowDown: "down",
      ArrowLeft: "left",
      ArrowRight: "right",
      w: "up",
      s: "down",
      a: "left",
      d: "right"
    };
    const normalisedKey = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    const dir = keyMap[normalisedKey];
    if (dir) {
      event.preventDefault();
      changeDirection(dir);
    }
    if (event.key === " " && gameRunning) {
      event.preventDefault();
      togglePause();
    }
  });

  document.querySelectorAll(".mobile-controls button").forEach(bindMovementButton);


  ui.languageOptions().forEach((button) => {
    button.addEventListener("click", () => {
      lang = button.dataset.langOption;
      applyLanguage();
    });
  });

  ui.languageSelect.addEventListener("change", () => {
    lang = ui.languageSelect.value;
    applyLanguage();
  });

  ui.startBtn.addEventListener("click", startGame);
  ui.muteBtn.addEventListener("click", toggleMute);
  ui.pauseBtn.addEventListener("click", togglePause);
  ui.endBtn.addEventListener("click", requestEndGame);
  ui.restartBtn.addEventListener("click", startGame);
  ui.backToMenuBtn.addEventListener("click", () => {
    gameRunning = false;
    clearInterval(timerInterval);
    switchScreen("start");
  });
  ui.exportBtn.addEventListener("click", exportCSV);
  if (ui.scoreboardRefreshBtn) ui.scoreboardRefreshBtn.addEventListener("click", refreshLiveScoreboard);
  if (ui.endScoreboardRefreshBtn) ui.endScoreboardRefreshBtn.addEventListener("click", refreshLiveScoreboard);

  ui.bgMusic.muted = localStorage.getItem("multitherMuted") === "1";
  inMemoryResultHistory = getResultHistory();
  writeResultHistory(inMemoryResultHistory);
  applyLanguage();
  initialiseLiveScoreboard();
  drawBoard();
})();
