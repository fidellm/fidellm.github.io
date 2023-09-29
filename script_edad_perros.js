

document.addEventListener('DOMContentLoaded', function () {
    const calculateButton = document.getElementById('calculateButton');
    const dogAgeInput = document.getElementById('dogAge');
    const dogSizeSelect = document.getElementById('dogSize');
    const resultDiv = document.getElementById('result');

    calculateButton.addEventListener('click', function () {
        const dogAge = parseFloat(dogAgeInput.value);
        const dogSize = dogSizeSelect.value;
        let humanAge;

        if (dogSize === 'pequeno') {
            if (dogAge <= 2) {
                humanAge = dogAge * 12;
            } else {
                humanAge = 24 + (dogAge - 2) * 4;
            }
        } else {
            if (dogAge <= 2) {
                humanAge = dogAge * 10.5;
            } else {
                humanAge = 21 + (dogAge - 2) * 4;
            }
        }

        resultDiv.textContent = `La edad de tu perro en años humanos es aproximadamente ${humanAge} años.`;
    });
});