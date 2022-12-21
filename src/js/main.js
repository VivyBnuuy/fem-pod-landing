"use strict";

// Get the arrays set up for the elements to manipulate
const getErrorElement = document.getElementsByClassName("card__error");
const getInputElement = document.getElementsByClassName("card__input");
const getSubmitElement = document.getElementsByClassName("card__submit");
const getLogosElement = document.getElementsByClassName("card__logos");

// Mobile elements
const mobileErrorElement = getErrorElement[0];
const mobileInputElement = getInputElement[0];
const mobileSubmitElement = getSubmitElement[0];

// Tablet/Desktop elements
const largeErrorElement = getErrorElement[1];
const largeInputElement = getInputElement[1];
const largeSubmitElement = getSubmitElement[1];
const largeLogosElement = getLogosElement[1];

// Verify email address
const emailRegExp = /^(?:(?![@.]).*(?<!@.*)(?<![.@])@{1}(?![@.])(?!.*[@*'(),!? _#/$%&;:<>+="\\]).*(?<![.@])\.{1}[a-zA-Z]+$)/;
let screenWidth = screen.width;

// Mobile verification
function validateEmailMobile(e) {
    let emailVerification = emailRegExp.exec(e.target.previousElementSibling.previousElementSibling.value);

    // RegEx not matched and nothing is typed
    if (emailVerification == null && e.target.previousElementSibling.previousElementSibling.value == "") {
        e.target.previousElementSibling.style.color = "var(--red)";
        e.target.previousElementSibling.style.display = "block"; 
        e.target.previousElementSibling.innerHTML = "Email address cannot be empty.";

        // Show the error message on desktop if screen is resized
        largeErrorElement.style.color = "var(--red)";
        largeErrorElement.style.display = "block";
        largeErrorElement.innerHTML = "Email address cannot be empty.";
    }

    // RegEx not matched but something is typed
    if (emailVerification == null && e.target.previousElementSibling.previousElementSibling.value != "") {
        e.target.previousElementSibling.style.color = "var(--red)";
        e.target.previousElementSibling.style.display = "block"; 
        e.target.previousElementSibling.innerHTML = "Oops! Please check your email.";

        // Show the error message on desktop if screen is resized
        largeErrorElement.style.color = "var(--red)";
        largeErrorElement.style.display = "block";
        largeErrorElement.innerHTML = "Oops! Please check your email.";
    }

    // RegEx is matched
    if (emailVerification != null) {
        e.target.previousElementSibling.style.color = "var(--green)";
        e.target.previousElementSibling.style.display = "block"; 
        e.target.previousElementSibling.innerHTML = "Success! An email was sent to your address.";

        // Show the success message on desktop if screen is resized
        largeErrorElement.style.color = "var(--green)";
        largeErrorElement.style.display = "block";
        largeErrorElement.innerHTML = "Success! An email was sent to your address.";
    }
}

// Remove error messages when something is being typed in the input field
function checkInputMobile(e) {
    e.target.nextElementSibling.style.display = "none"; 
    largeErrorElement.style.display = "none";
}

// Larger displays verification
function validateEmailLarge(e) {
    let emailVerification = emailRegExp.exec(e.target.previousElementSibling.value);

    // RegEx not matched and nothing is typed
    if (emailVerification == null && e.target.previousElementSibling.value == "") {
        largeErrorElement.style.color = "var(--red)";
        largeErrorElement.style.display = "block";
        largeErrorElement.innerHTML = "Email address cannot be empty.";

        // Show the error message on mobile if screen is resized
        mobileErrorElement.style.color = "var(--red)";
        mobileErrorElement.style.display = "block";
        mobileErrorElement.innerHTML = "Email address cannot be empty.";

        if (screenWidth < 1080) {
            largeLogosElement.style.margin = "1.9375rem 0 0 0";
        } else {
            largeLogosElement.style.margin = "2.4375rem 0 0 0";
        }
    }

    // RegEx not matched but something is typed
    if (emailVerification == null && e.target.previousElementSibling.value != "") {
        largeErrorElement.style.color = "var(--red)";
        largeErrorElement.style.display = "block";
        largeErrorElement.innerHTML = "Oops! Please check your email.";

        // Show the error message on desktop if screen is resized
        mobileErrorElement.style.color = "var(--red)";
        mobileErrorElement.style.display = "block";
        mobileErrorElement.innerHTML = "Oops! Please check your email.";

        if (screenWidth < 1080) {
            largeLogosElement.style.margin = "1.9375rem 0 0 0";
        } else {
            largeLogosElement.style.margin = "2.4375rem 0 0 0";
        }
    }

    // RegEx is matched
    if (emailVerification != null) {
        largeErrorElement.style.color = "var(--green)";
        largeErrorElement.style.display = "block";
        largeErrorElement.innerHTML = "Success! An email was sent to your address.";

        // Show the error message on desktop if screen is resized
        mobileErrorElement.style.color = "var(--green)";
        mobileErrorElement.style.display = "block";
        mobileErrorElement.innerHTML = "Success! An email was sent to your address.";

        if (screenWidth < 1080) {
            largeLogosElement.style.margin = "1.9375rem 0 0 0";
        } else {
            largeLogosElement.style.margin = "2.4375rem 0 0 0";
        }
    }
}

// Remove error messages when something is being typed in the input field 
function checkInputLarge(e) {
    largeErrorElement.style.display = "none";
    mobileErrorElement.style.display = "none";

    if (screenWidth < 1080) {
        largeLogosElement.style.margin = "3.5rem 0 0 0";
    } else {
        largeLogosElement.style.margin = "4rem 0 0 0";
    }

}

// Preserve states and data when layout is changed from mobile to large or vice versa
function resizeCheck() {
    screenWidth = screen.width;

    // Preserve text in the input field
    if (screenWidth >= 768) {
        getInputElement[0].value = getInputElement[1].value;
        
    } else {
        getInputElement[1].value = getInputElement[0].value;
    }

    // Preserve error message states

}

// Add event listeners to the input and submit parts of the page
function listenInputs() {
    for (let i = 0; i < 2; i++) {
        // Mobile event listeners
        getInputElement[0].addEventListener("input", checkInputMobile);
        getSubmitElement[0].addEventListener("click", validateEmailMobile);

        // Larger displays event listeners
        getInputElement[1].addEventListener("input", checkInputLarge);
        getSubmitElement[1].addEventListener("click", validateEmailLarge);

        window.addEventListener("resize", resizeCheck);
    }
}

document.onload = listenInputs();