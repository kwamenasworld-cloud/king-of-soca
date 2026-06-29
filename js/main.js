/* =====================================================================
   Machel Montano — The Journey of a Soca King
   Interaction + motion. Honors prefers-reduced-motion.
   ===================================================================== */
(function () {
  "use strict";

  /* ---------- FIRST-LOAD "BIG TRUCK" INTRO ---------- */
  (function intro() {
    var el = document.querySelector(".intro");
    if (!el) return;
    // returning visitor / reduced-motion: the <head> script set .no-intro — just remove it
    if (document.documentElement.classList.contains("no-intro")) {
      if (el.parentNode) el.parentNode.removeChild(el);
      return;
    }
    try { localStorage.setItem("kos-truck-seen", "1"); } catch (e) {}
    document.body.style.overflow = "hidden";
    var done = false;
    function end() {
      if (done) return;
      done = true;
      el.classList.add("intro--done");
      document.body.style.overflow = "";
      setTimeout(function () { if (el.parentNode) el.parentNode.removeChild(el); }, 500);
    }
    var timer = setTimeout(end, 3300);
    el.addEventListener("click", function () { clearTimeout(timer); end(); });
    document.addEventListener("keydown", function (e) {
      if (!done && (e.key === "Escape" || e.key === "Enter" || e.key === " ")) { clearTimeout(timer); end(); }
    });
  })();

  var rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reduceMotion = rmq.matches;
  // keep the flag live if the user toggles the OS setting mid-session
  (rmq.addEventListener
    ? rmq.addEventListener.bind(rmq, "change")
    : rmq.addListener.bind(rmq))(function (e) {
      reduceMotion = e.matches;
      // clear any stale parallax offsets so numerals return to rest
      if (reduceMotion && parallaxEls) parallaxEls.forEach(function (el) { el.style.transform = ""; });
    });

  var nav = document.getElementById("nav");
  var progressBar = document.querySelector(".scroll-progress__bar");
  var parallaxEls = Array.prototype.slice.call(document.querySelectorAll("[data-parallax]"));

  var docEl = document.documentElement;
  var cachedScrollH = docEl.scrollHeight; // scrollHeight is layout-triggering; cache it
  var ticking = false;

  function measureDoc() { cachedScrollH = docEl.scrollHeight; }

  // All scroll-driven reads/writes happen once per frame inside rAF: read all
  // rects first, then write all transforms (no interleaved layout thrash).
  function frame() {
    ticking = false;
    var y = window.scrollY || docEl.scrollTop;
    var vh = window.innerHeight;
    if (nav) nav.classList.toggle("is-scrolled", y > 40);
    if (progressBar) {
      var h = cachedScrollH - vh;
      progressBar.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
    if (!reduceMotion && parallaxEls.length) {
      var offsets = [];
      for (var i = 0; i < parallaxEls.length; i++) {
        var rect = parallaxEls[i].getBoundingClientRect();
        // skip elements well outside the viewport
        offsets.push((rect.bottom < -200 || rect.top > vh + 200)
          ? null
          : rect.top + rect.height / 2 - vh / 2);
      }
      for (var j = 0; j < parallaxEls.length; j++) {
        if (offsets[j] === null) continue;
        parallaxEls[j].style.transform = "translateY(calc(-50% + " + (-offsets[j] * 0.08) + "px))";
      }
    }
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  var bridge = document.querySelector(".bridge");

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          if (e.target.querySelector("[data-count]")) countUp(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });

    revealEls.forEach(function (el) { io.observe(el); });

    if (bridge) {
      var bridgeIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { bridge.classList.add("is-visible"); bridgeIO.unobserve(e.target); }
        });
      }, { threshold: 0.25 });
      bridgeIO.observe(bridge);
    }
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    if (bridge) bridge.classList.add("is-visible");
  }

  /* ---------- STAT COUNT-UP ---------- */
  function countUp(scope) {
    var nums = scope.querySelectorAll("[data-count]");
    Array.prototype.forEach.call(nums, function (node) {
      var target = parseFloat(node.getAttribute("data-count"));
      var suffix = node.getAttribute("data-suffix") || "";
      var decimals = parseInt(node.getAttribute("data-decimals") || "0", 10);
      if (reduceMotion) { node.textContent = target.toFixed(decimals) + suffix; return; }
      var start = null, dur = 1400;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        node.textContent = (target * eased).toFixed(decimals) + suffix;
        if (p < 1) requestAnimationFrame(step);
        else node.textContent = target.toFixed(decimals) + suffix;
      }
      requestAnimationFrame(step);
    });
  }

  /* ---------- BRIDGE TRAVELER (Trinidad -> Brooklyn -> The World) ---------- */
  (function bridgeTraveler() {
    var deckPath = document.getElementById("deckPath");
    var traveler = document.querySelector(".bridge__traveler");
    var waypoints = Array.prototype.slice.call(document.querySelectorAll(".waypoint"));
    if (!deckPath || !traveler || !waypoints.length || !deckPath.getTotalLength) return;

    var nodes = [
      document.querySelector(".bridge__node--trinidad"),
      document.querySelector(".bridge__node--brooklyn"),
      document.querySelector(".bridge__node--world")
    ];
    var stationsX = [88, 640, 1192]; // rest the marker on the house, mid-span, and globe
    var L = deckPath.getTotalLength();

    function lenAtX(targetX) {
      var lo = 0, hi = L, p;
      for (var i = 0; i < 26; i++) {
        var mid = (lo + hi) / 2;
        p = deckPath.getPointAtLength(mid);
        if (p.x < targetX) lo = mid; else hi = mid;
      }
      return (lo + hi) / 2;
    }
    var stationLen = stationsX.map(lenAtX);
    var curIdx = 0;
    var statusEl = document.querySelector("[data-bridge-status]");
    var trails = Array.prototype.slice.call(document.querySelectorAll(".bridge__trail"));

    // Position the marker (and its lagging trail) on the deck via a CSS transform;
    // the CSS transition handles the smooth glide — robust without requestAnimationFrame.
    function setPos(len) {
      var p = deckPath.getPointAtLength(len);
      var t = "translate(" + p.x.toFixed(1) + "px," + p.y.toFixed(1) + "px)";
      traveler.style.transform = t;
      trails.forEach(function (tr) { tr.style.transform = t; });
    }
    function setActive(idx) {
      waypoints.forEach(function (b, i) {
        var on = i === idx;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      nodes.forEach(function (n, i) { if (n) n.classList.toggle("is-active", i === idx); });
      if (statusEl) {
        var ab = waypoints[idx];
        var nm = ab.querySelector(".waypoint__name");
        var ey = ab.querySelector(".waypoint__eyebrow");
        statusEl.textContent = "Showing " + (nm ? nm.textContent : "") + " — " + (ey ? ey.textContent : "") + ".";
      }
    }
    function moveTo(idx) {
      if (idx < 0 || idx >= stationLen.length) return;
      curIdx = idx;
      setActive(idx);
      setPos(stationLen[idx]);
    }

    // Place at the origin instantly (no glide on first paint), then enable transitions.
    traveler.style.transition = "none";
    trails.forEach(function (tr) { tr.style.transition = "none"; });
    setPos(stationLen[0]);
    setActive(0);
    void traveler.getBoundingClientRect();
    traveler.style.transition = "";
    trails.forEach(function (tr) { tr.style.transition = ""; });

    var userActed = false;
    // clicking a waypoint moves the marker AND scrolls to that Act
    waypoints.forEach(function (b, i) {
      b.addEventListener("click", function () {
        userActed = true;
        moveTo(i);
        var actId = b.getAttribute("data-act");
        var act = actId && document.getElementById(actId);
        if (act) act.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      });
    });

    // scroll-spy: as each Act crosses the viewport centre, advance the marker
    var actEls = [
      document.getElementById("act-trinidad"),
      document.getElementById("act-brooklyn"),
      document.getElementById("act-world")
    ];
    if ("IntersectionObserver" in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var i = actEls.indexOf(e.target);
          if (i >= 0) { userActed = true; moveTo(i); }
        });
      }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
      actEls.forEach(function (el) { if (el) spy.observe(el); });
    }

    // one-time auto showcase: the dot travels the span when first seen
    var stage = document.querySelector(".bridge");
    if (stage && "IntersectionObserver" in window && !reduceMotion) {
      var demoIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          demoIO.unobserve(e.target);
          setTimeout(function () { if (!userActed) moveTo(1); }, 2000);
          setTimeout(function () { if (!userActed) moveTo(2); }, 3300);
          setTimeout(function () { if (!userActed) moveTo(0); }, 4800);
        });
      }, { threshold: 0.45 });
      demoIO.observe(stage);
    }
  })();

  /* ---------- MOBILE MENU ---------- */
  var burger = document.querySelector(".nav__burger");
  var menu = document.getElementById("mobile-menu");
  // background landmarks hidden from assistive tech while the modal menu is open
  var bgEls = [document.querySelector(".nav"), document.getElementById("top"), document.querySelector(".footer")];
  function setBgHidden(hide) {
    bgEls.forEach(function (el) {
      if (!el) return;
      if (hide) el.setAttribute("aria-hidden", "true"); else el.removeAttribute("aria-hidden");
    });
  }
  function closeMenu() {
    if (!menu || menu.hidden) return;
    menu.hidden = true;
    document.body.style.overflow = "";
    setBgHidden(false); // restore before moving focus back into the header
    if (burger) {
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Open menu");
      burger.focus();
    }
  }
  function openMenu() {
    if (!menu || !menu.hidden) return;
    menu.hidden = false;
    document.body.style.overflow = "hidden";
    setBgHidden(true);
    if (burger) {
      burger.setAttribute("aria-expanded", "true");
      burger.setAttribute("aria-label", "Close menu");
    }
    var first = menu.querySelector("a, button");
    if (first) first.focus();
  }
  if (burger && menu) {
    burger.addEventListener("click", function () { if (menu.hidden) openMenu(); else closeMenu(); });
    Array.prototype.forEach.call(menu.querySelectorAll("a"), function (a) {
      a.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !menu.hidden) closeMenu(); });
    // keep keyboard focus inside the open menu
    menu.addEventListener("keydown", function (e) {
      if (e.key !== "Tab") return;
      var f = menu.querySelectorAll("a, button");
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ---------- INIT ---------- */
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () {
    measureDoc();
    onScroll();
    if (window.innerWidth > 768) closeMenu();
  }, { passive: true });
  measureDoc();
  frame();
})();
