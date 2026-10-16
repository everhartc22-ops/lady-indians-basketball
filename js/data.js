/* ============================================================
   SAMPLE DATA - replace with real team content.
   Everything marked sample:true shows a "sample data" notice.
   ============================================================ */
window.LI_DATA = {
  // Optional: shared coach password hash for the Play Designer and Practice Planner.
  // Make one at coach-password.html and paste it here so the password works on every device.
  // Leave empty to let each browser create its own password the first time.
  coachHash: "",

  team: {
    name: "Lady Indians",
    school: "Millersburg Area High School",
    town: "Millersburg, PA",
    season: "2026-27",
    gym: "Millersburg Area HS Gym"
  },

  // result: null until played, otherwise { us: 52, them: 40 }
  schedule: [
    { date: "2026-12-04", time: "19:00", opp: "Sample Opponent A", home: true,  loc: "Millersburg Area HS Gym", result: null, type: "Non-League" },
    { date: "2026-12-08", time: "19:30", opp: "Sample Opponent B", home: false, loc: "Away",                     result: null, type: "League" },
    { date: "2026-12-11", time: "19:00", opp: "Sample Opponent C", home: true,  loc: "Millersburg Area HS Gym", result: null, type: "League" },
    { date: "2026-12-15", time: "19:30", opp: "Sample Opponent D", home: false, loc: "Away",                     result: null, type: "League" },
    { date: "2026-12-29", time: "13:00", opp: "Holiday Tournament", home: false, loc: "TBD",                     result: null, type: "Tournament" },
    { date: "2027-01-05", time: "19:00", opp: "Sample Opponent E", home: true,  loc: "Millersburg Area HS Gym", result: null, type: "League" },
    { date: "2027-01-12", time: "19:30", opp: "Sample Opponent F", home: false, loc: "Away",                     result: null, type: "League" },
    { date: "2027-01-19", time: "19:00", opp: "Sample Opponent G", home: true,  loc: "Millersburg Area HS Gym", result: null, type: "League" },
    { date: "2027-02-02", time: "19:30", opp: "Sample Opponent H", home: false, loc: "Away",                     result: null, type: "League" },
    { date: "2027-02-09", time: "19:00", opp: "Senior Night - Sample Opponent I", home: true, loc: "Millersburg Area HS Gym", result: null, type: "League" }
  ],

  roster: [
    { num: 1,  name: "Player One",    pos: "G", grade: "Sr", height: "5'6\"", bio: "Sample bio. Add hometown, stats, honors and what she's working on this season." },
    { num: 2,  name: "Player Two",    pos: "G", grade: "Jr", height: "5'7\"", bio: "Sample bio." },
    { num: 3,  name: "Player Three",  pos: "G", grade: "So", height: "5'5\"", bio: "Sample bio." },
    { num: 4,  name: "Player Four",   pos: "F", grade: "Sr", height: "5'10\"", bio: "Sample bio." },
    { num: 5,  name: "Player Five",   pos: "G/F", grade: "Jr", height: "5'8\"", bio: "Sample bio." },
    { num: 10, name: "Player Ten",    pos: "F", grade: "So", height: "5'9\"", bio: "Sample bio." },
    { num: 11, name: "Player Eleven", pos: "C", grade: "Sr", height: "6'0\"", bio: "Sample bio." },
    { num: 12, name: "Player Twelve", pos: "F", grade: "Jr", height: "5'10\"", bio: "Sample bio." },
    { num: 13, name: "Player Thirteen", pos: "G", grade: "Fr", height: "5'4\"", bio: "Sample bio." },
    { num: 21, name: "Player Twenty-One", pos: "F", grade: "So", height: "5'9\"", bio: "Sample bio." },
    { num: 22, name: "Player Twenty-Two", pos: "C", grade: "Jr", height: "5'11\"", bio: "Sample bio." },
    { num: 24, name: "Player Twenty-Four", pos: "G", grade: "Fr", height: "5'5\"", bio: "Sample bio." }
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
