// Mobile menu toggle
const menuIcon = document.getElementById('menu-icon');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenuBtn = document.getElementById('close-menu');

menuIcon.addEventListener('click', () => {
  mobileMenu.classList.add('active');
});

closeMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
});

// Typed.js for animated multiple text
const typed = new Typed('.multiple-text', {
  strings: ['Web Developer', 'Full Stack Developer', 'React Developer'],
  typeSpeed: 100,
  backSpeed: 60,
  loop: true
});

// Portfolio filter (simple version)
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    portfolioItems.forEach(item => {
      if (filter === '*' || item.classList.contains(filter.slice(1))) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
