// ===== AOS =====
AOS.init({ duration: 800, once: true, offset: 60, easing: 'ease-out-cubic' });

// ===== MOBILE NAV CLOSE =====
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const nc = document.getElementById('nav-menu');
    const bs = bootstrap.Collapse.getInstance(nc);
    if (bs) bs.hide();
  });
});

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 40) {
    nav.style.background = 'rgba(10,10,20,0.98)';
    nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
  } else {
    nav.style.background = 'rgba(10,10,20,0.92)';
    nav.style.boxShadow = 'none';
  }
});

// ===== ACTIVE NAV =====
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) current = s.id; });
  navLinks.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === `#${current}`) l.classList.add('active');
  });
});

// ===== STATS COUNTER =====
let counted = false;
function countUp() {
  if (counted) return;
  const el = document.querySelector('.stats-bar');
  if (!el) return;
  if (el.getBoundingClientRect().top < window.innerHeight - 80) {
    counted = true;
    document.querySelectorAll('.stat-num').forEach(n => {
      const target = +n.dataset.target;
      let count = 0;
      const step = Math.ceil(target / 50);
      const t = setInterval(() => {
        count = Math.min(count + step, target);
        n.textContent = count + (target === 100 ? '%' : '+');
        if (count >= target) clearInterval(t);
      }, 28);
    });
  }
}
window.addEventListener('scroll', countUp);
// Also try on DOMContentLoaded in case stats bar is already in view
document.addEventListener('DOMContentLoaded', () => setTimeout(countUp, 400));

// ===== SCROLL PROGRESS =====
const bar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  bar.style.width = pct + '%';
});

// ===== CARD HOVER TILT =====
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-5px)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

// ===== CONTACT FORM =====
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', function () {
    const btn = document.getElementById('submitBtn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    btn.disabled = true;
  });
}
