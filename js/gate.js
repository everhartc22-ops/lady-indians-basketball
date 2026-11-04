/* Coach password gate.
   Pages opt in with <script>window.LI_GATED = true</script> before loading this file.
   NOTE: this is a client-side gate. It keeps casual visitors out; it is not real security. */
(function () {
  "use strict";

  /* ---- SHA-256 (works on plain http, unlike crypto.subtle) ---- */
  var K = [
    0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
    0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
    0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
    0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
    0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
    0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
    0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
    0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2
  ];
  function sha256(msg) {
    var b = unescape(encodeURIComponent(msg)).split("").map(function (c) { return c.charCodeAt(0); });
    var bits = b.length * 8, i, j;
    b.push(0x80); while (b.length % 64 !== 56) b.push(0);
    var hi = Math.floor(bits / 4294967296), lo = bits >>> 0;
    [hi, lo].forEach(function (n) { b.push((n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255); });
    var H = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
    function rr(v, a) { return (v >>> a) | (v << (32 - a)); }
    for (i = 0; i < b.length; i += 64) {
      var w = [];
      for (j = 0; j < 16; j++) w[j] = (b[i + j * 4] << 24) | (b[i + j * 4 + 1] << 16) | (b[i + j * 4 + 2] << 8) | b[i + j * 4 + 3];
      for (j = 16; j < 64; j++) {
        var s0 = rr(w[j - 15], 7) ^ rr(w[j - 15], 18) ^ (w[j - 15] >>> 3);
        var s1 = rr(w[j - 2], 17) ^ rr(w[j - 2], 19) ^ (w[j - 2] >>> 10);
        w[j] = (w[j - 16] + s0 + w[j - 7] + s1) | 0;
      }
      var a = H[0], bb = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
      for (j = 0; j < 64; j++) {
        var S1 = rr(e, 6) ^ rr(e, 11) ^ rr(e, 25), ch = (e & f) ^ (~e & g);
        var t1 = (h + S1 + ch + K[j] + w[j]) | 0;
        var S0 = rr(a, 2) ^ rr(a, 13) ^ rr(a, 22), mj = (a & bb) ^ (a & c) ^ (bb & c);
        var t2 = (S0 + mj) | 0;
        h = g; g = f; f = e; e = (d + t1) | 0; d = c; c = bb; bb = a; a = (t1 + t2) | 0;
      }
      H[0] = (H[0] + a) | 0; H[1] = (H[1] + bb) | 0; H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0;
      H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
    }
    return H.map(function (x) { return ("00000000" + (x >>> 0).toString(16)).slice(-8); }).join("");
  }

  var SHARED_SALT = "lady-indians";
  function hashWith(salt, pw) { return sha256(salt + "|" + pw); }
  window.LIGate = { sha256: sha256, sharedHash: function (pw) { return hashWith(SHARED_SALT, pw); } };

  if (!window.LI_GATED) return;

  function ss(get, key, val) {
    try { if (get) return sessionStorage.getItem(key); sessionStorage.setItem(key, val); } catch (e) { return null; }
  }
  function lsGet(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } }

  function addLockButton() {
    var nav = document.querySelector("header.site .nav");
    if (!nav || document.getElementById("lockbtn")) return;
    var b = document.createElement("button");
    b.id = "lockbtn"; b.type = "button"; b.className = "btn sm ghost"; b.textContent = "Lock";
    b.setAttribute("aria-label", "Lock coach pages");
    b.addEventListener("click", function () { try { sessionStorage.removeItem("li_unlocked"); } catch (e) {} location.reload(); });
    nav.insertBefore(b, document.getElementById("burger"));
  }

  if (ss(true, "li_unlocked") === "1") {
    document.addEventListener("DOMContentLoaded", addLockButton);
    return;
  }
  document.documentElement.classList.add("locked");

  document.addEventListener("DOMContentLoaded", function () {
    var D = window.LI_DATA || {}, configHash = D.coachHash || "";
    var local = lsGet("li_coachpw");               // { salt, hash }
    var mode = configHash ? "enter" : (local && local.hash ? "enter" : "create");
    var failures = 0, lockedUntil = 0;

    var sec = document.createElement("section");
    sec.id = "gate";
    sec.setAttribute("aria-labelledby", "gate-h");
    sec.innerHTML =
      '<div class="wrap" style="padding:72px 24px;display:grid;place-items:center">' +
      '<form class="panel" id="gate-form" style="max-width:460px;width:100%" novalidate>' +
      '<h1 id="gate-h" style="font-size:2.6rem;margin-bottom:10px"></h1>' +
      '<p id="gate-p" style="color:var(--muted);margin:0 0 20px"></p>' +
      '<input type="text" name="username" value="coach" autocomplete="username" tabindex="-1" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px">' +
      '<div class="field"><label for="gate-pw">Password</label>' +
      '<div style="display:flex;gap:8px"><input id="gate-pw" type="password" autocomplete="current-password" aria-describedby="gate-help gate-msg" style="flex:1">' +
      '<button type="button" class="btn sm ghost" id="gate-show" aria-pressed="false" aria-controls="gate-pw gate-pw2" style="min-width:76px">Show</button></div>' +
      '<small id="gate-help" style="display:block;color:var(--muted);margin-top:6px"></small></div>' +
      '<div class="field" id="gate-c-wrap" style="display:none"><label for="gate-pw2">Confirm password</label><input id="gate-pw2" type="password" autocomplete="new-password" aria-describedby="gate-msg"></div>' +
      '<p id="gate-msg" role="alert" style="color:#b3261e;font-weight:600;min-height:1.4em;margin:0 0 12px"></p>' +
      '<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap"><button class="btn" type="submit" id="gate-btn"></button>' +
      '<a href="index.html" style="min-height:44px;display:inline-flex;align-items:center;color:var(--accent);font-weight:600">Back to home</a></div>' +
      '</form></div>';
    var main = document.getElementById("main");
    main.parentNode.insertBefore(sec, main);

    var h = document.getElementById("gate-h"), p = document.getElementById("gate-p"), btn = document.getElementById("gate-btn");
    var help = document.getElementById("gate-help"), show = document.getElementById("gate-show");
    var c = document.getElementById("gate-c-wrap"), pw = document.getElementById("gate-pw"), pw2 = document.getElementById("gate-pw2"), msg = document.getElementById("gate-msg");

    function setMode() {
      if (mode === "create") {
        h.textContent = "Create coach password";
        p.textContent = "The Play Designer, Team Playbook, Practice Planner and Drill Library are password protected. Choose a password (6+ characters). It is stored in this browser.";
        c.style.display = ""; btn.textContent = "Save & unlock"; pw.autocomplete = "new-password";
        help.textContent = "At least 6 characters. A short phrase is easier to remember.";
      } else {
        h.textContent = "Coaches only";
        p.textContent = "Enter the coach password to open this page.";
        c.style.display = "none"; btn.textContent = "Unlock"; pw.autocomplete = "current-password";
        help.textContent = "Don't have it? Ask your head coach.";
      }
      pw.focus();
    }

    function unlock() {
      ss(false, "li_unlocked", "1");
      document.documentElement.classList.remove("locked");
      sec.remove();
      addLockButton();
      main.setAttribute("tabindex", "-1"); main.focus({ preventScroll: true });
    }

    document.getElementById("gate-form").addEventListener("submit", function (e) {
      e.preventDefault(); msg.textContent = ""; pw.removeAttribute("aria-invalid");
      var val = pw.value;
      if (mode === "create") {
        if (val.length < 6) { fail("That password is too short. Use at least 6 characters.", pw); return; }
        if (val !== pw2.value) { fail("The two passwords don't match. Retype the confirmation.", pw2); return; }
        var salt = Math.random().toString(36).slice(2) + Date.now().toString(36);
        if (!lsSet("li_coachpw", { salt: salt, hash: hashWith(salt, val) })) { fail("This browser blocked saving the password. Allow site data for this page, then try again.", null); return; }
        unlock(); return;
      }
      var now = Date.now();
      if (now < lockedUntil) { fail("Too many tries. Wait " + Math.ceil((lockedUntil - now) / 1000) + " seconds, then try again.", null); return; }
      var ok = configHash ? hashWith(SHARED_SALT, val) === configHash : (local && hashWith(local.salt, val) === local.hash);
      if (ok) { unlock(); return; }
      failures++; if (failures >= 3) { lockedUntil = now + 5000 * failures; }
      fail("That password isn't right. Check for typos (try Show), or ask your head coach.", pw);
    });
    show.addEventListener("click", function () {
      var reveal = pw.type === "password";
      pw.type = reveal ? "text" : "password"; pw2.type = pw.type;
      show.textContent = reveal ? "Hide" : "Show"; show.setAttribute("aria-pressed", reveal);
    });
    function fail(text, field) {
      msg.textContent = text; pw.setAttribute("aria-invalid", "true"); if (field) { field.focus(); if (field.select) field.select(); }
    }
    pw.addEventListener("input", function () { pw.removeAttribute("aria-invalid"); msg.textContent = ""; });
    setMode();
  });

})();
