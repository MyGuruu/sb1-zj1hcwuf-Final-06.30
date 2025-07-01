// Tournament Waiver JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Print waiver functionality
  const printWaiverBtn = document.getElementById('print-waiver-btn');
  if (printWaiverBtn) {
    printWaiverBtn.addEventListener('click', function() {
      window.print();
    });
  }

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
});