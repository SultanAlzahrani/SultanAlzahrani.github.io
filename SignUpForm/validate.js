/**
 *
 * Add the following:
 * 1. Never Submit before you check everything has a value
 * 2. idk, figure it out lol
 *
 *
 */

function emailValidator() {
  const emailInput = document.querySelector("#email-input");
  const emailErrorBox = document.querySelector("#email-error");

  emailInput.addEventListener("blur", (e) => {
    e.preventDefault();
    isValid = isEmailValid(emailInput);

    if (isValid) {
      hideErrorBox(emailErrorBox);
      toggleErrorInput(emailInput, 0);
    } else {
      showErrorBox(
        emailErrorBox,
        "error error-msg",
        "invalid Email. Try Again"
      );
      toggleErrorInput(emailInput, 1);
    }
  });
}

function passwordValidator() {
  const passwordInput = document.querySelector("#password-input");
  const passwordErrorBox = document.querySelector("#password-error");

  passwordInput.addEventListener("input", (e) => {
    e.preventDefault();

    valid = isPasswordValid(passwordInput);

    if (valid) {
      hideErrorBox(passwordErrorBox);
      toggleErrorInput(passwordInput, 0);
    } else {
      showErrorBox(passwordErrorBox, "error error-msg", getPasswordErrorMSG());
      toggleErrorInput(passwordInput, 1);
    }
  });

  const rePassInput = document.querySelector("#confirm-password-input");
  const rePassErrorBox = document.querySelector("#confirm-password-error");

  rePassInput.addEventListener("input", (e) => {
    e.preventDefault();

    valid = rePassInput.value == passwordInput.value;

    if (valid) {
      hideErrorBox(rePassErrorBox);
      toggleErrorInput(rePassInput, 0);
    } else {
      showErrorBox(
        rePassErrorBox,
        "error error-msg",
        "The password you just entered doesn't Match"
      );
      toggleErrorInput(rePassInput, 1);
    }
  });
}

function countryAndZipcodeValidator() {
  const zipcodeInput = document.querySelector("#zipcode-input");
  const zipcodeErrorBox = document.querySelector("#zipcode-error");

  zipcodeInput.addEventListener("input", (e) => {
    e.preventDefault();

    if (isZipcodeValid(zipcodeInput)) {
      hideErrorBox(zipcodeErrorBox);
      toggleErrorInput(zipcodeInput, 0);
    } else {
      showErrorBox(
        zipcodeErrorBox,
        "error error-msg",
        "Zipcode needs to be at least 4-digits long"
      );
      toggleErrorInput(zipcodeInput, 1);
    }
  });

  //
  //

  const countryInput = document.querySelector("#country-input");
  const countryErrorBox = document.querySelector("#country-error");

  countryInput.addEventListener("input", () => {
    if (isCountryValid(countryInput)) {
      hideErrorBox(countryErrorBox);
      toggleErrorInput(countryInput, 0);
    } else {
      showErrorBox(
        countryErrorBox,
        "error-msg",
        "You need to select a country"
      );
      toggleErrorInput(countryInput, 1);
    }
  });
}

function sumbitActivator() {
  const form = document.querySelector(".form");
  const submit = document.querySelector(".submit-button");

  submit.addEventListener("click", (e) => {
    e.preventDefault();

    //checkErrors()
    //checkAllInputsFilled()
    let condtionOne = checkErrors();
    let condtionTwo = checkAllInputsFilled();
    if (condtionOne && condtionTwo) {
      form.submit();
    } else {
      toggleErrorInput(submit, 1);
    }
  });
}
//-calls-------------
emailValidator();
passwordValidator();
countryAndZipcodeValidator();
sumbitActivator();

//---------

/*
  = Validator Functions
 */
function checkErrors() {
  const errorBoxes = document.querySelectorAll(
    ".form-element-label span:last-child"
  );
  const countrySelector = document.querySelector("#country-input");
  const countryErrorBox = document.querySelector("#country-error");

  let isValid = true;
  errorBoxes.forEach((span) => {
    if (span.classList.contains("error-msg")) {
      isValid = false;
      return;
    }
  });

  if (countrySelector.value == "") {
    isValid = false;
    showErrorBox(countryErrorBox, "error-msg", "You need to select a country");
    toggleErrorInput(countrySelector, 1);
  }
  return isValid;
}

function logErrorMessage(inputId) {
  switch (inputId) {
    case 0:
      return "Error: Email is required.";
      break;
    case 1:
      return "Error: Password is required.";
      break;
    case 2:
      return "Error: Confirm Password is required.";
      break;
    case 3:
      return "Error: Zipcode is required.";
      break;
    // Add more cases as needed for other input IDs
    default:
      return `Error: Unknown input `;
  }
}

function checkAllInputsFilled() {
  const inputElements = document.querySelectorAll(".form-element-label input");
  const inputErrorBoxes = document.querySelectorAll(".error");
  let allInputsFilled = true;

  console.log(inputErrorBoxes);

  for (let i = 0; i < inputElements.length; i++) {
    console.log(i + " " + inputElements[i].value.trim());
    if (inputElements[i].value.trim() === "") {
      showErrorBox(inputErrorBoxes[i], "error error-msg", logErrorMessage(i));
      allInputsFilled = false;
    }
  }
  return allInputsFilled;
}

function isEmailValid(input) {
  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const isValid = input.value.length === 0 || emailRegExp.test(input.value);

  return isValid;
}
function isPasswordValid(passwordInput) {
  // A password needs:
  // At least 1 capital
  // At least 8 letters (including the capitals)
  // At least 1 special letter
  // At least 2 numbers
  let caps = 0;
  let spLetter = 0;
  let numbers = 0;

  const password = passwordInput.value;

  for (let i = 0; i < password.length; i++) {
    const char = password[i];

    if (char >= "A" && char <= "Z") {
      caps++;
    } else if (char >= "0" && char <= "9") {
      numbers++;
    } else if (/[!@#$%^&*(),.?":{}|<>]/.test(char)) {
      spLetter++;
    }
  }

  const isValid =
    numbers >= 2 && caps >= 1 && spLetter >= 1 && password.length >= 8;

  return isValid;
}

function getPasswordErrorMSG() {
  return "Password has to have At least 8 Digits, At least 1 capital letter, At least 1 special letter like: ! @ # $ % ^ &";
}

function isZipcodeValid(zipcode) {
  return zipcode.value.length >= 4;
}

function isCountryValid(countryInput) {
  return countryInput !== "";
}
/*
  = Support Functions
 */
function showErrorBox(errorBox, className, error_MSG = "") {
  errorBox.className = className;
  errorBox.textContent = error_MSG;
}
function hideErrorBox(errorBox) {
  // if there's a class, then hide/toggle the box
  if (errorBox.classList.length != 0) {
    errorBox.textContent = "";
    errorBox.classList.remove("error-msg");
  }
}

function toggleErrorInput(input, opt) {
  // opt = 1 --> show/there's an error
  // opt = 0 --> hide/there's no error

  if (opt === 1) {
    if (!input.classList.contains("invalid")) {
      input.classList.add("invalid");
    }
  } else {
    if (input.classList.contains("invalid")) {
      input.classList.remove("invalid");
    }
  }
}
