/*! chrview 2.1 by daymoe */
let currentData;
let currentChrDataOffset;
let currentTileData;
let currentTileAddr = 0;
let currentTileId = 0;
let currentPenColor = 0;
let chrDataOffset = 0;
let copyTileData = null;
let copyTileId = 0;

document.onclick = function () {
    document.getElementById("chrEditmeu").style.display = "none";
}

function IntoChrPage() {
    copyTileData = null;
    copyTileId = 0;
    ChrSelectColor();
    document.getElementById("chrCanvas").crossorigin = "";
    document.getElementById("selectedTileCanvas").crossorigin = "";
    document.getElementById("penCanvas").crossorigin = "";
    document.getElementById("PastTileCanvas").crossorigin = "";

    var PastTileCanvas_ = document.getElementById("PastTileCanvas");
    PastTileCanvas_.width = PastTileCanvas_.height = 0;
    PastTileCanvas_.width = PastTileCanvas_.height = 32;

    const chrPageSelect = document.getElementById('chrPageSelect');
    const chrSizeSelect = document.getElementById('chrSizeSelect');
    const chrCanvas = document.getElementById('chrCanvas');
    const tileInfo = document.getElementById('tileInfo');
    const selectedTileCanvas = document.getElementById('selectedTileCanvas');
    const penSelect = document.getElementById('penSelect');

    currentData = new Uint8Array(NesHex);
    chrDataOffset = (currentData[4] * 0x4000) + 0x10;
    const totalPages = (currentData.length - chrDataOffset) / 0x1000;
    currentChrDataOffset = chrDataOffset;

    chrPageSelect.innerHTML = '';
    for (let i = 0; i < totalPages; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `页码 ${i}`;
        chrPageSelect.appendChild(option);
    }

    chrPageSelect.addEventListener('change', (event) => {
        const pageIndex = parseInt(event.target.value);
        drawChrPage(currentData, chrDataOffset, pageIndex);
    });

    chrSizeSelect.addEventListener('change', (event) => {
        const pageIndex = parseInt(chrPageSelect.value);
        drawChrPage(currentData, chrDataOffset, pageIndex);
    });

    chrCanvas.addEventListener('mousedown', (event) => {
        const scaleFactor = chrCanvas.width / 128;
        const tileX = Math.floor(event.offsetX / (8 * scaleFactor));
        const tileY = Math.floor(event.offsetY / (8 * scaleFactor));
        const tileIndex = currentTileId = (tileY * 16) + tileX;
        const tileOffset = currentTileAddr = currentChrDataOffset + (parseInt(chrPageSelect.value) * 0x1000) + (tileIndex * 16);

        tileInfo.textContent = `Tile:0x${tileIndex.toString(16).padStart(2, '0').toUpperCase()} 地址:0x${tileOffset.toString(16).padStart(4, '0').toUpperCase()}`;

        currentTileData = currentData.slice(tileOffset, tileOffset + 16);
        ShowTileCode();
        drawSelectedTile(currentTileData);
    });

    chrCanvas.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        var menu = document.getElementById("chrEditmeu");
        menu.style.display = "block";
        menu.style.left = e.clientX + "px";
        menu.style.top = e.clientY + "px";
    });

    selectedTileCanvas.addEventListener('mousedown', (event) => {
        selectedTileCanvas_Click(event);
    });

    selectedTileCanvas.addEventListener('mousemove', (event) => {
        selectedTileCanvas_Click(event);
    });

    selectedTileCanvas.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        document.getElementById("chrEditmeu").style.display = "none";
        currentPenColor = (currentPenColor + 1) % 4;
        var penSelectselectedIndex = penSelect.selectedIndex + 1;
        if (penSelectselectedIndex >= 4) { penSelectselectedIndex = 0; }
        penSelect.selectedIndex = penSelectselectedIndex;
        drawPenCanvas();
    });

    penSelect.addEventListener('change', (event) => {
        currentPenColor = parseInt(event.target.selectedIndex);
        drawPenCanvas();
    });


    drawChrPage(currentData, chrDataOffset, 0);
    drawPenCanvas();

    ChrColorChange();
}

function ShowTileCode() {
    const tileCode = document.getElementById('tileCode');
    tileCode.innerHTML = "";
    for (var i = 0; i < currentTileData.length; i++) {
        tileCode.innerHTML += currentTileData[i].toString(16).padStart(2, '0').toUpperCase() + " ";
        if (i == 7) { tileCode.innerHTML += "<br>"; }
    }
}
function drawChrPage(data, chrDataOffset, pageIndex) {
    const chrSizeSelect = document.getElementById('chrSizeSelect');
    const chrCanvas = document.getElementById('chrCanvas');
    const tileInfo = document.getElementById('tileInfo');
    const ctx = chrCanvas.getContext('2d');

    const pageOffset = chrDataOffset + (pageIndex * 0x1000);
    const canvasSize = parseInt(chrSizeSelect.value);
    chrCanvas.width = canvasSize;
    chrCanvas.height = canvasSize;

    currentTileAddr = pageOffset + currentTileId * 0x10;
    currentTileData = currentData.slice(currentTileAddr, currentTileAddr + 16);
    tileInfo.textContent = `Tile:0x${currentTileId.toString(16).padStart(2, '0').toUpperCase()} 地址:(0x${currentTileAddr.toString(16).padStart(4, '0').toUpperCase()})`;
    ShowTileCode();
    drawSelectedTile(currentTileData);

    for (let tileY = 0; tileY < 16; tileY++) {
        for (let tileX = 0; tileX < 16; tileX++) {
            const tileIndex = (tileY * 16) + tileX;
            const tileOffset = pageOffset + (tileIndex * 16);

            for (let y = 0; y < 8; y++) {
                const lowByte = data[tileOffset + y];
                const highByte = data[tileOffset + y + 8];

                for (let x = 0; x < 8; x++) {
                    const bitLow = (lowByte >> (7 - x)) & 1;
                    const bitHigh = (highByte >> (7 - x)) & 1;
                    const colorIndex = (bitHigh << 1) | bitLow;
                    const grayScale = chrcolor[colorIndex];
                    ctx.fillStyle = ReturnNesColor(grayScale);
                    const scaleFactor = canvasSize / 128;
                    ctx.fillRect((tileX * 8 + x) * scaleFactor, (tileY * 8 + y) * scaleFactor, scaleFactor, scaleFactor);
                }
            }
        }
    }
}

function drawSelectedTile(tileData) {
    const selectedTileCanvas = document.getElementById('selectedTileCanvas');
    const selectedTileCtx = selectedTileCanvas.getContext('2d');

    for (let y = 0; y < 8; y++) {
        const lowByte = tileData[y];
        const highByte = tileData[y + 8];

        for (let x = 0; x < 8; x++) {
            const bitLow = (lowByte >> (7 - x)) & 1;
            const bitHigh = (highByte >> (7 - x)) & 1;
            const colorIndex = (bitHigh << 1) | bitLow;
            const grayScale = chrcolor[colorIndex];
            selectedTileCtx.fillStyle = ReturnNesColor(grayScale);
            selectedTileCtx.fillRect(x * 16, y * 16, 16, 16);
        }
    }
}
function selectedTileCanvas_Click(event) {
    if (event.buttons === 1) {
        const x = Math.floor(event.offsetX / 16);
        const y = Math.floor(event.offsetY / 16);
        const bitIndex = (y * 8) + x;

        const byteIndex = Math.floor(bitIndex / 8);
        const bitOffset = 7 - (bitIndex % 8);

        const selectedColor = currentPenColor;
        const lowBit = selectedColor & 1;
        const highBit = (selectedColor >> 1) & 1;

        currentTileData[byteIndex] = (currentTileData[byteIndex] & ~(1 << bitOffset)) | (lowBit << bitOffset);
        currentTileData[byteIndex + 8] = (currentTileData[byteIndex + 8] & ~(1 << bitOffset)) | (highBit << bitOffset);
        ShowTileCode();
        drawSelectedTile(currentTileData);
    }
}

function drawPenCanvas() {
    const penCanvas = document.getElementById('penCanvas');
    const penCtx = penCanvas.getContext('2d');
    const selectedColor = currentPenColor;
    const grayScale = chrcolor[selectedColor];
    penCtx.fillStyle = ReturnNesColor(grayScale);
    penCtx.fillRect(0, 0, 32, 32);
}
function writeTileData() {
    const chrPageSelect = document.getElementById('chrPageSelect');
    for (var i = 0; i < 0x10; i++) {
        currentData[currentTileAddr + i] = currentTileData[i];
    }
    const pageIndex = parseInt(chrPageSelect.value);
    drawChrPage(currentData, chrDataOffset, pageIndex);
    NesHex = currentData;
    alertMsg("#isfileload", "green", "Tile数据已更改~");
}
var chrcolor = [0x0F, 0x07, 0x28, 0x39];
function ChrColorChange() {
    chrcolor = [$('#ChrColor1').get(0).selectedIndex, $('#ChrColor2').get(0).selectedIndex, $('#ChrColor3').get(0).selectedIndex, $('#ChrColor4').get(0).selectedIndex];
    ChrSelectColor();
    const pageIndex = parseInt(chrPageSelect.value);
    drawChrPage(currentData, chrDataOffset, pageIndex);
    const penSelect = document.getElementById('penSelect');
    for (var i = 0; i < penSelect.childNodes.length; i++) {
        var colorse = document.getElementById("ChrColor" + (i + 1));
        var colorseindex = colorse.selectedIndex;
        penSelect.options[i].value = colorse.options[colorseindex].value;
        penSelect.options[i].text = colorse.options[colorseindex].text;
    }
    drawPenCanvas();
}

function CopyTileData() {
    copyTileData = currentTileData;
    copyTileId = currentTileId;
    alertMsg("#isfileload", "green", "Tile:" + copyTileId.toString(16).padStart(2, '0').toUpperCase() + " 数据已复制到剪切板~");

    const pastTileCanvas = document.getElementById('PastTileCanvas');
    const pastTileCtx = pastTileCanvas.getContext('2d');

    for (let y = 0; y < 8; y++) {
        const lowByte = copyTileData[y];
        const highByte = copyTileData[y + 8];

        for (let x = 0; x < 8; x++) {
            const bitLow = (lowByte >> (7 - x)) & 1;
            const bitHigh = (highByte >> (7 - x)) & 1;
            const colorIndex = (bitHigh << 1) | bitLow;
            const grayScale = chrcolor[colorIndex];
            pastTileCtx.fillStyle = ReturnNesColor(grayScale);
            pastTileCtx.fillRect(x * 4, y * 4, 4, 4);
        }
    }
}

function PastTileData() {
    if (copyTileData == null) {
        alertMsg("#isfileload", "red", "剪切板没有数据!");
    }
    else {
        for (var i = 0; i < 0x10; i++) {
            currentData[currentTileAddr + i] = copyTileData[i];
        }
        alertMsg("#isfileload", "green", "Tile:" + currentTileId.toString(16).padStart(2, '0').toUpperCase() + " 数据已成功被覆盖~");//<br>注意:你还需点击 [应用Tile数据更改] 
        const pageIndex = parseInt(chrPageSelect.value);
        drawChrPage(currentData, chrDataOffset, pageIndex);
    }
}