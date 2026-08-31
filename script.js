// Get HTML elements
const passwordInput = document.getElementById("password");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");

const lengthSlider = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");

const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const numbers = document.getElementById("numbers");
const symbols = document.getElementById("symbols");

const strengthText = document.getElementById("strengthText");
const strengthIndicator = document.getElementById("strengthIndicator");

const message = document.getElementById("message");


// Character sets
const characters = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+{}[]<>?/|~"
};


// Update password length
lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value;

    updateStrength();
});


// Generate password
function generatePassword() {

    const length = Number(lengthSlider.value);

    let availableCharacters = "";
    let password = "";

    // Add selected character types
    if (uppercase.checked) {
        availableCharacters += characters.uppercase;
    }

    if (lowercase.checked) {
        availableCharacters += characters.lowercase;
    }

    if (numbers.checked) {
        availableCharacters += characters.numbers;
    }

    if (symbols.checked) {
        availableCharacters += characters.symbols;
    }

    // Check if no option is selected
    if (availableCharacters.length === 0) {
        passwordInput.value = "";
        message.textContent = "Please select at least one option.";
        message.style.color = "#e74c3c";

        updateStrength();

        return;
    }

    // Generate password
    for (let i = 0; i < length; i++) {

        const randomIndex = Math.floor(
            Math.random() * availableCharacters.length
        );

        password += availableCharacters[randomIndex];
    }

    passwordInput.value = password;

    message.textContent = "Password generated successfully!";
    message.style.color = "#22a06b";

    updateStrength();
}


// Copy password
copyBtn.addEventListener("click", async () => {

    if (passwordInput.value === "") {
        message.textContent = "Generate a password first.";
        message.style.color = "#e74c3c";

        return;
    }

    try {

        await navigator.clipboard.writeText(passwordInput.value);

        message.textContent = "Password copied to clipboard!";
        message.style.color = "#22a06b";

        copyBtn.textContent = "✓";

        setTimeout(() => {
            copyBtn.textContent = "📋";
        }, 1500);

    } catch (error) {

        message.textContent = "Unable to copy password.";
        message.style.color = "#e74c3c";
    }
});


// Password strength
function updateStrength() {

    const length = Number(lengthSlider.value);

    let selectedOptions = 0;

    if (uppercase.checked) selectedOptions++;
    if (lowercase.checked) selectedOptions++;
    if (numbers.checked) selectedOptions++;
    if (symbols.checked) selectedOptions++;

    const score = length + selectedOptions * 5;

    if (selectedOptions === 0) {

        strengthText.textContent = "Very Weak";
        strengthIndicator.style.width = "5%";

    } else if (score < 30) {

        strengthText.textContent = "Weak";
        strengthIndicator.style.width = "25%";

    } else if (score < 45) {

        strengthText.textContent = "Medium";
        strengthIndicator.style.width = "50%";

    } else if (score < 60) {

        strengthText.textContent = "Strong";
        strengthIndicator.style.width = "75%";

    } else {

        strengthText.textContent = "Very Strong";
        strengthIndicator.style.width = "100%";
    }
}


// Generate password button
generateBtn.addEventListener("click", generatePassword);


// Update strength when options change
uppercase.addEventListener("change", updateStrength);
lowercase.addEventListener("change", updateStrength);
numbers.addEventListener("change", updateStrength);
symbols.addEventListener("change", updateStrength);


// Generate password when page loads
generatePassword();