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

  drills: [
    { id: "d1", name: "Mikan Drill", cat: "Shooting", players: "1+", level: "Beginner", desc: "Alternate layups on each side of the rim using the backboard, focusing on footwork, soft touch and quick rhythm." },
    { id: "d2", name: "Form Shooting", cat: "Shooting", players: "1-2 per basket", level: "Beginner", desc: "Close-range one-hand shooting. Elbow under ball, follow-through, hold the finish. Move out as form stays clean." },
    { id: "d3", name: "Spot Shooting (5 Spots)", cat: "Shooting", players: "2-3 per basket", level: "Intermediate", desc: "Shoot from five spots around the arc. Shooter, rebounder and passer rotate. Track makes and set a goal each round." },
    { id: "d4", name: "Zig-Zag Defensive Slides", cat: "Defense", players: "Full team", level: "Beginner", desc: "Slide corner to corner without crossing feet. Drop-step and change direction at each cone, staying low with active hands." },
    { id: "d5", name: "Closeout Drill", cat: "Defense", players: "Pairs", level: "Intermediate", desc: "Sprint out, chop feet, hand up to contest the shot, then slide to stop the drive. Emphasize balance on arrival." },
    { id: "d6", name: "4-on-4 Shell Drill", cat: "Defense", players: "8+", level: "Intermediate", desc: "Teach help-side positioning, rotations and talking. The offense passes and cuts while the defense moves on every pass." },
    { id: "d7", name: "Three-Man Weave", cat: "Ball Handling", players: "3 per lane", level: "Beginner", desc: "Pass and follow behind the pass while running the court, finishing with a layup. Builds spacing, timing and conditioning." },
    { id: "d8", name: "Two-Ball Dribbling", cat: "Ball Handling", players: "Full team", level: "Intermediate", desc: "Dribble two balls together and alternately, stationary then moving. Eyes up, low and tight." },
    { id: "d9", name: "Full-Court 5-on-0 Transition", cat: "Transition", players: "5+", level: "Intermediate", desc: "Run lanes and fill spots on the fast break with no defense, then add live defenders as it improves." },
    { id: "d10", name: "Shell Offense: Pass & Cut", cat: "Offense", players: "5+", level: "Beginner", desc: "Pass and cut to the ball side or replace the spot. Teaches spacing, reading the defender and constant movement." },
    { id: "d11", name: "Box-Out & Rebound", cat: "Rebounding", players: "Pairs", level: "Beginner", desc: "Find a body, make contact, pivot and seal. Secure the rebound with two hands, chin the ball and outlet." },
    { id: "d12", name: "Suicides / Conditioning Lines", cat: "Conditioning", players: "Full team", level: "All", desc: "Timed baseline-to-line sprints. Set a time goal as a team. Finish with a cool-down stretch." }
  ]
};
