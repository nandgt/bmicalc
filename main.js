const calculatorForm = document.querySelector(".calculator__form");

const getHeightUnit = () =>
    document.querySelector("#calculator-input__height").dataset.unit;

const getWeightUnit = () =>
    document.querySelector("#calculator-input__weight").dataset.unit;

const toggleHeightUnit = () => {
    const heightInput = document.querySelector("#calculator-input__height");
    const toggleButton = document.querySelector("#toggle-height-unit");
    
    if (heightInput.value != "") {
        if (getHeightUnit() == "cm") {
            heightInput.value = (heightInput.value / 2.54).toFixed(2);
        } else {
            heightInput.value = (heightInput.value * 2.54).toFixed(2);
        }
    }

    heightInput.dataset.unit = getHeightUnit() == "cm" ? "in" : "cm";
    toggleButton.innerHTML = `
        <p>${heightInput.dataset.unit}</p>
        <img src="images/switch.png" />
    `;
};

const toggleWeightUnit = () => {
    const weightInput = document.querySelector("#calculator-input__weight");
    const toggleButton = document.querySelector("#toggle-weight-unit");
    
    if (weightInput.value != "") {
        if (getWeightUnit() == "kg") {
            weightInput.value = (weightInput.value * 2.2046).toFixed(2);
        } else {
            weightInput.value = (weightInput.value / 2.2046).toFixed(2);
        }
    }

    weightInput.dataset.unit = getWeightUnit() == "kg" ? "lb" : "kg";
    toggleButton.innerHTML = `
        <p>${weightInput.dataset.unit}</p>
        <img src="images/switch.png" />
    `;
};

const calculateBMI = () => {
    let height = document.querySelector("#calculator-input__height").value;
    let weight = document.querySelector("#calculator-input__weight").value;

    if (getHeightUnit() == "in") {
        height = (height * 2.54).toFixed(2);
    }

    if (getWeightUnit() == "lb") {
        weight = (weight / 2.2046).toFixed(2);
    }

    return weight / (height / 100) ** 2
};

const classifyBMI = (bmi) => {
    if (bmi < 18) return "Underweight";
    if (bmi > 17 && bmi < 24) return "Normal";
    if (bmi > 24 && bmi < 29) return "Overweight";
    if (bmi > 29 && bmi < 39) return "Obese";
    if (bmi > 39) return "Extremely Obese";
};

const drawResults = () => {
    const calculatorResults = document.querySelector(".calculator__results");
    const bmi = (calculateBMI()).toFixed(2);
    calculatorResults.innerHTML = `
    <h2>Results:</h2>
    <p>BMI: ${bmi} kg/m²</p>
    <p>You are ${classifyBMI(bmi)}!</p>
    `;
};

calculatorForm.onsubmit = (event) => {
    event.preventDefault();
    drawResults();
};