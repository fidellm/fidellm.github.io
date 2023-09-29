

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