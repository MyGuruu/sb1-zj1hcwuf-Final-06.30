// Sponsorship Checkout Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
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
  const urlParams = new URLSearchParams(window.location.search);
  const preselectedPackage = urlParams.get('package');
  const packageType = urlParams.get('type') || 'sponsorship';
  
  // Sponsorship package data
  const sponsorshipPackages = {
    legacy: {
      name: 'Legacy Guruu Sponsorship',
      description: 'Exclusive partnership with maximum impact and visibility',
      price: 10000,
      icon: '👑',
      golfSpots: 8,
      banquetSpots: 16,
      includesGolf: true,
      includesBranding: true,
      features: [
        'Two foursomes for golf',
        'Personal Tournament Concierge',
        'Advanced Check-in',
        '8 reserved VIP parking spaces',
        'Private Beverage/Snack Cart',
        'Premium Lunch and Snacks for 8',
        '8 Super Mulligans',
        '8 Banquet Guest or Mentor Tickets',
        '2 Reserved VIP Banquet Tables for 16',
        '8 Platinum Gift Bags',
        'Professional Framed Team Photos',
        'Bonus Pack of Raffle Tickets',
        '8 Commemorative TGF Golf Hats',
        'Social Media Exposure',
        'Recognition in all Print and TV Promos',
        'Enhanced logo placement on all banners',
        'Recognition on TGF Website',
        'Prominent Branding in 2026 Video',
        'Opportunity to speak at Awards',
        '2 Large Custom Feather Flags',
        'Positioned at Golf Club Entry, Hole #1, Banquet Courtyard'
      ]
    },
    master: {
      name: 'Master Guruu Sponsorship',
      description: 'Premium partnership with excellent visibility and benefits',
      price: 5000,
      icon: '🥇',
      golfSpots: 4,
      banquetSpots: 8,
      includesGolf: true,
      includesBranding: true,
      features: [
        'One Foursome for Golf',
        '4 Reserved VIP Parking Spaces',
        'Express Check-In',
        'Premium Lunch & Snacks',
        '4 Super Mulligans',
        '4 Banquet Guest or Mentor Tickets',
        'Reserved VIP Banquet Table for 8',
        '4 Platinum Gift Bags',
        'Professional Framed Team Photos',
        'Bonus Raffle Tickets',
        '4 TGF Golf Hats',
        'Social Media Exposure',
        'Recognition in all Print and TV Promos',
        'Oversized Tee sign & Feather Flag',
        'Prominent logo placement on all banners',
        'Recognition on TGF Website',
        'Sponsor Recognition in 2026 Video'
      ]
    },
    'pin-flag': {
      name: 'Pin Flag Sponsor',
      description: 'Exclusive pin flag branding opportunity',
      price: 4500,
      icon: '🚩',
      golfSpots: 4,
      banquetSpots: 16,
      includesGolf: true,
      includesBranding: true,
      features: [
        'Corporate Logo Printed on all Pin Flags',
        'Sponsor Retains Flags after Tournament',
        '19th Hole Commemorative Flag retained by TGF',
        'One Foursome for Golf',
        '4 Reserved VIP Parking Spaces',
        'Express Check-In',
        'Premium Lunch & Snacks',
        '4 Super Mulligans',
        'Bonus Raffle Tickets',
        '4 Platinum Gift Bags',
        'Reserved VIP Banquet Tables for 16',
        'Feather Flag at Check-in & Reception',
        'Prominent logo placement on all banners',
        '4 TGF Golf Hats',
        'Recognition on TGF Website',
        'Sponsor Recognition in 2026 Video'
      ]
    },
    'guiding-mentor': {
      name: 'Guiding Mentor Sponsorship',
      description: 'Contest sponsorship with premium benefits',
      price: 2500,
      icon: '🎯',
      golfSpots: 4,
      banquetSpots: 8,
      includesGolf: true,
      includesBranding: true,
      features: [
        'Choice of Contest Recognition (Longest Drive, Closest to Pin, Putting Contest, or Straightest Drive)',
        'One Foursome for Golf',
        '4 Reserved VIP Parking Spaces',
        'Express Check-In',
        'Premium Lunch & Snacks',
        '4 Super Mulligans',
        '4 Banquet Guest or Mentor Tickets',
        'Reserved VIP Banquet Table for 8',
        '4 Platinum Gift Bags',
        'Professional Framed Team Photos',
        'Bonus Raffle Tickets',
        '4 TGF Golf Hats',
        'Social Media Exposure',
        'Recognition in all Print and TV Promos',
        'Oversized Tee sign with branding',
        'Contest Hole Feather Flag',
        'Prominent logo placement on all banners',
        'Recognition on TGF Website',
        'Sponsor Recognition in 2026 Video'
      ]
    },
    'hole-in-one': {
      name: 'Hole-in-One Sponsorship',
      description: 'Exclusive hole-in-one contest sponsorship',
      price: 1600,
      icon: '🎯',
      golfSpots: 2,
      banquetSpots: 2,
      includesGolf: true,
      includesBranding: true,
      features: [
        'One Twosome for Golf',
        '2 Reserved Parking Spaces',
        'Dedicated Sponsor Check-In',
        'Premium Lunch & Snacks',
        '2 Super Mulligans',
        '2 Banquet Guest or Mentor Tickets',
        '2 Premium Gift Bags',
        'Professional Framed Team Photos',
        'Bonus Raffle Tickets',
        '2 TGF Golf Hats',
        'Social Media Exposure',
        'Recognition in all Print and TV Promos',
        'Oversized Tee sign with branding',
        'Prominent logo placement on all banners',
        'Recognition on TGF Website',
        'Sponsor Recognition in 2026 Video'
      ]
    },
    'adult-beverage': {
      name: 'Adult Beverage Sponsor',
      description: 'Brand activation and engagement opportunity',
      price: 525,
      icon: '🍻',
      golfSpots: 0,
      banquetSpots: 0,
      includesGolf: false,
      includesBranding: true,
      features: [
        'Custom Tee Sign with branding',
        'Upgrade to Feather Flag +$100',
        'Social Media Exposure',
        'Recognition on TGF Website with link',
        'Brand activation opportunity',
        'Direct engagement with 200+ golfers',
        'Branded product giveaways',
        'Marketing collateral distribution',
        'TGF team can man the hole',
        'OR sponsor can be present for networking'
      ]
    },
    'tee': {
      name: 'Tee Sponsor',
      description: 'Entry-level sponsorship with great engagement',
      price: 250,
      icon: '⛳',
      golfSpots: 0,
      banquetSpots: 0,
      includesGolf: false,
      includesBranding: true,
      features: [
        'Custom Tee Sign with branding',
        'Upgrade to Feather Flag +$100',
        'Social Media Exposure',
        'Recognition on TGF Website with link',
        'Brand activation opportunity',
        'Direct engagement with 200+ golfers',
        'Branded product giveaways',
        'Marketing collateral distribution',
        'TGF team can man the hole',
        'OR sponsor can be present for networking'
      ]
    },
    'driving-range': {
      name: 'Driving Range Lane Divider Ads',
      description: 'Innovative advertising on driving range dividers',
      price: 65,
      icon: '🏌️',
      golfSpots: 0,
      banquetSpots: 0,
      includesGolf: false,
      includesBranding: true,
      features: [
        'Highly visible advertising placards',
        'Provided by Pivotal-Impact',
        'Displayed during tournament on driving range',
        'Repurposed and displayed in courtyard after play',
        'Multiple pricing options available',
        'Single: $65',
        'Two on One Divider: $120',
        'Two on Different Dividers: $110',
        'Four or more: $50 each'
      ]
    },
    // Support packages
    'hole-sponsorship': {
      name: 'Hole Sponsorship',
      description: 'On-course signage and recognition',
      price: 500,
      icon: '🏌️',
      golfSpots: 0,
      banquetSpots: 0,
      includesGolf: false,
      includesBranding: true,
      features: [
        'Custom hole signage',
        'On-course recognition',
        'Social media exposure',
        'Website recognition'
      ]
    },
    'raffle-auction': {
      name: 'Raffle & Auction Prize Donation',
      description: 'Donate prizes to increase fundraising impact',
      price: 0,
      icon: '🎁',
      golfSpots: 0,
      banquetSpots: 0,
      includesGolf: false,
      includesBranding: false,
      features: [
        'Prize donation for raffle or auction',
        'Recognition during event',
        'Social media exposure',
        'Website recognition'
      ]
    },
    'branded-giveaways': {
      name: 'Branded Giveaways',
      description: 'Enhance guest experience with branded items',
      price: 0,
      icon: '🎯',
      golfSpots: 0,
      banquetSpots: 0,
      includesGolf: false,
      includesBranding: true,
      features: [
        'Branded giveaway items',
        'Guest experience enhancement',
        'Brand visibility',
        'Social media exposure'
      ]
    },
    'foursome-sponsorship': {
      name: 'Underwrite a Foursome',
      description: 'Sponsor local youth or emerging leaders',
      price: 720,
      icon: '👥',
      golfSpots: 0,
      banquetSpots: 0,
      includesGolf: false,
      includesBranding: false,
      features: [
        'Sponsor four players',
        'Support local youth or emerging leaders',
        'Recognition during event',
        'Social media exposure',
        'Website recognition'
      ]
    },
    'cash-contribution': {
      name: 'Cash Contribution',
      description: 'Direct financial support at any level',
      price: 0,
      icon: '💝',
      golfSpots: 0,
      banquetSpots: 0,
      includesGolf: false,
      includesBranding: false,
      features: [
        'Direct financial support',
        'Tax-deductible contribution',
        'Recognition based on contribution level',
        'Website recognition'
      ]
    },
    'in-kind-donation': {
      name: 'In-Kind Donation',
      description: 'Services, products, or expertise donation',
      price: 0,
      icon: '🤝',
      golfSpots: 0,
      banquetSpots: 0,
      includesGolf: false,
      includesBranding: false,
      features: [
        'Services, products, or expertise',
        'Tournament experience enhancement',
        'Recognition during event',
        'Website recognition'
      ]
    },
    'custom': {
      name: 'Custom Sponsorship',
      description: 'Tailored partnership opportunity',
      price: 0,
      icon: '⭐',
      golfSpots: 0,
      banquetSpots: 0,
      includesGolf: false,
      includesBranding: true,
      features: [
        'Custom partnership package',
        'Tailored to your needs',
        'Contact us for details'
      ]
    }
  };
  
  let currentPackage = preselectedPackage || 'legacy';
  let additionalGuests = 0;
  
  // Initialize package selection
  updatePackageDisplay();
  updateSummary();
  toggleSections();
  
  function updatePackageDisplay() {
    const pkg = sponsorshipPackages[currentPackage];
    if (!pkg) return;
    
    document.getElementById('package-name').textContent = pkg.name;
    document.getElementById('package-description').textContent = pkg.description;
    document.getElementById('package-amount').textContent = pkg.price > 0 ? `$${pkg.price.toLocaleString()}` : 'Contact Us';
    document.querySelector('.package-icon').textContent = pkg.icon;
    
    // Update features
    const featuresContainer = document.getElementById('package-features');
    featuresContainer.innerHTML = '';
    
    pkg.features.forEach(feature => {
      const featureElement = document.createElement('div');
      featureElement.className = 'feature-item';
      featureElement.innerHTML = `
        <span class="feature-icon">✓</span>
        <span>${feature}</span>
      `;
      featuresContainer.appendChild(featureElement);
    });
    
    // Update golf spots info
    if (pkg.includesGolf) {
      document.getElementById('golf-spots').textContent = pkg.golfSpots;
      generateGolfParticipants(pkg.golfSpots);
    }
    
    // Update banquet spots info
    document.getElementById('banquet-spots').textContent = pkg.banquetSpots;
  }
  
  function toggleSections() {
    const pkg = sponsorshipPackages[currentPackage];
    if (!pkg) return;
    
    // Show/hide branding section
    const brandingSection = document.getElementById('branding-info');
    brandingSection.style.display = pkg.includesBranding ? 'block' : 'none';
    
    // Show/hide golf section
    const golfSection = document.getElementById('golf-participation');
    golfSection.style.display = pkg.includesGolf ? 'block' : 'none';
  }
  
  function generateGolfParticipants(count) {
    const container = document.getElementById('golf-participants');
    container.innerHTML = '';
    
    for (let i = 1; i <= count; i++) {
      const participantDiv = document.createElement('div');
      participantDiv.className = 'participant-group';
      participantDiv.innerHTML = `
        <div class="participant-header">Participant ${i}</div>
        <div class="participant-inputs">
          <div class="form-group">
            <label for="participant${i}Name">Name</label>
            <input type="text" id="participant${i}Name" name="participant${i}Name" placeholder="Full Name">
          </div>
          <div class="form-group">
            <label for="participant${i}Email">Email</label>
            <input type="email" id="participant${i}Email" name="participant${i}Email" placeholder="email@example.com">
          </div>
          <div class="form-group">
            <label for="participant${i}Phone">Phone</label>
            <input type="tel" id="participant${i}Phone" name="participant${i}Phone" placeholder="(555) 123-4567">
          </div>
          <div class="form-group">
            <label for="participant${i}Handicap">Handicap</label>
            <input type="number" id="participant${i}Handicap" name="participant${i}Handicap" min="0" max="54" step="0.1" placeholder="0.0">
          </div>
        </div>
      `;
      container.appendChild(participantDiv);
    }
  }

  // Mobile number SMS agreement
  const isMobileCheckbox = document.getElementById('isMobile');
  const smsNotice = document.getElementById('sms-notice');
  
  isMobileCheckbox.addEventListener('change', function() {
    smsNotice.style.display = this.checked ? 'flex' : 'none';
  });

  // Logo upload handling
  const logoUploadRadios = document.querySelectorAll('input[name="logoOption"]');
  const logoUploadSection = document.getElementById('logo-upload-section');
  const fileUploadArea = document.getElementById('file-upload-area');
  const logoUploadInput = document.getElementById('logoUpload');
  const uploadPreview = document.getElementById('upload-preview');
  const removeFileBtn = document.getElementById('remove-file');
  
  logoUploadRadios.forEach(radio => {
    radio.addEventListener('change', function() {
      logoUploadSection.style.display = this.value === 'upload' ? 'block' : 'none';
      if (this.value === 'later') {
        // Clear any uploaded file
        logoUploadInput.value = '';
        uploadPreview.style.display = 'none';
        fileUploadArea.querySelector('.upload-content').style.display = 'flex';
      }
    });
  });
  
  fileUploadArea.addEventListener('click', function() {
    logoUploadInput.click();
  });
  
  fileUploadArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.style.borderColor = 'var(--primary-blue)';
    this.style.background = 'rgba(37, 99, 235, 0.05)';
  });
  
  fileUploadArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
    this.style.borderColor = 'var(--gray-300)';
    this.style.background = 'var(--gray-50)';
  });
  
  fileUploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    this.style.borderColor = 'var(--gray-300)';
    this.style.background = 'var(--gray-50)';
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  });
  
  logoUploadInput.addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  });
  
  function handleFileUpload(file) {
    // Validate file type
    const allowedTypes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a valid file type: SVG, PNG, JPG, or PDF');
      return;
    }
    
    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }
    
    // Show preview
    document.getElementById('file-name').textContent = file.name;
    document.getElementById('file-size').textContent = formatFileSize(file.size);
    
    fileUploadArea.querySelector('.upload-content').style.display = 'none';
    uploadPreview.style.display = 'flex';
  }
  
  removeFileBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    logoUploadInput.value = '';
    uploadPreview.style.display = 'none';
    fileUploadArea.querySelector('.upload-content').style.display = 'flex';
  });
  
  function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Additional banquet guests handling
  const additionalBanquetCheckbox = document.getElementById('additionalBanquetGuests');
  const additionalGuestsSection = document.getElementById('additional-guests-section');
  const decreaseBtn = document.getElementById('decrease-guests');
  const increaseBtn = document.getElementById('increase-guests');
  const guestInput = document.getElementById('additionalGuestCount');
  const guestCost = document.getElementById('guest-cost');
  
  additionalBanquetCheckbox.addEventListener('change', function() {
    additionalGuestsSection.style.display = this.checked ? 'block' : 'none';
    if (!this.checked) {
      additionalGuests = 0;
      updateGuestDisplay();
      updateSummary();
    }
  });
  
  decreaseBtn.addEventListener('click', function() {
    if (additionalGuests > 0) {
      additionalGuests--;
      updateGuestDisplay();
      updateSummary();
    }
  });
  
  increaseBtn.addEventListener('click', function() {
    if (additionalGuests < 20) {
      additionalGuests++;
      updateGuestDisplay();
      updateSummary();
    }
  });
  
  function updateGuestDisplay() {
    guestInput.value = additionalGuests;
    const cost = additionalGuests * 45;
    guestCost.textContent = `Additional Cost: $${cost}`;
    
    // Update button states
    decreaseBtn.disabled = additionalGuests === 0;
    increaseBtn.disabled = additionalGuests === 20;
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

  // Summary updates
  function updateSummary() {
    const pkg = sponsorshipPackages[currentPackage];
    if (!pkg) return;
    
    const packagePrice = pkg.price;
    const guestPrice = additionalGuests * 45;
    const totalPrice = packagePrice + guestPrice;
    
    // Update package summary
    document.getElementById('summary-package').textContent = pkg.name;
    document.getElementById('summary-package-price').textContent = packagePrice > 0 ? `$${packagePrice.toLocaleString()}.00` : 'Contact Us';
    
    // Update guest summary
    const guestSummary = document.getElementById('summary-additional-guests');
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
    const totalText = packagePrice > 0 ? `$${totalPrice.toLocaleString()}.00` : 'Contact Us';
    document.getElementById('summary-total').textContent = totalText;
    document.getElementById('btn-amount').textContent = totalText;
  }

  // Form validation
  function validateForm() {
    const form = document.getElementById('sponsorship-form');
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
    
    // Validate waiver acknowledgment if golf is included
    const pkg = sponsorshipPackages[currentPackage];
    if (pkg.includesGolf) {
      const waiverCheckbox = document.getElementById('waiverAcknowledged');
      const waiverContainer = document.querySelector('.waiver-checkbox-container');
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
  const form = document.getElementById('sponsorship-form');
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
    const pkg = sponsorshipPackages[currentPackage];
    if (pkg.price === 0) {
      // Handle free/contact packages differently
      await submitSponsorship(null, 'contact');
      return;
    }
    
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
            packageType: 'sponsorship',
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
        await submitSponsorship(paymentIntent.id);
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
    // For invoice/check, we'll submit the sponsorship without payment processing
    // and mark it as pending payment
    await submitSponsorship(null, method);
  }
  
  async function submitSponsorship(paymentId, paymentMethod = 'card') {
    const formData = new FormData(form);
    
    // Add additional data
    formData.append('package', currentPackage);
    formData.append('packageType', 'sponsorship');
    formData.append('packagePrice', sponsorshipPackages[currentPackage].price);
    formData.append('additionalGuests', additionalGuests);
    formData.append('guestPrice', additionalGuests * 45);
    formData.append('totalAmount', calculateTotal());
    formData.append('paymentId', paymentId);
    formData.append('paymentMethod', paymentMethod);
    formData.append('paymentStatus', paymentId ? 'completed' : 'pending');
    
    // Add waiver acknowledgment if golf is included
    const pkg = sponsorshipPackages[currentPackage];
    if (pkg.includesGolf) {
      formData.append('waiverAcknowledged', 'true');
      formData.append('waiverAcknowledgedDate', new Date().toISOString());
    }
    
    try {
      // Submit to your backend/GoHighLevel webhook
      const response = await fetch('/api/submit-sponsorship', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        // Redirect to confirmation page
        window.location.href = `confirmation.html?sponsorship=${Date.now()}&type=sponsorship`;
      } else {
        throw new Error('Sponsorship submission failed');
      }
      
    } catch (error) {
      console.error('Sponsorship failed:', error);
      alert('Sponsorship submission failed. Please try again or contact support.');
    }
  }
  
  function calculateTotal() {
    const pkg = sponsorshipPackages[currentPackage];
    return pkg.price + (additionalGuests * 45);
  }

  // Auto-populate billing name from contact info
  const firstNameInput = document.getElementById('contactFirstName');
  const lastNameInput = document.getElementById('contactLastName');
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

  // Auto-populate invoice email from contact email
  const contactEmailInput = document.getElementById('contactEmail');
  const invoiceEmailInput = document.getElementById('invoiceEmail');
  
  contactEmailInput.addEventListener('blur', function() {
    if (this.value && !invoiceEmailInput.value) {
      invoiceEmailInput.value = this.value;
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
  
  // Waiver modal functionality
  if (document.getElementById('open-waiver-modal')) {
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
        <span>I Acknowledge</span>
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
      const waiverCheckbox = document.getElementById('waiverAcknowledged');
      if (waiverCheckbox) {
        waiverCheckbox.checked = true;
        
        // Remove error styling if present
        const waiverContainer = document.querySelector('.waiver-checkbox-container');
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
});