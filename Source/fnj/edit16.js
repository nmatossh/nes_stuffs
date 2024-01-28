$(document).ready(function () {
    BulidEdit16TabHtml();
});

function hex2int(hex) {
    var len = hex.length,
        a = new Array(len),
        code;
    for (var i = 0; i < len; i++) {
        code = hex.charCodeAt(i);
        if (48 <= code && code < 58) {
            code -= 48;
        } else {
            code = (code & 0xdf) - 65 + 10;
        }
        a[i] = code;
    }

    return a.reduce(function (acc, c) {
        acc = 16 * acc + c;
        return acc;
    }, 0);
}

function LoadHex16() {
    //@"\b(0[xX])?[A-Fa-f0-9]+\b";
    var ff = $("#offEditNo").val();
    /*	var offtd=ff;
        if(offtd.length>1)
            {
            offtd.substr(offtd.length-1,1);
            }*/
    ff = hex2int(ff);
    $("#HexPreView").empty();
    var budHexHtml = "";
    budHexHtml += "<table id='Edit16ViewTabs' style='border:1px solid #090;border-radius: 3px;'>";
    budHexHtml += "<tr>";
    budHexHtml += "<td><pre>Offset:</pre></td>";
    for (var i = 0; i <= 0x0F; i++) {
        //budHexHtml+="<td>"+addPreZero((i).toString(16).toUpperCase())+"</td>";
        budHexHtml += "<td><pre>0" + addPreZero((ff + i).toString(16).toUpperCase()).substring(1) + "</pre></td>";
    }
    budHexHtml += "</tr>";
    for (var i = 0; i <= 0x0F; i++) {
        budHexHtml += "<tr>";
        var defid = i + ff;
        var topoff = addPreZero2((defid + i * 0x0F).toString(16), 6);
        //budHexHtml+="0x"+topoff.toUpperCase()+"0:";
        budHexHtml += "<td><pre>" + "" + topoff.toUpperCase() + ":" + "</pre></td>";
        for (var w = 0; w <= 0x0F; w++) {
            var oftdtd = ff + (i * 0x10) + w;
            var bhex = addPreZero(NesHex[oftdtd].toString(16).toUpperCase());
            budHexHtml += "<td onclick='GetRditAddr(this)' offset='" + oftdtd + "' ><pre>" + bhex + "</pre></td>";
            /*		if(w==0x0F)
                    {
                        budHexHtml+=bhex+"<br>";
                    }
                    else
                    {
                        budHexHtml+=bhex+" ";
                    }*/
        }
        budHexHtml += "</tr>";
    }

    budHexHtml += "</table>";
    $("#HexPreView ").html(budHexHtml);
    $("#HexPreView td").css({
        "font-size": defEditFontSize
    });
    $("#HexPreView table").css({
        "font-size": defEditFontSize
    });
    $("#HexPreView tr").css({
        "font-size": defEditFontSize
    });
    $("#HexPreView").css('font-size', defEditFontSize);
}

function NextHexData(nexttype) {
    var ff = $("#offEditNo").val();
    ff = hex2int(ff);
    if (nexttype == 0) {
        ff = ff - 0x100;
    } else {
        ff = ff + 0x100;
    }
    if (ff < 0) {
        $("#offEditNo").val(0);
        return;
    }
    $("#offEditNo").val(ff.toString(16).toUpperCase());
    LoadHex16();
}

function HexFontSize(fonttype) {
    //$("#HexPreView")
    var cssfontSize = $("#HexPreView").css('font-size'); // 
    //alert(cssfontSize);
    var unit = cssfontSize.replace("px", "");
    unit = parseInt(unit);
    if (unit <= 5 && fonttype == 1) {
        alert("太小啦....");
        return;
    }
    if (unit >= 28 && fonttype == 0) {
        alert("太大啦....");
        return;
    }
    if (fonttype == 0) {
        unit = unit + 1;
    } else {
        unit = unit - 1;
    }
    defEditFontSize = unit + 'px';
    $("#HexPreView td").css({
        "font-size": unit + 'px'
    });
    $("#HexPreView table").css({
        "font-size": unit + 'px'
    });
    $("#HexPreView tr").css({
        "font-size": unit + 'px'
    });
    $("#HexPreView div").css({
        "font-size": unit + 'px'
    });
    $("#HexPreView pre").css({
        "font-size": unit + 'px'
    });
    $("#HexPreView").css('font-size', unit + 'px');
}

var defEditFontSize = "12px";

function BulidEdit16TabHtml() {
    $("#Edit16Tab ").empty();
    var edit16html = "";
    edit16html += "<button onclick='LoadHex16()'>读取/刷新</button> ";
    edit16html += "<button onclick='NextHexData(0)'>↑(-0x100)</button> <button onclick='NextHexData(1)'>↓(+0x100)</button><br>";
    edit16html += "<span style='color:red;'>数据地址:</span><input type='text' style='width:60px;' id='offEditNo' value='0'>";
    edit16html += " <button onclick='HexFontSize(0)'>放大文本</button> <button onclick='HexFontSize(1)'>缩小文本</button>(可能无效)";
    edit16html += "<div>";
    edit16html += "<div id='HexPreView' style='font-size:12px;'></div>";
    edit16html += "<span>目标地址:</span><input type='text' style='width:60px;'  editindex=0  id='ShowEditIndex' > <button onclick='EditSeValue()'>查找</button><div id='EditSEdivSe'></div>";
    edit16html += "<span>数据:</span> <span id='EditAlertSpan' style='color:red;'></span><br><textarea  id='ShowEditValue' cols='25' rows='5'></textarea><br>";
    edit16html += "<button onclick='WriteEdit16()'>写入数据</button>";
    edit16html += "<div><span>警告不要搜索连续相同的00或FF,会造成浏览器<span style='color:red;'>真真真</span>的卡死!</span><br>";
    edit16html += "<span>1.在红色 '</span><span style='color:red;'>数据地址</span><span>' 处输入地址(不带0x,不能超过文件大小上限-0x100).<br>2.点读取/刷新获得数据.<br>3.点击加载出来的对应数据会在下面显示地址跟值.<br>4.然后随便了.</span><br>";
    edit16html += "<span>关于直接写入指定地址的数据:<br>1.在 '目标地址' 处填上需要写入的地址<br>2.在 '数据' 里写上代码.<br>3.点击 '写入数据' 即可.</span><br>";
    edit16html += "<span>PS:批量的代码要空格隔开.<br>手机端字体缩小可能无效.</span></div>";
    edit16html += "</div>";
    $("#Edit16Tab ").html(edit16html);
    $("#offEditNo").bind("keydown", function (e) {　　 // 兼容FF和IE和Opera

        var theEvent = e || window.event;
        var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
        if (code == 13) {　　 //回车执行查询
            LoadHex16();
        }
    });
}

function EditSeValue() {
    $("#EditAlertSpan").css("color", "red");
    $("#EditAlertSpan").html("");
    if ($("#ShowEditValue").val().length <= 1) {
        $("#EditAlertSpan").html("请输入要查询的代码段!");
        return;
    }
    if ($("#ShowEditValue").val().length < 5) {
        $("#EditAlertSpan").html("请输入2个以上byte查找!");
        return;
    }
    var edvalue = $("#ShowEditValue").val().split(" ");
    for (var i = 0; i < edvalue.length; i++) {
        edvalue[i] = hex2int(edvalue[i]);
    }
    if (edvalue.length == 2) {
        if (edvalue[0] == edvalue[1]) {
            if (edvalue[0] == 0 || edvalue[0] == 0xff) {
                $("#EditAlertSpan").html("不要搜索连续的00/FF.浏览器会卡死.");
                return;
            }
        }
    }
    if (edvalue.length == 3) {
        if (edvalue[0] == edvalue[1] && edvalue[1] == edvalue[2]) {
            if (edvalue[0] == 0 || edvalue[0] == 0xff) {
                $("#EditAlertSpan").html("不要搜索连续的00/FF.浏览器会卡死.");
                return;
            }
        }
    }
    if (edvalue.length == 4) {
        if (edvalue[0] == edvalue[1] && edvalue[1] == edvalue[2] && edvalue[2] == edvalue[3]) {
            if (edvalue[0] == 0 || edvalue[0] == 0xff) {
                $("#EditAlertSpan").html("不要搜索连续的00/FF.浏览器会卡死.");
                return;
            }
        }
    }
    //alert(edvalue[0]+" "+edvalue[1]+" "+edvalue[2])
    var okbool = false;
    var unix = new Array();
    for (var i = 0; i < NesHex.length; i++) {
        for (var w = 0; w < edvalue.length; w++) {
            if (NesHex[i + w] != edvalue[w]) {
                okbool = false;
            }
        }
        if (okbool == true) {
            unix.push(i);
        }
        okbool = true;
    }
    $("#EditSEdivSe").empty();
    if (unix.length <= 0) {
        $("#EditAlertSpan").html("找不到对应的数据.");
        return;
    }
    var Editselecthtml = "";
    Editselecthtml += "<select id='EditselectId'>";
    for (var i = 0; i < unix.length; i++) {
        Editselecthtml += "<option value='" + unix[i] + "'>" + unix[i].toString(16) + "</option>";
    }
    Editselecthtml += "</select><button onclick='JumpEdit()'>跳转</button>"; //onclick='(this)'
    $("#EditSEdivSe").html(Editselecthtml);
    $("#EditAlertSpan").html("发现 " + unix.length + " 处相同数据.");
    $("#EditAlertSpan").css("color", "green");
}

function JumpEdit() {
    var vls = parseInt($("#EditselectId").val());
    $("#offEditNo").val(vls.toString(16).toUpperCase());
    LoadHex16();
}

function WriteEdit16() {
    if ($("#ShowEditValue").val().length <= 1) {
        alertMsg("#isfileload", "red", "请输入单个代码或代码段!");
        return;
    }
    if ($("#ShowEditIndex").val().length <= 0) {
        alertMsg("#isfileload", "red", "请输入目标地址!");
        return;
    }
    var edindex = hex2int($("#ShowEditIndex").val());
    if ($("#ShowEditValue").val().length == 2) {
        NesHex[edindex] = hex2int($("#ShowEditValue").val());
    } else {
        var edvalue = $("#ShowEditValue").val().split(" ");
        for (var i = 0; i < edvalue.length; i++) {
            NesHex[edindex + i] = hex2int(edvalue[i]);
        }
    }
    alertMsg("#isfileload", "green", "写入成功!");
}

function GetRditAddr(ojb) {
    var offindex = $(ojb).attr("offset");
    offindex = parseInt(offindex);
    var topoffsssss = addPreZero2(offindex.toString(16), 6);
    $("#ShowEditIndex").attr('ShowEditIndex', offindex);
    $("#ShowEditIndex").val(topoffsssss.toUpperCase()); //.toUpperCase()
    $("#ShowEditValue").val(addPreZero(NesHex[offindex].toString(16).toUpperCase()));
}

function strToHexCharCode(str) {
    if (str === "") return "";
    var hexCharCode = [];
    hexCharCode.push("0x");
    for (var i = 0; i < str.length; i++) {
        hexCharCode.push((str.charCodeAt(i)).toString(16));
    }
    return hexCharCode.join("");
}

function BandHex16Se() {
    $("#Edit16Se ").empty();
}