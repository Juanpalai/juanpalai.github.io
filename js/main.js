/*!
 * juanpalai.github.io — main.js
 * Refactored: no dead template code, progressive enhancement,
 * native smooth scrolling, reduced-motion aware, accessible nav.
 */
(function ($) {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var scrollY = function () {
    return window.scrollY || window.pageYOffset || 0;
  };

  /* ---------- Loader ---------- */
  var loader = function () {
    var el = document.getElementById('ftco-loader');
    if (!el) return;
    window.setTimeout(function () {
      el.classList.remove('show');
      // Remove from the DOM after the fade-out completes
      window.setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 600);
    }, 50);
  };

  /* ---------- Full-height hero ---------- */
  var fullHeight = function () {
    var els = document.querySelectorAll('.js-fullheight');
    var setHeight = function () {
      var h = window.innerHeight;
      for (var i = 0; i < els.length; i++) els[i].style.height = h + 'px';
    };
    setHeight();
    window.addEventListener('resize', setHeight, { passive: true });
  };

  /* ---------- Mobile menu ---------- */
  var mobileMenu = function () {
    var toggler = document.querySelector('.navbar-toggler');
    var nav = document.getElementById('ftco-nav');
    if (!toggler || !nav) return;
    nav.addEventListener('show.bs.collapse', function () {
      document.body.classList.add('menu-show');
      toggler.classList.add('active');
      toggler.setAttribute('aria-expanded', 'true');
    });
    nav.addEventListener('hidden.bs.collapse', function () {
      document.body.classList.remove('menu-show');
      toggler.classList.remove('active');
      toggler.setAttribute('aria-expanded', 'false');
    });
  };

  /* ---------- Navigation state (scrolled navbar + active links) ---------- */
  var topNavSections = [
    { id: 'home-section', sel: '.ftco_navbar a[href="#home-section"]' },
    { id: 'education-section', sel: '.ftco_navbar a[href="#education-section"]' },
    { id: 'page-3', sel: '.ftco_navbar a[href="#page-3"]' },
    { id: 'side-projects-section', sel: '.ftco_navbar a[href="#side-projects-section"]' },
    { id: 'about-section', sel: '.ftco_navbar a[href="#about-section"]' },
    { id: 'contact-section', sel: '.ftco_navbar a[href="#contact-section"]' }
  ];

  var sideNavSections = [
    { id: 'page-2', sel: '#navi a[href="#page-2"]' },
    { id: 'page-1', sel: '#navi a[href="#page-1"]' },
    { id: 'page-3', sel: '#navi a[href="#page-3"]' },
    { id: 'side-projects-section', sel: '#navi a[href="#side-projects-section"]' }
  ];

  var updateActiveNav = function (sections) {
    var threshold = 130;
    var current = null;
    for (var i = 0; i < sections.length; i++) {
      var el = document.getElementById(sections[i].id);
      if (el && el.getBoundingClientRect().top <= threshold) current = sections[i];
    }
    for (var j = 0; j < sections.length; j++) {
      var link = document.querySelector(sections[j].sel);
      if (!link) continue;
      var li = link.closest('li');
      if (sections[j] === current) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'true');
        if (li) li.classList.add('active');
      } else {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
        if (li) li.classList.remove('active');
      }
    }
  };

  var navState = function () {
    var navbar = document.querySelector('.ftco_navbar');
    var ticking = false;
    var onScroll = function () {
      var st = scrollY();
      if (navbar) {
        navbar.classList.toggle('scrolled', st > 150);
        navbar.classList.toggle('awake', st > 350);
      }
      updateActiveNav(topNavSections);
      updateActiveNav(sideNavSections);
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
    onScroll();
  };

  /* ---------- Smooth in-page navigation ---------- */
  var findHeading = function (container) {
    var h = container.querySelector('h1, h2, h3');
    return h || container;
  };

  var scrollToTarget = function (target) {
    target.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start'
    });
  };

  var doScroll = function (target, href, fromKey) {
    scrollToTarget(target);
    if (history.replaceState) history.replaceState(null, null, href);

    // Move focus for keyboard users (Enter-triggered clicks have detail === 0)
    if (fromKey) {
      var focusEl = findHeading(target);
      if (!focusEl.hasAttribute('tabindex')) focusEl.setAttribute('tabindex', '-1');
      focusEl.focus({ preventScroll: true });
    }
  };

  var anchorNav = function () {
    document.addEventListener('click', function (e) {
      var link = e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!link) return;
      var href = link.getAttribute('href');
      if (!href || href.length === 1) return;

      var target = document.getElementById(href.slice(1));
      if (!target) return;

      e.preventDefault();
      var fromKey = e.detail === 0;

      // If the mobile menu is open, close it first (body scroll is locked while open)
      var nav = document.getElementById('ftco-nav');
      if (nav && nav.classList.contains('show')) {
        nav.addEventListener('hidden.bs.collapse', function onHidden() {
          nav.removeEventListener('hidden.bs.collapse', onHidden);
          doScroll(target, href, fromKey);
        });
        $(nav).collapse('hide');
        return;
      }

      doScroll(target, href, fromKey);
    });
  };

  /* ---------- Scroll-reveal (progressive enhancement) ---------- */
  var contentWayPoint = function () {
    var els = document.querySelectorAll('.ftco-animate');
    if (!els.length) return;

    if (!window.Waypoint) {
      for (var k = 0; k < els.length; k++) {
        els[k].classList.add('ftco-animated', 'fadeInUp');
      }
      return;
    }

    for (var i = 0; i < els.length; i++) {
      (function (el) {
        new Waypoint({
          element: el,
          offset: '95%',
          handler: function (direction) {
            if (direction === 'down' && !el.classList.contains('ftco-animated')) {
              var effect = el.getAttribute('data-animate-effect') || 'fadeInUp';
              el.classList.add('ftco-animated', effect);
            }
          }
        });
      })(els[i]);
    }
  };

  /* ---------- Rotating hero text ---------- */
  var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.isDeleting = false;
    this.tick();
  };

  TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 300 - Math.random() * 100;

    if (this.isDeleting) delta /= 2;

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    window.setTimeout(function () {
      that.tick();
    }, delta);
  };

  var txtRotate = function () {
    var elements = document.getElementsByClassName('txt-rotate');
    if (prefersReducedMotion) {
      for (var i = 0; i < elements.length; i++) {
        var words = JSON.parse(elements[i].getAttribute('data-rotate') || '[]');
        if (words.length) elements[i].textContent = words[0];
      }
      return;
    }
    for (var j = 0; j < elements.length; j++) {
      var toRotate = elements[j].getAttribute('data-rotate');
      var period = elements[j].getAttribute('data-period');
      if (toRotate) new TxtRotate(elements[j], JSON.parse(toRotate), period);
    }
  };

  /* ---------- Footer year ---------- */
  var footerYear = function () {
    var el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
  };

  /* ---------- Init ---------- */
  var init = function () {
    loader();
    fullHeight();
    mobileMenu();
    navState();
    anchorNav();
    contentWayPoint();
    txtRotate();
    footerYear();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(jQuery);
