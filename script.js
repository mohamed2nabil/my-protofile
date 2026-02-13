// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Back to top button
const backToTopButton = document.getElementById('back-to-top');
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Active navigation link highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// FIXED: Contact form submission using EmailJS
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing EmailJS');
    
    const contactForm = document.querySelector('form');
    const submitBtn = document.getElementById('submit-btn');
    const loadingSpinner = document.getElementById('loading-spinner');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    // Validate all elements exist
    if (!contactForm) {
        console.error('Contact form not found');
        return;
    }

    // Initialize EmailJS ONCE at page load
    try {
        emailjs.init('mfC5t03UXNHKJgp6z');
        console.log('EmailJS initialized successfully');
    } catch (error) {
        console.error('EmailJS initialization failed:', error);
    }

    // Form submission handler
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Form submitted');

        // Validate form inputs
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        if (!name || !email || !subject || !message) {
            console.error('One or more form fields are missing');
            alert('Error: Form fields are missing');
            return;
        }

        // Validate inputs aren't empty
        if (!name.value.trim() || !email.value.trim() || !subject.value.trim() || !message.value.trim()) {
            alert('Please fill in all fields');
            return;
        }

        // Hide previous messages
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        loadingSpinner.classList.remove('hidden');

        // Prepare parameters - EXACT MATCH with your EmailJS template
        const templateParams = {
            from_name: name.value,
            from_email: email.value,
            subject: subject.value,
            message: message.value
        };

        console.log('Sending with params:', templateParams);

        // Send email
        emailjs.send('service_blzsh87', 'template_bqdqgsp', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);

                // Hide loading state
                loadingSpinner.classList.add('hidden');
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane ml-2"></i>';

                // Show success message
                successMessage.classList.remove('hidden');

                // Reset form
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 5000);

            }, function(error) {
                console.error('FAILED!', error);
                console.error('Error type:', error.status);
                console.error('Error details:', JSON.stringify(error, null, 2));

                // Hide loading state
                loadingSpinner.classList.add('hidden');
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane ml-2"></i>';

                // Show error message
                errorMessage.classList.remove('hidden');
                
                // Update error message with specific error info
                const errorText = errorMessage.querySelector('p');
                if (errorText) {
                    errorText.textContent = `Error: ${error.status || 'Unknown error'}. Check browser console for details.`;
                }

                // Hide error message after 5 seconds
                setTimeout(() => {
                    errorMessage.classList.add('hidden');
                }, 5000);
            });
    });
});
