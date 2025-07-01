// Sponsorship Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Logo click navigation
  const logo = document.querySelector('.logo-wordmark');
  if (logo) {
    logo.style.cursor = 'pointer';
    
    logo.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
      
      // Navigate to home page
      window.location.href = 'index.html';
    });
    
    // Add hover effect
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

  // Accordion functionality for sponsorship cards
  const sponsorshipCards = document.querySelectorAll('.sponsorship-card');
  sponsorshipCards.forEach(card => {
    const header = card.querySelector('.card-header');
    const content = card.querySelector('.card-content');
    const toggleContainer = card.querySelector('.toggle-container');
    
    header.addEventListener('click', function(e) {
      // Don't trigger accordion if clicking on the quick select button
      if (e.target.closest('.quick-select-btn')) {
        return;
      }
      
      // Check if this card is already active
      const isActive = card.classList.contains('active');
      
      // Close all other cards
      sponsorshipCards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.classList.remove('active');
        }
      });
      
      // Toggle current card
      card.classList.toggle('active');
      
      // Scroll to card if it was just opened
      if (!isActive) {
        setTimeout(() => {
          card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    });
    
    // Add hover animation to toggle container
    if (toggleContainer) {
      toggleContainer.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
      });
      
      toggleContainer.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
      });
    }
  });

  // Sponsorship button handlers - REDIRECT TO CHECKOUT
  const sponsorshipBtns = document.querySelectorAll('.sponsorship-btn, .quick-select-btn');
  sponsorshipBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation(); // Prevent triggering the accordion
      
      const packageType = this.dataset.package;
      
      // Add click animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
      
      // Redirect to checkout with sponsorship package parameter
      window.location.href = `checkout.html?package=${packageType}&type=sponsorship`;
    });
  });

  // Support card click handlers - REDIRECT TO CHECKOUT
  const supportCards = document.querySelectorAll('.support-card');
  supportCards.forEach(card => {
    card.addEventListener('click', function() {
      const title = this.querySelector('h4').textContent;
      
      // Add click animation
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
      
      // Map support types to package types
      let packageType = 'custom';
      switch(title) {
        case 'Hole Sponsorships':
          packageType = 'hole-sponsorship';
          break;
        case 'Raffle & Auction Prizes':
          packageType = 'raffle-auction';
          break;
        case 'Branded Giveaways':
          packageType = 'branded-giveaways';
          break;
        case 'Underwrite a Foursome':
          packageType = 'foursome-sponsorship';
          break;
        case 'Cash Contributions':
          packageType = 'cash-contribution';
          break;
        case 'In-Kind Donations':
          packageType = 'in-kind-donation';
          break;
      }
      
      // Redirect to checkout with support package parameter
      window.location.href = `checkout.html?package=${packageType}&type=support`;
    });
    
    // Add hover effect
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
      this.style.transition = 'transform 0.2s ease';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
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
        
        // Staggered animations for benefit cards
        if (entry.target.classList.contains('partner-benefits')) {
          const cards = entry.target.querySelectorAll('.benefit-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.animation = `fadeInUp 0.6s ease-out forwards`;
            }, index * 150);
          });
        }
        
        // Staggered animations for support cards
        if (entry.target.classList.contains('support-grid')) {
          const cards = entry.target.querySelectorAll('.support-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.animation = `fadeInUp 0.6s ease-out forwards`;
            }, index * 100);
          });
        }
        
        // Staggered animations for step cards
        if (entry.target.classList.contains('steps-grid')) {
          const cards = entry.target.querySelectorAll('.step-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.animation = `fadeInUp 0.6s ease-out forwards`;
            }, index * 200);
          });
        }
        
        // Staggered animations for sponsorship cards
        if (entry.target.classList.contains('sponsorship-cards-container')) {
          const cards = entry.target.querySelectorAll('.sponsorship-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.animation = `fadeInUp 0.6s ease-out forwards`;
            }, index * 150);
          });
        }
      }
    });
  }, observerOptions);

  // Observe sections for animations
  const sections = document.querySelectorAll('.section');
  const grids = document.querySelectorAll('.partner-benefits, .support-grid, .steps-grid, .sponsorship-cards-container');
  
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
  const heroBackground = document.querySelector('.sponsorship-hero .hero-background');
  const heroContent = document.querySelector('.sponsorship-hero .hero-content');
  
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

  // Contact button handlers
  const contactBtns = document.querySelectorAll('.contact-btn');
  contactBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Add click animation
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btn.style.transform = '';
      }, 150);
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

  // Deep linking functionality for sponsor sections
  function handleDeepLinks() {
    const hash = window.location.hash;
    const deepLinkMap = {
      '#hole-sponsorships': 'hole-sponsorships',
      '#raffle-auction': 'raffle-auction',
      '#branded-giveaways': 'branded-giveaways',
      '#foursome-sponsorship': 'foursome-sponsorship',
      '#cash-contributions': 'cash-contributions'
    };
    
    if (hash && deepLinkMap[hash]) {
      const targetId = deepLinkMap[hash];
      
      // Scroll to additional sponsorships section first
      const sponsorshipsSection = document.querySelector('.additional-sponsorships');
      if (sponsorshipsSection) {
        sponsorshipsSection.scrollIntoView({ behavior: 'smooth' });
        
        // Highlight the relevant support card after scrolling
        setTimeout(() => {
          const targetCard = document.getElementById(targetId);
          if (targetCard) {
            targetCard.classList.add('highlighted');
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Remove highlight after a few seconds
            setTimeout(() => {
              targetCard.classList.remove('highlighted');
            }, 3000);
          }
        }, 1000);
      }
    }
  }

  // Handle deep links on page load
  handleDeepLinks();
  
  // Handle deep links on hash change
  window.addEventListener('hashchange', handleDeepLinks);
});