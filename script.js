/* ==========================================================================
   TRÂM ANH PORTFOLIO - 3D COVERFLOW ENGINE & DYNAMIC EFFECTS SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. NAVBAR SCROLL & TOP PROGRESS BAR & MOBILE MENU
     -------------------------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  const scrollProgressBar = document.getElementById('scrollProgressBar');

  window.addEventListener('scroll', () => {
    // Navbar background fill
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Progress Bar percentage
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgressBar) {
      scrollProgressBar.style.width = scrolled + '%';
    }
  });

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = hamburgerBtn.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburgerBtn.querySelector('i').className = 'fa-solid fa-bars';
      });
    });
  }

  /* --------------------------------------------------------------------------
     2. SCROLLSPY NAVIGATION HIGHLIGHT ENGINE
     -------------------------------------------------------------------------- */
  const trackedSections = document.querySelectorAll('section[id]');
  const mainNavItems = document.querySelectorAll('.nav-links .nav-item');

  function updateScrollspy() {
    const scrollPosition = window.scrollY + 220;

    trackedSections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        mainNavItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });

    // Special case for Hero / top of page
    if (window.scrollY < 200) {
      mainNavItems.forEach(link => link.classList.remove('active'));
      const aboutLink = document.querySelector('.nav-links .nav-item[href="#about"]');
      if (aboutLink) aboutLink.classList.add('active');
    }
  }

  window.addEventListener('scroll', updateScrollspy);
  updateScrollspy();

  /* --------------------------------------------------------------------------
     3. GLOBAL SCROLL REVEAL ANIMATIONS FOR ALL COMPONENTS
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  /* --------------------------------------------------------------------------
     4. MOUSE SPOTLIGHT FOLLOW-FOCUS EFFECT
     -------------------------------------------------------------------------- */
  const mouseSpotlight = document.getElementById('mouseSpotlight');
  const heroSection = document.getElementById('hero');

  if (mouseSpotlight && heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      mouseSpotlight.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      mouseSpotlight.style.opacity = '1';
    });

    heroSection.addEventListener('mouseleave', () => {
      mouseSpotlight.style.opacity = '0';
    });
  }

  /* --------------------------------------------------------------------------
     5. SEQUENTIAL AUTO GLOWING WAVE FOR "PORTFOLIO" TITLE (LEFT TO RIGHT, 1S INTERVAL)
     -------------------------------------------------------------------------- */
  const portfolioLetters = document.querySelectorAll('#heroGiantTitle .letter');
  if (portfolioLetters.length > 0) {
    let currentGlowIndex = 0;
    portfolioLetters[0].classList.add('glow-active');

    setInterval(() => {
      portfolioLetters[currentGlowIndex].classList.remove('glow-active');
      currentGlowIndex = (currentGlowIndex + 1) % portfolioLetters.length;
      portfolioLetters[currentGlowIndex].classList.add('glow-active');
    }, 1000);
  }

  /* --------------------------------------------------------------------------
     6. INTERACTIVE 3D TILT EFFECT ON AVATAR PORTRAIT
     -------------------------------------------------------------------------- */
  const portraitContainer = document.getElementById('portraitContainer');

  if (portraitContainer) {
    portraitContainer.addEventListener('mousemove', (e) => {
      const rect = portraitContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = (y - centerY) / 12;
      const tiltY = (centerX - x) / 12;

      portraitContainer.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    portraitContainer.addEventListener('mouseleave', () => {
      portraitContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  /* --------------------------------------------------------------------------
     7. DYNAMIC TYPEWRITER ROLE SWAPPER IN BIO
     -------------------------------------------------------------------------- */
  const dynamicRoleText = document.getElementById('dynamicRoleText');
  const roles = [
    'CREATIVE PRODUCER',
    'ACCOUNT EXECUTIVE',
    'ARTIST MANAGEMENT',
    'EVENT STRATEGIST'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeRole() {
    if (!dynamicRoleText) return;

    const currentRole = roles[roleIndex];

    if (isDeleting) {
      dynamicRoleText.innerText = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      dynamicRoleText.innerText = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(typeRole, typingSpeed);
  }

  typeRole();

  /* --------------------------------------------------------------------------
     8. STAT COUNTER ANIMATION
     -------------------------------------------------------------------------- */
  const counters = document.querySelectorAll('.counter');
  let counted = false;

  function runCounters() {
    if (counted) return;
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const step = target / 30;

      const updateCount = () => {
        count += step;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          setTimeout(updateCount, 40);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
    counted = true;
  }

  runCounters();

  /* --------------------------------------------------------------------------
     9. 3D COVERFLOW DEPTH STREAM CAROUSEL ENGINE (ALWAYS DEFAULT & RESET TO SLIDE 1)
     -------------------------------------------------------------------------- */
  const cfItems = document.querySelectorAll('.coverflow-item');
  const cfPrevBtn = document.getElementById('cfPrevBtn');
  const cfNextBtn = document.getElementById('cfNextBtn');
  const cfDots = document.querySelectorAll('.cf-dot');
  const currentSlideNum = document.getElementById('currentSlideNum');
  const totalCfSlides = cfItems.length;
  let activeCfIndex = 0;

  function render3DCoverflow() {
    cfItems.forEach((item, i) => {
      item.className = 'coverflow-item';

      let diff = i - activeCfIndex;

      if (diff < -Math.floor(totalCfSlides / 2)) diff += totalCfSlides;
      if (diff > Math.floor(totalCfSlides / 2)) diff -= totalCfSlides;

      if (diff === 0) {
        item.classList.add('slide-active');
      } else if (diff === -1) {
        item.classList.add('slide-prev-1');
      } else if (diff === -2) {
        item.classList.add('slide-prev-2');
      } else if (diff === 1) {
        item.classList.add('slide-next-1');
      } else if (diff === 2) {
        item.classList.add('slide-next-2');
      } else {
        item.classList.add('slide-hidden-far');
      }
    });

    if (currentSlideNum) {
      currentSlideNum.innerText = (activeCfIndex + 1).toString().padStart(2, '0');
    }

    cfDots.forEach((dot, idx) => {
      if (idx === activeCfIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  function next3DCF() {
    activeCfIndex = (activeCfIndex + 1) % totalCfSlides;
    render3DCoverflow();
  }

  function prev3DCF() {
    activeCfIndex = (activeCfIndex - 1 + totalCfSlides) % totalCfSlides;
    render3DCoverflow();
  }

  if (cfNextBtn && cfPrevBtn) {
    cfNextBtn.addEventListener('click', () => {
      next3DCF();
    });

    cfPrevBtn.addEventListener('click', () => {
      prev3DCF();
    });
  }

  cfItems.forEach((item, idx) => {
    item.addEventListener('click', () => {
      if (activeCfIndex !== idx) {
        activeCfIndex = idx;
        render3DCoverflow();
      }
    });
  });

  cfDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      activeCfIndex = idx;
      render3DCoverflow();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prev3DCF();
    } else if (e.key === 'ArrowRight') {
      next3DCF();
    }
  });

  const coverflowStage = document.getElementById('coverflowStage');
  let cfTouchStartX = 0;
  let cfTouchEndX = 0;

  if (coverflowStage) {
    coverflowStage.addEventListener('touchstart', (e) => {
      cfTouchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    coverflowStage.addEventListener('touchend', (e) => {
      cfTouchEndX = e.changedTouches[0].screenX;
      if (cfTouchEndX < cfTouchStartX - 40) {
        next3DCF();
      } else if (cfTouchEndX > cfTouchStartX + 40) {
        prev3DCF();
      }
    }, { passive: true });
  }

  // Reset to Slide 1 (index 0) whenever user scrolls into the #slides section
  const slidesSection = document.getElementById('slides');
  if (slidesSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          activeCfIndex = 0;
          render3DCoverflow();
        }
      });
    }, { threshold: 0.15 });
    observer.observe(slidesSection);
  }

  render3DCoverflow();

  /* --------------------------------------------------------------------------
     10. LIGHTBOX ZOOM SYSTEM
     -------------------------------------------------------------------------- */
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImg = document.getElementById('lightboxImg');

  document.querySelectorAll('.zoom-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const imgSrc = btn.getAttribute('data-img');
      if (lightboxImg && lightboxModal) {
        lightboxImg.src = imgSrc;
        lightboxModal.classList.add('active');
      }
    });
  });

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     11. 1-CLICK COPY EMAIL & PHONE WITH TOAST FEEDBACK
     -------------------------------------------------------------------------- */
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  function showToast(msg) {
    if (toast && toastMsg) {
      toastMsg.innerText = msg;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    }
  }

  const copyEmailBtn = document.getElementById('copyEmail');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('lptramanh2002@gmail.com');
      showToast('Copied Email: lptramanh2002@gmail.com');
    });
  }

  const copyPhoneBtn = document.getElementById('copyPhone');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('+84337571847');
      showToast('Copied Phone: +84 33 7571 847');
    });
  }

  const downloadCVBtn = document.getElementById('downloadCVBtn');
  if (downloadCVBtn) {
    downloadCVBtn.addEventListener('click', () => {
      showToast("Downloading Trâm Anh's CV PDF...");
      setTimeout(() => {
        window.open('Ảnh màn hình 2026-07-21 lúc 14.33.04.png', '_blank');
      }, 800);
    });
  }

});
