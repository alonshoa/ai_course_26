(function () {
  const root = document.documentElement;
  const toggleButton = document.getElementById('theme-toggle');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const languageSelect = document.getElementById('language-toggle');
  const storedTheme = localStorage.getItem('theme');
  const storedLanguage = localStorage.getItem('language');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const translations = {
    en: {
      'site.title': 'AI & CS High-School Course',
      'site.subtitle': 'Creative coding, data thinking, and responsible AI',
      'nav.overview': 'Overview',
      'nav.structure': 'Course Structure',
      'nav.quick': 'Quick Links',
      'nav.resources': 'Resources',
      'nav.projects': 'Projects',
      'controls.theme': 'Theme',
      'footer.copy': '© %YEAR% AI & CS High-School Course. All rights reserved.',
      'footer.updated': 'Last updated: %DATE%',
      'footer.repo': 'GitHub Repo',
      'footer.contact': 'Contact',
    },
    he: {
      'site.title': 'קורס בינה מלאכותית ומדעי המחשב',
      'site.subtitle': 'קוד יצירתי, חשיבה מבוססת נתונים ו-AI אחראי',
      'nav.overview': 'סקירה',
      'nav.structure': 'מבנה הקורס',
      'nav.quick': 'קישורים מהירים',
      'nav.resources': 'משאבים',
      'nav.projects': 'פרויקטים',
      'controls.theme': 'ערכת צבע',
      'footer.copy': '© %YEAR% קורס בינה מלאכותית ומדעי המחשב. כל הזכויות שמורות.',
      'footer.updated': 'עודכן לאחרונה: %DATE%',
      'footer.repo': 'מאגר GitHub',
      'footer.contact': 'צור קשר',
    },
  };

  function setLanguage(language) {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('data-language', language);
    document.documentElement.setAttribute('lang', language === 'he' ? 'he' : 'en');
    document.documentElement.setAttribute('dir', language === 'he' ? 'rtl' : 'ltr');
    applyTranslations(language);
    updateLanguageLinks(language);
    handleLanguageNavigation(language);
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

  function applyTranslations(language) {
    const dictionary = translations[language] || translations.en;

    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.getAttribute('data-i18n');
      const template = dictionary[key];
      if (!template) return;

      const year = node.dataset.year;
      const date = node.dataset.date;
      const text = template
        .replace('%YEAR%', year || '')
        .replace('%DATE%', date || '');

      if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
        node.placeholder = text;
      } else {
        node.textContent = text;
      }
    });
  }

  function handleLanguageNavigation(language) {
    const path = window.location.pathname;
    const search = window.location.search;
    const hash = window.location.hash;
    const base = (document.documentElement.dataset.contentBase || '/content/').replace(/\/+$/, '');

    const contentMatch = new RegExp(`^${base}/(en|he)/(.*)`).exec(path);
    if (contentMatch) {
      const currentLang = contentMatch[1];
      const rest = contentMatch[2];
      if (currentLang !== language) {
        const newPath = `${base}/${language}/${rest}`;
        window.location.href = `${newPath}${search}${hash}`;
      }
      return;
    }

    if (path === '/' || path === '/index.html') {
      if (language === 'he') {
        window.location.href = `/he/${search}${hash}`;
      }
      return;
    }

    if (path.startsWith('/he/')) {
      if (language === 'en') {
        window.location.href = `/${search}${hash}`;
      }
    }
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
