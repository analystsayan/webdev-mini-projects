// Predefined passcode
const PASSCODE = "1234";

// Elements
const loginContainer = document.getElementById("login-container");
const dashboardContainer = document.getElementById("dashboard-container");
const passcodeInput = document.getElementById("passcode");
const submitBtn = document.getElementById("submit-btn");
const errorMsg = document.getElementById("error-msg");

// Handle passcode submission
submitBtn.addEventListener("click", () => {
    const enteredPasscode = passcodeInput.value;
    if (enteredPasscode === PASSCODE) {
        loginContainer.classList.add("hidden");
        dashboardContainer.classList.remove("hidden");
        displayCards();
    } else {
        errorMsg.textContent = "Incorrect passcode. Please try again.";
        passcodeInput.value = ""; // Clear the input field
    }
});
