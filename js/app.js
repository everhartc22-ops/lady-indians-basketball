/* Shared header/footer + helpers */
(function () {
  var D = window.LI_DATA;
  var page = document.body.dataset.page || "";

  var LINKS = [
    ["index.html", "Home", "home"],
    ["schedule.html", "Schedule", "schedule"],
    ["roster.html", "Roster", "roster"],
    ["news.html", "News", "news"],
    ["players.html", "Team Playbook", "team-playbook"],
    null,
    ["playbook.html", "Play Designer", "playbook"],
    ["drills.html", "Drills", "drills"],
    ["practice.html", "Practice Planner", "practice"],
    ["scouting.html", "Scouting", "scouting"]
  ];

  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  function gameDate(g) { return new Date(g.date + "T" + g.time + ":00"); }
  function fmtDate(g, long) {
    return gameDate(g).toLocaleDateString("en-US", long ? { weekday: "long", month: "long", day: "numeric", year: "numeric" } : { weekday: "short", month: "short", day: "numeric" });
  }
  function fmtTime(g) { if (g.tba) return "TBA"; return gameDate(g).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }); }
  function nextGame() {
    var now = new Date();
    return getSchedule().filter(function (g) { return !g.result && gameDate(g) > now; })
      .sort(function (a, b) { return gameDate(a) - gameDate(b); })[0] || null;
  }

  function load(key, def) {
    try { var v = localStorage.getItem("li_" + key); return v ? JSON.parse(v) : def; } catch (e) { return def; }
  }
  function save(key, val) {
    try { localStorage.setItem("li_" + key, JSON.stringify(val)); } catch (e) { return false; }
    try { if (window.LISync) window.LISync.saved(key); } catch (e) {}   // cloud sync (js/sync.js), when set up
    return true;
  }
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

  /* Roster: browser-saved copy overrides the sample roster in data.js */
  function getRoster() {
    var r = load("roster", null);
    if (!Array.isArray(r)) r = JSON.parse(JSON.stringify(D.roster));
    r.forEach(function (p) { if (!p.id) p.id = "p_" + p.num; });
    return r.sort(function (a, b) { return (parseInt(a.num, 10) || 0) - (parseInt(b.num, 10) || 0); });
  }
  function saveRoster(r) { return save("roster", r); }

  /* Schedule: browser-saved copy overrides the sample schedule in data.js */
  function getSchedule() {
    var r = load("schedule", null);
    if (!Array.isArray(r)) r = JSON.parse(JSON.stringify(D.schedule));
    r.forEach(function (g) { if (!g.id) g.id = "g_" + g.date + "_" + g.opp; });
    return r.sort(function (a, b) { return gameDate(a) - gameDate(b); });
  }
  function saveSchedule(r) { return save("schedule", r); }

  /* News / spotlight stories: browser-saved copy overrides the samples in data.js */
  function getNews() {
    var r = load("news", null);
    if (!Array.isArray(r)) r = JSON.parse(JSON.stringify(D.news));
    r.forEach(function (n) { n.id = String(n.id || "n_" + n.date + "_" + n.title); });
    return r.sort(function (x, y) { return String(y.date).localeCompare(String(x.date)); });
  }
  function saveNews(r) { return save("news", r); }

  window.LI = { getNews: getNews, saveNews: saveNews, getSchedule: getSchedule, saveSchedule: saveSchedule, getRoster: getRoster, saveRoster: saveRoster, esc: esc, gameDate: gameDate, fmtDate: fmtDate, fmtTime: fmtTime, nextGame: nextGame, load: load, save: save, uid: uid };

  /* Ticker */
  var ng = nextGame();
  var tick = '<div class="ticker"><div class="wrap">' +
    '<b>' + esc(D.team.season) + ' Season</b><i class="dot"></i>' +
    (ng ? '<span>Next: ' + (ng.home ? "vs " : "at ") + esc(ng.opp) + '</span><i class="dot"></i><span>' + fmtDate(ng) + ' &middot; ' + fmtTime(ng) + '</span>' : '<span>Schedule coming soon</span>') +
    '</div></div>';

  var menu = LINKS.map(function (l) {
    if (!l) return '<li class="sep" aria-hidden="true"></li>';
    return '<li><a href="' + l[0] + '"' + (l[2] === page ? ' aria-current="page"' : "") + ">" + l[1] + "</a></li>";
  }).join("");

  var header = tick +
    '<header class="site"><div class="wrap nav">' +
    '<a class="brand" href="index.html" aria-label="Millersburg Lady Indians home"><img class="mark" src="images/logo.png" alt="" width="44" height="48">' +
    '<span>Lady Indians<small>MILLERSBURG &middot; PA</small></span></a>' +
    '<nav aria-label="Primary"><ul class="menu" id="menu">' + menu + '</ul></nav>' +
    '<button class="burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="menu">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>' +
    '</div></header>';

  var footer = '<footer class="site"><div class="wrap"><div class="foot">' +
    '<div><a class="brand" href="index.html"><img class="mark" src="images/logo.png" alt="" width="44" height="48"><span>Lady Indians<small>MILLERSBURG AREA HIGH SCHOOL</small></span></a>' +
    '<p>' + esc(D.team.town) + '. Strength. Pride. Tradition.</p></div>' +
    '<div><h4>Team</h4><ul><li><a href="schedule.html">Schedule</a></li><li><a href="roster.html">Roster</a></li><li><a href="news.html">News</a></li><li><a href="players.html">Team Playbook</a></li></ul></div>' +
    '<div><h4>Coaches</h4><ul><li><a href="playbook.html">Play Designer</a></li><li><a href="drills.html">Drill Library</a></li><li><a href="practice.html">Practice Planner</a></li><li><a href="scouting.html">Scouting</a></li><li><a href="backup.html">Backup &amp; Restore</a></li></ul></div>' +
    '<div><h4>Contact</h4><ul><li><a href="#">Athletic Office</a></li><li><a href="#">Booster Club</a></li></ul></div>' +
    '</div><p class="copy">&copy; 2026 Millersburg Lady Indians Basketball. Unofficial team portal.</p></div></footer>';

  document.body.insertAdjacentHTML("afterbegin", '<a class="skip" href="#main">Skip to main content</a>' + header);
  document.body.insertAdjacentHTML("beforeend", footer);

  var burger = document.getElementById("burger"), m = document.getElementById("menu");
  burger.addEventListener("click", function () {
    var open = m.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  /* Reveal on scroll */
  window.LI.reveal = function () {
    var els = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("in"); io.unobserve(x.target); } });
    }, { threshold: .1 });
    els.forEach(function (e) { io.observe(e); });
  };
  window.LI.reveal();
})();
