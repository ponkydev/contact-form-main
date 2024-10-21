
// Getting all the elements from html
let form = document.getElementById("form");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let email = document.getElementById("email");
const queryTypes = document.querySelectorAll("input[name='query-type']")
let msg = document.getElementById("message");
let consent = document.getElementById("consent");
let submitBtn = document.getElementById("formBtn"); 
let successMsg = document.querySelector(".success-msg");

// Getting query selected
let selectedQuery;

let findSelectedRadio = () => {

    queryTypes.forEach(queryType => {
        let container = document.getElementById(`${queryType.value}-container`);
        if (container) {
            container.style.backgroundColor = "";
        }
    });

    let selectedRadio = document.querySelector("input[name='query-type']:checked").value;

    if (selectedRadio) {
        selectedQuery = selectedRadio;
        let queryContainer = document.getElementById(`${selectedQuery}-container`);
        queryContainer.style.backgroundColor = "hsl(148, 38%, 91%)";
    } else {
        selectedQuery = null;
    }

} 

queryTypes.forEach(queryType => {
    queryType.addEventListener("change", findSelectedRadio);
})

// Getting error msgs
let firstNameErrorMsg = document.querySelector(".error-msg-name");
let lastNameErrorMsg = document.querySelector(".error-msg-last-name");
let emailErrorMsg = document.querySelector(".error-msg-email");
let queryTypeErrorMsg = document.querySelector(".error-msg-query");
let messageErrorMsg = document.querySelector(".error-msg-message");
let consentErrorMsg = document.querySelector(".error-msg-consent");

// Validating the form
form.addEventListener("submit", event => {
    event.preventDefault();

    let isValid = true;

    let regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    // Function that validates text fields
    const validateField = (field, errorMsg, minLength) => {
        if (field.value.length < minLength) {
            errorMsg.style.display = "block";
            field.style.borderColor = "red";

            isValid = false;
        } else {
            errorMsg.style.display = "";
            field.style.borderColor = "";
        }
    }
    
    // Validating firstname and lastname
    validateField(firstName, firstNameErrorMsg, 2);
    validateField(lastName, lastNameErrorMsg, 4);
    
    // Validating email
    if (!regexEmail.test(email.value)) {
        emailErrorMsg.style.display = "block";
        email.style.borderColor = "red";
        
        isValid = false;
    } else {
        emailErrorMsg.style.display = "";
        email.style.borderColor = "";
    }

    // Validating query type
    if (selectedQuery == null) {
        queryTypeErrorMsg.style.display = "block";

        isValid = false;
    } else {
        queryTypeErrorMsg.style.display = "";
    }

    // Validating message
    validateField(msg, messageErrorMsg, 10);

    // Validating consent
    if (!consent.checked) {
        consentErrorMsg.style.display = "block";
    
        isValid = false;
    } else {
        consentErrorMsg.style.display = "";
    }

    if(isValid) {
        successMsg.classList.add("success-msg-display");
        setTimeout(() => {
            successMsg.classList.remove("success-msg-display");
        }, 3000);

        form.reset();

        findSelectedRadio();
    }
})