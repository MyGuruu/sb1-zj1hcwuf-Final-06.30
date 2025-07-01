// Registration Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Hide the Register button in header since we're on the registration page
  const registerButton = document.querySelector('.nav-cta');
  if (registerButton) {
    registerButton.style.opacity = '0';
    registerButton.style.pointerEvents = 'none';
    registerButton.style.transition = 'opacity 0.3s ease';
    
    // Optionally, you could completely hide it
    // registerButton.style.display = 'none';
  }

  // Logo click navigation - works from any page
  const logo = document.querySelector('.logo-wordmark');
  if (logo) {
    // Make logo clickable with proper cursor
    logo.style.cursor = 'pointer';
    
    logo.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
      
      // Navigate to home page from registration page
      window.location.href = 'index.html';
    });
    
    // Add hover effect for better UX
    logo.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.transition = 'transform 0.2s ease';
    });
    
    logo.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  }

  // Animated counter for hero stats
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + (target >= 100 ? '+' : '');
      element.classList.add('counting');
    }, 16);
  }

  // Initialize counters when hero is visible
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll('.stat-number');
          statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            animateCounter(stat, target);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(heroStats);
  }

  // Package selection handling
  const packageCards = document.querySelectorAll('.package-card');
  const packageButtons = document.querySelectorAll('.package-btn, .banquet-btn');
  
  let selectedPackage = null;
  
  packageCards.forEach(card => {
    card.addEventListener('click', function(e) {
      if (e.target.classList.contains('package-btn') || e.target.classList.contains('banquet-btn')) return;
      
      // Remove previous selection
      packageCards.forEach(c => c.classList.remove('selected'));
      
      // Add selection to clicked card
      this.classList.add('selected');
      selectedPackage = this.dataset.package;
      
      // Add selection styles
      this.style.borderColor = 'var(--primary-blue)';
      this.style.transform = 'translateY(-4px)';
      this.style.boxShadow = '0 20px 40px rgba(37, 99, 235, 0.2)';
    });
  });

  // Package button click handlers - REDIRECT TO CHECKOUT
  packageButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const packageType = this.dataset.package;
      
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
      
      // Redirect to checkout with package parameter
      window.location.href = `checkout.html?package=${packageType}`;
    });
  });

  // FAQ accordion functionality
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');
      
      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Enhanced intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        
        // Staggered animations for package cards
        if (entry.target.classList.contains('packages-grid')) {
          const cards = entry.target.querySelectorAll('.package-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.animation = `fadeInUp 0.6s ease-out forwards`;
            }, index * 100);
          });
        }
        
        // Staggered animations for FAQ items
        if (entry.target.classList.contains('faq-grid')) {
          const items = entry.target.querySelectorAll('.faq-item');
          items.forEach((item, index) => {
            setTimeout(() => {
              item.style.animation = `fadeInUp 0.6s ease-out forwards`;
            }, index * 100);
          });
        }
      }
    });
  }, observerOptions);

  // Observe sections for animations
  const sections = document.querySelectorAll('.section');
  const grids = document.querySelectorAll('.packages-grid, .faq-grid, .process-steps');
  
  sections.forEach(section => observer.observe(section));
  grids.forEach(grid => observer.observe(grid));

  // Header scroll behavior
  const header = document.querySelector('.header');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
  });

  // Parallax effect for hero section
  const heroBackground = document.querySelector('.registration-hero .hero-background');
  const heroContent = document.querySelector('.registration-hero .hero-content');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.2;
    const contentRate = scrolled * 0.05;
    
    if (heroBackground && scrolled < window.innerHeight) {
      heroBackground.style.transform = `translateY(${rate}px)`;
    }
    
    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${contentRate}px)`;
    }
  });

  // Mouse movement parallax for floating elements
  const floatingElements = document.querySelectorAll('.floating-circle');
  
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    floatingElements.forEach((element, index) => {
      const speed = (index + 1) * 0.3;
      const x = (mouseX - 0.5) * speed * 15;
      const y = (mouseY - 0.5) * speed * 15;
      
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  // Package card hover effects
  packageCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      if (!this.classList.contains('selected')) {
        this.style.transform = 'translateY(0)';
      }
    });
  });

  // Donation button handlers
  const donateBtns = document.querySelectorAll('.donate-btn');
  donateBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 150);
      
      alert('Donation page would open here. Please contact us at TheGuruuFoundation@GMail.com to make a donation.');
    });
  });

  // Add scroll progress indicator
  const scrollProgress = document.createElement('div');
  scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-blue), var(--accent-gold));
    z-index: 9999;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(scrollProgress);

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
  });

  // Loading animation
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  });

  // Enhanced package selection with visual feedback
  function selectPackage(packageType) {
    packageCards.forEach(card => {
      if (card.dataset.package === packageType) {
        card.classList.add('selected');
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        card.classList.remove('selected');
      }
    });
  }

  // URL parameter handling for direct package selection
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedPackage = urlParams.get('package');
  if (preselectedPackage) {
    setTimeout(() => {
      selectPackage(preselectedPackage);
    }, 1000);
  }
});