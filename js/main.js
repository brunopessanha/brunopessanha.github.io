(function () {
  // ── Scroll nav ──
  var nav  = document.querySelector('nav');
  var hero = document.querySelector('.hero');
  new IntersectionObserver(function (entries) {
    nav.classList.toggle('scrolled', !entries[0].isIntersecting);
  }, { threshold: 0 }).observe(hero);

  // ── Theme ──
  var moonSVG = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
  var sunSVG  = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    var btn = document.getElementById('theme-toggle');
    if (!btn) return;
    var isDark = theme === 'dark';
    btn.innerHTML = isDark ? sunSVG : moonSVG;
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  }

  var savedTheme   = localStorage.getItem('theme');
  var systemDark   = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var initialTheme = savedTheme || (systemDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  document.getElementById('theme-toggle').addEventListener('click', function () {
    var current = document.documentElement.dataset.theme || initialTheme;
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Stay in sync if the OS preference changes while the tab is open (no manual override)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // ── i18n (only on pages that load lang files) ──
  if (typeof I18N_EN !== 'undefined' && typeof I18N_DE !== 'undefined') {
    var TRANSLATIONS = { en: I18N_EN, de: I18N_DE };

    function setLang(lang) {
      document.documentElement.lang = lang;
      localStorage.setItem('lang', lang);
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var key = el.dataset.i18n;
        if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key] !== undefined) {
          el.innerHTML = TRANSLATIONS[lang][key];
        }
      });
      var btn = document.getElementById('lang-toggle');
      if (btn) btn.textContent = lang === 'en' ? '🇬🇧' : '🇩🇪';
    }

    var saved   = localStorage.getItem('lang');
    var browser = (navigator.language || navigator.userLanguage || '').toLowerCase();
    var initial = saved || (browser.startsWith('de') ? 'de' : 'en');

    var langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', function () {
        var current = localStorage.getItem('lang') || initial;
        setLang(current === 'en' ? 'de' : 'en');
      });
    }

    setLang(initial);
  }
})();
