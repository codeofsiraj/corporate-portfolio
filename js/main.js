/* -------------------------------------------------------------------
 * MOBEX AUTOMOTIVE INDUSTRIES - CORPORATE INTERACTION CONTROLLER
 * FULL-WIDTH EDGE-TO-EDGE HERO SLIDER & VIDEO SHOWCASE ENGINE
 * ------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  initVideoPlayer();
  initCountdownTimer();
  initAnimatedCounters();
  initProgressBars();
  initAccordion();
  initFormsValidation();
  initMobileDrawer();
});

/* 1. Hero Slider Engine (Full-Width Edge-to-Edge) */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-slider-dot');
  const prevBtn = document.querySelector('.hero-slider-fullwidth .hero-nav-arrow.prev') || document.querySelector('.hero-nav-arrow.prev');
  const nextBtn = document.querySelector('.hero-slider-fullwidth .hero-nav-arrow.next') || document.querySelector('.hero-nav-arrow.next');
  
  if (slides.length === 0) return;
  
  let currentSlide = 0;
  let slideTimer = null;
  const autoPlayDelay = 5000;
  
  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
    
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
    
    currentSlide = index;
  }
  
  function nextSlide() {
    let nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }
  
  function prevSlide() {
    let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }
  
  function startAutoPlay() {
    stopAutoPlay();
    slideTimer = setInterval(nextSlide, autoPlayDelay);
  }
  
  function stopAutoPlay() {
    if (slideTimer) {
      clearInterval(slideTimer);
      slideTimer = null;
    }
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
      startAutoPlay();
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
      startAutoPlay();
    });
  }
  
  dots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      showSlide(i);
      startAutoPlay();
    });
  });
  
  const sliderContainer = document.querySelector('.hero-section');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);
  }
  
  let touchStartX = 0;
  let touchEndX = 0;
  
  if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    sliderContainer.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }
  
  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextSlide();
      startAutoPlay();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      prevSlide();
      startAutoPlay();
    }
  }
  
  showSlide(0);
  startAutoPlay();
}

/* 2. Corporate Video Showcase Controller */
function initVideoPlayer() {
  const playBtn = document.getElementById('company-video-play-btn');
  const videoWrapper = document.getElementById('company-video-wrapper');
  
  if (!playBtn || !videoWrapper) return;
  
  playBtn.addEventListener('click', () => {
    videoWrapper.innerHTML = `
      <iframe width="100%" height="380" src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0" 
        title="Mobex Automotive Industries Corporate Video" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen style="border: none; border-radius: 12px;">
      </iframe>`;
  });
}

/* 3. Pre-Header Countdown Timer Widget */
function initCountdownTimer() {
  const daysEl = document.getElementById('timer-days');
  const hoursEl = document.getElementById('timer-hours');
  const minutesEl = document.getElementById('timer-minutes');
  const secondsEl = document.getElementById('timer-seconds');
  
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
  
  const targetDate = new Date().getTime() + (30 * 24 * 60 * 60 * 1000);
  
  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance < 0) return;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }
  
  updateTimer();
  setInterval(updateTimer, 1000);
}

/* 4. Scroll-Triggered Animated Counters */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.counter-number');
  if (counters.length === 0) return;
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const duration = 2000;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = target.toLocaleString();
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current).toLocaleString();
          }
        }, stepTime);
        
        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.4 });
  
  counters.forEach(counter => observer.observe(counter));
}

/* 5. Scroll-Triggered Progress Meter Bars */
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-bar');
  if (bars.length === 0) return;
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const percent = bar.getAttribute('data-percentage');
        bar.style.width = percent + '%';
        obs.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });
  
  bars.forEach(bar => observer.observe(bar));
}

/* 6. FAQ Accordion Logic */
function initAccordion() {
  const headers = document.querySelectorAll('.accordion-header');
  
  headers.forEach(header => {
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

/* 7. Form Validations & Alert Banners */
function initFormsValidation() {
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const alertBox = document.getElementById('newsletter-alert');
      
      if (emailInput && emailInput.value.trim().includes('@')) {
        alertBox.className = 'alert-banner success';
        alertBox.textContent = '✓ Thank you! You have successfully subscribed to corporate updates.';
        alertBox.style.display = 'block';
        emailInput.value = '';
      } else {
        alertBox.className = 'alert-banner error';
        alertBox.textContent = '⚠️ Please enter a valid corporate email address.';
        alertBox.style.display = 'block';
      }
    });
  }
}

/* 8. Mobile Drawer Navigation Toggle */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const closeBtn = document.getElementById('drawer-close-btn');
  const drawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('drawer-overlay');
  
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
}
