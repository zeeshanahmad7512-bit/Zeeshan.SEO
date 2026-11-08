/* Zeeshan Ahmad – site behaviour: theme, menu, loader, scroll reveal */
(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');

  /* Theme: saved choice wins, otherwise the system preference (handled in CSS) */
  try {
    var saved = localStorage.getItem('theme');
    if (saved) root.setAttribute('data-theme', saved);
  } catch (e) {}

  document.addEventListener('DOMContentLoaded', function () {
    var header = document.getElementById('header');
    var menu = document.getElementById('menu');
    var menuBtn = document.getElementById('menuToggle');
    var themeBtn = document.getElementById('themeToggle');

    themeBtn.addEventListener('click', function () {
      var isDark = root.getAttribute('data-theme') === 'dark' ||
        (!root.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      var next = isDark ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });

    function setMenu(open) {
      menu.classList.toggle('open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
    }
    menuBtn.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
    menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    document.addEventListener('click', function (e) { if (!header.contains(e.target)) setMenu(false); });

    function onScroll() { header.classList.toggle('scrolled', window.scrollY > 8); }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Scroll reveal */
    var items = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      items.forEach(function (el) { io.observe(el); });
    } else {
      items.forEach(function (el) { el.classList.add('in'); });
    }
  });

  /* Page loader: hide once loaded, with a safety timeout */
  var loader = document.getElementById('loader');
  function hideLoader() { var l = document.getElementById('loader'); if (l) l.classList.add('done'); }
  window.addEventListener('load', function () { setTimeout(hideLoader, 250); });
  setTimeout(hideLoader, 2500);
})();
