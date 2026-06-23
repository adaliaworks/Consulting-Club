(function () {
  'use strict';

  async function loadPartial(id, url) {
    const el = document.getElementById(id);
    if (!el) return;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      el.outerHTML = await res.text();
    } catch (err) {
      console.warn('Consulting Club: could not load partial', url, '—', err.message);
      console.warn('If previewing locally, serve with: python3 -m http.server 8080');
    }
  }

  function setActiveNav() {
    const path = window.location.pathname.replace(/([^/])$/, '$1/');
    document.querySelectorAll('.main-nav a').forEach(function (a) {
      const href = (a.getAttribute('href') || '').replace(/([^/])$/, '$1/');
      if (!href) return;
      const isHome = href === '/';
      const matches = isHome ? path === '/' : path.startsWith(href);
      if (matches) {
        a.classList.add('active');
        a.setAttribute('aria-current', 'page');
      }
    });
  }

  function initMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  async function init() {
    await Promise.all([
      loadPartial('site-header', '/partials/header.html'),
      loadPartial('site-footer', '/partials/footer.html'),
    ]);
    setActiveNav();
    initMobileNav();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
