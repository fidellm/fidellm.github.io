function binaryToText() {
  
 
    const binaryInput = document.getElementById("binary-input").value;
      
     
    const output = document.getElementById("output");
        
      
    try {
        
       
    const text = binaryToString(binaryInput);
        output.
       
    value = text;
      } 
     
    catch (error) {
        output.
       
    value = "Error: Ingresa un código binario válido.";
      }
    }
    
    function binaryToString(binary) {
      
     
    const binaryArray = binary.split(" ");
      
     
    const textArray = binaryArray.map(bin => String.fromCharCode(parseInt(bin, 2)));
      
     
    return textArray.join("");
    }
  
  function textToBinary() {
    const textInput = document.getElementById("text-input").value;
    const output = document.getElementById("output");
  
    const binary = stringToBinary(textInput);
    output.value = binary;
  }
  
  function stringToBinary(text) {
    const binaryArray = [];
    for (let i = 0; i < text.length; i++) {
      const binary = text[i].charCodeAt(0).toString(2).padStart(8, '0');
      binaryArray.push(binary);
    }
    return binaryArray.join(" ");
  }


  const morseCodeMap = {
    '.-': 'A',
    '-...': 'B',
    '-.-.': 'C',
    '-..': 'D',
    '.': 'E',
    '..-.': 'F',
    '--.': 'G',
    '....': 'H',
    '..': 'I',
    '.---': 'J',
    '-.-': 'K',
    
   
  '.-..': 'L',
    '--': 'M',
    '-.': 'N',
    '---': 'O',
    '.--.': 'P',
    '--.-': 'Q',
    '.-.': 'R',
    '...': 'S',
    '-': 'T',
    '..-': 'U',
    '...-': 'V',
    '.--': 'W',
    '-..-': 'X',
    '-.--': 'Y',
    '--..': 'Z',
    '.----': '1',
    '..---': '2',
    '...--': '3',
    '....-': '4',
    '.....': '5',
    '-....': '6',
    '--...': '7',
    '---..': '8',
    '----.': '9',
    '-----': '0',
    '/': ' ',
    ' ': ' ',
  };
  
  function morseToText() {
    const morseInput = document.getElementById("morse-input").value;
    const output = document.getElementById("output");
    
    try {
      const text = convertMorseToText(morseInput);
      output.value = text;
    } catch (error) {
      output.value = "Error: Ingresa un código Morse válido.";
    }
  }
  
  function textToMorse() {
    const textInput = document.getElementById("text-input").value;
    const output = document.getElementById("output");
  
    const morseCode = convertTextToMorse(textInput);
    output.value = morseCode;
  }
  
  function convertMorseToText(morseCode) {
    const morseArray = morseCode.trim().split(" ");
    
   
  const textArray = morseArray.map(code => morseCodeMap[code] || '').filter(Boolean);
    return textArray.join("");
  }
  
  function convertTextToMorse(text) {
    const textArray = text.toUpperCase().split("");
    
   
  const morseArray = textArray.map(char => {
      if (char === ' ') {
        return '/';
      } else {
        const morseCode = Object.keys(morseCodeMap).find(key => morseCodeMap[key] === char);
        return morseCode || '';
      }
    });
    return morseArray.join(" ");
  }








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