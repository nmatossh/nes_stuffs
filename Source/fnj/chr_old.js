/*! chrview 1.0 by daymoe */
var m_CHRBASE = 16;//
var chrcolor = [0x0F, 0x07, 0x28, 0x39];

function BindCHRDataAndHTML() {
    m_CHRBASE = NesHex[5] * 0x4000;
    var IC = (NesHex.length - m_CHRBASE) / 0x1000;
    $('#CHRSELECT').html("");
    for (var i = 0; i < IC - 1; i++) { $("#CHRSELECT").append("<option value='" + (m_CHRBASE + i * 0x1000 + 0x10) + "'>" + i + "</option>"); }
    ChrColorChange();
}
function ChrColorChange() {
    chrcolor = [$('#ChrColor1').get(0).selectedIndex, $('#ChrColor2').get(0).selectedIndex, $('#ChrColor3').get(0).selectedIndex, $('#ChrColor4').get(0).selectedIndex];
    ViewTiles(); ChrSelectColor();
}
function GetTile() {
    var TileOffset = m_CHRBASE + $('#CHRSELECT').get(0).selectedIndex * 0x1000 + 0x10 + $('#CHRTile').get(0).selectedIndex * 0x10;
    let CGimg = document.getElementById("TileID");
    let CGcanvas = document.createElement('canvas');
    CGcanvas.width = 40; CGcanvas.height = 40;
    var CGctx = CGcanvas.getContext('2d');
    CGctx.drawImage(CGimg, 0, 0);
    var CGimageData = CGctx.getImageData(0, 0, CGimg.width, CGimg.height);
    var CGdata = CGimageData.data; var X = 0; var Y = 0; var bin = 5; //放大比例
    BingTile(X, Y, TileOffset, bin, CGdata, 0);
    CGctx.putImageData(CGimageData, 0, 0);
    CGimg.src = CGcanvas.toDataURL("image/png");
    var Tilehe = "<br>";
    for (var x = 0; x < 16; x++) { Tilehe += addPreZero(NesHex[TileOffset + x].toString(16).toUpperCase()) + " "; if (x == 7) { Tilehe += "<br>"; } }
    $('#tilespan').html(Tilehe);
}

function BingTile(X, Y, TileOffset, bin, CGdata, TileCount) {
    var num = 1; var num2 = TileOffset; var clents = bin * 8 * 4; var num3 = 0;
    for (var i = 0; i <= 7; i += num) {
        num3 = 0;
        for (var j = 7; j >= 0; j += -1) {
            var b = NesHex[num2]; var b2 = NesHex[num2 + 8];
            b = (b >> j); b2 = (b2 >> j); b = (b & 1); b2 = (b2 & 1); b2 = (b2 << 1);
            var num4 = (b + b2); num4 *= 63;
            switch (num4) {
                case 0x00: for (var o = 0; o < bin; o++) { for (var k = 0; k < bin; k++) { CheckNum_(((i * bin + TileCount) * clents) + Y + o * clents + (X * clents) + num3 * 4 + (k * 4) + 0, CGdata, chrcolor[0]); } } break;
                case 0x3F: for (var o = 0; o < bin; o++) { for (var k = 0; k < bin; k++) { CheckNum_(((i * bin + TileCount) * clents) + Y + o * clents + (X * clents) + num3 * 4 + (k * 4) + 0, CGdata, chrcolor[1]); } } break;
                case 0x7E: for (var o = 0; o < bin; o++) { for (var k = 0; k < bin; k++) { CheckNum_(((i * bin + TileCount) * clents) + Y + o * clents + (X * clents) + num3 * 4 + (k * 4) + 0, CGdata, chrcolor[2]); } } break;
                case 0xBD: for (var o = 0; o < bin; o++) { for (var k = 0; k < bin; k++) { CheckNum_(((i * bin + TileCount) * clents) + Y + o * clents + (X * clents) + num3 * 4 + (k * 4) + 0, CGdata, chrcolor[3]); } } break;
            }
            num3 += bin;
        }
        num2++;
    }
}

function CheckNum_(C, CGdata, COR) { CGdata[C + 0] = nespal[COR * 3 + 0]; CGdata[C + 1] = nespal[COR * 3 + 1]; CGdata[C + 2] = nespal[COR * 3 + 2]; }

function ViewTiles() {
    document.getElementById("Chrimg").crossorigin = "";
    var iOffset = m_CHRBASE + $('#CHRSELECT').get(0).selectedIndex * 0x1000 + 0x10;
    let CGimg = document.getElementById("Chrimg");
    let CGcanvas = document.createElement('canvas');
    CGcanvas.width = 256; CGcanvas.height = 256;
    var CGctx = CGcanvas.getContext('2d');
    CGctx.drawImage(CGimg, 0, 0);
    var CGimageData = CGctx.getImageData(0, 0, CGimg.width, CGimg.height);
    var CGdata = CGimageData.data;
    var num = 16; var num2 = 256; var num3 = 0; var num4 = num2 / num; var num5 = 0;
    if (num4 > 16) { num4 = 15; }
    var num6 = 15;
    if (num4 == 1) { num6 = num2 - 1; }
    for (var i = 0; i <= num4 - 1; i++) { var num7 = 0; while (num7 <= num6 && num5 != num2) { DrawTile(CGdata, iOffset + num3, num7 * 16, i * 16); num5++; num3 += 16; num7++; } }
    CGctx.putImageData(CGimageData, 0, 0);
    CGimg.src = CGcanvas.toDataURL("image/png");
    GetTile();
}

function DrawTile(CGdata, Offset, X, Y) {
    var num = 2; var num2 = Offset;
    if (num2 >= NesHex.length) { return; }
    var num3 = X;
    for (var i = 0; i <= 15; i += num) {
        X = num3;
        for (var j = 7; j >= 0; j += -1) {
            var b = NesHex[num2]; var b2 = NesHex[num2 + 8];
            b = (b >> j); b2 = (b2 >> j); b = ((b & 1)); b2 = ((b2 & 1)); b2 = (b2 << 1);
            var num4 = (b + b2); num4 *= 63;
            switch (num4) {
                case 0x00: for (var w = 0; w < 2; w++) { for (var z = 0; z < 2; z++) { CheckNum_(((Y + i + w) * 256) * 4 + X * 4 + (z * 4) + 0, CGdata, chrcolor[0]); } } break;
                case 0x3F: for (var w = 0; w < 2; w++) { for (var z = 0; z < 2; z++) { CheckNum_(((Y + i + w) * 256) * 4 + X * 4 + (z * 4) + 0, CGdata, chrcolor[1]); } } break;
                case 0x7E: for (var w = 0; w < 2; w++) { for (var z = 0; z < 2; z++) { CheckNum_(((Y + i + w) * 256) * 4 + X * 4 + (z * 4) + 0, CGdata, chrcolor[2]); } } break;
                case 0xBD: for (var w = 0; w < 2; w++) { for (var z = 0; z < 2; z++) { CheckNum_(((Y + i + w) * 256) * 4 + X * 4 + (z * 4) + 0, CGdata, chrcolor[3]); } } break;
            }
            X += num;
        }
        num2++;
    }
}