// DOM Elements
const form = document.getElementById('dataForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const dataTable = document.getElementById('dataTable').querySelector('tbody');
const submitBtn = document.getElementById('submitBtn');

let currentIndex = null;

// Load stored data on page load
document.addEventListener('DOMContentLoaded', loadStoredData);

// Add or update data
submitBtn.addEventListener('click', function () {
    const fullName = fullNameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!fullName || !email || !message) {
        alert('Please fill all fields.');
        return;
    }

    let storedData = JSON.parse(localStorage.getItem('formData')) || [];

    if (currentIndex !== null) {
        // Update existing data
        storedData[currentIndex] = { fullName, email, message };
        currentIndex = null;
        submitBtn.textContent = 'Send Message';
    } else {
        // Add new data
        storedData.push({ fullName, email, message });
    }

    localStorage.setItem('formData', JSON.stringify(storedData));
    loadStoredData();
    form.reset();
});

// Load data from local storage and display in table
function loadStoredData() {
    const storedData = JSON.parse(localStorage.getItem('formData')) || [];
    dataTable.innerHTML = '';

    storedData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.fullName}</td>
            <td>${item.email}</td>
            <td>${item.message}</td>
            <td>
                <button onclick="editData(${index})">Edit</button>
                <button onclick="deleteData(${index})">Delete</button>
            </td>
        `;
        dataTable.appendChild(row);
    });
}

// Edit data
window.editData = function (index) {
    const storedData = JSON.parse(localStorage.getItem('formData')) || [];
    const data = storedData[index];

    fullNameInput.value = data.fullName;
    emailInput.value = data.email;
    messageInput.value = data.message;

    currentIndex = index;
    submitBtn.textContent = 'Update Message';
};

// Delete data
window.deleteData = function (index) {
    let storedData = JSON.parse(localStorage.getItem('formData')) || [];
    storedData.splice(index, 1);
    localStorage.setItem('formData', JSON.stringify(storedData));
    loadStoredData();
};