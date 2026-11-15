/* ============================================================
   SAMPLE DATA - replace with real team content.
   Everything marked sample:true shows a "sample data" notice.
   ============================================================ */
window.LI_DATA = {
  // Optional: shared coach password hash for the Play Designer and Practice Planner.
  // Make one at coach-password.html and paste it here so the password works on every device.
  // Leave empty to let each browser create its own password the first time.
  // Cloud sync (optional). Paste your Firebase web app config here to save drills and plays online
  // so they show on every computer. Leave as null to keep everything in each browser only.
  firebase: {
    apiKey: "AIzaSyBfgFU_wwJyD55uoUbS3eMKp2XdE_ooO38",
    authDomain: "lady-indians.firebaseapp.com",
    projectId: "lady-indians",
    storageBucket: "lady-indians.firebasestorage.app",
    messagingSenderId: "267585201224",
    appId: "1:267585201224:web:687d318cf91f0927d8247d"
  },

  coachHash: "6885d468677129950baf52896b96b0e0ff631402e6729e49b6a5da028410a33f",

  team: {
    name: "Lady Indians",
    school: "Millersburg Area High School",
    town: "Millersburg, PA",
    season: "2026-27",
    gym: "Millersburg Area HS Gym"
  },

  // result: null until played, otherwise { us: 52, them: 40 }
  schedule: [
    { date: "2026-11-28", time: "10:00", opp: "Tri-Valley HS", home: false, loc: "Tri-Valley Jr./Sr. High School", result: null, type: "" },
    { date: "2026-12-01", time: "17:00", opp: "Mount Calvary Christian School", home: false, loc: "Mount Calvary Christian School", result: null, type: "" },
    { date: "2026-12-04", time: "18:00", opp: "York County School Of Technology", home: false, loc: "Gettysburg Area High School", result: null, type: "" },
    { date: "2026-12-08", time: "19:30", opp: "Greenwood HS", home: true, loc: "Millersburg Area HS Gym", result: null, type: "" },
    { date: "2026-12-10", time: "19:30", opp: "East Juniata HS", home: false, loc: "East Juniata Junior/Senior High School", result: null, type: "" },
    { date: "2026-12-15", time: "19:30", opp: "Saint Joseph's Catholic Academy", home: false, loc: "St Joseph's Catholic Academy High School", result: null, type: "" },
    { date: "2026-12-17", time: "19:30", opp: "Juniata HS", home: false, loc: "Juniata High School", result: null, type: "" },
    { date: "2026-12-22", time: "19:30", opp: "Newport HS", home: true, loc: "Millersburg Area HS Gym", result: null, type: "" },
    { date: "2026-12-28", time: "12:00", opp: "TBA", home: false, loc: "TBA", result: null, type: "", tba: true },
    { date: "2026-12-29", time: "12:00", opp: "TBA", home: false, loc: "TBA", result: null, type: "", tba: true },
    { date: "2027-01-04", time: "19:30", opp: "Schuylkill Valley HS", home: false, loc: "Schuylkill Valley High School", result: null, type: "" },
    { date: "2027-01-07", time: "19:30", opp: "Upper Dauphin Area HS", home: false, loc: "Upper Dauphin Area High School", result: null, type: "" },
    { date: "2027-01-12", time: "19:30", opp: "Line Mountain Sr HS", home: true, loc: "Millersburg Area HS Gym", result: null, type: "" },
    { date: "2027-01-14", time: "19:00", opp: "Susquenita HS", home: false, loc: "Susquenita High School", result: null, type: "" },
    { date: "2027-01-16", time: "15:30", opp: "Harrisburg Christian School", home: false, loc: "Harrisburg Christian", result: null, type: "" },
    { date: "2027-01-18", time: "19:30", opp: "Fairfield HS", home: true, loc: "Millersburg Area HS Gym", result: null, type: "" },
    { date: "2027-01-19", time: "19:30", opp: "Halifax Area HS", home: true, loc: "Millersburg Area HS Gym", result: null, type: "" },
    { date: "2027-01-25", time: "19:30", opp: "Shamokin Area HS", home: true, loc: "Millersburg Area HS Gym", result: null, type: "" },
    { date: "2027-01-26", time: "19:30", opp: "Upper Dauphin Area HS", home: true, loc: "Millersburg Area HS Gym", result: null, type: "" },
    { date: "2027-01-28", time: "17:30", opp: "Line Mountain Sr HS", home: false, loc: "Line Mountain High School", result: null, type: "" },
    { date: "2027-02-02", time: "19:30", opp: "Susquenita HS", home: true, loc: "Millersburg Area HS Gym", result: null, type: "" },
    { date: "2027-02-04", time: "19:30", opp: "Halifax Area HS", home: false, loc: "Halifax Area High School", result: null, type: "" }
  ],

  roster: [
    { id: "p_1", num: "", name: "Addi Steinmeir", pos: "G", grade: "Sr", height: "", bio: "" },
    { id: "p_2", num: "", name: "Haylen Mongold", pos: "G", grade: "Jr", height: "", bio: "" },
    { id: "p_3", num: "", name: "Langstyn Everhart", pos: "G", grade: "So", height: "", bio: "" },
    { id: "p_4", num: "", name: "Kennadie Miller", pos: "G", grade: "So", height: "", bio: "" },
    { id: "p_5", num: "", name: "Brinley Chubb", pos: "G", grade: "So", height: "", bio: "" },
    { id: "p_6", num: "", name: "Addy Snyder", pos: "F/C", grade: "So", height: "", bio: "" },
    { id: "p_7", num: "", name: "Aspen Feaster", pos: "F/C", grade: "So", height: "", bio: "" },
    { id: "p_8", num: "", name: "Lisey Giacobbe", pos: "F/C", grade: "Fr", height: "", bio: "" },
    { id: "p_9", num: "", name: "Rowan Mongold", pos: "G", grade: "Fr", height: "", bio: "" },
    { id: "p_10", num: "", name: "Clarissa Nistor", pos: "G", grade: "Jr", height: "", bio: "" },
    { id: "p_11", num: "", name: "Synee Ylvisaker", pos: "F/C", grade: "Sr", height: "", bio: "" }
  ],

  news: [
    { id: 1, date: "2026-10-05", title: "Preseason Practice Begins", tag: "Team",
      excerpt: "The Lady Indians open the new season with conditioning and fundamentals.",
      body: "Sample article. Replace this with a real recap or announcement. Add photos, quotes from coaches and players, and links to the schedule." },
    { id: 2, date: "2026-10-01", title: "Season Tickets & Gate Info", tag: "Tickets",
      excerpt: "Everything fans need to know about admission, parking and the student section.",
      body: "Sample article. Add admission prices, pass information and contact details for the athletic office." },
    { id: 3, date: "2026-09-20", title: "Summer League Recap", tag: "Recap",
      excerpt: "A look back at the summer games and the players who stepped up.",
      body: "Sample article. Add game-by-game notes, top performers and what the coaches learned." }
  ],

  // Drills are created in the Drill Library (saved in the browser), so none are built in.
  drills: []
};
