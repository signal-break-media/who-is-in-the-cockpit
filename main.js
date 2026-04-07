// Signal Break — main.js

// Reading progress bar
const bar = document.createElement('div');
bar.style.cssText = 'position:fixed;top:56px;left:0;height:2px;background:#c8382a;z-index:200;transition:width 0.1s;width:0';
document.body.appendChild(bar);

window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const scrolled = doc.scrollTop;
  const total = doc.scrollHeight - doc.clientHeight;
  bar.style.width = (scrolled / total * 100) + '%';
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.stat-card, .pull-quote, h2').forEach(el => {
  el.style.cssText += 'opacity:0;transform:translateY(18px);transition:opacity 0.5s ease,transform 0.5s ease';
  observer.observe(el);
});