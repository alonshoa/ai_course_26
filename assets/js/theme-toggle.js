(function () {
  const root = document.documentElement;
  const toggleButton = document.getElementById('theme-toggle');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const languageSelect = document.getElementById('language-toggle');
  const storedTheme = localStorage.getItem('theme');
  const storedLanguage = localStorage.getItem('language');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function setLanguage(language) {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('data-language', language);
    document.documentElement.setAttribute('lang', language === 'he' ? 'he' : 'en');
    document.documentElement.setAttribute('dir', language === 'he' ? 'rtl' : 'ltr');
    updateLanguageLinks(language);
  }

  function getInitialLanguage() {
    if (storedLanguage) return storedLanguage;
    const documentLang = document.documentElement.getAttribute('lang');
    return documentLang && documentLang.startsWith('he') ? 'he' : 'en';
  }

  function cleanPath(path) {
    return path.replace(/^\/+|\/+$/g, '');
  }

  function buildContentUrl(path, language) {
    const base = document.documentElement.dataset.contentBase || '/content/';
    const normalizedPath = cleanPath(path);
    const isFile = normalizedPath.includes('.');
    const suffix = isFile ? '' : '/';
    return `${base}${language}/${normalizedPath}${suffix}`;
  }

  function updateLanguageLinks(language) {
    document.querySelectorAll('[data-lang-section]').forEach((link) => {
      const section = link.getAttribute('data-lang-section');
      link.href = buildContentUrl(section, language);
    });

    document.querySelectorAll('[data-lang-file]').forEach((link) => {
      const filePath = link.getAttribute('data-lang-file');
      link.href = buildContentUrl(filePath, language);
    });
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }

  function getInitialTheme() {
    if (storedTheme) return storedTheme;
    return systemPrefersDark ? 'dark' : 'light';
  }

  const initialTheme = getInitialTheme();
  setTheme(initialTheme);

  const initialLanguage = getInitialLanguage();
  setLanguage(initialLanguage);

  if (languageSelect) {
    languageSelect.value = initialLanguage;
    languageSelect.addEventListener('change', (event) => {
      setLanguage(event.target.value);
    });
  }

  if (toggleButton) {
    toggleButton.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('open');
    });
  }
})();
