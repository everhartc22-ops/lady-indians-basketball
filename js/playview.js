/* Read-only play renderer + animator, used by the player Team Playbook page. */
window.PlayView = (function () {
  "use strict";
  var W = 600, MOVERS = { cut: 1, dribble: 1, screen: 1 };

  function ch(p) { return p.court === "full" ? 1128 : 564; }
  function find(arr, id) { for (var i = 0; i < arr.length; i++) if (arr[i].id === id) return arr[i]; return null; }

  function half(ctx) {
    ctx.strokeStyle = "#5a0a1c"; ctx.lineWidth = 3; ctx.fillStyle = "rgba(122,12,36,.16)";
    ctx.fillRect(204, 0, 192, 228); ctx.strokeRect(204, 1.5, 192, 226.5);
    ctx.beginPath(); ctx.arc(300, 228, 72, 0, Math.PI); ctx.stroke();
    ctx.setLineDash([8, 8]); ctx.beginPath(); ctx.arc(300, 228, 72, Math.PI, 2 * Math.PI); ctx.stroke(); ctx.setLineDash([]);
    ctx.beginPath(); ctx.arc(300, 63, 48, 0, Math.PI); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(36, 0); ctx.lineTo(36, 170);
    var ca = Math.atan2(107.4, 264); ctx.arc(300, 63, 285, Math.PI - ca, ca, true); ctx.lineTo(564, 0); ctx.stroke();
    ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(270, 48); ctx.lineTo(330, 48); ctx.stroke();
    ctx.strokeStyle = "#e8590c"; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(300, 63, 9, 0, 2 * Math.PI); ctx.stroke();
  }
  function court(ctx, p) {
    var H = ch(p); ctx.clearRect(0, 0, W, H);
    var g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#d9b47c"); g.addColorStop(1, "#c4965a");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.save(); half(ctx); ctx.restore();
    if (p.court === "full") {
      ctx.save(); ctx.translate(W, H); ctx.rotate(Math.PI); half(ctx); ctx.restore();
      ctx.strokeStyle = "#5a0a1c"; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(300, H / 2, 72, 0, 2 * Math.PI); ctx.stroke();
    }
    ctx.strokeStyle = "#5a0a1c"; ctx.lineWidth = 3; ctx.strokeRect(1.5, 1.5, W - 3, H - 3);
  }
  function arrow(ctx, x1, y1, x2, y2, color) {
    var a = Math.atan2(y2 - y1, x2 - x1), s = 13;
    ctx.fillStyle = color; ctx.beginPath(); ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - s * Math.cos(a - .4), y2 - s * Math.sin(a - .4)); ctx.lineTo(x2 - s * Math.cos(a + .4), y2 - s * Math.sin(a + .4)); ctx.closePath(); ctx.fill();
  }
  function drawLine(ctx, l) {
    var p = l.pts; if (p.length < 2) return;
    ctx.save(); ctx.lineWidth = 3.5; ctx.lineJoin = "round"; ctx.lineCap = "round";
    var color = l.t === "shot" ? "#c2410c" : "#2a030c"; ctx.strokeStyle = color;
    if (l.t === "pass") ctx.setLineDash([10, 8]);
    if (l.t === "shot") { ctx.setLineDash([1, 9]); ctx.lineWidth = 5; }
    ctx.beginPath();
    if (l.t === "dribble") {
      var d = 0; ctx.moveTo(p[0].x, p[0].y);
      for (var i = 1; i < p.length; i++) {
        var dx = p[i].x - p[i - 1].x, dy = p[i].y - p[i - 1].y, len = Math.hypot(dx, dy); if (!len) continue;
        var nx = -dy / len, ny = dx / len, steps = Math.max(1, Math.floor(len / 3));
        for (var s = 1; s <= steps; s++) { var t = s / steps; d += len / steps; var off = Math.sin(d / 4) * 6; ctx.lineTo(p[i - 1].x + dx * t + nx * off, p[i - 1].y + dy * t + ny * off); }
      }
    } else { ctx.moveTo(p[0].x, p[0].y); for (var j = 1; j < p.length; j++) ctx.lineTo(p[j].x, p[j].y); }
    ctx.stroke(); ctx.setLineDash([]);
    var e = p[p.length - 1], q = p[Math.max(0, p.length - 4)];
    if (l.t === "screen") {
      var a = Math.atan2(e.y - q.y, e.x - q.x), nx2 = -Math.sin(a) * 16, ny2 = Math.cos(a) * 16;
      ctx.beginPath(); ctx.moveTo(e.x - nx2, e.y - ny2); ctx.lineTo(e.x + nx2, e.y + ny2); ctx.stroke();
    } else arrow(ctx, q.x, q.y, e.x, e.y, color);
    ctx.restore();
  }
  function dot(ctx, p, off) {
    ctx.beginPath(); ctx.arc(p.x, p.y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = off ? "#f2b705" : "#ffffff"; ctx.fill();
    ctx.lineWidth = 3; ctx.strokeStyle = off ? "#7a0c24" : "#4a0615"; ctx.stroke();
    ctx.fillStyle = off ? "#2a030c" : "#4a0615"; ctx.font = '700 18px "Barlow Condensed",sans-serif'; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(p.l, p.x, p.y + 1);
  }
  function ballAt(ctx, x, y) {
    ctx.beginPath(); ctx.arc(x, y, 10, 0, 2 * Math.PI); ctx.fillStyle = "#e8590c"; ctx.fill();
    ctx.lineWidth = 1.8; ctx.strokeStyle = "#2a030c"; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x - 10, y); ctx.lineTo(x + 10, y); ctx.moveTo(x, y - 10); ctx.lineTo(x, y + 10); ctx.lineWidth = 1.2; ctx.stroke();
  }

  /* Draw step `si` of play `p` (or an in-between animation state `st`) onto canvas. */
  function render(canvas, p, si, st, showDef) {
    var H = ch(p); if (canvas.width !== W) canvas.width = W; if (canvas.height !== H) canvas.height = H;
    var ctx = canvas.getContext("2d"), s = p.steps[si];
    court(ctx, p);
    var off = st ? st.off : s.off, def = st ? st.def : s.def, bp;
    if (!st) s.lines.forEach(function (l) { drawLine(ctx, l); });
    if (showDef) def.forEach(function (q) { dot(ctx, q, false); });
    off.forEach(function (q) { dot(ctx, q, true); });
    if (st) bp = st.ball; else { var h = find(s.off, s.ball); bp = h ? { x: h.x + 17, y: h.y + 17 } : null; }
    if (bp) ballAt(ctx, bp.x, bp.y);
  }

  function polyPoint(pts, t) {
    var tot = 0, i, L = [0]; for (i = 1; i < pts.length; i++) { tot += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y); L.push(tot); }
    if (!tot) return pts[0];
    var target = t * tot; for (i = 1; i < pts.length; i++) { if (target <= L[i]) { var k = (target - L[i - 1]) / ((L[i] - L[i - 1]) || 1); return { x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * k, y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * k }; } }
    return pts[pts.length - 1];
  }
  function stateAt(a, b, t) {
    var k = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2, out = { off: [], def: [], ball: null };
    ["off", "def"].forEach(function (key) {
      a[key].forEach(function (pa) {
        var pb = find(b[key], pa.id) || pa, line = a.lines.filter(function (l) { return l.pid === pa.id && MOVERS[l.t]; }).pop(), pt;
        if (line) pt = polyPoint([{ x: pa.x, y: pa.y }].concat(line.pts.slice(1)), k);
        else pt = { x: pa.x + (pb.x - pa.x) * k, y: pa.y + (pb.y - pa.y) * k };
        out[key].push({ id: pa.id, l: pa.l, x: pt.x, y: pt.y });
      });
    });
    var h1 = find(out.off, a.ball), h2 = find(out.off, b.ball) || h1;
    if (h1) {
      var f = a.ball === b.ball ? 0 : Math.max(0, Math.min(1, (t - .15) / .6));
      out.ball = { x: h1.x + (h2.x - h1.x) * f + 17, y: h1.y + (h2.y - h1.y) * f + 17 };
    }
    return out;
  }

  /* Animate every step in sequence. opts: speed, showDef, onStep(i), onDone(). Returns {stop}. */
  function animate(canvas, p, opts) {
    opts = opts || {};
    var dur = 1700 / (opts.speed || 1), gap = 350, n = p.steps.length - 1, t0 = performance.now(), raf = 0, stopped = false;
    var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches, last = -1;
    function frame(now) {
      if (stopped) return;
      var el = now - t0, seg = Math.floor(el / (dur + gap));
      if (seg >= n) { stopped = true; if (opts.onDone) opts.onDone(); return; }
      var local = el - seg * (dur + gap), t = Math.min(1, local / dur);
      if (reduce) t = local < dur / 2 ? 0 : 1;
      if (seg !== last) { last = seg; if (opts.onStep) opts.onStep(seg); }
      render(canvas, p, seg, stateAt(p.steps[seg], p.steps[seg + 1], t), opts.showDef);
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    return { stop: function () { stopped = true; cancelAnimationFrame(raf); } };
  }

  /* ---- compact share encoding ---- */
  function simplify(pts, tol) {
    if (pts.length < 3) return pts;
    var keep = [pts[0]], i, maxD, idx;
    (function rec(a, b) {
      maxD = 0; idx = -1;
      for (i = a + 1; i < b; i++) {
        var A = pts[a], B = pts[b], dx = B.x - A.x, dy = B.y - A.y, l2 = dx * dx + dy * dy, t = l2 ? Math.max(0, Math.min(1, ((pts[i].x - A.x) * dx + (pts[i].y - A.y) * dy) / l2)) : 0;
        var d = Math.hypot(pts[i].x - (A.x + t * dx), pts[i].y - (A.y + t * dy));
        if (d > maxD) { maxD = d; idx = i; }
      }
      if (maxD > tol && idx > -1) { var ii = idx; rec(a, ii); keep.push(pts[ii]); rec(ii, b); }
    })(0, pts.length - 1);
    keep.push(pts[pts.length - 1]); return keep;
  }
  function slim(p, notes) {
    var r = function (n) { return Math.round(n); };
    return {
      name: p.name, cat: p.cat, court: p.court, notes: notes ? (p.notes || "") : "",
      steps: p.steps.map(function (s) {
        return {
          off: s.off.map(function (q) { return { id: q.id, l: q.l, x: r(q.x), y: r(q.y) }; }),
          def: s.def.map(function (q) { return { id: q.id, l: q.l, x: r(q.x), y: r(q.y) }; }),
          ball: s.ball,
          lines: s.lines.map(function (l) { return { t: l.t, pid: l.pid, pts: simplify(l.pts, 4).map(function (q) { return { x: r(q.x), y: r(q.y) }; }) }; })
        };
      })
    };
  }
  function b64url(bytes) {
    var s = ""; for (var i = 0; i < bytes.length; i += 8192) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 8192));
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function unb64url(str) {
    str = str.replace(/-/g, "+").replace(/_/g, "/"); while (str.length % 4) str += "=";
    var bin = atob(str), out = new Uint8Array(bin.length); for (var i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i); return out;
  }
  async function pipe(bytes, stream) {
    var s = new Blob([bytes]).stream().pipeThrough(stream);
    return new Uint8Array(await new Response(s).arrayBuffer());
  }
  async function encode(bundle) {
    var raw = new TextEncoder().encode(JSON.stringify(bundle));
    if (typeof CompressionStream === "function") return "1" + b64url(await pipe(raw, new CompressionStream("gzip")));
    return "0" + b64url(raw);
  }
  async function decode(str) {
    var mode = str.charAt(0), bytes = unb64url(str.slice(1));
    if (mode === "1") bytes = await pipe(bytes, new DecompressionStream("gzip"));
    return JSON.parse(new TextDecoder().decode(bytes));
  }

  return { render: render, animate: animate, ch: ch, slim: slim, encode: encode, decode: decode };
})();
