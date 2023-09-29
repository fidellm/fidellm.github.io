

document.addEventListener('DOMContentLoaded', function () {
    const qrText = document.getElementById('qr-text');
    const generateButton = document.getElementById('generate-button');
    const qrCode = document.getElementById('qr-code');

    generateButton.addEventListener('click', function () {
        const text = qrText.value;
        if (text.trim() !== '') {
            // Crear un nuevo objeto QRCode
            const qrcode = new QRCode(qrCode, {
                text: text,
                width: 128,
                height: 128
            });

            // Capturar la imagen QR con html2canvas
            html2canvas(qrCode).then(function(canvas) {
                // Agregar la imagen capturada al DOM
                qrCode.innerHTML = '';
                qrCode.appendChild(canvas);

                // Agregar un enlace de descarga
                const downloadLink = document.createElement('a');
                downloadLink.href = canvas.toDataURL('image/png');
                downloadLink.download = 'codigo-qr.png';
                downloadLink.innerText = 'Descargar Imagen QR';
                qrCode.appendChild(downloadLink);
            });
        }
    });
});