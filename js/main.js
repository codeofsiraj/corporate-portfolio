/* -------------------------------------------------------------------
 * MOBEX AUTOMOTIVE INDUSTRIES - INTERACTIVE SCRIPT ENGINE
 * (HERO SLIDER, ACCORDIONS, MOBILE DRAWER, FORM FEEDBACK)
 * ------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initAccordions();
  initMobileDrawer();
  initForms();
});

/* Hero Slider Engine */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-slider-dot');
  const prevBtn = document.querySelector('.hero-nav-arrow.prev');
  const nextBtn = document.querySelector('.hero-nav-arrow.next');
  
  if (!slides.length) return;
  
  let currentSlide = 0;
  let autoplayInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      resetAutoplay();
    });
  });

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  startAutoplay();
}

/* Accordions Engine */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* Mobile Drawer Engine */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.drawer-overlay');
  const closeBtn = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!toggleBtn || !drawer || !overlay) return;

  function openDrawer() {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* Forms Feedback Engine */
function initForms() {
  const contactForm = document.getElementById('corporate-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const alert = document.getElementById('form-alert');
      if (alert) {
        alert.className = 'alert-banner success';
        alert.textContent = 'Thank you! Your technical inquiry has been submitted successfully to Mobex Corporate Engineering.';
        alert.style.display = 'block';
        contactForm.reset();
      }
    });
  }

  const inquiryForm = document.getElementById('standalone-inquiry-form');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const alert = document.getElementById('inquiry-alert');
      if (alert) {
        alert.className = 'alert-banner success';
        alert.textContent = 'Thank you! Your whitepaper technical request has been received.';
        alert.style.display = 'block';
        inquiryForm.reset();
      }
    });
  }
}

/* Whitepaper Article Reader Engine */
function openArticle(articleId) {
  const readerSection = document.getElementById('article-reader-section');
  if (readerSection) {
    readerSection.scrollIntoView({ behavior: 'smooth' });
  }
}
