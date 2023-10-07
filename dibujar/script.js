document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');
    const brushColor = document.getElementById('brush-color');
    const brushSize = document.getElementById('brush-size');
    const undoButton = document.getElementById('undo-button');
    const fillButton = document.getElementById('fill-button');
    
    let drawing = false;
    let strokeColor = brushColor.value;
    let strokeWidth = brushSize.value;
    let strokes = [];

    function startDrawing(e) {
        drawing = true;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    function draw(e) {
        if (!drawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.lineCap = 'round';

        ctx.lineTo(x, y);
        ctx.stroke();
    }

    function endDrawing() {
        drawing = false;
        strokes.push({ color: strokeColor, size: strokeWidth });
        ctx.closePath();
    }

    function changeColor() {
        strokeColor = brushColor.value;
    }

    function changeSize() {
        strokeWidth = brushSize.value;
    }

    function undoLastStroke() {
        if (strokes.length > 0) {
            strokes.pop();
            redrawCanvas();
        }
    }

    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        strokes.forEach(stroke => {
            ctx.strokeStyle = stroke.color;
            ctx.lineWidth = stroke.size;
            ctx.lineCap = 'round';
            ctx.beginPath();
            for (let i = 1; i < stroke.points.length; i++) {
                const p1 = stroke.points[i - 1];
                const p2 = stroke.points[i];
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
            ctx.closePath();
        });
    }

    function fillArea(x, y) {
        const pixelStack = [{ x: x, y: y }];
        const targetColor = ctx.getImageData(x, y, 1, 1).data;
        const fillColor = strokeColorRgb();
        if (targetColor[0] === fillColor[0] && targetColor[1] === fillColor[1] && targetColor[2] === fillColor[2]) {
            return;
        }

        while (pixelStack.length) {
            const newPos = pixelStack.pop();
            const x = newPos.x;
            let y = newPos.y;
            let reachLeft = false;
            let reachRight = false;

            while (y >= 0 && matchStartColor(targetColor, x, y)) {
                y--;
            }
            y++;

            while (y < canvas.height && matchStartColor(targetColor, x, y)) {
                ctx.fillStyle = strokeColor;
                ctx.fillRect(x, y, 1, 1);

                if (x > 0) {
                    if (matchStartColor(targetColor, x - 1, y)) {
                        if (!reachLeft) {
                            pixelStack.push({ x: x - 1, y: y });
                            reachLeft = true;
                        }
                    } else if (reachLeft) {
                        reachLeft = false;
                    }
                }

                if (x < canvas.width - 1) {
                    if (matchStartColor(targetColor, x + 1, y)) {
                        if (!reachRight) {
                            pixelStack.push({ x: x + 1, y: y });
                            reachRight = true;
                        }
                    } else if (reachRight) {
                        reachRight = false;
                    }
                }

                y++;
            }
        }
    }

    function strokeColorRgb() {
        const hexColor = strokeColor.replace(/^#/, '');
        const bigint = parseInt(hexColor, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return [r, g, b];
    }

    function matchStartColor(targetColor, x, y) {
        const imageData = ctx.getImageData(x, y, 1, 1).data;
        return (
            imageData[0] === targetColor[0] &&
            imageData[1] === targetColor[1] &&
            imageData[2] === targetColor[2] &&
            imageData[3] === targetColor[3]
        );
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDrawing);
    canvas.addEventListener('mouseout', endDrawing);
    brushColor.addEventListener('input', changeColor);
    brushSize.addEventListener('input', changeSize);
    undoButton.addEventListener('click', undoLastStroke);
    fillButton.addEventListener('click', () => fillArea(canvas.width / 2, canvas.height / 2));

    
    // ... (código previo)

    const bucketButton = document.getElementById('bucket-button');
    let filling = false; // Bandera para indicar si la función de balde está activa

    function startFilling() {
        filling = true;
    }

    function fill(e) {
        if (filling) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Obtén el color del pixel en la posición del ratón
            const pixelColor = getPixelColor(x, y);

            if (pixelColor !== strokeColor) {
                // Llama al algoritmo de inundación para rellenar el área
                floodFill(x, y, pixelColor);
            }
        }
    }

    function endFilling() {
        filling = false;
    }

    function getPixelColor(x, y) {
        const pixelData = ctx.getImageData(x, y, 1, 1).data;
        return `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
    }

    function floodFill(x, y, targetColor) {
        const pixelStack = [{ x: x, y: y }];
        const canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const fillColor = strokeColor;

        while (pixelStack.length > 0) {
            const currentPixel = pixelStack.pop();
            const { x, y } = currentPixel;

            if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;

            const pixelIndex = (y * canvas.width + x) * 4;
            const currentColor = `rgb(${canvasData.data[pixelIndex]}, ${canvasData.data[pixelIndex + 1]}, ${canvasData.data[pixelIndex + 2]})`;

            if (currentColor === targetColor) {
                canvasData.data[pixelIndex] = fillColor[0];
                canvasData.data[pixelIndex + 1] = fillColor[1];
                canvasData.data[pixelIndex + 2] = fillColor[2];

                pixelStack.push({ x: x + 1, y: y });
                pixelStack.push({ x: x - 1, y: y });
                pixelStack.push({ x: x, y: y + 1 });
                pixelStack.push({ x: x, y: y - 1 });
            }
        }

        ctx.putImageData(canvasData, 0, 0);
    }

    // ... (otros manejadores de eventos)

    // Agrega los manejadores de eventos para la función de balde
    bucketButton.addEventListener('mousedown', startFilling);
    canvas.addEventListener('mousemove', fill);
    canvas.addEventListener('mouseup', endFilling);
});




