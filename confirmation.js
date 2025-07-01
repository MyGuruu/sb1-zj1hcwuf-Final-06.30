// Confirmation Page JavaScript
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

  // Get URL parameters for registration details
  const urlParams = new URLSearchParams(window.location.search);
  const registrationId = urlParams.get('registration');
  
  // Initialize page with registration data
  initializeConfirmationData(registrationId);
  
  function initializeConfirmationData(regId) {
    // In a real implementation, you would fetch this data from your backend
    // For now, we'll use sample data
    
    const registrationData = {
      id: regId || 'TGF2025-001',
      package: 'Single Player',
      amount: '$180.00',
      status: 'Confirmed',
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    };
    
    // Update the page with registration data
    document.getElementById('registration-id').textContent = `#${registrationData.id}`;
    document.getElementById('package-name').textContent = registrationData.package;
    document.getElementById('amount-paid').textContent = registrationData.amount;
    document.getElementById('payment-status').textContent = registrationData.status;
    document.getElementById('registration-date').textContent = registrationData.date;
  }

  // Social sharing functions
  window.shareOnFacebook = function() {
    const url = encodeURIComponent(window.location.origin);
    const text = encodeURIComponent("I just registered for the Igniting Greatness Golf Tournament! Join me on September 5, 2025 for a day of golf, purpose, and making a difference. #IgnitingGreatness #GuruuFoundation");
    
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank', 'width=600,height=400');
  };
  
  window.shareOnTwitter = function() {
    const url = encodeURIComponent(window.location.origin);
    const text = encodeURIComponent("Just registered for the Igniting Greatness Golf Tournament! Join me Sept 5, 2025 for golf with purpose 🏌️‍♂️ #IgnitingGreatness #GuruuFoundation");
    
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
  };
  
  window.shareOnLinkedIn = function() {
    const url = encodeURIComponent(window.location.origin);
    const title = encodeURIComponent("Igniting Greatness Golf Tournament");
    const summary = encodeURIComponent("I just registered for this incredible golf tournament that combines sport with purpose. Join me on September 5, 2025 for a day of golf, networking, and making a difference through mentorship.");
    
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`, '_blank', 'width=600,height=400');
  };
  
  window.shareViaEmail = function() {
    const subject = encodeURIComponent("Join me at the Igniting Greatness Golf Tournament!");
    const body = encodeURIComponent(`Hi there!\n\nI just registered for the Igniting Greatness Golf Tournament on September 5, 2025, and I'd love for you to join me!\n\nThis isn't just any golf tournament - it's a day where sport meets purpose. Every swing supports The Guruu Foundation's mission to provide mentorship and leadership development for young people.\n\nThe tournament is at Glen Annie Golf Club in Santa Barbara, CA, and includes:\n• 18 holes of golf\n• Lunch and snacks\n• Awards banquet\n• Networking with amazing people\n• The chance to make a real difference\n\nYou can register at: ${window.location.origin}/registration.html\n\nHope to see you there!\n\nBest regards`);
    
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // Enhanced intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        
        // Staggered animations for step cards
        if (entry.target.classList.contains('next-steps')) {
          const cards = entry.target.querySelectorAll('.step-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.animation = `fadeInUp 0.6s ease-out forwards`;
            }, index * 150);
          });
        }
        
        // Staggered animations for share buttons
        if (entry.target.classList.contains('share-buttons')) {
          const buttons = entry.target.querySelectorAll('.share-btn');
          buttons.forEach((button, index) => {
            setTimeout(() => {
              button.style.animation = `fadeInUp 0.6s ease-out forwards`;
            }, index * 100);
          });
        }
      }
    });
  }, observerOptions);

  // Observe sections for animations
  const sections = document.querySelectorAll('.section, .next-steps, .share-buttons');
  sections.forEach(section => observer.observe(section));

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
  const heroBackground = document.querySelector('.confirmation-hero .hero-background');
  const heroContent = document.querySelector('.confirmation-hero .hero-content');
  
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

  // Button click animations
  const buttons = document.querySelectorAll('.share-btn, .invite-btn, .contact-item');
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
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
    background: linear-gradient(90deg, var(--success), var(--accent-gold));
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

  // Confetti animation on page load (optional enhancement)
  function createConfetti() {
    const colors = ['#f59e0b', '#2563eb', '#10b981', '#ef4444', '#8b5cf6'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        top: -10px;
        left: ${Math.random() * 100}vw;
        z-index: 9999;
        pointer-events: none;
        border-radius: 50%;
        animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
      `;
      
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 5000);
    }
  }
  
  // Add confetti CSS animation
  const confettiStyle = document.createElement('style');
  confettiStyle.textContent = `
    @keyframes confettiFall {
      0% {
        transform: translateY(-10px) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(confettiStyle);
  
  // Trigger confetti after a short delay
  setTimeout(createConfetti, 1000);

  // Auto-scroll to details after hero animation
  setTimeout(() => {
    const detailsSection = document.querySelector('.confirmation-details');
    if (detailsSection) {
      detailsSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }, 3000);
});