// Smooth scroll for nav links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Highlight active section on scroll
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Responsive hamburger menu
const navToggle = document.getElementById('nav-toggle');
const navLinksList = document.querySelector('.nav-links');
if (navToggle && navLinksList) {
  navToggle.addEventListener('click', () => {
    navLinksList.classList.toggle('open');
  });
}

// Close nav on link click (mobile)
if (navLinksList) {
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksList.classList.remove('open');
    });
  });
}

// Dark/Light mode toggle
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
      themeToggle.textContent = '☀️';
    } else {
      themeToggle.textContent = '🌙';
    }
  });
  // Set initial theme icon
  if (document.body.classList.contains('dark')) {
    themeToggle.textContent = '☀️';
  } else {
    themeToggle.textContent = '🌙';
  }
}

// Contact form (static message)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const msg = contactForm.querySelector('.form-message');
    msg.textContent = 'This form is static – connect backend to receive messages.';
    msg.style.color = '#2563eb';
    contactForm.reset();
  });
}

// Certificate Modal Logic
const certCards = document.querySelectorAll('.certificate-card');
const certModal = document.getElementById('certificate-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalClose = document.getElementById('modal-close');

if (certCards.length && certModal && modalImg && modalTitle && modalClose) {
  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.getAttribute('data-img');
      const title = card.getAttribute('data-title');
      modalImg.src = img;
      modalTitle.textContent = title;
      certModal.classList.add('active');
    });
  });

  modalClose.addEventListener('click', () => {
    certModal.classList.remove('active');
    modalImg.src = '';
    modalTitle.textContent = '';
  });

  certModal.addEventListener('click', (e) => {
    if (e.target === certModal) {
      certModal.classList.remove('active');
      modalImg.src = '';
      modalTitle.textContent = '';
    }
  });

  // Close modal on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal.classList.contains('active')) {
      certModal.classList.remove('active');
      modalImg.src = '';
      modalTitle.textContent = '';
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Robust smooth scroll for all anchor links
  function smoothScrollHandler(e) {
    const anchor = e.currentTarget;
    const href = anchor.getAttribute('href');
    if (href && href.startsWith('#')) {
      const targetId = href.slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        if ('scrollBehavior' in document.documentElement.style) {
          target.scrollIntoView({ behavior: 'smooth' });
        } else {
          // Fallback for older browsers
          const top = target.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo(0, top);
        }
      }
    }
  }
  function attachSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.removeEventListener('click', smoothScrollHandler);
      anchor.addEventListener('click', smoothScrollHandler);
    });
  }
  attachSmoothScroll();
  // If you ever add links dynamically, call attachSmoothScroll() again.

  // Show more/less projects logic
  var showMoreBtn = document.getElementById('show-more-projects');
  var showLessBtn = document.getElementById('show-less-projects');
  var extraProjects = document.querySelectorAll('.extra-project');
  if (showMoreBtn && showLessBtn) {
    showMoreBtn.addEventListener('click', function() {
      extraProjects.forEach(function(card) {
        card.classList.add('show');
      });
      showMoreBtn.style.display = 'none';
      showLessBtn.style.display = 'block';
    });
    showLessBtn.addEventListener('click', function() {
      extraProjects.forEach(function(card) {
        card.classList.remove('show');
      });
      showMoreBtn.style.display = 'block';
      showLessBtn.style.display = 'none';
      // Smooth scroll back to projects section
      var projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}); 