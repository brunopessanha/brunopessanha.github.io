(function () {
  // ── Scroll nav ──
  var nav  = document.querySelector('nav');
  var hero = document.querySelector('.hero');
  new IntersectionObserver(function (entries) {
    nav.classList.toggle('scrolled', !entries[0].isIntersecting);
  }, { threshold: 0 }).observe(hero);

  // ── i18n ──
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

  document.getElementById('lang-toggle').addEventListener('click', function () {
    var current = localStorage.getItem('lang') || initial;
    setLang(current === 'en' ? 'de' : 'en');
  });

  setLang(initial);
})();
