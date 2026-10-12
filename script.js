document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const backToTop = document.getElementById('backToTop');
  const year = document.getElementById('currentYear');
  if (year) year.textContent = new Date().getFullYear();

  const handleScroll = () => {
    const moved = window.scrollY > 30;
    navbar?.classList.toggle('scrolled', moved);
    backToTop?.classList.toggle('visible', window.scrollY > 450);
  };
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Close the mobile navigation after choosing a section.
  document.querySelectorAll('#navContent .nav-link, #navContent .btn').forEach(link => {
    link.addEventListener('click', () => {
      const navContent = document.getElementById('navContent');
      if (navContent?.classList.contains('show') && window.bootstrap) {
        window.bootstrap.Collapse.getOrCreateInstance(navContent).hide();
      }
    });
  });

  // Subtle reveal-on-scroll animation, with a fallback for older browsers.
  const revealTargets = document.querySelectorAll(
    '.content-card, .skill-card, .project-card, .certificate-card, .timeline-item, .seminar-strip'
  );
  revealTargets.forEach(item => item.classList.add('reveal'));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(item => observer.observe(item));
  } else {
    revealTargets.forEach(item => item.classList.add('in-view'));
  }
});
