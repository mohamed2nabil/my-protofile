/**
 * Modern Portfolio - Main Script
 * Created by: Mohamed Nabil
 */

// 1. Smooth scrolling for navigation links
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

// 2. Mobile menu toggle logic
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// 3. Back to top button functionality
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

// 4. Active navigation link highlighting on scroll
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

// 5. Professional Contact Form handling with EmailJS (No Alerts)
document.addEventListener('DOMContentLoaded', function() {
    // تفعيل مفتاح الـ Public Key الخاص بك
    emailjs.init("mfC5t03UXNHKJgp6z"); 

    const contactForm = document.getElementById('contact-form') || document.querySelector('form');
    const submitBtn = document.getElementById('submit-btn');
    const loadingSpinner = document.getElementById('loading-spinner');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    if (!contactForm) return;

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // إخفاء رسائل الحالة السابقة قبل بدء عملية إرسال جديدة
        successMessage.classList.add('hidden');
        errorMessage.classList.add('hidden');

        // تجهيز حالة الزر والـ Spinner
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';
        loadingSpinner.classList.remove('hidden');

        // تجميع البيانات من الحقول
        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // إرسال الإيميل عبر EmailJS
        emailjs.send('service_blzsh87', 'template_bqdqgsp', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // إخفاء الـ Spinner وإظهار رسالة النجاح في الصفحة
                loadingSpinner.classList.add('hidden');
                successMessage.classList.remove('hidden');
                
                // إعادة الزر لحالته الطبيعية وتفريغ الفورم
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                contactForm.reset();

                // إخفاء رسالة النجاح تلقائياً بعد 6 ثوانٍ
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 6000);

            }, function(error) {
                console.error('FAILED...', error);
                
                // إخفاء الـ Spinner وإظهار رسالة الخطأ في الصفحة
                loadingSpinner.classList.add('hidden');
                errorMessage.classList.remove('hidden');
                
                // إعادة الزر لحالته الطبيعية للمحاولة مرة أخرى
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
    });
});
