

document.addEventListener('DOMContentLoaded', function () {
    const qrText = document.getElementById('qr-text');
    const generateButton = document.getElementById('generate-button');
    const qrCode = document.getElementById('qr-code');

    generateButton.addEventListener('click', function () {
        const text = qrText.value;
        if (text.trim() !== '') {
            // Crear un nuevo objeto QRCode
            const qrcode = Image(new QRCode(qrCode, {
                text: text,
                width: 128,
                height: 128
            }));
        }
    });
});