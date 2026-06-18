/*
  MULTITHER 2.0 live scoreboard setup
  -----------------------------------
  1. Create a Firebase project.
  2. Create a Realtime Database.
  3. Register a Web App and copy the firebaseConfig object here.
  4. Change MULTITHER_SCOREBOARD_OPTIONS.enabled from false to true.

  Keep pupil privacy in mind. Use pupil codes or nicknames, not full names,
  when the game is published online.
*/

window.MULTITHER_FIREBASE_CONFIG = {
  apiKey: "PASTE_YOUR_API_KEY_HERE",
  authDomain: "YOUR-PROJECT-ID.firebaseapp.com",
  databaseURL: "https://YOUR-PROJECT-ID-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-PROJECT-ID.appspot.com",
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID_HERE",
  appId: "PASTE_YOUR_APP_ID_HERE"
};

window.MULTITHER_SCOREBOARD_OPTIONS = {
  enabled: false,
  databasePath: "multither2_scoreboard",
  maxRows: 10
};
