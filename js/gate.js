/* =====================================================================
   Pre-launch password gate.
   - The <head> script adds html.kos-locked before first paint unless this
     browser holds the unlock flag; CSS hides everything except the gate.
   - The password is compared as a SHA-256 hash (never stored in plain text
     here). To change it: hash the new password with
       node -e "console.log(require('crypto').createHash('sha256').update('NEW').digest('hex'))"
     and replace PASS_HASH below.
   - Remove the gate at launch: delete this file + the two gate lines in
     <head> (the robots noindex tag and the lock script) + the gate CSS.
   ===================================================================== */
(function () {
  "use strict";

  var PASS_HASH = "1495a0229e00a73e8aca85eaa372b8e7f33debcb314fe466ab7e6411d0ce91d6";

  if (!document.documentElement.classList.contains("kos-locked")) return;

  function sha256Hex(text) {
    var data = new TextEncoder().encode(text);
    return crypto.subtle.digest("SHA-256", data).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) {
        return ("0" + b.toString(16)).slice(-2);
      }).join("");
    });
  }

  var gate = document.createElement("div");
  gate.className = "kos-gate";
  gate.innerHTML =
    '<div class="kos-gate__panel">' +
    '  <svg class="kos-gate__crown" viewBox="0 0 64 40" aria-hidden="true"><path d="M3 37 V15 L17 25 L25 8 L32 19 L39 8 L47 25 L61 15 V37 Z" fill="#fff"/><rect x="3" y="33" width="58" height="4" fill="#fff"/></svg>' +
    '  <p class="kos-gate__eyebrow">Private preview</p>' +
    '  <h1 class="kos-gate__title">Machel Montano:<br>The Journey of a Soca King</h1>' +
    '  <span class="kos-gate__rule"></span>' +
    '  <form class="kos-gate__form">' +
    '    <label class="sr-only" for="kos-gate-pass">Password</label>' +
    '    <input id="kos-gate-pass" type="password" autocomplete="off" placeholder="Password" />' +
    '    <button type="submit" class="kos-gate__btn">Enter</button>' +
    '  </form>' +
    '  <p class="kos-gate__error" role="alert" hidden>That password is not correct. Please try again.</p>' +
    "</div>";
  document.body.appendChild(gate);

  var form = gate.querySelector(".kos-gate__form");
  var input = gate.querySelector("#kos-gate-pass");
  var error = gate.querySelector(".kos-gate__error");
  setTimeout(function () { input.focus(); }, 50);

  function unlock() {
    var persisted = false;
    try { localStorage.setItem("kos-unlock", "1"); persisted = localStorage.getItem("kos-unlock") === "1"; } catch (e) {}
    if (persisted) {
      location.reload(); // reload so the page (and first-visit intro) starts clean
    } else {
      // storage unavailable: unlock just for this load
      document.documentElement.classList.remove("kos-locked");
      gate.parentNode.removeChild(gate);
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var val = input.value || "";
    if (!(window.crypto && crypto.subtle && window.TextEncoder)) {
      error.textContent = "This browser cannot verify the password. Please use an up-to-date browser.";
      error.hidden = false;
      return;
    }
    sha256Hex(val).then(function (hex) {
      if (hex === PASS_HASH) { unlock(); }
      else {
        error.hidden = false;
        gate.querySelector(".kos-gate__panel").classList.remove("is-shake");
        void gate.offsetWidth;
        gate.querySelector(".kos-gate__panel").classList.add("is-shake");
        input.select();
      }
    });
  });
})();
