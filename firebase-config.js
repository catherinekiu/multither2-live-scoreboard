/*
  MULTITHER 2.0 live scoreboard setup
*/

window.MULTITHER_FIREBASE_CONFIG = {
  apiKey: "AIzaSyBEaUyLAk6pXBB2auQ6ieJ1FAErw6uzfCs",
  authDomain: "multither2-live-scoreboard.firebaseapp.com",
  databaseURL: "https://multither2-live-scoreboard-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "multither2-live-scoreboard",
  storageBucket: "multither2-live-scoreboard.firebasestorage.app",
  messagingSenderId: "141367039757",
  appId: "1:141367039757:web:8d6e4391eefa62542a8244"
};

window.MULTITHER_SCOREBOARD_OPTIONS = {
  enabled: true,
  databasePath: "multither2_scoreboard",
  recordsPath: "multither2_score_records",
  maxRows: 10,
  buildVersion: "v58 Verified Teacher/Admin Export",

  // Admin UID fallback: not a password, not a secret. It helps the game recognise the admin account quickly.
  adminUids: ["4itsvG2WtBOlsIvT9OEhzJohstY2"]
};
