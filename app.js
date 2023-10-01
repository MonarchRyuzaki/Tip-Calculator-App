// Get references to the radio inputs and the custom number input
const radioInputs = document.querySelectorAll('input[type="radio"]');
const customInput = document.getElementById('custom');

// Add event listeners to radio inputs
radioInputs.forEach(input => {
    input.addEventListener('change', () => {
        // If a radio input is selected, uncheck the custom input
        customInput.value = '';
    });
});

// Add event listener to the custom number input
customInput.addEventListener('input', () => {
    // If a value is entered in the custom input, uncheck all radio inputs
    radioInputs.forEach(input => {
        input.checked = false;
    });
});

const form = document.querySelector('form');
const btn = document.querySelector('#submit');
const reset = document.querySelector('#reset');
const errorMsg = document.querySelectorAll('.error-message');
const inputGrp = document.querySelectorAll('.input-group');
const arr = [form.elements[0], form.elements[7]];

// Get a reference to the input element
const inputElement = document.getElementById('amt'); // Replace 'amt' with the actual ID of your input element
const inputElement1 = document.getElementById('num');

function addFocusBlurEvents(inputElement) {
    // Add an event listener to the input element for the 'focus' event
    inputElement.addEventListener('focus', () => {
        // Get a reference to the parent element with class 'input-group'
        const inputGroup = inputElement.closest('.input-group');
        // Apply a border to the input-group
        inputGroup.style.border = '2px solid var(--Strongcyan)'; // Adjust the color and style as needed
    });

    // Add an event listener to the input element for the 'blur' event (to remove the border when focus is lost)
    inputElement.addEventListener('blur', () => {
        // Get a reference to the parent element with class 'input-group'
        const inputGroup = inputElement.closest('.input-group');
        // Remove the border from the input-group
        inputGroup.style.border = 'none';
    });
}
addFocusBlurEvents(inputElement);
addFocusBlurEvents(inputElement1);

const formElementsArray = [...form.elements];
const tip = formElementsArray.slice(1, 6);
const total = document.querySelector('.val');
const perPerson = document.querySelector('.phv');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    var canCalculate = true;
    for (let i = 0; i < arr.length; i++) {
        if (!arr[0].value) {
            errorMsg[0].classList.remove('hide');
            inputGrp[0].classList.add('warning');
            canCalculate = false;
        } else {
            errorMsg[0].classList.add('hide');
            inputGrp[0].classList.remove('warning');
            canCalculate = true;
        }
        if (!arr[1].value) {
            errorMsg[2].classList.remove('hide');
            inputGrp[1].classList.add('warning');
            canCalculate = false;
        } else {
            errorMsg[2].classList.add('hide');
            inputGrp[1].classList.remove('warning');
            canCalculate = true;
        }
    }
    var flag = false;
    for (let i = 0; i<tip.length; i++){
        if (tip[i].checked) flag = true;
    }
    if (formElementsArray[6].value){
        flag = true;    
    }
    if (flag === false){
        errorMsg[1].classList.remove('hide');
        canCalculate = false;
    }
    if (flag === true){
        errorMsg[1].classList.add('hide');
        canCalculate = true;
    }
    if (canCalculate){
        var bill = arr[0].value;
        var ppl = arr[1].value;
        var tipP = 0;
        for (let i = 0; i<tip.length; i++){
            if (tip[i].checked){
                tipP = parseInt(tip[i].value);
            }
        }
        if (formElementsArray[6].value){
            tipP = parseInt(formElementsArray[6].value); 
        }
        total.innerText = (bill*tipP)/100;
        perPerson.innerText = total.innerText/ppl;
        arr[0].disabled = true;
        arr[1].disabled = true;
    }
})

reset.addEventListener('click', (e) => {
    e.preventDefault();
    arr[0].value="";
    arr[0].disabled=false;
    arr[1].value="";
    arr[1].disabled=false;
    for (let i = 0; i<tip.length; i++){
        tip[i].disabled = false;
        tip[i].checked = false;
    }
    formElementsArray[6].disabled = false;
    formElementsArray[6].value = "";
    total.innerText = "0.00";
    perPerson.innerText = "0.00";
})