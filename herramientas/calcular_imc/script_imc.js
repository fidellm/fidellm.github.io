/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('calculator-form');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value) / 100; // Convertir altura a metros

        if (isNaN(weight) || isNaN(height) || height === 0) {
            resultDiv.textContent = 'Por favor, ingresa valores válidos.';
            return;
        }

        const bmi = weight / (height * height);
        let message = '';

        if (bmi < 18.5) {
            message = 'Insuficiencia de peso';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            message = 'Peso saludable';
        } else if (bmi >= 25 && bmi < 29.9) {
            message = 'Sobrepeso';
        } else {
            message = 'Obesidad';
        }

        resultDiv.textContent = `Tu IMC es: ${bmi.toFixed(2)}. ${message}`;
    });
});