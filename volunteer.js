// Volunteer Page JavaScript
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

  // Volunteer form submission
  const volunteerForm = document.getElementById('volunteer-form');
  if (volunteerForm) {
    volunteerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Basic validation
      if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.preferredPosition) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Show loading state
      const submitBtn = this.querySelector('.submit-btn');
      const originalText = submitBtn.querySelector('span').textContent;
      submitBtn.querySelector('span').textContent = 'Submitting...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual endpoint)
      setTimeout(() => {
        alert(`Thank you, ${data.firstName}! Your volunteer application has been submitted.\n\nWe'll contact you soon at ${data.email} with more details about your preferred position: ${getPositionName(data.preferredPosition)}.\n\nQuestions? Contact us at Volunteer@TheGuruuFoundation.com or (805) 896-8268.`);
        
        // Reset form
        this.reset();
        submitBtn.querySelector('span').textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
  
  // Helper function to get readable position names
  function getPositionName(value) {
    const positionMap = {
      'sign-in-ambassador': 'Sign-In Ambassador',
      'course-setup-member': 'Course Setup Team Member',
      'course-cleanup-member': 'Course Cleanup Team Member',
      'closest-pin-judge': 'Closest to the Pin Judge',
      'longest-drive-judge': 'Longest Drive Judge',
      'straightest-drive-judge': 'Straightest Drive Judge',
      'speed-hole-monitor': 'Speed Hole Monitor',
      'closest-prize-judge': 'Closest to the Prize Judge',
      'hole-in-one-witness': 'Hole in One Witness',
      'hole-fortune-monitor': 'Hole of Fortune Monitor',
      'marshmallow-contest': 'Marshmallow Driving Contest',
      'margarita-server': 'Margarita Booth Server',
      'putting-ambassador': 'Putting Contest Ambassador',
      'range-ambassador': 'Range Ambassador',
      'setup-member': 'Setup Team Member',
      'teardown-member': 'After Event Team Member',
      'raffle-presenter': 'Raffle Presenter',
      'prize-distribution': 'Prize Distribution Ambassador',
      'auction-ambassador': 'Auction Team Ambassador',
      'assistant-photographer': 'Assistant Photographer',
      'musician': 'Sponsoring Musician',
      'band-member': 'Band Member',
      'flexible': 'Flexible - Place me where needed most'
    };
    
    return positionMap[value] || value;
  }

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
        if (entry.target.classList.contains('benefits-grid')) {
          const cards = entry.target.querySelectorAll('.benefit-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.animation = `fadeInUp 0.6s ease-out forwards`;
            }, index * 150);
          });
        }
        
        // Staggered animations for volunteer categories
        if (entry.target.classList.contains('volunteer-category')) {
          entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
        }
      }
    });
  }, observerOptions);

  // Observe sections for animations
  const sections = document.querySelectorAll('.section');
  const grids = document.querySelectorAll('.benefits-grid');
  const categories = document.querySelectorAll('.volunteer-category');
  
  sections.forEach(section => observer.observe(section));
  grids.forEach(grid => observer.observe(grid));
  categories.forEach(category => observer.observe(category));

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
  const heroBackground = document.querySelector('.volunteer-hero .hero-background');
  const heroContent = document.querySelector('.volunteer-hero .hero-content');
  
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

  // Position card hover effects
  const positionCards = document.querySelectorAll('.position-card:not(.filled):not(.sponsored)');
  positionCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
      this.style.boxShadow = 'var(--shadow-lg)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = 'var(--shadow-md)';
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

  // Mobile number checkbox handler
  const isMobileCheckbox = document.getElementById('isMobile');
  if (isMobileCheckbox) {
    isMobileCheckbox.addEventListener('change', function() {
      // Could add SMS consent notice here if needed
      console.log('Mobile number checkbox changed:', this.checked);
    });
  }

  // Form field enhancements
  const formInputs = document.querySelectorAll('input, select, textarea');
  formInputs.forEach(input => {
    // Add focus/blur effects
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
      if (this.value) {
        this.parentElement.classList.add('filled');
      } else {
        this.parentElement.classList.remove('filled');
      }
    });
    
    // Check if already filled on page load
    if (input.value) {
      input.parentElement.classList.add('filled');
    }
  });

  // Select position button functionality
  const selectButtons = document.querySelectorAll('.select-position-btn');
  selectButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (this.closest('.position-card').classList.contains('filled')) {
        e.preventDefault();
        return;
      }
      
      // Get position value
      const positionName = this.getAttribute('data-position');
      
      // Scroll to application form
      const applicationSection = document.querySelector('.volunteer-application');
      if (applicationSection) {
        applicationSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Pre-select the position in the dropdown
        setTimeout(() => {
          const select = document.getElementById('preferredPosition');
          if (select && positionName) {
            select.value = positionName;
            // Trigger change event to update any dependent fields
            select.dispatchEvent(new Event('change'));
          }
        }, 800);
      }
    });
  });
});

// Add CSS for form enhancements
const style = document.createElement('style');
style.textContent = `
  .form-group.focused input,
  .form-group.focused select,
  .form-group.focused textarea {
    border-color: var(--primary-blue);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
  }
  
  .form-group.filled label {
    color: var(--primary-blue);
  }
  
  .position-card:not(.filled):not(.sponsored) {
    cursor: pointer;
  }
  
  .position-card:not(.filled):not(.sponsored):hover h4 {
    color: var(--primary-blue);
  }
`;
document.head.appendChild(style);