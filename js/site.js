/* ============================================================
   juanpalai.github.io — site.js (vanilla, no dependencies)
   ============================================================ */
(function () {
	'use strict';

	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var doc = document;
	var docEl = doc.documentElement;
	var navToggle = doc.getElementById('nav-toggle');
	var topNav = doc.getElementById('site-nav');
	var topbar = doc.getElementById('topbar');

	/* ---------- Footer year ---------- */
	function setYear() {
		var el = doc.getElementById('footer-year');
		if (el) el.textContent = String(new Date().getFullYear());
	}

	/* ---------- Topbar scrolled state ---------- */
	function bindTopbar() {
		if (!topbar) return;
		var ticking = false;
		var update = function () {
			topbar.classList.toggle('is-scrolled', window.scrollY > 8);
			ticking = false;
		};
		window.addEventListener('scroll', function () {
			if (!ticking) {
				window.requestAnimationFrame(update);
				ticking = true;
			}
		}, { passive: true });
		update();
	}

	/* ---------- Active section highlighting ---------- */
	function bindActiveNav() {
		if (!topNav) return;
		var links = Array.prototype.slice.call(topNav.querySelectorAll('a[href^="#"]'));
		var sections = links
			.map(function (a) {
				var id = a.getAttribute('href').slice(1);
				return { id: id, el: doc.getElementById(id), link: a };
			})
			.filter(function (s) { return s.el; });
		if (!sections.length) return;

		var update = function () {
			var current = null;
			sections.forEach(function (s) {
				if (s.el.getBoundingClientRect().top <= 120) current = s;
			});
			sections.forEach(function (s) {
				if (s.link === current) {
					s.link.classList.add('is-active');
					s.link.setAttribute('aria-current', 'true');
				} else {
					s.link.classList.remove('is-active');
					s.link.removeAttribute('aria-current');
				}
			});
		};

		var ticking = false;
		window.addEventListener('scroll', function () {
			if (!ticking) {
				window.requestAnimationFrame(function () { update(); ticking = false; });
				ticking = true;
			}
		}, { passive: true });
		window.addEventListener('resize', update, { passive: true });
		update();
	}

	/* ---------- Mobile nav ---------- */
	function isMobileNav() {
		return navToggle && getComputedStyle(navToggle).display !== 'none';
	}

	function closeNav() {
		if (!navToggle || !topNav) return;
		navToggle.setAttribute('aria-expanded', 'false');
		topNav.classList.remove('open');
		doc.body.classList.remove('nav-locked');
	}

	function openNav() {
		if (!navToggle || !topNav) return;
		navToggle.setAttribute('aria-expanded', 'true');
		topNav.classList.add('open');
		doc.body.classList.add('nav-locked');
	}

	function bindMobileNav() {
		if (!navToggle || !topNav) return;

		navToggle.addEventListener('click', function () {
			if (navToggle.getAttribute('aria-expanded') === 'true') closeNav();
			else openNav();
		});

		doc.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') closeNav();
		});

		// Smoothly close, then scroll to the requested section.
		topNav.addEventListener('click', function (e) {
			var link = e.target.closest ? e.target.closest('a[href^="#"]') : null;
			if (!link || link.target === '_blank') return;
			if (!isMobileNav() || !topNav.classList.contains('open')) return;

			var id = link.getAttribute('href').slice(1);
			var target = id ? doc.getElementById(id) : null;
			if (!target) return;

			e.preventDefault();
			closeNav();
			var doScroll = function () {
				target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
				if (history.replaceState) history.replaceState(null, null, '#' + id);
			};
			window.setTimeout(doScroll, reduceMotion ? 0 : 180);
		});

		window.addEventListener('resize', function () {
			if (!isMobileNav()) closeNav();
		}, { passive: true });
	}

	/* ---------- Hero scope: draw route + move dot ---------- */
	function initScope() {
		var scope = doc.getElementById('scope');
		var route = doc.getElementById('scope-route');
		var dot = doc.getElementById('scope-dot');
		if (!scope || !route || !dot) return;
		if (!route.getTotalLength || !route.getPointAtLength) {
			scope.classList.add('is-drawn');
			return;
		}

		var length = route.getTotalLength();
		var dotX = parseFloat(dot.getAttribute('cx')) || 0;
		var dotY = parseFloat(dot.getAttribute('cy')) || 0;
		var duration = 1500;
		var delay = 180;
		var raf = window.requestAnimationFrame || function (fn) { window.setTimeout(fn, 16); };
		var cancelled = false;

		var easeInOut = function (t) {
			return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
		};

		var travel = function () {
			var startTime = null;
			var frame = function (now) {
				if (cancelled) return;
				if (startTime === null) startTime = now;
				var t = Math.min((now - startTime) / duration, 1);
				var p = route.getPointAtLength(easeInOut(t) * length);
				dot.setAttribute('transform', 'translate(' + (p.x - dotX) + ' ' + (p.y - dotY) + ')');
				if (t < 1) raf(frame);
			};
			raf(frame);
		};

		var start = function () {
			if (cancelled) return;
			scope.classList.add('is-drawn');
			if (!reduceMotion) {
				window.setTimeout(function () {
					if (!cancelled) travel();
				}, delay);
			}
		};

		// The scope sits in the hero, so draw as soon as the layout is ready.
		if (doc.readyState === 'loading') {
			doc.addEventListener('DOMContentLoaded', function () {
				window.setTimeout(start, reduceMotion ? 0 : 120);
			});
		} else {
			window.setTimeout(start, reduceMotion ? 0 : 120);
		}

		// Safety: never run the travel loop twice if the scope re-enters.
		window.addEventListener('beforeunload', function () { cancelled = true; });
	}

	/* ---------- Init ---------- */
	function init() {
		setYear();
		bindTopbar();
		bindActiveNav();
		bindMobileNav();
		initScope();
	}

	if (doc.readyState === 'loading') {
		doc.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
