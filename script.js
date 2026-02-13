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

// --- التعديل هنا لخدمة EmailJS ---
document.addEventListener('DOMContentLoaded', function() {
    // 1. تفعيل المفتاح العام
    emailjs.init("mfC5t03UXNHKJgp6z"); 

    const contactForm = document.querySelector('form');
    // تأكد أن زر الإرسال له ID اسمه submit-btn في الـ HTML
    const submitBtn = contactForm.querySelector('button[type="submit"]'); 

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // تغيير حالة الزر أثناء الإرسال
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';

        // تجميع البيانات - تأكد أن الأسماء (from_name, etc) مطابقة للقالب عندك
        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // إرسال الإيميل
        emailjs.send('service_blzsh87', 'template_bqdqgsp', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('Sent Successfully! / تم الإرسال بنجاح');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }, function(error) {
                console.error('FAILED...', error);
                alert('Failed to send. Error: ' + JSON.stringify(error));
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
    });
});
