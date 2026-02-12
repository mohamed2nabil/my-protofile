// Corrected EmailJS Implementation  

emailjs.init('YOUR_USER_ID');

function sendEmail(form) {
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
        .then(function() {
            console.log('SUCCESS! Email sent.');
        }, function(error) {
            console.log('FAILED! Email not sent:', error);
        });
}