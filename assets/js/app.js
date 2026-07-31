(() => {
  const body = document.body;
  const themeBtn = document.getElementById('themeBtn');
  const saved = localStorage.getItem('portfolio-theme');
  if (saved === 'light') body.classList.add('light');
  themeBtn?.addEventListener('click', () => {
    body.classList.toggle('light');
    localStorage.setItem('portfolio-theme', body.classList.contains('light') ? 'light' : 'dark');
  });

  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.getElementById('mainNav');
  menuBtn?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => header?.classList.toggle('scrolled', window.scrollY > 20), { passive: true });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      entry.target.querySelectorAll?.('.skill-track i').forEach(bar => bar.style.width = `${bar.dataset.width}%`);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count || 0);
      let start = 0;
      const duration = 900;
      const started = performance.now();
      const tick = now => {
        const progress = Math.min((now - started) / duration, 1);
        el.textContent = Math.floor(target * progress);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: .7 });
  counters.forEach(el => counterObserver.observe(el));

  const glow = document.querySelector('.cursor-glow');
  window.addEventListener('pointermove', e => {
    if (!glow) return;
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  }, { passive: true });
})();
