/**
 * CAVALON — Shared Core Script
 * Handles Theme (Light/Dark), RTL/LTR, Sticky Header, Mobile Drawer,
 * Scroll Animations, Before/After Sliders, and Back-to-Top.
 */

(function () {
  const THEME_KEY = 'cavalon_theme';
  const DIR_KEY = 'cavalon_dir';

  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  const savedDir = localStorage.getItem(DIR_KEY) || 'ltr';
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.documentElement.setAttribute('dir', savedDir);

  const LOGO_SVG = `
    <svg class="brand-logo-mark" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#0D1017" stroke="#E58E58" stroke-width="1.8"/>
      <polygon points="32,10 51,21 51,43 32,54 13,43 13,21" stroke="#E58E58" stroke-width="2.2" fill="none"/>
      <path d="M40.5 24C38.2 21.5 35.1 20.2 31.6 20.2C25 20.2 20.2 25.2 20.2 32C20.2 38.8 25 43.8 31.6 43.8C35.1 43.8 38.2 42.5 40.5 40" stroke="#F3F5F8" stroke-width="3" stroke-linecap="round"/>
      <path d="M32 25.5L37.5 32L32 38.5L26.5 32L32 25.5Z" fill="#E58E58"/>
    </svg>
  `;

  const NAV_ITEMS = [
    { label: 'Home 1', href: 'index.html', key: 'home1' },
    { label: 'Home 2', href: 'home-2.html', key: 'home2' },
    { label: 'About', href: 'about.html', key: 'about' },
    { label: 'Services', href: 'services.html', key: 'services' },
    { label: 'Products', href: 'products.html', key: 'products' },
    { label: 'Gallery', href: 'gallery.html', key: 'gallery' },
    { label: 'Contact', href: 'contact.html', key: 'contact' }
  ];

  function getCurrentPageKey() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    if (path === '' || path === 'index.html') return 'home1';
    if (path === 'home-2.html') return 'home2';
    if (path === 'about.html') return 'about';
    if (path === 'services.html') return 'services';
    if (path === 'products.html') return 'products';
    if (path === 'gallery.html') return 'gallery';
    if (path === 'contact.html') return 'contact';
    if (path === 'login.html') return 'login';
    if (path === 'signup.html') return 'signup';
    return 'home1';
  }

  function renderHeader() {
    const headerMount = document.getElementById('site-header');
    if (!headerMount) return;

    const currentKey = getCurrentPageKey();

    const navLinksHtml = NAV_ITEMS.map(
      (item) => `<a href="${item.href}" class="nav-link ${item.key === currentKey ? 'active' : ''}">${item.label}</a>`
    ).join('');

    const mobileLinksHtml = NAV_ITEMS.map(
      (item) => `<a href="${item.href}" class="mobile-nav-link ${item.key === currentKey ? 'active' : ''}"><span>${item.label}</span><span>&rsaquo;</span></a>`
    ).join('');

    headerMount.className = 'site-header';
    document.body.classList.add('has-fixed-header');
    headerMount.innerHTML = `
      <div class="container header-inner">
        <a href="index.html" class="brand-lockup" aria-label="CAVALON Home">
          ${LOGO_SVG}
          <span class="brand-wordmark">CAVALON</span>
        </a>

        <nav class="main-nav" aria-label="Primary Navigation">
          ${navLinksHtml}
        </nav>

        <div class="header-actions">
          <button type="button" class="icon-toggle-btn" id="rtl-toggle-btn" aria-label="Toggle RTL / LTR Layout" title="Toggle RTL / LTR">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 3 20 7 16 11"/><line x1="4" y1="7" x2="20" y2="7"/><polyline points="8 13 4 17 8 21"/><line x1="20" y1="17" x2="4" y2="17"/></svg>
          </button>
          <button type="button" class="icon-toggle-btn" id="theme-toggle-btn" aria-label="Toggle Light/Dark Mode" title="Toggle Theme">
            <span class="theme-icon-slot"></span>
          </button>

          <div class="auth-nav-group">
            <a href="signup.html" class="btn btn-secondary btn-sm">Signup</a>
            <a href="contact.html" class="btn btn-primary btn-sm">Get a Quote</a>
          </div>

          <button type="button" class="hamburger-btn" id="mobile-menu-open" aria-label="Open Navigation Menu" aria-expanded="false">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    `;

    let drawer = document.getElementById('mobile-drawer');
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'mobile-drawer';
      drawer.className = 'mobile-drawer';
      drawer.setAttribute('aria-hidden', 'true');
      document.body.appendChild(drawer);
    }
    drawer.innerHTML = `
      <div class="mobile-drawer-panel">
        <div class="mobile-drawer-header">
          <a href="index.html" class="brand-lockup">
            ${LOGO_SVG}
            <span class="brand-wordmark">CAVALON</span>
          </a>
          <button type="button" class="icon-toggle-btn" id="mobile-menu-close" aria-label="Close Menu">&times;</button>
        </div>
        <div class="mobile-nav-list">
          ${mobileLinksHtml}
          <a href="signup.html" class="btn btn-secondary btn-sm" style="margin-top: 12px;">Signup</a>
          <a href="contact.html" class="btn btn-primary btn-sm" style="margin-top: 8px;">Get a Quote</a>
        </div>
        <div class="mobile-drawer-toggles">
          <button type="button" class="mobile-toggle-pill" id="mobile-rtl-toggle" aria-label="Toggle RTL / LTR Layout">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 3 20 7 16 11"/><line x1="4" y1="7" x2="20" y2="7"/><polyline points="8 13 4 17 8 21"/><line x1="20" y1="17" x2="4" y2="17"/></svg>
            <span>RTL / LTR</span>
          </button>
          <button type="button" class="mobile-toggle-pill" id="mobile-theme-toggle" aria-label="Toggle Light/Dark Mode">
            <span class="theme-icon-slot"></span>
            <span>Theme</span>
          </button>
        </div>
      </div>
    `;
  }

  function renderFooter() {
    const footerMount = document.getElementById('site-footer');
    if (!footerMount) return;

    footerMount.className = 'site-footer';
    footerMount.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="index.html" class="brand-lockup">
              ${LOGO_SVG}
              <span class="brand-wordmark">CAVALON</span>
            </a>
            <p class="footer-desc">
              Bespoke automotive interior atelier crafting precision-tailored leather seat covers, Alcantara cockpits, and artisan cabin transformations.
            </p>
            <div class="social-row">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-icon-btn social-ig" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social-icon-btn social-fb" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="social-icon-btn social-yt" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://wa.me/919845012345" target="_blank" rel="noopener noreferrer" class="social-icon-btn social-wa" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5l-1.406 5.156 5.281-1.375c1.469.797 3.109 1.219 4.75 1.219 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.813 14.125c-.25.703-1.438 1.344-2 1.422-.516.078-1.172.109-1.891-.125-.438-.141-1-.328-1.719-.641-3.031-1.313-5-4.359-5.156-4.563-.156-.203-1.234-1.641-1.234-3.125s.781-2.219 1.063-2.516c.281-.297.609-.375.813-.375s.406 0 .578.016c.188.016.438-.078.688.516.25.609.859 2.094.938 2.25.078.156.125.344.031.547-.094.203-.141.328-.297.5-.156.172-.328.391-.469.516-.156.141-.313.297-.141.594.172.297.766 1.266 1.641 2.047 1.125 1 2.078 1.313 2.375 1.469.297.156.469.125.641-.078.172-.203.734-.859.938-1.156.203-.297.406-.25.672-.156.266.094 1.703.797 2 .953.297.156.484.219.563.344.078.125.078.734-.172 1.438z"/></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 class="footer-heading">Quick Links</h4>
            <ul class="footer-links">
              <li><a href="index.html">Home 1</a></li>
              <li><a href="home-2.html">Home 2</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="services.html">Services</a></li>
              <li><a href="products.html">Products</a></li>
              <li><a href="gallery.html">Gallery</a></li>
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 class="footer-heading">Categories</h4>
            <ul class="footer-links">
              <li><a href="products.html?cat=leather">Premium Leather Covers</a></li>
              <li><a href="products.html?cat=diamond">Diamond Quilted Designs</a></li>
              <li><a href="products.html?cat=sports">Sports &amp; Racing Interiors</a></li>
              <li><a href="products.html?cat=dashboard">Dashboard Customization</a></li>
              <li><a href="products.html?cat=steering">Steering Wheel Covers</a></li>
              <li><a href="products.html?cat=mats">Floor Mats &amp; Carpets</a></li>
            </ul>
          </div>

          <div>
            <h4 class="footer-heading">Atelier Contact</h4>
            <div class="footer-contact-list">
              <div class="footer-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Plot 42, Indiranagar Auto Design District, Bengaluru 560038</span>
              </div>
              <div class="footer-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>+91 98450 12345</span>
              </div>
              <div class="footer-contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span>concierge@cavaloninteriors.com</span>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2026 CAVALON Automotive Interiors. All rights reserved.</p>
          <div class="footer-legal">
            <a href="contact.html#privacy">Privacy Policy</a>
            <a href="contact.html#terms">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>

      <button type="button" class="back-to-top-btn" id="back-to-top" aria-label="Back to Top" title="Back to Top">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
      </button>
    `;
  }

  function updateThemeIcon() {
    const slots = document.querySelectorAll('.theme-icon-slot');
    if (!slots.length) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const svg = isDark
      ? `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    slots.forEach((slot) => { slot.innerHTML = svg; });
  }

  function bindGlobalControls() {
    const toggleTheme = () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(THEME_KEY, next);
      updateThemeIcon();
    };

    const toggleRtl = () => {
      const next = document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', next);
      localStorage.setItem(DIR_KEY, next);
      const desktopRtl = document.getElementById('rtl-toggle-btn');
      if (desktopRtl) {
        desktopRtl.title = next === 'rtl' ? 'Direction: RTL (Click for LTR)' : 'Direction: LTR (Click for RTL)';
      }
    };

    updateThemeIcon();
    document.getElementById('theme-toggle-btn')?.addEventListener('click', toggleTheme);
    document.getElementById('mobile-theme-toggle')?.addEventListener('click', toggleTheme);
    document.getElementById('rtl-toggle-btn')?.addEventListener('click', toggleRtl);
    document.getElementById('mobile-rtl-toggle')?.addEventListener('click', toggleRtl);

    const drawer = document.getElementById('mobile-drawer');
    const openBtn = document.getElementById('mobile-menu-open');
    const closeBtn = document.getElementById('mobile-menu-close');
    if (drawer && openBtn && closeBtn) {
      const toggleDrawer = (open) => {
        drawer.classList.toggle('open', open);
        drawer.setAttribute('aria-hidden', String(!open));
        openBtn.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
      };
      openBtn.addEventListener('click', () => toggleDrawer(true));
      closeBtn.addEventListener('click', () => toggleDrawer(false));
      drawer.addEventListener('click', (e) => {
        if (e.target === drawer) toggleDrawer(false);
      });
    }

    const backTop = document.getElementById('back-to-top');
    if (backTop) {
      backTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    const header = document.getElementById('site-header');
    if (header) {
      window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
      }, { passive: true });
    }
  }

  function initScrollAnimations() {
    const items = Array.from(document.querySelectorAll('[data-anim]'));
    if (!items.length) return;

    const reveal = (el) => {
      if (el.classList.contains('in-view')) return;
      const delay = el.getAttribute('data-delay');
      if (delay) el.style.transitionDelay = `${delay}ms`;
      el.classList.add('in-view');
    };

    const revealInViewport = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      items.forEach((el) => {
        if (el.classList.contains('in-view')) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= vh + 120) {
          reveal(el);
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.01, rootMargin: '0px 0px 120px 0px' }
    );

    items.forEach((el) => observer.observe(el));

    revealInViewport();
    window.addEventListener('load', revealInViewport, { once: true });
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        revealInViewport();
        ticking = false;
      });
    }, { passive: true });
  }

  function initBeforeAfterSliders() {
    document.querySelectorAll('.ba-slider').forEach((slider) => {
      const range = slider.querySelector('.ba-range');
      const afterWrap = slider.querySelector('.ba-after-wrap');
      const handle = slider.querySelector('.ba-handle');
      if (!range || !afterWrap || !handle) return;

      const update = (val) => {
        afterWrap.style.clipPath = `inset(0 0 0 ${val}%)`;
        handle.style.left = `${val}%`;
      };
      range.addEventListener('input', (e) => update(e.target.value));
      update(range.value || 50);
    });
  }

  function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter'), 10);
        const suffix = el.getAttribute('data-suffix') || '';
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 45));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = current.toLocaleString() + suffix;
        }, 24);
        obs.unobserve(el);
      });
    }, { threshold: 0.4 });

    counters.forEach((c) => obs.observe(c));
  }

  function init3DTilt() {
    document.querySelectorAll('.tilt-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    bindGlobalControls();
    initScrollAnimations();
    initBeforeAfterSliders();
    initCounters();
    init3DTilt();
  });
})();
