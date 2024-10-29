// Function to generate a random character from a string
function getRandomCharacter(characters) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}

// Function to generate the password
function generatePassword(length, includeUppercase, includeNumbers, includeSymbols) {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let availableChars = lowercaseChars;

    if (includeUppercase) {
        availableChars += uppercaseChars;
    }

    if (includeNumbers) {
        availableChars += numberChars;
    }

    if (includeSymbols) {
        availableChars += symbolChars;
    }

    let password = '';

    for (let i = 0; i < length; i++) {
        password += getRandomCharacter(availableChars);
    }

    return password;
}

// Event listener for the Generate Password button
document.getElementById('generateBtn').addEventListener('click', function () {
    const length = parseInt(document.getElementById('length').value);
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;

    const generatedPassword = generatePassword(length, includeUppercase, includeNumbers, includeSymbols);

    document.getElementById('passwordDisplay').value = generatedPassword;
});

// Copy to Clipboard functionality
document.getElementById('copyBtn').addEventListener('click', function () {
    const passwordField = document.getElementById('passwordDisplay');
    passwordField.select();
    passwordField.setSelectionRange(0, 99999); // For mobile devices

    // Copy the password
    document.execCommand('copy');

    // Display success message
    const copyMessage = document.getElementById('copyMessage');
    copyMessage.style.display = 'block';

    // Hide the message after 3 seconds
    setTimeout(() => {
        copyMessage.style.display = 'none';
    }, 3000);
});

// script.js

// Toggle dark/light mode
const themeToggleBtn = document.getElementById('themeToggleBtn');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
    // Toggle between dark-mode and light-mode classes
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    } else {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    }
    
    // Save the theme preference to localStorage
    localStorage.setItem('theme', body.className);
});

// On page load, apply the saved theme
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
    }
});
