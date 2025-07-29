
//Global variables

//Password-Output Element
const passwordOutput = document.querySelector('input.password');

//Generate Password button
const generateButton = document.querySelector('.generate-password');

//Strength bar
const strengthBar = document.querySelector('#password-strength .strength-bar');

/**
 * 
 * Generates a new password.
 * Displays it with its Strength's status.
 */
function generatePassword() {
    const UPPERCASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
    const NUMBERS = '0123456789';
    const SYMBOLS = '!@#$%^&*()_+[]{}|;:,.<>?/`~-=\\';


    //settings
    const lengthInputRange = document.querySelector('input#password-length');
    const uppercaseInput = document.getElementById('include-uppercase');
    const lowercaseInput = document.getElementById('include-lowercase');
    const numbersInput = document.getElementById('include-numbers');
    const symbolsInput = document.getElementById('include-symbols');

    //Password Strength
    const passwordStrength = document.querySelector('#password-strength');



    let str = '';
    let strengthPercentage = 0;

    const maxLength = 24;
    const passwordLength = Math.round(Number(lengthInputRange.value) / 100);
    const includeUppercase = uppercaseInput.checked;
    const includeLowercase = lowercaseInput.checked;
    const includeNumbers = numbersInput.checked;
    const includeSymbols = symbolsInput.checked;

    if (includeUppercase) { str += UPPERCASE_LETTERS; strengthPercentage += UPPERCASE_LETTERS.length; }
    if (includeLowercase) { str += LOWERCASE_LETTERS; strengthPercentage += LOWERCASE_LETTERS.length; }
    if (includeNumbers) { str += NUMBERS; strengthPercentage += NUMBERS.length; }
    if (includeSymbols) { str += SYMBOLS; strengthPercentage += SYMBOLS.length; }

    //Strength: 35% depends on whats included | 65% depends on the length
    strengthPercentage = strengthPercentage / (UPPERCASE_LETTERS.length + LOWERCASE_LETTERS.length + NUMBERS.length + SYMBOLS.length) * 35;
    console.log(strengthPercentage);


    //Verify that atleast one checkbox got checked.
    if (strengthPercentage == 0) {
        alert('Pick atleast one checkbox');
        return;
    }

    strengthPercentage += passwordLength / maxLength * 65; //length

    //generating the password
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
        password += str[Math.floor(Math.random() * str.length)];
    }
    console.log(str, password);



    //Display the password
    passwordOutput.value = password;

    //Display strength status
    passwordStrength.className = `${strengthPercentage < 45 ? 'weak' : strengthPercentage < 65 ? 'medium' : 'strong'}`;

    //change bar's width
    console.log(strengthPercentage);

    strengthBar.style.width = `${strengthPercentage}%`;
}

function addEventListeners() {
    // Generates a password when the Generate Password gets clicked
    generateButton.addEventListener('click', generatePassword);

    //Displays the number of characters of the password as the input-range gets changed.
    lengthInputRange.addEventListener('input', () => {
        const passwordLengthSpan = document.querySelector('span.password-length');
        passwordLengthSpan.textContent = Math.round(Number(lengthInputRange.value) / 100);
    });

    //Enables copying when clicking on the copy icon
    //Shows a check icon when copied.
    const copyButton = document.getElementById('copy');
    let justCopied;
    copyButton.addEventListener('click', () => {
        if (justCopied) return;
        navigator.clipboard.writeText(passwordOutput.value).then(() => {
            copyButton.className = 'fas fa-check copied';
            setTimeout(() => {
                copyButton.className = 'fa-regular fa-copy';
                justCopied = false;
            }, 2000);
        });
    });

    const eye = document.getElementById('eye');
    eye.addEventListener('click', () => {
        passwordOutput.type = passwordOutput.type == 'text' ? 'password' : 'text';
        eye.className = eye.className == 'fa-solid fa-eye' ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
        console.log(passwordOutput.type);
        console.log(passwordOutput.className);


    });
}

generatePassword();
addEventListeners();