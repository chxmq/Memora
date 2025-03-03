// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Navigation functionality
  const navbar = document.getElementById('navbar');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  // Sticky navbar on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking a link
  const navItems = document.querySelectorAll('.nav-links a');
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Testimonial slider
  const testimonials = document.querySelectorAll('.testimonial');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-testimonial');
  const nextBtn = document.querySelector('.next-testimonial');
  let currentIndex = 0;

  function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentIndex = index;
  }

  if (dots.length > 0 && prevBtn && nextBtn) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showTestimonial(index));
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    });

    // Auto slide every 5 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    }, 5000);
  }

  // FAQ accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all FAQ items
      faqItems.forEach(faqItem => {
        faqItem.classList.remove('active');
      });
      
      // Open clicked item if it wasn't already open
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Animate numbers in impact section
  const impactNumbers = document.querySelectorAll('.impact-number');
  
  function animateNumbers() {
    impactNumbers.forEach(number => {
      const target = parseInt(number.getAttribute('data-count'));
      const duration = 2000; // 2 seconds
      const step = target / (duration / 16); // 60fps
      let current = 0;
      
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          clearInterval(timer);
          number.textContent = target;
        } else {
          number.textContent = Math.floor(current);
        }
      }, 16);
    });
  }

  // Intersection Observer for triggering animations when elements come into view
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('impact-stats')) {
          animateNumbers();
        }
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.feature-card, .stat-card, .value-card, .pillar, .team-member, .impact-stats');
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });

  // Form validation
  const contactForm = document.querySelector('.contact-form');
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      
      let isValid = true;
      
      if (!name.value.trim()) {
        isValid = false;
        name.style.borderColor = 'var(--error)';
      } else {
        name.style.borderColor = 'var(--gray)';
      }
      
      if (!email.value.trim() || !isValidEmail(email.value)) {
        isValid = false;
        email.style.borderColor = 'var(--error)';
      } else {
        email.style.borderColor = 'var(--gray)';
      }
      
      if (!message.value.trim()) {
        isValid = false;
        message.style.borderColor = 'var(--error)';
      } else {
        message.style.borderColor = 'var(--gray)';
      }
      
      if (isValid) {
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        setTimeout(() => {
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
          
          // Show success message
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.textContent = 'Your message has been sent successfully!';
          successMessage.style.color = 'var(--success)';
          successMessage.style.padding = '1rem 0';
          successMessage.style.textAlign = 'center';
          
          contactForm.appendChild(successMessage);
          
          setTimeout(() => {
            successMessage.remove();
          }, 5000);
        }, 1500);
      }
    });
  }
  
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = form.querySelector('input[type="email"]');
      const submitBtn = form.querySelector('button[type="submit"]');
      
      if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
        emailInput.style.borderColor = 'var(--error)';
        return;
      }
      
      // Simulate form submission
      submitBtn.disabled = true;
      submitBtn.textContent = 'Subscribing...';
      
      setTimeout(() => {
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = 'Subscribe';
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for subscribing!';
        successMessage.style.color = 'var(--white)';
        successMessage.style.padding = '1rem 0';
        successMessage.style.textAlign = 'center';
        
        form.appendChild(successMessage);
        
        setTimeout(() => {
          successMessage.remove();
        },  5000);
      }, 1500);
    });
  });
  
  // Email validation helper function
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Particle animation for CTA section
  const ctaParticles = document.querySelector('.cta-particles');
  
  if (ctaParticles) {
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      // Random size
      const size = Math.random() * 10 + 5;
      
      // Random animation duration
      const duration = Math.random() * 10 + 5;
      
      // Random animation delay
      const delay = Math.random() * 5;
      
      // Apply styles
      particle.style.cssText = `
        position: absolute;
        top: ${posY}%;
        left: ${posX}%;
        width: ${size}px;
        height: ${size}px;
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        animation: float-particle ${duration}s ease-in-out ${delay}s infinite;
      `;
      
      ctaParticles.appendChild(particle);
    }
  }
});