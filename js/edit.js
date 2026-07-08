/* =====================================================================
   Edit Mode — click-to-edit text directly on the page.
   - Published text (content.js) is applied for EVERY visitor.
   - In-progress edits (localStorage) + the editor UI appear ONLY for the
     owner: on localhost, or when localStorage "kos-editor" === "1".
     (To enable on a deployed site, run  localStorage.setItem("kos-editor","1")
     once in your browser console — never via a public URL param.)
   ===================================================================== */
(function () {
  "use strict";

  var LS_KEY = "kos-content-overrides";
  var PH = /^\s*\[placeholder/i;
  var els = Array.prototype.slice.call(document.querySelectorAll("[data-edit]"));
  if (!els.length) return;

  var fileContent = (window.SITE_CONTENT && typeof window.SITE_CONTENT === "object") ? window.SITE_CONTENT : {};

  function readLS() {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || "{}"); } catch (e) { return {}; }
  }
  function writeLS(o) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(o)); } catch (e) {}
  }
  var overrides = readLS();
  function elsForKey(k) {
    return els.filter(function (e) { return e.getAttribute("data-edit") === k; });
  }

  // owner gate (evaluated before applying local overrides)
  var host = location.hostname;
  var isLocal = host === "localhost" || host === "127.0.0.1" || host === "";
  var ownerFlag = false;
  try { ownerFlag = localStorage.getItem("kos-editor") === "1"; } catch (e) {}
  var EDIT_ENABLED = isLocal || ownerFlag;

  // published baseline (what a real visitor sees) — captured before overrides
  var baseline = {};
  els.forEach(function (el) {
    var k = el.getAttribute("data-edit");
    baseline[k] = fileContent.hasOwnProperty(k) ? fileContent[k] : el.textContent;
  });

  function markPlaceholder(el) { el.classList.toggle("is-placeholder", PH.test(el.textContent)); }

  // apply: published content for everyone; unsaved local edits only for the owner
  els.forEach(function (el) {
    var k = el.getAttribute("data-edit");
    if (EDIT_ENABLED && overrides.hasOwnProperty(k)) el.textContent = overrides[k];
    else if (fileContent.hasOwnProperty(k)) el.textContent = fileContent[k];
    markPlaceholder(el);
  });

  if (!EDIT_ENABLED) return;

  /* ---------- editor UI ---------- */
  var fab = document.createElement("button");
  fab.type = "button";
  fab.className = "edit-fab";
  fab.textContent = "✎ Edit text";
  fab.setAttribute("aria-label", "Turn on text edit mode");
  document.body.appendChild(fab);

  var bar = document.createElement("div");
  bar.className = "edit-bar";
  bar.hidden = true;
  bar.innerHTML =
    '<span class="edit-bar__status"></span>' +
    '<button type="button" class="edit-bar__btn" data-act="save">Save → download</button>' +
    '<button type="button" class="edit-bar__btn edit-bar__btn--ghost" data-act="copy">Copy JSON</button>' +
    '<button type="button" class="edit-bar__btn edit-bar__btn--ghost" data-act="discard">Discard changes</button>' +
    '<button type="button" class="edit-bar__btn edit-bar__btn--ghost" data-act="done">Done</button>';
  document.body.appendChild(bar);
  var statusEl = bar.querySelector(".edit-bar__status");

  var DEFAULT_STATUS = "Click any text to edit · right-click a field to reset.";
  function changedCount() {
    var seen = {}, n = 0;
    els.forEach(function (el) {
      var k = el.getAttribute("data-edit");
      if (seen[k]) return; seen[k] = 1;
      if (el.textContent !== baseline[k]) n++;
    });
    return n;
  }
  function updateStatus(msg) {
    if (!statusEl) return;
    if (msg) { statusEl.textContent = msg; return; }
    var n = changedCount();
    statusEl.textContent = n ? (n + " field" + (n === 1 ? "" : "s") + " changed. Save to publish.") : DEFAULT_STATUS;
  }

  var editing = false;
  function setEditable(on) {
    els.forEach(function (el) {
      if (on) {
        el.setAttribute("contenteditable", "plaintext-only");
        if (el.contentEditable !== "plaintext-only") el.setAttribute("contenteditable", "true");
        el.setAttribute("spellcheck", "true");
      } else {
        el.removeAttribute("contenteditable");
        el.removeAttribute("spellcheck");
      }
    });
  }
  function enter() { editing = true; document.body.classList.add("is-editing"); setEditable(true); fab.hidden = true; bar.hidden = false; updateStatus(); }
  function exit() { editing = false; document.body.classList.remove("is-editing"); setEditable(false); fab.hidden = false; bar.hidden = true; }

  // capture typing -> localStorage, sync duplicate keys, refresh placeholder state + count
  document.addEventListener("input", function (e) {
    if (!editing) return;
    var el = e.target.closest ? e.target.closest("[data-edit]") : null;
    if (!el) return;
    var k = el.getAttribute("data-edit");
    var val = el.textContent;
    overrides[k] = val;
    writeLS(overrides);
    elsForKey(k).forEach(function (o) {
      if (o !== el && o.textContent !== val) o.textContent = val;
      o.classList.toggle("is-placeholder", PH.test(val));
    });
    updateStatus();
  }, true);

  // while editing, click on editable text places a caret instead of navigating / firing app handlers
  document.addEventListener("click", function (e) {
    if (!editing) return;
    if (e.target.closest && e.target.closest("[data-edit]")) { e.preventDefault(); e.stopPropagation(); }
  }, true);

  // right-click a field to reset it to the published value
  document.addEventListener("contextmenu", function (e) {
    if (!editing) return;
    var el = e.target.closest ? e.target.closest("[data-edit]") : null;
    if (!el) return;
    e.preventDefault();
    var k = el.getAttribute("data-edit");
    var val = baseline[k];
    elsForKey(k).forEach(function (o) { o.textContent = val; markPlaceholder(o); });
    delete overrides[k]; writeLS(overrides);
    updateStatus();
  });

  function buildContent() {
    var out = {};
    els.forEach(function (el) { out[el.getAttribute("data-edit")] = el.textContent; });
    return out;
  }
  function fileBody() {
    return "/* Site text content. Generated by Edit Mode — replace this file to publish your edits. */\n" +
      "window.SITE_CONTENT = " + JSON.stringify(buildContent(), null, 2) + ";\n";
  }
  function exportContent() {
    var blob = new Blob([fileBody()], { type: "application/javascript" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = "content.js";
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 100);
    updateStatus("Downloaded content.js. Drop it into the js/ folder to publish.");
  }
  function copyContent() {
    var text = fileBody();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { updateStatus("Copied content.js to clipboard."); },
        function () { updateStatus("Copy failed. Use Save → download instead."); });
    } else { updateStatus("Clipboard unavailable. Use Save → download."); }
  }

  fab.addEventListener("click", enter);
  bar.addEventListener("click", function (e) {
    var act = e.target.getAttribute && e.target.getAttribute("data-act");
    if (!act) return;
    if (act === "done") exit();
    else if (act === "save") exportContent();
    else if (act === "copy") copyContent();
    else if (act === "discard") {
      if (window.confirm("Discard your unsaved text changes and restore the last published version?")) {
        localStorage.removeItem(LS_KEY);
        location.reload();
      }
    }
  });
  document.addEventListener("keydown", function (e) { if (editing && e.key === "Escape") exit(); });
})();
