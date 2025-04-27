document.getElementById('Form-Vali').addEventListener('submit', function (event) {
    event.preventDefault();
    validateForm();
});

function validateForm() {
    let isValid = true;

    validateField('name', value => value !== '', 'Name is required.');

    validateField(
        'email',value => test(value),'Enter a valid email address.'
    );

    validateField(
        'password',value => value.length >= 6,'Password must be at least 6 characters.'
    );

    validateField(
        'phone',value =>test(value),'Enter a valid 10-digit phone number.'
    );

    validateField('dob', value => value !== '', 'Date of Birth is required.');

    validateField('gender', value => value !== '', 'Please select a gender.');

    validateField(
        'address',value => value.trim().length >= 10,'Address must be at least 10 characters.'
    );

    validateField(
        'pincode',value =>test(value),'Enter a valid pin code (5-6 digits).'
    );

    validateField(
        'terms',value => document.getElementById('terms').checked,'You must accept the terms and conditions.'
    );

    if (isValid) {
        alert('Form submitted successfully!');
        document.getElementById('Form-Vali').reset();
    }

    function validateField(id, condition, errorMessage) {
        const field = document.getElementById(id);
        const error = document.getElementById(`${id}Error`);
        const value = field.type === 'checkbox' ? field.checked : field.value.trim();

        if (!condition(value)) {
            error.textContent = errorMessage;
            error.style.display = 'block';
            isValid = false;
        } else {
            error.textContent = '';
            error.style.display = 'none';
        }
    }
}
