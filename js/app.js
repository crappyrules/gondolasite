/* =========================================================================
   app.js — interactivity for the static Gondola site
   Replaces the only stateful React pieces:
     - react-reveal Fade/Bounce  -> initReveal()
     - Ca.js clipboard copy       -> initCopy()
     - Video.js autoplay/pause    -> initVideo()

   DOM-hook contract (see the section markup):
     - Reveal:  .reveal (+ .reveal--left/right/up/big/bounce);
                a wrapper with [data-reveal-cascade] staggers its .reveal
                descendants (optional numeric value = ms step, default 120).
     - Copy:    an element with .js-ca-trigger and a sibling/descendant
                .js-ca-copied inside a shared .js-ca wrapper.
     - Video:   <video class="js-video" data-src="assets/gondolavid.mp4">
                plus <button class="js-video-play">.
   ========================================================================= */
(function () {
  "use strict";

  var CONTRACT_ADDRESS = "0xd43fba1f38d9b306aeef9d78ad177d51ef802b46";

  /* ---- Scroll reveal --------------------------------------------------- */
  function initReveal() {
    var reveals = Array.prototype.slice.call(
      document.querySelectorAll(".reveal")
    );
    if (!reveals.length) {
      return;
    }

    // No IntersectionObserver -> just show everything.
    if (!("IntersectionObserver" in window)) {
      reveals.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    // Cascade: stagger each container's .reveal descendants (matches
    // react-reveal's `cascade`). Value is an optional ms step per child.
    document
      .querySelectorAll("[data-reveal-cascade]")
      .forEach(function (container) {
        var step = parseInt(container.getAttribute("data-reveal-cascade"), 10);
        if (!step || isNaN(step)) {
          step = 120;
        }
        var kids = container.querySelectorAll(".reveal");
        Array.prototype.forEach.call(kids, function (kid, i) {
          kid.style.transitionDelay = i * step + "ms";
        });
      });

    function show(el) {
      el.classList.add("is-visible");
      observer.unobserve(el);
    }

    // Eager like react-reveal: trigger as an element approaches the viewport
    // (positive bottom rootMargin) rather than once it is well inside it, so
    // content is already visible by the time it scrolls into view instead of
    // leaving the section background exposed. Also reveal anything already
    // scrolled past at load (deep links / refresh mid-page) so nothing stays
    // stuck hidden.
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            show(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 15% 0px" }
    );

    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---- Contract-address clipboard copy (was Ca.js) --------------------- */
  function initCopy() {
    var triggers = document.querySelectorAll(".js-ca-trigger");
    if (!triggers.length) {
      return;
    }

    // Hidden until a copy happens (independent of section CSS).
    document.querySelectorAll(".js-ca-copied").forEach(function (el) {
      el.style.display = "none";
    });

    Array.prototype.forEach.call(triggers, function (trigger) {
      trigger.addEventListener("click", function () {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(CONTRACT_ADDRESS).catch(function () {
            /* clipboard blocked (e.g. insecure context) — ignore */
          });
        }

        var scope = trigger.closest(".js-ca") || trigger.parentNode;
        var copied = scope ? scope.querySelector(".js-ca-copied") : null;
        if (!copied) {
          return;
        }

        copied.style.display = "";
        window.clearTimeout(trigger._caTimer);
        trigger._caTimer = window.setTimeout(function () {
          copied.style.display = "none";
        }, 2000);
      });
    });
  }

  /* ---- Lazy video autoplay/pause (was Video.js) ------------------------ */
  function initVideo() {
    var video = document.querySelector(".js-video");
    if (!video) {
      return;
    }
    var playBtn = document.querySelector(".js-video-play");
    var loaded = false;

    function ensureLoaded() {
      if (!loaded && video.getAttribute("data-src")) {
        video.src = video.getAttribute("data-src");
        loaded = true;
      }
    }

    function togglePlayBtn(show) {
      if (playBtn) {
        playBtn.style.display = show ? "" : "none";
      }
    }

    function attemptPlay(onError) {
      ensureLoaded();
      video.muted = false;
      var result = video.play();
      if (result && typeof result.then === "function") {
        result
          .then(function () {
            togglePlayBtn(false);
          })
          .catch(function (error) {
            if (onError) {
              onError(error);
            }
          });
      }
    }

    togglePlayBtn(true);

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              attemptPlay(function (error) {
                console.error("Autoplay failed:", error);
                togglePlayBtn(true);
              });
            } else {
              video.muted = true;
              video.pause();
              togglePlayBtn(true);
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(video);
    }

    if (playBtn) {
      playBtn.addEventListener("click", function () {
        attemptPlay(function (error) {
          console.error("Play button failed:", error);
        });
      });
    }

    // Keep the overlay button in sync with actual playback state.
    video.addEventListener("play", function () {
      togglePlayBtn(false);
    });
    video.addEventListener("pause", function () {
      togglePlayBtn(true);
    });
  }

  /* ---- Boot ------------------------------------------------------------ */
  function ready(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }

  ready(function () {
    initReveal();
    initCopy();
    initVideo();
  });
})();
