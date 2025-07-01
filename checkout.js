// Checkout Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Check URL parameters to determine if this is a sponsorship
  const urlParams = new URLSearchParams(window.location.search);
  const packageType = urlParams.get('type');
  
  // If this is a sponsorship, redirect to the sponsorship checkout
  if (packageType === 'sponsorship' || packageType === 'support') {
    window.location.href = `sponsorship-checkout.html${window.location.search}`;
    return;
  }
  
  // Initialize Stripe
  const stripe = Stripe('pk_test_YOUR_PUBLISHABLE_KEY_HERE'); // Replace with actual key
  const elements = stripe.elements();
  
  // Create card element
  const cardElement = elements.create('card', {
    style: {
      base: {
        fontSize: '16px',
        color: '#334155',
        fontFamily: 'Inter, sans-serif',
        '::placeholder': {
          color: '#94a3b8',
        },
      },
    },
  });
  
  cardElement.mount('#card-element');
  
  // Handle card errors
  cardElement.on('change', function(event) {
    const displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
      displayError.classList.add('show');
    } else {
      displayError.textContent = '';
      displayError.classList.remove('show');
    }
  });

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

  // Get URL parameters for package pre-selection
  const preselectedPackage = urlParams.get('package');
  
  // Package data
  const packages = {
    single: {
      name: 'Single Player',
      description: 'Tournament entry with lunch, gifts, and banquet access',
      price: 180,
      icon: '🏌️‍♂️',
      includesGolf: true
    },
    super: {
      name: 'Super Guruu',
      description: 'Premium experience with VIP seating and bonus perks',
      price: 250,
      icon: '🥇',
      includesGolf: true
    },
    corporate: {
      name: 'Corporate Team',
      description: 'Complete foursome with VIP banquet table for eight',
      price: 1200,
      icon: '👔',
      includesGolf: true
    },
    banquet: {
      name: 'Banquet Only',
      description: 'Evening celebration with fairway BBQ dinner',
      price: 45,
      icon: '🍽',
      includesGolf: false
    }
  };
  
  let currentPackage = preselectedPackage || 'single';
  let additionalGuests = 0;
  
  // Initialize package selection
  updatePackageDisplay();
  updateOrderSummary();
  toggleGolfSection();
  
  // Package selection functionality
  const changePackageBtn = document.getElementById('change-package');
  const packageOptions = document.getElementById('package-options');
  const packageOptionElements = document.querySelectorAll('.package-option');
  
  changePackageBtn.addEventListener('click', function() {
    const isVisible = packageOptions.style.display !== 'none';
    packageOptions.style.display = isVisible ? 'none' : 'block';
    this.textContent = isVisible ? 'Change Package' : 'Cancel';
  });
  
  packageOptionElements.forEach(option => {
    option.addEventListener('click', function() {
      // Remove previous selection
      packageOptionElements.forEach(opt => opt.classList.remove('selected'));
      
      // Add selection to clicked option
      this.classList.add('selected');
      
      // Update current package
      currentPackage = this.dataset.package;
      
      // Update display
      updatePackageDisplay();
      updateOrderSummary();
      toggleGolfSection();
      
      // Hide options
      packageOptions.style.display = 'none';
      changePackageBtn.textContent = 'Change Package';
    });
  });

  function updatePackageDisplay() {
    const pkg = packages[currentPackage];
    document.getElementById('package-name').textContent = pkg.name;
    document.getElementById('package-description').textContent = pkg.description;
    document.getElementById('package-amount').textContent = `$${pkg.price}`;
    document.querySelector('.package-icon').textContent = pkg.icon;
  }
  
  function toggleGolfSection() {
    const golfSection = document.getElementById('golf-info');
    const pkg = packages[currentPackage];
    
    if (pkg.includesGolf) {
      golfSection.style.display = 'block';
      
      // Add waiver checkbox if it doesn't exist
      if (!document.getElementById('waiver-checkbox-container')) {
        addWaiverCheckbox();
      }
    } else {
      golfSection.style.display = 'none';
      
      // Remove waiver checkbox if it exists
      const waiverContainer = document.getElementById('waiver-checkbox-container');
      if (waiverContainer) {
        waiverContainer.remove();
      }
    }
  }
  
  // Add waiver checkbox to the form
  function addWaiverCheckbox() {
    const termsSection = document.querySelector('.terms-section');
    const termsGrid = termsSection.querySelector('.terms-grid');
    
    // Create waiver checkbox container
    const waiverContainer = document.createElement('div');
    waiverContainer.id = 'waiver-checkbox-container';
    waiverContainer.className = 'terms-item waiver-checkbox-container';
    
    waiverContainer.innerHTML = `
      <div class="checkbox-group waiver-checkbox-group">
        <input type="checkbox" id="waiverAccepted" name="waiverAccepted" required>
        <label for="waiverAccepted">
          <strong>Tournament Waiver:</strong> I have read and agree to the <span class="waiver-link" id="open-waiver-modal">Tournament Waiver</span>. I understand that this is a legally binding agreement that must be accepted by all golf participants.
        </label>
      </div>
      <div id="waiver-error-message" class="waiver-error-message">You must read and accept the Tournament Waiver to continue.</div>
    `;
    
    // Insert before the last item in terms grid
    termsGrid.insertBefore(waiverContainer, termsGrid.lastElementChild);
    
    // Add event listener to the waiver link
    document.getElementById('open-waiver-modal').addEventListener('click', function(e) {
      e.preventDefault();
      openWaiverModal();
    });
  }
  
  // Create and open waiver modal
  function openWaiverModal() {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'waiver-modal-overlay';
    
    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.className = 'waiver-modal-container';
    
    // Create modal header
    const modalHeader = document.createElement('div');
    modalHeader.className = 'waiver-modal-header';
    modalHeader.innerHTML = `
      <h3 class="waiver-modal-title">Tournament Waiver</h3>
      <button class="waiver-modal-close">&times;</button>
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'waiver-modal-content';
    
    // Fetch waiver content
    fetch('waiver.html')
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const waiverContent = doc.querySelector('.waiver-container').innerHTML;
        
        // Remove print button and footer from modal content
        const contentWithoutPrintAndFooter = waiverContent
          .replace(/<div class="print-waiver">[\s\S]*?<\/div>/, '')
          .replace(/<div class="waiver-footer">[\s\S]*?<\/div>/, '');
        
        modalContent.innerHTML = contentWithoutPrintAndFooter;
      })
      .catch(error => {
        modalContent.innerHTML = `
          <p>There was an error loading the waiver content. Please try again or visit <a href="waiver.html" target="_blank">the waiver page</a> directly.</p>
          <p>Error: ${error.message}</p>
        `;
      });
    
    // Create modal footer
    const modalFooter = document.createElement('div');
    modalFooter.className = 'waiver-modal-footer';
    modalFooter.innerHTML = `
      <button class="print-btn">
        <span class="print-icon">🖨️</span>
        <span>Print Waiver</span>
      </button>
      <button class="waiver-accept-btn">
        <span class="waiver-accept-icon">✓</span>
        <span>I Accept</span>
      </button>
    `;
    
    // Assemble modal
    modalContainer.appendChild(modalHeader);
    modalContainer.appendChild(modalContent);
    modalContainer.appendChild(modalFooter);
    modalOverlay.appendChild(modalContainer);
    document.body.appendChild(modalOverlay);
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
      modalOverlay.style.opacity = '1';
      modalContainer.style.transform = 'translateY(0)';
    }, 10);
    
    // Close modal function
    function closeModal() {
      modalOverlay.style.opacity = '0';
      modalContainer.style.transform = 'translateY(20px)';
      document.body.style.overflow = '';
      
      setTimeout(() => {
        document.body.removeChild(modalOverlay);
      }, 300);
    }
    
    // Event listeners
    modalHeader.querySelector('.waiver-modal-close').addEventListener('click', closeModal);
    
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
    
    // Print button
    modalFooter.querySelector('.print-btn').addEventListener('click', function() {
      // Create a new window with just the waiver content for printing
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Tournament Waiver - Igniting Greatness Golf Tournament</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                padding: 20px;
                max-width: 800px;
                margin: 0 auto;
              }
              h1 {
                text-align: center;
                margin-bottom: 20px;
              }
              h2 {
                margin-top: 20px;
                margin-bottom: 10px;
              }
              p {
                margin-bottom: 10px;
              }
              ul {
                margin: 10px 0;
                padding-left: 20px;
              }
              li {
                margin-bottom: 5px;
              }
              .signature-line {
                margin-top: 40px;
                border-top: 1px solid #000;
                padding-top: 10px;
                display: flex;
                justify-content: space-between;
              }
              .signature-field {
                flex: 1;
                margin: 0 10px;
              }
              .signature-field p {
                margin: 0;
              }
              .date {
                text-align: right;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <h1>The Guruu Foundation<br>Igniting Greatness™ Golf Tournament<br>Liability Waiver & Release</h1>
            ${modalContent.innerHTML}
            <div class="signature-line">
              <div class="signature-field">
                <p>Participant Signature</p>
              </div>
              <div class="signature-field">
                <p>Printed Name</p>
              </div>
            </div>
            <p class="date">Date: _______________________</p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
    });
    
    // Accept button
    modalFooter.querySelector('.waiver-accept-btn').addEventListener('click', function() {
      // Check the waiver checkbox
      const waiverCheckbox = document.getElementById('waiverAccepted');
      if (waiverCheckbox) {
        waiverCheckbox.checked = true;
        
        // Remove error styling if present
        const waiverContainer = document.getElementById('waiver-checkbox-container');
        if (waiverContainer) {
          waiverContainer.classList.remove('error');
        }
        
        // Hide error message if visible
        const errorMessage = document.getElementById('waiver-error-message');
        if (errorMessage) {
          errorMessage.classList.remove('show');
        }
      }
      
      closeModal();
    });
  }

  // Mobile number SMS agreement
  const isMobileCheckbox = document.getElementById('isMobile');
  const smsNotice = document.getElementById('sms-notice');
  
  isMobileCheckbox.addEventListener('change', function() {
    smsNotice.style.display = this.checked ? 'flex' : 'none';
  });

  // Handicap handling
  const handicapInput = document.getElementById('handicap');
  const unknownHandicapCheckbox = document.getElementById('unknownHandicap');
  
  unknownHandicapCheckbox.addEventListener('change', function() {
    if (this.checked) {
      handicapInput.disabled = true;
      handicapInput.value = '';
      handicapInput.style.opacity = '0.5';
    } else {
      handicapInput.disabled = false;
      handicapInput.style.opacity = '1';
    }
  });

  // Foursome preference handling
  const foursomeRadios = document.querySelectorAll('input[name="foursomePreference"]');
  const foursomeDetails = document.getElementById('foursome-details');
  
  foursomeRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      if (this.value === 'create') {
        foursomeDetails.style.display = 'block';
      } else {
        foursomeDetails.style.display = 'none';
      }
    });
  });

  // Mentor handling
  const bringingMentorCheckbox = document.getElementById('bringingMentor');
  const mentorDetails = document.querySelectorAll('.mentor-details');
  
  bringingMentorCheckbox.addEventListener('change', function() {
    mentorDetails.forEach(detail => {
      detail.style.display = this.checked ? 'block' : 'none';
    });
    
    // Make mentor name required if bringing mentor
    const mentorNameInput = document.getElementById('mentorName');
    if (this.checked) {
      mentorNameInput.required = true;
    } else {
      mentorNameInput.required = false;
      mentorNameInput.value = '';
      document.getElementById('mentorEmail').value = '';
    }
  });

  // Guest counter functionality
  const decreaseBtn = document.getElementById('decrease-guests');
  const increaseBtn = document.getElementById('increase-guests');
  const guestInput = document.getElementById('additionalGuests');
  const guestCost = document.getElementById('guest-cost');
  const guestDetails = document.getElementById('guest-details');
  const guestInputs = document.getElementById('guest-inputs');
  
  decreaseBtn.addEventListener('click', function() {
    if (additionalGuests > 0) {
      additionalGuests--;
      updateGuestDisplay();
    }
  });
  
  increaseBtn.addEventListener('click', function() {
    if (additionalGuests < 10) {
      additionalGuests++;
      updateGuestDisplay();
    }
  });
  
  function updateGuestDisplay() {
    guestInput.value = additionalGuests;
    const cost = additionalGuests * 45;
    guestCost.textContent = `Additional Cost: $${cost}`;
    
    // Update button states
    decreaseBtn.disabled = additionalGuests === 0;
    increaseBtn.disabled = additionalGuests === 10;
    
    // Show/hide guest details
    if (additionalGuests > 0) {
      guestDetails.style.display = 'block';
      updateGuestInputs();
    } else {
      guestDetails.style.display = 'none';
    }
    
    updateOrderSummary();
  }
  
  function updateGuestInputs() {
    guestInputs.innerHTML = '';
    
    for (let i = 1; i <= additionalGuests; i++) {
      const guestDiv = document.createElement('div');
      guestDiv.className = 'guest-input';
      guestDiv.innerHTML = `
        <input type="text" name="guest${i}Name" placeholder="Guest ${i} Name" required>
        <input type="email" name="guest${i}Email" placeholder="Guest ${i} Email (optional)">
      `;
      guestInputs.appendChild(guestDiv);
    }
  }

  // Payment method selection
  const paymentMethods = document.querySelectorAll('.payment-method');
  const paymentForms = document.querySelectorAll('.payment-form');
  
  paymentMethods.forEach(method => {
    method.addEventListener('click', function() {
      // Remove active class from all methods
      paymentMethods.forEach(m => m.classList.remove('active'));
      
      // Add active class to clicked method
      this.classList.add('active');
      
      // Hide all payment forms
      paymentForms.forEach(form => form.style.display = 'none');
      
      // Show selected payment form
      const selectedMethod = this.dataset.method;
      document.getElementById(`${selectedMethod}-payment`).style.display = 'block';
    });
  });

  // Order summary updates
  function updateOrderSummary() {
    const pkg = packages[currentPackage];
    const packagePrice = pkg.price;
    const guestPrice = additionalGuests * 45;
    const totalPrice = packagePrice + guestPrice;
    
    // Update package summary
    document.getElementById('summary-package').textContent = `${pkg.name} Package`;
    document.getElementById('summary-package-price').textContent = `$${packagePrice.toFixed(2)}`;
    
    // Update guest summary
    const guestSummary = document.getElementById('summary-guests');
    const guestCount = document.getElementById('summary-guest-count');
    const guestPriceElement = document.getElementById('summary-guest-price');
    
    if (additionalGuests > 0) {
      guestSummary.style.display = 'flex';
      guestCount.textContent = additionalGuests;
      guestPriceElement.textContent = `$${guestPrice.toFixed(2)}`;
    } else {
      guestSummary.style.display = 'none';
    }
    
    // Update total
    document.getElementById('summary-total').textContent = `$${totalPrice.toFixed(2)}`;
    document.getElementById('btn-amount').textContent = `$${totalPrice.toFixed(2)}`;
  }

  // Form validation
  function validateForm() {
    const form = document.getElementById('registration-form');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('error');
        isValid = false;
      } else {
        field.classList.remove('error');
        field.classList.add('success');
      }
    });
    
    // Validate email format
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
      if (field.value && !isValidEmail(field.value)) {
        field.classList.add('error');
        isValid = false;
      }
    });
    
    // Special validation for waiver checkbox if golf is included
    const pkg = packages[currentPackage];
    if (pkg.includesGolf) {
      const waiverCheckbox = document.getElementById('waiverAccepted');
      const waiverContainer = document.getElementById('waiver-checkbox-container');
      const waiverError = document.getElementById('waiver-error-message');
      
      if (!waiverCheckbox.checked) {
        waiverContainer.classList.add('error');
        waiverError.classList.add('show');
        isValid = false;
      } else {
        waiverContainer.classList.remove('error');
        waiverError.classList.remove('show');
      }
    }
    
    return isValid;
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Form submission
  const form = document.getElementById('registration-form');
  const submitBtn = document.getElementById('submit-btn');
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstError = document.querySelector('.error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    const activePaymentMethod = document.querySelector('.payment-method.active').dataset.method;
    
    if (activePaymentMethod === 'card') {
      await handleCardPayment();
    } else {
      await handleAlternativePayment(activePaymentMethod);
    }
  });
  
  async function handleCardPayment() {
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    
    try {
      // Create payment intent on your server
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: calculateTotal() * 100, // Convert to cents
          currency: 'usd',
          metadata: {
            package: currentPackage,
            additionalGuests: additionalGuests,
            // Add other form data as needed
          }
        }),
      });
      
      const { client_secret } = await response.json();
      
      // Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: document.getElementById('billingName').value,
            address: {
              postal_code: document.getElementById('billingZip').value,
            },
          },
        },
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (paymentIntent.status === 'succeeded') {
        await submitRegistration(paymentIntent.id);
      }
      
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed: ' + error.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
    }
  }
  
  async function handleAlternativePayment(method) {
    // For Zelle/Venmo, we'll submit the registration without payment processing
    // and mark it as pending payment
    await submitRegistration(null, method);
  }
  
  async function submitRegistration(paymentId, paymentMethod = 'card') {
    const formData = new FormData(form);
    
    // Add additional data
    formData.append('package', currentPackage);
    formData.append('packagePrice', packages[currentPackage].price);
    formData.append('additionalGuests', additionalGuests);
    formData.append('guestPrice', additionalGuests * 45);
    formData.append('totalAmount', calculateTotal());
    formData.append('paymentId', paymentId);
    formData.append('paymentMethod', paymentMethod);
    formData.append('paymentStatus', paymentId ? 'completed' : 'pending');
    
    // Add waiver acceptance if golf is included
    const pkg = packages[currentPackage];
    if (pkg.includesGolf) {
      formData.append('waiverAccepted', 'true');
      formData.append('waiverAcceptedDate', new Date().toISOString());
    }
    
    try {
      // Submit to your backend/GoHighLevel webhook
      const response = await fetch('/api/submit-registration', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        // Redirect to confirmation page
        window.location.href = `confirmation.html?registration=${Date.now()}`;
      } else {
        throw new Error('Registration submission failed');
      }
      
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again or contact support.');
    }
  }
  
  function calculateTotal() {
    return packages[currentPackage].price + (additionalGuests * 45);
  }

  // Auto-populate billing name from personal info
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const billingNameInput = document.getElementById('billingName');
  
  function updateBillingName() {
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    if (firstName && lastName && !billingNameInput.value) {
      billingNameInput.value = `${firstName} ${lastName}`;
    }
  }
  
  firstNameInput.addEventListener('blur', updateBillingName);
  lastNameInput.addEventListener('blur', updateBillingName);

  // Auto-populate billing ZIP from address ZIP
  const zipCodeInput = document.getElementById('zipCode');
  const billingZipInput = document.getElementById('billingZip');
  
  zipCodeInput.addEventListener('blur', function() {
    if (this.value && !billingZipInput.value) {
      billingZipInput.value = this.value;
    }
  });

  // Initialize guest display
  updateGuestDisplay();

  // Smooth scrolling for form sections
  const sectionHeaders = document.querySelectorAll('.section-header');
  sectionHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const section = this.parentElement;
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Form progress tracking
  const formSections = document.querySelectorAll('.form-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.3 });
  
  formSections.forEach(section => {
    observer.observe(section);
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

  // Enhanced "Bring a Friend" invite functionality
  setupInviteFriendLinks();

  function setupInviteFriendLinks() {
    // Find all invite links across the site
    const inviteLinks = document.querySelectorAll('a[href="#get-involved"], a.card-link:contains("Invite"), a.invite-btn, a:contains("Bring a Friend")');
    
    inviteLinks.forEach(link => {
      // Check if this is likely an invite link based on context or text
      const linkText = link.textContent.trim().toLowerCase();
      const isInviteLink = 
        linkText.includes('invite') || 
        linkText.includes('bring a friend') || 
        link.classList.contains('invite-btn') ||
        (link.closest('.involvement-card') && link.closest('.involvement-card').querySelector('h3')?.textContent.includes('Bring a Friend'));
      
      if (isInviteLink) {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Add click animation
          this.style.transform = 'scale(0.95)';
          setTimeout(() => {
            this.style.transform = '';
          }, 150);
          
          // Open sharing modal
          openShareModal();
        });
      }
    });
  }

  // Create and show sharing modal
  function openShareModal() {
    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.className = 'share-modal-container';
    modalContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(5px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'share-modal-content';
    modalContent.style.cssText = `
      background-color: white;
      border-radius: 20px;
      padding: 2rem;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
      transform: translateY(20px);
      transition: transform 0.3s ease;
      position: relative;
    `;
    
    // Modal header with icon
    const modalHeader = document.createElement('div');
    modalHeader.style.cssText = `
      text-align: center;
      margin-bottom: 2rem;
    `;
    
    const iconContainer = document.createElement('div');
    iconContainer.style.cssText = `
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #2563eb, #f59e0b);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      font-size: 2rem;
    `;
    iconContainer.textContent = '👥';
    
    const modalTitle = document.createElement('h2');
    modalTitle.style.cssText = `
      color: #0f172a;
      margin-bottom: 0.5rem;
      font-size: 1.75rem;
      font-weight: 700;
    `;
    modalTitle.textContent = 'Invite a Friend';
    
    const modalSubtitle = document.createElement('p');
    modalSubtitle.style.cssText = `
      color: #64748b;
      margin: 0;
      font-size: 1.125rem;
    `;
    modalSubtitle.textContent = 'Share this incredible opportunity with someone special';
    
    modalHeader.appendChild(iconContainer);
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(modalSubtitle);
    
    // Sharing options section
    const sharingSection = document.createElement('div');
    sharingSection.style.cssText = `
      margin-bottom: 1.5rem;
    `;
    
    const sectionTitle = document.createElement('h3');
    sectionTitle.style.cssText = `
      color: #334155;
      margin-bottom: 1rem;
      font-size: 1.125rem;
      font-weight: 600;
    `;
    sectionTitle.textContent = 'Choose how to share:';
    
    // Primary sharing options
    const primaryOptions = document.createElement('div');
    primaryOptions.style.cssText = `
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1.5rem;
    `;
    
    // Email button
    const emailButton = document.createElement('button');
    emailButton.id = 'email-invite';
    emailButton.style.cssText = `
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
    `;
    emailButton.innerHTML = `
      <span style="font-size: 1.5rem;">📧</span>
      <span>Email</span>
    `;
    emailButton.addEventListener('mouseenter', () => {
      emailButton.style.transform = 'translateY(-2px)';
      emailButton.style.boxShadow = '0 8px 25px rgba(37, 99, 235, 0.4)';
    });
    emailButton.addEventListener('mouseleave', () => {
      emailButton.style.transform = 'translateY(0)';
      emailButton.style.boxShadow = 'none';
    });
    
    // Copy link button
    const copyButton = document.createElement('button');
    copyButton.id = 'copy-link';
    copyButton.style.cssText = `
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
    `;
    copyButton.innerHTML = `
      <span style="font-size: 1.5rem;">🔗</span>
      <span>Copy Link</span>
    `;
    copyButton.addEventListener('mouseenter', () => {
      copyButton.style.transform = 'translateY(-2px)';
      copyButton.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.4)';
    });
    copyButton.addEventListener('mouseleave', () => {
      copyButton.style.transform = 'translateY(0)';
      copyButton.style.boxShadow = 'none';
    });
    
    primaryOptions.appendChild(emailButton);
    primaryOptions.appendChild(copyButton);
    
    // Social sharing options
    const socialOptions = document.createElement('div');
    socialOptions.style.cssText = `
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 0.75rem;
    `;
    
    // Facebook button
    const facebookButton = document.createElement('button');
    facebookButton.id = 'share-facebook';
    facebookButton.style.cssText = `
      background: #1877f2;
      color: white;
      border: none;
      padding: 0.75rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.875rem;
    `;
    facebookButton.textContent = '📘 Facebook';
    facebookButton.addEventListener('mouseenter', () => {
      facebookButton.style.transform = 'translateY(-2px)';
    });
    facebookButton.addEventListener('mouseleave', () => {
      facebookButton.style.transform = 'translateY(0)';
    });
    
    // Twitter button
    const twitterButton = document.createElement('button');
    twitterButton.id = 'share-twitter';
    twitterButton.style.cssText = `
      background: #1da1f2;
      color: white;
      border: none;
      padding: 0.75rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.875rem;
    `;
    twitterButton.textContent = '🐦 Twitter';
    twitterButton.addEventListener('mouseenter', () => {
      twitterButton.style.transform = 'translateY(-2px)';
    });
    twitterButton.addEventListener('mouseleave', () => {
      twitterButton.style.transform = 'translateY(0)';
    });
    
    // LinkedIn button
    const linkedinButton = document.createElement('button');
    linkedinButton.id = 'share-linkedin';
    linkedinButton.style.cssText = `
      background: #0077b5;
      color: white;
      border: none;
      padding: 0.75rem;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 0.875rem;
    `;
    linkedinButton.textContent = '💼 LinkedIn';
    linkedinButton.addEventListener('mouseenter', () => {
      linkedinButton.style.transform = 'translateY(-2px)';
    });
    linkedinButton.addEventListener('mouseleave', () => {
      linkedinButton.style.transform = 'translateY(0)';
    });
    
    socialOptions.appendChild(facebookButton);
    socialOptions.appendChild(twitterButton);
    socialOptions.appendChild(linkedinButton);
    
    sharingSection.appendChild(sectionTitle);
    sharingSection.appendChild(primaryOptions);
    sharingSection.appendChild(socialOptions);
    
    // Why invite section
    const whyInviteSection = document.createElement('div');
    whyInviteSection.style.cssText = `
      background: #f8fafc;
      padding: 1rem;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
      text-align: center;
    `;
    
    const whyInviteText = document.createElement('p');
    whyInviteText.style.cssText = `
      margin: 0;
      color: #64748b;
      font-size: 0.875rem;
      line-height: 1.5;
    `;
    whyInviteText.innerHTML = `
      <strong style="color: #334155;">Why invite them?</strong><br>
      Help someone discover an incredible day of golf, purpose, and community impact at the Igniting Greatness Golf Tournament.
    `;
    
    whyInviteSection.appendChild(whyInviteText);
    
    // Close button
    const closeButton = document.createElement('button');
    closeButton.className = 'close-modal';
    closeButton.style.cssText = `
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
    `;
    closeButton.textContent = '×';
    closeButton.addEventListener('mouseenter', () => {
      closeButton.style.background = '#f1f5f9';
      closeButton.style.color = '#334155';
    });
    closeButton.addEventListener('mouseleave', () => {
      closeButton.style.background = 'none';
      closeButton.style.color = '#64748b';
    });
    
    // Assemble modal
    modalContent.appendChild(closeButton);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(sharingSection);
    modalContent.appendChild(whyInviteSection);
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);
    
    // Animate in
    setTimeout(() => {
      modalContainer.style.opacity = '1';
      modalContent.style.transform = 'translateY(0)';
    }, 10);
    
    // Close modal function
    function closeModal() {
      modalContainer.style.opacity = '0';
      modalContent.style.transform = 'translateY(20px)';
      setTimeout(() => {
        document.body.removeChild(modalContainer);
      }, 300);
    }
    
    // Event listeners
    closeButton.addEventListener('click', closeModal);
    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) closeModal();
    });
    
    // Email invite
    emailButton.addEventListener('click', () => {
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
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.origin);
        
        // Show success feedback
        copyButton.innerHTML = '<span style="font-size: 1.5rem;">✅</span><span>Copied!</span>';
        copyButton.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        
        setTimeout(() => {
          copyButton.innerHTML = '<span style="font-size: 1.5rem;">🔗</span><span>Copy Link</span>';
          copyButton.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
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
    facebookButton.addEventListener('click', () => {
      const url = encodeURIComponent(window.location.origin);
      const text = encodeURIComponent("I just registered for the Igniting Greatness Golf Tournament! Join me on September 5, 2025 for a day of golf, purpose, and making a difference. #IgnitingGreatness #GuruuFoundation");
      
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank', 'width=600,height=400');
      closeModal();
    });
    
    twitterButton.addEventListener('click', () => {
      const url = encodeURIComponent(window.location.origin);
      const text = encodeURIComponent("Just registered for the Igniting Greatness Golf Tournament! Join me Sept 5, 2025 for golf with purpose 🏌️‍♂️ #IgnitingGreatness #GuruuFoundation");
      
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
      closeModal();
    });
    
    linkedinButton.addEventListener('click', () => {
      const url = encodeURIComponent(window.location.origin);
      const title = encodeURIComponent("Igniting Greatness Golf Tournament");
      const summary = encodeURIComponent("I just registered for this incredible golf tournament that combines sport with purpose. Join me on September 5, 2025 for a day of golf, networking, and making a difference through mentorship.");
      
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`, '_blank', 'width=600,height=400');
      closeModal();
    });
  }
});

// API endpoint stubs for backend integration
// These would be implemented on your server

/*
// Example backend endpoints:

// Create Payment Intent (Stripe)
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency, metadata } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata,
    });
    
    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit Registration (GoHighLevel Integration)
app.post('/api/submit-registration', async (req, res) => {
  try {
    const formData = req.body;
    
    // Send to GoHighLevel
    const ghlResponse = await fetch('YOUR_GHL_WEBHOOK_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_GHL_API_KEY'
      },
      body: JSON.stringify(formData)
    });
    
    if (ghlResponse.ok) {
      // Send confirmation email
      await sendConfirmationEmail(formData);
      res.json({ success: true });
    } else {
      throw new Error('GoHighLevel submission failed');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
*/