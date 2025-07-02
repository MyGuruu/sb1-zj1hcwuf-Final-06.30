// Enhanced JavaScript for visionary experience
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  const links = document.querySelectorAll('a[href^="#"]');
  const navLinks = document.querySelector('.nav-links');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      
      // Check if targetId is just '#' or empty - if so, return early
      if (targetId === '#' || targetId.length <= 1) {
        return;
      }
      
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Special handling for the About section to scroll to the foundation message
        if (targetId === '#about') {
          const foundationMessage = document.querySelector('.foundation-message');
          if (foundationMessage) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const yOffset = -headerHeight - 20; // Additional offset to show the heading properly
            const y = foundationMessage.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            window.scrollTo({
              top: y,
              behavior: 'smooth'
            });
          } else {
            targetSection.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        } 
        // Special handling for the Impact section to ensure the heading is visible
        else if (targetId === '#why-matters') {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const yOffset = -headerHeight - 20; // Additional offset to show the heading properly
          const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
          
          // Update active navigation link
          updateActiveNavLink('#why-matters');
        } else {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Function to update active navigation link
  function updateActiveNavLink(targetId) {
    // Remove current class from all nav links
    document.querySelectorAll('.nav-links a').forEach(navLink => {
      navLink.classList.remove('nav-current');
    });
    
    // Add current class to the matching link
    const matchingLink = document.querySelector(`.nav-links a[href="${targetId}"]`);
    if (matchingLink) {
      matchingLink.classList.add('nav-current');
    }
  }

  // Handle sponsor links to go to the top of the page
  const sponsorLinks = document.querySelectorAll('a[href="sponsorship.html#sponsorship-packages"], a[href="sponsorship.html"]');
  sponsorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Navigate to the sponsorship page without the hash
      window.location.href = 'sponsorship.html';
    });
  });

  // Handle About links from other pages
  const aboutLinks = document.querySelectorAll('a[href="index.html#about"]');
  aboutLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Navigate to home page with the hash
      window.location.href = 'index.html#about';
      
      // If we're already on the home page, scroll to the section
      if (window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname.endsWith('/')) {
        setTimeout(() => {
          const foundationMessage = document.querySelector('.foundation-message');
          if (foundationMessage) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const yOffset = -headerHeight - 20;
            const y = foundationMessage.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            window.scrollTo({
              top: y,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    });
  });

  // Handle Impact links from other pages
  const impactLinks = document.querySelectorAll('a[href="index.html#why-matters"]');
  impactLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Navigate to home page with the hash
      window.location.href = 'index.html#why-matters';
      
      // If we're already on the home page, scroll to the section
      if (window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname.endsWith('/')) {
        setTimeout(() => {
          const targetSection = document.querySelector('#why-matters');
          if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const yOffset = -headerHeight - 20;
            const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
            
            window.scrollTo({
              top: y,
              behavior: 'smooth'
            });
            
            // Update active navigation link
            updateActiveNavLink('#why-matters');
          }
        }, 100);
      }
    });
  });

  // Email form submission
  const emailForm = document.getElementById('email-form');
  if (emailForm) {
    emailForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('email').value;
      
      // Here you would typically send the email to your backend
      alert(`Thank you for signing up! We'll send updates to ${email}`);
      
      // Reset form
      this.reset();
    });
  }

  // Enhanced intersection observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        
        // Add staggered animation for cards
        if (entry.target.classList.contains('impact-grid') || 
            entry.target.classList.contains('involvement-grid') ||
            entry.target.classList.contains('registration-options')) {
          const cards = entry.target.querySelectorAll('.impact-card, .involvement-card, .registration-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.animation = `fadeInUp 0.6s ease-out forwards`;
            }, index * 100);
          });
        }
      }
    });
  }, observerOptions);

  // Observe all sections and special elements
  const sections = document.querySelectorAll('.section');
  const grids = document.querySelectorAll('.impact-grid, .involvement-grid, .registration-options');
  
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
  const heroBackground = document.querySelector('.hero-background');
  const heroContent = document.querySelector('.hero-content');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    const contentRate = scrolled * 0.1;
    
    if (heroBackground && scrolled < window.innerHeight) {
      heroBackground.style.transform = `translateY(${rate}px)`;
    }
    
    if (heroContent && scrolled < window.innerHeight) {
      heroContent.style.transform = `translateY(${contentRate}px)`;
    }
  });

  // Add mouse movement parallax for floating elements
  const floatingElements = document.querySelectorAll('.floating-circle');
  
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    floatingElements.forEach((element, index) => {
      const speed = (index + 1) * 0.5;
      const x = (mouseX - 0.5) * speed * 20;
      const y = (mouseY - 0.5) * speed * 20;
      
      element.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  // Add typing effect to hero title (optional enhancement)
  const titleLines = document.querySelectorAll('.title-line');
  titleLines.forEach((line, index) => {
    line.style.animationDelay = `${index * 0.3}s`;
  });

  // Add scroll progress indicator
  const scrollProgress = document.createElement('div');
  scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #2563eb, #f59e0b);
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

  // Add loading animation
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
    
    // Check if we need to scroll to a specific section based on hash
    if (window.location.hash === '#why-matters') {
      setTimeout(() => {
        const targetSection = document.querySelector('#why-matters');
        if (targetSection) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const yOffset = -headerHeight - 20;
          const y = targetSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
          
          // Update active navigation link
          updateActiveNavLink('#why-matters');
        }
      }, 300);
    } else if (window.location.hash === '#about') {
      setTimeout(() => {
        const foundationMessage = document.querySelector('.foundation-message');
        if (foundationMessage) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const yOffset = -headerHeight - 20;
          const y = foundationMessage.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  });

  // Support item click handlers for deep linking to sponsorship page
  const supportItems = document.querySelectorAll('.support-item');
  supportItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function() {
      const title = this.querySelector('h4').textContent;
      
      // Add click animation
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
      
      // Map support types to package types
      let targetHash = '';
      switch(title) {
        case 'Hole Sponsorships':
          targetHash = '#hole-sponsorships';
          break;
        case 'Gifts, Prizes & Unforgettable Finds':
          targetHash = '#raffle-auction';
          break;
        case 'Swag & Surprises':
          targetHash = '#branded-giveaways';
          break;
        case 'Underwrite a Foursome':
          targetHash = '#foursome-sponsorship';
          break;
        case 'Contribute Your Way':
          targetHash = '#cash-contributions';
          break;
        default:
          targetHash = '#sponsorship-packages';
      }
      
      // Redirect to checkout with support package parameter
      window.location.href = `sponsorship.html${targetHash}`;
    });
    
    // Add hover effect
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.transition = 'transform 0.2s ease';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Enhanced "Bring a Friend" invite functionality
  const inviteLinks = document.querySelectorAll('a[href="#"]:not(.donate-btn), a.invite-link, a.invite-friend');
  
  inviteLinks.forEach(link => {
    // Check if this is likely an invite link based on context
    const linkText = link.textContent.toLowerCase();
    const isInviteLink = linkText.includes('invite') || linkText.includes('bring') || 
                        link.closest('.involvement-card')?.querySelector('h3')?.textContent === 'Bring a Friend' ||
                        link.classList.contains('invite-link') || link.classList.contains('invite-friend');
    
    if (isInviteLink) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = '';
        }, 150);
        
        // Open email sharing functionality
        openInviteModal();
      });
    }
  });

  // Create and show sharing modal
  function openInviteModal() {
    // Store original body overflow state
    const originalBodyOverflow = document.body.style.overflow;
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'invite-modal-overlay';
    modalOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(5px);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'invite-modal-content';
    modalContent.style.cssText = `
      background: white;
      border-radius: 20px;
      padding: 2rem;
      max-width: 500px;
      width: 90%;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
      transform: translateY(20px);
      transition: transform 0.3s ease;
      position: relative;
    `;
    
    modalContent.innerHTML = `
      <button class="close-modal" style="
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #64748b;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
      " onmouseover="this.style.background='#f1f5f9'; this.style.color='#334155';" onmouseout="this.style.background='none'; this.style.color='#64748b';">×</button>
      
      <div style="text-align: center; margin-bottom: 2rem;">
        <div style="
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #2563eb, #f59e0b);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-size: 2rem;
        ">👥</div>
        <h2 style="color: #0f172a; margin-bottom: 0.5rem; font-size: 1.75rem; font-weight: 700;">Invite a Friend</h2>
        <p style="color: #64748b; margin: 0; font-size: 1.125rem;">Share this incredible opportunity with someone special</p>
      </div>
      
      <div style="margin-bottom: 1.5rem;">
        <h3 style="color: #334155; margin-bottom: 1rem; font-size: 1.125rem; font-weight: 600;">Choose how to share:</h3>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
          <button id="email-invite" style="
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: white;
            border: none;
            padding: 1rem;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(37, 99, 235, 0.4)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
            <span style="font-size: 1.5rem;">📧</span>
            <span>Email</span>
          </button>
          
          <button id="copy-link" style="
            background: linear-gradient(135deg, #f59e0b, #d97706);
            color: white;
            border: none;
            padding: 1rem;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(245, 158, 11, 0.4)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
            <span style="font-size: 1.5rem;">🔗</span>
            <span>Copy Link</span>
          </button>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem;">
          <button id="share-facebook" style="
            background: #1877f2;
            color: white;
            border: none;
            padding: 0.75rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.875rem;
          " onmouseover="this.style.transform='translateY(-2px)';" onmouseout="this.style.transform='translateY(0)';">
            📘 Facebook
          </button>
          
          <button id="share-twitter" style="
            background: #1da1f2;
            color: white;
            border: none;
            padding: 0.75rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.875rem;
          " onmouseover="this.style.transform='translateY(-2px)';" onmouseout="this.style.transform='translateY(0)';">
            🐦 Twitter
          </button>
          
          <button id="share-linkedin" style="
            background: #0077b5;
            color: white;
            border: none;
            padding: 0.75rem;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.875rem;
          " onmouseover="this.style.transform='translateY(-2px)';" onmouseout="this.style.transform='translateY(0)';">
            💼 LinkedIn
          </button>
        </div>
      </div>
      
      <div style="
        background: #f8fafc;
        padding: 1rem;
        border-radius: 12px;
        border: 1px solid #e2e8f0;
        text-align: center;
      ">
        <p style="margin: 0; color: #64748b; font-size: 0.875rem; line-height: 1.5;">
          <strong style="color: #334155;">Why invite them?</strong><br>
          Help someone discover an incredible day of golf, purpose, and community impact at the Igniting Greatness Golf Tournament.
        </p>
      </div>
    `;
    
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Animate in
    setTimeout(() => {
      modalOverlay.style.opacity = '1';
      modalContent.style.transform = 'translateY(0)';
    }, 10);
    
    // Close modal function with proper cleanup
    function closeModal() {
      modalOverlay.style.opacity = '0';
      modalContent.style.transform = 'translateY(20px)';
      setTimeout(() => {
        // Restore original body overflow state
        document.body.style.overflow = originalBodyOverflow;
        // Remove modal from DOM
        if (document.body.contains(modalOverlay)) {
          document.body.removeChild(modalOverlay);
        }
      }, 300);
    }
    
    // Event listeners
    modalContent.querySelector('.close-modal').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
    
    // Escape key to close
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', escapeHandler);
      }
    };
    document.addEventListener('keydown', escapeHandler);
    
    // Email invite
    modalContent.querySelector('#email-invite').addEventListener('click', () => {
      const subject = encodeURIComponent("Join me at the Igniting Greatness Golf Tournament!");
      const body = encodeURIComponent(`Hi there!

I wanted to share something special with you - the Igniting Greatness Golf Tournament on September 5, 2025!

This isn't just any golf tournament. It's a day where sport meets purpose, bringing together amazing people to support The Guruu Foundation's mission of mentorship and leadership development for young people.

Here's what makes it incredible:
🏌️ Beautiful Glen Annie Golf Club in Santa Barbara
🎯 Tournament with prizes and contests
🍽️ Fantastic banquet and networking
💫 Supporting a meaningful cause
🤝 Meeting like-minded people who care about making a difference

Whether you're a golfer or just want to support the cause, there are options for everyone - from playing in the tournament to joining us for the banquet celebration.

Check it out and register here: ${window.location.origin}

Hope to see you there!

Best regards`);
      
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
      closeModal();
    });
    
    // Copy link
    modalContent.querySelector('#copy-link').addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.origin);
        
        // Show success feedback
        const button = modalContent.querySelector('#copy-link');
        const originalHTML = button.innerHTML;
        button.innerHTML = '<span style="font-size: 1.5rem;">✅</span><span>Copied!</span>';
        button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
          button.innerHTML = originalHTML;
          button.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
        }, 2000);
        
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = window.location.origin;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        alert('Link copied to clipboard!');
      }
    });
    
    // Social sharing
    modalContent.querySelector('#share-facebook').addEventListener('click', () => {
      const url = encodeURIComponent(window.location.origin);
      const text = encodeURIComponent("Join me at the Igniting Greatness Golf Tournament - where golf meets purpose! September 5, 2025 at Glen Annie Golf Club. #IgnitingGreatness #GuruuFoundation");
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank', 'width=600,height=400');
      closeModal();
    });
    
    modalContent.querySelector('#share-twitter').addEventListener('click', () => {
      const url = encodeURIComponent(window.location.origin);
      const text = encodeURIComponent("Join me at the Igniting Greatness Golf Tournament! 🏌️‍♂️ Sept 5, 2025 - where golf meets purpose. #IgnitingGreatness #GuruuFoundation");
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
      closeModal();
    });
    
    modalContent.querySelector('#share-linkedin').addEventListener('click', () => {
      const url = encodeURIComponent(window.location.origin);
      const title = encodeURIComponent("Igniting Greatness Golf Tournament");
      const summary = encodeURIComponent("Join me at this incredible golf tournament that combines sport with purpose. September 5, 2025 at Glen Annie Golf Club - supporting The Guruu Foundation's mission of mentorship and leadership development.");
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`, '_blank', 'width=600,height=400');
      closeModal();
    });
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }
});

// Add cursor trail effect (optional)
const cursor = document.createElement('div');
cursor.style.cssText = `
  position: fixed;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, rgba(245, 158, 11, 0.3), transparent);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9998;
  transition: transform 0.1s ease;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX - 10 + 'px';
  cursor.style.top = e.clientY - 10 + 'px';
});

// Hide cursor trail on mobile
if (window.innerWidth <= 768) {
  cursor.style.display = 'none';
}
