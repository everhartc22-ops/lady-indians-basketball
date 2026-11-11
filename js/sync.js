/* Cloud sync for the coach pages (drills, plays, playbooks, saved practice plans).
   Uses a free Firebase project. Turned on by adding a `firebase` block to js/data.js.
   Sign-in uses the coach password, so only people who know it can read or change the data.
   Each saved list syncs as a whole; the most recent save wins. */
(function () {
  "use strict";
  var cfg = (window.LI_DATA || {}).firebase;
  if (!cfg || !cfg.apiKey) return;                       // not set up: pages work exactly as before

  var KEYS = ["drills", "drillvideos", "plays2", "playbooks", "plans"];
  var EMAIL = cfg.email || "coach@ladyindians.app";
  var META = "li__syncmeta";                              // { key: { t: lastSyncedStamp, dirty: bool } }
  var SDK = "https://www.gstatic.com/firebasejs/10.12.2/";

  var db = null, auth = null, ready = false, pendingPw = null, timers = {}, errMsg = "";

  function meta() { try { return JSON.parse(localStorage.getItem(META)) || {}; } catch (e) { return {}; } }
  function setMeta(m) { try { localStorage.setItem(META, JSON.stringify(m)); } catch (e) {} }
  function mark(key, patch) { var m = meta(); m[key] = Object.assign(m[key] || {}, patch); setMeta(m); }
  function raw(key) { try { return localStorage.getItem("li_" + key); } catch (e) { return null; } }

  /* ---- small status pill in the header ---- */
  function stat(text, tip) {
    var el = document.getElementById("syncstat");
    if (!el) {
      var nav = document.querySelector("header.site .nav"); if (!nav) return;
      el = document.createElement("span"); el.id = "syncstat"; el.setAttribute("role", "status");
      el.style.cssText = "font-size:.8rem;color:var(--muted);white-space:nowrap;margin-left:auto;padding:0 10px";
      nav.insertBefore(el, document.getElementById("lockbtn") || document.getElementById("burger"));
    }
    el.textContent = text; el.title = tip || "";
  }
  function dirtyAny() { var m = meta(); return KEYS.some(function (k) { return m[k] && m[k].dirty; }); }
  function idle() {
    if (errMsg) stat("Sync problem", errMsg);
    else if (!ready) stat("Not signed in to sync", "Lock, then unlock with the coach password to turn sync on.");
    else if (dirtyAny()) stat("Saved here only", "Changes will sync as soon as the connection is back.");
    else stat("Synced ✓", "Your drills and plays are saved online and show on any computer.");
  }
  function why(e) {
    var c = (e && e.code) || "";
    if (/invalid-credential|wrong-password|user-not-found|invalid-login/.test(c)) return "The sync account's password doesn't match the coach password. In Firebase, set that account's password to the coach password.";
    if (/permission-denied/.test(c)) return "The online database refused the request. Check the Firestore rules.";
    if (/network|unavailable/.test(c)) return "No connection. Changes are kept on this computer and will sync later.";
    return (e && e.message) || "Unknown error.";
  }

  /* ---- push / pull ---- */
  function push(key) {
    if (!ready) return Promise.resolve();
    var json = raw(key); if (json == null) return Promise.resolve();
    var stamp = Date.now();
    return db.collection("coach").doc(key).set({ json: json, updated: stamp }).then(function () {
      mark(key, { t: stamp, dirty: false }); errMsg = ""; idle();
    }).catch(function (e) { mark(key, { dirty: true }); errMsg = /network|unavailable/.test((e && e.code) || "") ? "" : why(e); idle(); });
  }
  function pullAll() {
    stat("Syncing…");
    var changed = false;
    return Promise.all(KEYS.map(function (key) {
      return db.collection("coach").doc(key).get().then(function (snap) {
        var m = (meta()[key]) || {}, local = raw(key);
        if (!snap.exists) { if (local != null) return push(key); return; }
        var remote = snap.data();
        if (m.dirty) return push(key);                                   // local edits not yet uploaded: keep them
        if (remote.updated > (m.t || 0) && remote.json !== local) {
          try { localStorage.setItem("li_" + key, remote.json); changed = true; } catch (e) {}
        }
        mark(key, { t: remote.updated, dirty: false });
      });
    })).then(function () {
      errMsg = ""; idle();
      if (changed) location.reload();                                    // pages read their data once at load
    }).catch(function (e) { errMsg = why(e); idle(); });
  }

  /* called by LI.save() after every local save */
  function saved(key) {
    if (KEYS.indexOf(key) < 0) return;
    mark(key, { dirty: true }); idle();
    clearTimeout(timers[key]); timers[key] = setTimeout(function () { push(key); }, 600);
  }
  window.LISync = { saved: saved };

  /* ---- load the Firebase SDK, then sign in ---- */
  function load(src) {
    return new Promise(function (ok, no) { var s = document.createElement("script"); s.src = src; s.onload = ok; s.onerror = no; document.head.appendChild(s); });
  }
  function signIn(pw) {
    stat("Syncing…");
    return auth.signInWithEmailAndPassword(EMAIL, pw).catch(function (e) { errMsg = why(e); idle(); });
  }
  window.addEventListener("li-unlocked", function (e) {
    var pw = e.detail && e.detail.pw; if (!pw) return;
    if (auth && !auth.currentUser) signIn(pw); else pendingPw = pw;
  });

  stat("Syncing…");
  load(SDK + "firebase-app-compat.js").then(function () {
    return Promise.all([load(SDK + "firebase-auth-compat.js"), load(SDK + "firebase-firestore-compat.js")]);
  }).then(function () {
    firebase.initializeApp(cfg);
    auth = firebase.auth(); db = firebase.firestore();
    auth.onAuthStateChanged(function (user) {
      if (user) { ready = true; pullAll(); }
      else { ready = false; if (pendingPw) { var p = pendingPw; pendingPw = null; signIn(p); } else idle(); }
    });
  }).catch(function () { errMsg = "Could not reach the sync service. Your work is still saved on this computer."; idle(); });
})();
