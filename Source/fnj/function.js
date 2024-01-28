var IsCn = false;
var Ram5000 = false;
var Ram4Cc0 = false;
var Ram512 = false;
var RamNew512 = false;
var RamCn768 = false;
var Is1v32 = false;

//Start---------保存文件相关
var filenamenes = "";

function fake_click(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
        "click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null
    );
    obj.dispatchEvent(ev);
}

function export_raw(name, data) {
    var urlObject = window.URL || window.webkitURL || window;
    var ui8 = Uint8Array.from(data); //10进制数组进行转换
    var export_blob = new Blob([ui8]);
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    fake_click(save_link);
}

function savefile() {
    export_raw(gettimenow() + filenamenes, NesHex);
}

function gettimenow() {
    var myDate = new Date();
    var year = myDate.getFullYear(); //获取当前年
    var month = myDate.getMonth() + 1; //获取当前月
    var date = myDate.getDate(); //获取当前日
    var h = myDate.getHours(); //获取当前小时数(0-23)
    var m = myDate.getMinutes(); //获取当前分钟数(0-59)
    var s = myDate.getSeconds();
    //year+
    var now = getNow(month) + getNow(date) + getNow(h) + getNow(m) + getNow(s);
    return now;
}

function getNow(s) {
    return s < 10 ? '0' + s : s;
}

function getFileName(file) {
    var arr = file.split('\\');
    return arr[arr.length - 1];
}
//End---------保存文件相关

function IsOddNumber(value) {
    return ((value & 1) == 1);
}

function checkramtype(bytearry) {
    document.getElementById("ramtype").innerText = "Ram Plus Type:None";
    if (bytearry.toString().indexOf(s5000.toString()) >= 0) {
        Ram5000 = true;
        document.getElementById("ramtype").innerText = "Ram Plus Type:Ram5000";
    }
    if (bytearry.toString().indexOf(s4Cc0.toString()) >= 0) {
        Ram4Cc0 = true;
        document.getElementById("ramtype").innerText = "Ram Plus Type:Ram4CC0";
    }
    if (bytearry.toString().indexOf(s512.toString()) >= 0) {
        Ram512 = true;
        document.getElementById("ramtype").innerText = "Ram Plus Type:Ram512";
    }
    if (bytearry.toString().indexOf(snew512.toString()) >= 0) {
        RamNew512 = true;
        document.getElementById("ramtype").innerText = "Ram Plus Type:RamNew512";
    }
    if (bytearry.toString().indexOf(cn768.toString()) >= 0) {
        RamCn768 = true;
        document.getElementById("ramtype").innerText = "Ram Plus Type:RamCn768";
    }
    if (IsCn == true) {
        document.getElementById("ramtype").innerText += " 中文版";
    }
    if (Is1v32 == true) {
        document.getElementById("ramtype").innerText = "Ram Plus Type:1.32";
    }
}

function ChangeTeam() {
    if (isaddTeam == false) {
        $("#playerlistdiv select").each(function (index, element) {
            var h_index = $(this).attr("offindex");
            NesHex[h_index] = $(this).get(0).selectedIndex;
        });
        //替补球员
        if ($("#replayerlistdiv").css("display") != "none") {
            $("#replayerlistdiv select").each(function (index, element) {
                var h_index = $(this).attr("offindex");
                NesHex[h_index] = $(this).get(0).selectedIndex;
            });
        }
        if (阵型addr != 0) { NesHex[阵型addr] = $("#Team_DF").get(0).selectedIndex + $("#Team_AK").get(0).selectedIndex * 0x10; }
        alertMsg("#isfileload", "green", "队伍数据修改成功!");
    }
    else {
        var datas = (addteam_temp2 + addteam_temp3).split(' ');
        var newaddr = $('#addteamusenewaddr').is(':checked');
        if (datas.length <= addteamdeflen || newaddr == false) {
            for (var i = 0; i < datas.length; i++) {
                NesHex[addteam_def_add + i] = parseInt(datas[i], 16);
            }
        }
        else {
            var defaddr = Team_Formation + $("#Add_Team_Select").get(0).selectedIndex * 2;
            var dz = 0;
            var 开关索引1 = 0;
            var 开关索引2 = 0;
            if (IsCn) {
                var cncount = NesHex.indexOf(cn768);
                if (cncount <= 0) {
                    for (var i = 0; i < cn768.length; i++) {
                        NesHex[0x7FA70 + i] = cn768[i];
                    }
                    NesHex[0x8000C] = 0x60; NesHex[0x8000D] = 0xFA;
                }
                //空地址
                if (NesHex[defaddr + 1] == 0x50 || NesHex[defaddr + 1] == 0x51 || NesHex[defaddr + 1] == 0x52 || NesHex[defaddr + 1] == 0x53 || NesHex[defaddr + 1] == 0x54 || NesHex[defaddr + 1] == 0x55 || NesHex[defaddr + 1] == 0x56 || NesHex[defaddr + 1] == 0x57 || NesHex[defaddr + 1] == 0x58 || NesHex[defaddr + 1] == 0x59 || NesHex[defaddr + 1] == 0x5a || NesHex[defaddr + 1] == 0x5b || NesHex[defaddr + 1] == 0x5c || NesHex[defaddr + 1] == 0x5d || NesHex[defaddr + 1] == 0x5e || NesHex[defaddr + 1] == 0x5f || NesHex[defaddr + 1] == 0x60 || NesHex[defaddr + 1] == 0x61 || NesHex[defaddr + 1] == 0x62 || NesHex[defaddr + 1] == 0x63 || NesHex[defaddr + 1] == 0x64 || NesHex[defaddr + 1] == 0x65 || NesHex[defaddr + 1] == 0x66 || NesHex[defaddr + 1] == 0x67 || NesHex[defaddr + 1] == 0x68 || NesHex[defaddr + 1] == 0x69 || NesHex[defaddr + 1] == 0x6a || NesHex[defaddr + 1] == 0x6b || NesHex[defaddr + 1] == 0x6c || NesHex[defaddr + 1] == 0x6d || NesHex[defaddr + 1] == 0x6e || NesHex[defaddr + 1] == 0x6f) {

                    dz = ramcheck(defaddr, NesHex);
                }
                else {
                    dz = CheckTempaddr1(dz);
                }
                开关索引1 = parseInt(toHex16(dz - 0x73000, 4).substr(2, 2), 16);
                开关索引2 = parseInt(toHex16(dz - 0x73000, 4).substr(0, 2), 16);
            }

            else {
                if (NesHex[defaddr + 1] == 0xBD || NesHex[defaddr + 1] == 0xBE || NesHex[defaddr + 1] == 0xBF || NesHex[defaddr + 1] == 0xFD ||
                    NesHex[defaddr + 1] == 0xFE || NesHex[defaddr + 1] == 0xFF || (toHex16(NesHex[defaddr + 1]).substr(0, 1) == "6" && Is1v32 == true) || (toHex16(NesHex[defaddr + 1]).substr(0, 1) == "7" && Is1v32 == true)) {
                    dz = ramcheck(defaddr, NesHex);
                }
                else {
                    dz = CheckTempaddr2(dz);
                }

                开关索引1 = parseInt(toHex16(dz, 4).substr(2, 2), 16);
                开关索引2 = parseInt(toHex16(dz, 4).substr(0, 2), 16);
            }

            NesHex[defaddr] = 开关索引1;
            NesHex[defaddr + 1] = 开关索引2;
            dz = dz + 0x10;
            addteam_def_add = dz;
            for (var i = 0; i < datas.length; i++) {
                NesHex[addteam_def_add + i] = parseInt(datas[i], 16);
            }
        }

        NesHex[addteam_def_add + datas.length] = 0x0F;
        alertMsg("#isfileload", "green", "球星添加成功~");
        setTimeout(function () {
            Add_TeamSelectChange();//刷新显示
        }, 400);
    }
}

var isaddTeam = false;
function CAddTeam() {
    isaddTeam = !isaddTeam;
    if (isaddTeam == true) {
        $("#playerlistdiv").css("display", "none");
        $("#replayerlistdiv").css("display", "none");
        $("#Team_Select").css("display", "none");
        $("#Team_AKDFdiv").css("display", "none");


        $("#Add_Team_Select").css("display", "inline");
        $("#addteam").css("display", "inline");
        $("#showadteambtn").html("队伍编辑");
    }
    else {
        $("#playerlistdiv").css("display", "inline");
        if ($("#Team_Select").get(0).selectedIndex == 2) {
            $("#replayerlistdiv").css("display", "inline");
        }
        $("#showadteambtn").html("球星添加");
        $("#Team_Select").css("display", "inline");
        if ($("#Team_Select").get(0).selectedIndex >= 3) {
            $("#Team_AKDFdiv").css("display", "inline");
        }

        $("#Add_Team_Select").css("display", "none");
        $("#addteam").css("display", "none");
    }
}

var addteam_temp1 = "";
var addteam_temp2 = "";
var addteam_temp3 = "";
var addteam_def_add = 0;
var addteamdeflen = 0;
function Add_TeamSelectChange() {
    try {
        var selectitems = document.getElementById("addteam").getElementsByTagName("select");
        for (var i = 0, j = selectitems.length; i < j; i++) {
            selectitems[i].options[0].selected = true;
        }
    } catch {

    }
    $("#addteamusenewaddr").prop("checked", false);
    addteamdeflen = 0;
    addteam_temp1 = "";
    addteam_temp2 = "";
    addteam_temp3 = "";

    var selectindex = $("#Add_Team_Select").get(0).selectedIndex;
    var dz = Team_Formation + (selectindex) * 2;
    var msgstr = "0x" + toHex16(dz, 5) + ":" + toHex16(NesHex[dz]) + " " + toHex16(NesHex[dz + 1]) + " = ";
    var zzdz = addteam_def_add = ramcheck(dz, NesHex);
    msgstr += "0x" + toHex16(zzdz, 5) + "<br>";
    addteam_temp1 = msgstr;
    for (var i = 0; i < team_da.length; i++) {
        if (toHex16(NesHex[zzdz]) == (team_da[i]).substr(0, 2)) {
            document.getElementById("addplayeSB1")[i].selected = true;
            addteam_temp2 += toHex16(NesHex[zzdz]);
            break;
        }
    }
    document.getElementById("addplayeSB2")[NesHex[zzdz + 1]].selected = true;
    document.getElementById("addplayeSB3")[NesHex[zzdz + 2]].selected = true;
    document.getElementById("addplayeSB4")[NesHex[zzdz + 3]].selected = true;
    document.getElementById("addplayeSB5")[NesHex[zzdz + 4]].selected = true;
    document.getElementById("addplayeSB6")[NesHex[zzdz + 5]].selected = true;
    document.getElementById("addplayeSB7")[NesHex[zzdz + 6]].selected = true;
    document.getElementById("addplayeSB8")[NesHex[zzdz + 7]].selected = true;
    document.getElementById("addplayeSB9")[NesHex[zzdz + 8]].selected = true;
    addteam_temp2 += " " + toHex16(NesHex[zzdz + 1]);
    addteam_temp2 += " " + toHex16(NesHex[zzdz + 2]);
    addteam_temp2 += " " + toHex16(NesHex[zzdz + 3]);
    addteam_temp2 += " " + toHex16(NesHex[zzdz + 4]);
    addteam_temp2 += " " + toHex16(NesHex[zzdz + 5]);
    addteam_temp2 += " " + toHex16(NesHex[zzdz + 6]);
    addteam_temp2 += " " + toHex16(NesHex[zzdz + 7]);
    addteam_temp2 += " " + toHex16(NesHex[zzdz + 8]);
    addteamdeflen += 9;
    zzdz = zzdz + 9;
    for (var i = 0; i < 22; i++) {
        if (NesHex[zzdz + i] != 0x0F) {
            if (IsOddNumber(i)) continue;
            switch (NesHex[zzdz + i]) {
                case 0x01:
                    GetPlayerByData("#addplayerGK", (zzdz + i + 1));
                    addteam_temp3 += " 01 " + toHex16(NesHex[zzdz + i + 1]);
                    addteamdeflen += 2;
                    break;
                case 0x02:
                    GetPlayerByData("#addplayer02", (zzdz + i + 1));
                    addteam_temp3 += " 02 " + toHex16(NesHex[zzdz + i + 1]);
                    addteamdeflen += 2;
                    break;
                case 0x03:
                    GetPlayerByData("#addplayer03", (zzdz + i + 1));
                    addteam_temp3 += " 03 " + toHex16(NesHex[zzdz + i + 1]);
                    addteamdeflen += 2;
                    break;
                case 0x04:
                    GetPlayerByData("#addplayer04", (zzdz + i + 1));
                    addteam_temp3 += " 04 " + toHex16(NesHex[zzdz + i + 1]);
                    addteamdeflen += 2;
                    break;
                case 0x05:
                    GetPlayerByData("#addplayer05", (zzdz + i + 1));
                    addteam_temp3 += " 05 " + toHex16(NesHex[zzdz + i + 1]);
                    addteamdeflen += 2;
                    break;
                case 0x06:
                    GetPlayerByData("#addplayer06", (zzdz + i + 1));
                    addteam_temp3 += " 06 " + toHex16(NesHex[zzdz + i + 1]);
                    addteamdeflen += 2;
                    break;
                case 0x07:
                    GetPlayerByData("#addplayer07", (zzdz + i + 1));
                    addteam_temp3 += " 07 " + toHex16(NesHex[zzdz + i + 1]);
                    addteamdeflen += 2;
                    break;
                case 0x08:
                    GetPlayerByData("#addplayer08", (zzdz + i + 1));
                    addteam_temp3 += " 08 " + toHex16(NesHex[zzdz + i + 1]);
                    addteamdeflen += 2;
                    break;
                case 0x09:
                    GetPlayerByData("#addplayer09", (zzdz + i + 1));
                    addteam_temp3 += " 09 " + toHex16(NesHex[zzdz + i + 1]);
                    addteamdeflen += 2;
                    break;
                case 0x0A:
                    GetPlayerByData("#addplayer10", (zzdz + i + 1));
                    addteam_temp3 += " 0A " + toHex16(NesHex[zzdz + i + 1]);
                    addteamdeflen += 2;
                    break;
                case 0x0B:
                    GetPlayerByData("#addplayer11", (zzdz + i + 1));
                    addteam_temp3 += " 0B " + toHex16(NesHex[zzdz + i + 1]);
                    addteamdeflen += 2;
                    break;
            }
        } else {
            break;
        }
    }
    $("#addteamStr").html(addteam_temp1 + addteam_temp2 + "<br>" + addteam_temp3 + " 0F");
}

function addteamclick() {
    addteam_temp2 = "";
    addteam_temp3 = "";
    addteam_temp2 += $("#addplayeSB1").find("option:selected").text().substr(0, 2);
    addteam_temp2 += " " + toHex16($("#addplayeSB2").get(0).selectedIndex);
    addteam_temp2 += " " + toHex16($("#addplayeSB3").get(0).selectedIndex);
    addteam_temp2 += " " + toHex16($("#addplayeSB4").get(0).selectedIndex);
    addteam_temp2 += " " + toHex16($("#addplayeSB5").get(0).selectedIndex);
    addteam_temp2 += " " + toHex16($("#addplayeSB6").get(0).selectedIndex);
    addteam_temp2 += " " + toHex16($("#addplayeSB7").get(0).selectedIndex);
    addteam_temp2 += " " + toHex16($("#addplayeSB8").get(0).selectedIndex);
    addteam_temp2 += " " + toHex16($("#addplayeSB9").get(0).selectedIndex);

    for (var i = 1; i <= 11; i++) {
        if (i == 1) {
            if ($("#addplayerGK").get(0).selectedIndex != 0) {
                addteam_temp3 += " 01 " + toHex16($("#addplayerGK").get(0).selectedIndex);
            }
        }
        else {
            if ($("#addplayer" + addPreZero(i)).get(0).selectedIndex != 0) {
                addteam_temp3 += " " + addPreZero(toHex16(i)) + " " + toHex16($("#addplayer" + addPreZero(i)).get(0).selectedIndex);
            }
        }
    }
    $("#addteamStr").html(addteam_temp1 + addteam_temp2 + "<br>" + addteam_temp3 + " 0F");

    var datas = (addteam_temp2 + addteam_temp3).split(' ');
    if (datas.length <= addteamdeflen) {
        $("#addteamusenewaddr").prop("checked", false);
    }
    else {
        $("#addteamusenewaddr").prop("checked", true);
    }
}

var 阵型addr = 0;

function TeamSelectChange() {
    $("#replayerlistdiv").css("display", "none");
    // Team_player_list

    try {
        var selectitems = document.getElementById("playerlistdiv").getElementsByTagName("select");
        for (var i = 0, j = selectitems.length; i < j; i++) {
            selectitems[i].options[0].selected = true;
        }
        selectitems = document.getElementById("replayerlistdiv").getElementsByTagName("select");
        for (var i = 0, j = selectitems.length; i < j; i++) {
            selectitems[i].options[0].selected = true;
        }
    } catch {

    }

    阵型addr = 0;
    var msgaddr = "0";
    var selectindex = $("#Team_Select").get(0).selectedIndex;
    if (selectindex == 0 || selectindex == 1 || selectindex == 2) {
        $("#Team_AKDFdiv").css("display", "none");
        $("#selectplayerGK").css("pointer-events", "auto");
        for (var r = 2; r < 11; r++) {
            $("#selectplayer" + addPreZero(r)).css("pointer-events", "auto");
        }
        var 球员地址bits = 0;
        switch (selectindex) {
            case 0:
                球员地址bits = 0x4a57;
                //阵型addr = Team_Formation_SB;
                break;
            case 1:
                球员地址bits = 19043;
                //阵型addr = Team_Formation_NG;
                break;
            case 2:
                $("#replayerlistdiv").css("display", "inline");
                球员地址bits = 19055;
                let 替补bits = 19066; //替补
                for (var i = 0; i < 8; i++) {
                    GetPlayerByData("#selectplayert" + addPreZero2((i + 1), 2), 替补bits + i);
                }
                GetPlayerByData("#selectplayertgk1", 替补bits + 8);
                GetPlayerByData("#selectplayertgk2", 替补bits + 9);
                //阵型addr = Team_Formation_JP;
                break;
        }

        for (var i = 0; i < 11; i++) {
            if (i == 0) {
                GetPlayerByData("#selectplayerGK", 球员地址bits);
            }
            else {
                GetPlayerByData("#selectplayer" + addPreZero2((i + 1), 2), 球员地址bits + i);
            }
        }
    }
    else //敌方队伍
    {
        $("#Team_AKDFdiv").css("display", "block");
        $("#selectplayerGK").css("pointer-events", "none");
        for (var r = 2; r <= 11; r++) {
            $("#selectplayer" + addPreZero(r)).css("pointer-events", "none");
        }
        var dz = Team_Formation + (selectindex - 3) * 2;
        msgaddr = "<br>0x" + toHex16(dz, 5) + ":" + toHex16(NesHex[dz]) + " " + toHex16(NesHex[dz + 1]) + " = ";
        var zzdz = ramcheck(dz, NesHex) + 9;
        阵型addr = zzdz - 9;
        var adx = toHex16(NesHex[阵型addr], 2);
        var adx1 = parseInt(adx[0], 16);
        var adx2 = parseInt(adx[1], 16);
        document.getElementById("Team_DF")[adx2].selected = true;
        document.getElementById("Team_AK")[adx1].selected = true;
        for (var i = 0; i < 22; i++) {
            if (NesHex[zzdz + i] != 0x0F) {
                if (IsOddNumber(i)) continue;
                switch (NesHex[zzdz + i]) {
                    case 0x01:
                        GetPlayerByData("#selectplayerGK", (zzdz + i + 1));
                        break;
                    case 0x02:
                        GetPlayerByData("#selectplayer02", (zzdz + i + 1));
                        break;
                    case 0x03:
                        GetPlayerByData("#selectplayer03", (zzdz + i + 1));
                        break;
                    case 0x04:
                        GetPlayerByData("#selectplayer04", (zzdz + i + 1));
                        break;
                    case 0x05:
                        GetPlayerByData("#selectplayer05", (zzdz + i + 1));
                        break;
                    case 0x06:
                        GetPlayerByData("#selectplayer06", (zzdz + i + 1));
                        break;
                    case 0x07:
                        GetPlayerByData("#selectplayer07", (zzdz + i + 1));
                        break;
                    case 0x08:
                        GetPlayerByData("#selectplayer08", (zzdz + i + 1));
                        break;
                    case 0x09:
                        GetPlayerByData("#selectplayer09", (zzdz + i + 1));
                        break;
                    case 0x0A:
                        GetPlayerByData("#selectplayer10", (zzdz + i + 1));
                        break;
                    case 0x0B:
                        GetPlayerByData("#selectplayer11", (zzdz + i + 1));
                        break;
                }
            } else {
                break;
            }
        }
    }

    if (msgaddr != "0") {
        $("#TeamedStr").html(msgaddr + "0x" + toHex16(阵型addr, 5));
    }
    else {
        $("#TeamedStr").html("");
    }
}

function GetPlayerByData(id, offset) {
    $(id).get(0).selectedIndex = NesHex[offset];
    $(id).attr("offindex", offset);
    $(id).css("pointer-events", "auto");
}

function ChrSelectColor() {
    for (var i = 0; i <= 3; i++) {
        $('#ChrColor' + (i + 1)).css("background-color", $('#ChrColor' + (i + 1)).children().eq($('#ChrColor' + (i + 1)).get(0).selectedIndex).css("background-color"));
        $('#ChrColor' + (i + 1)).css("color", $('#ChrColor' + (i + 1)).children().eq($('#ChrColor' + (i + 1)).get(0).selectedIndex).css("color"));
    }
}

function toHex16(temp, len = 2) {
    var x = (temp).toString(16);
    return addPreZero2(x, len).toUpperCase();
}

//填充字符
function addPreZero(num) {
    return ('000000000' + num).slice(-2);
}

function addPreZero2(num, count) {
    return ('000000000' + num).slice(-count);
}

function 添加几率文本(动作, select) {
    var temp = [];
    for (var i = 0; i < 动作.length; i++) {
        for (var j = 0; j < 动作.length; j++) {
            var tp = 动作[i] + 动作[j];
            if (!temp.includes(tp)) {
                temp.push(tp);
            }
        }
    }
    for (var i = 0; i < temp.length; i++) {
        $(select).append($('<option/>').text(toHex16(temp[i])).attr("value", toHex16(temp[i])));
    }
}

function GetAiTyoeStr(HexData, str, 文本, 动作, 几率) {
    GetAiTypeSum(动作, 几率, HexData);
    for (var types = 0; types < 文本.length; types++) {
        str += "<div>" + 文本[types] + "=" + 几率[types] * 100 + "%<br></div>";
    }
    return str;
}

function GetAiTypeSum(动作, 几率, HexData) {
    for (var j = 0; j < HexData.length; j++) {
        for (var i = 0; i < 动作.length; i++)//遍历所有动作类型
        {
            var a = toHex16(HexData[j]);
            if (a.substr(0, 1) == 动作[i]) //验证取得的字节是否出现动作...
            {
                几率[i] = (几率[i] + (0.125)); //累加到几率数组中....
            }
            if (a.substr(1, 1) == 动作[i]) //验证取得的字节是否出现动作...
            {
                几率[i] = (几率[i] + (0.125)); //累加到几率数组中....
            }
        }
    }
}

function alertMsg(id, color, txt, time = 2500, type = 0) {
    if (type == 0) {//msg_PIC
        $("#msgboxdiv").css("color", color);
        if (color == "red") {
            $("#msgboxdiv").html('<img src="' + msg_PIC[1] + '" />' + txt);
        }
        else {
            $("#msgboxdiv").html('<img src="' + msg_PIC[0] + '" />' + txt);
        }
        //$('#msgboxdiv').css('top', "50%");
        //$('#msgboxdiv').css('left', "50%");
        $("#msgboxdiv").css('left', ($(window).width() - $("#msgboxdiv").width()) / 2 + 'px');
        $("#msgboxdiv").show();
       
        setTimeout(function () {
            $("#msgboxdiv").hide();
        }, time);
    }
    else {
        var txtx = $(id).html();
        $(id).css("color", color);
        $(id).html(txt);
        setTimeout(function () {
            $(id).html(txtx);
        }, time);
    }
}

function Team_SC_Change() {
    var selectindex = $("#Team_SC_Select").get(0).selectedIndex;
    document.getElementById("Team_SC_C0")[NesHex[Team_Sock_Col_addr + selectindex * 2 + 0]].selected = true;
    document.getElementById("Team_SC_C1")[NesHex[Team_Sock_Col_addr + selectindex * 2 + 1]].selected = true;
    Team_SC_Change2();
    $("#Team_SC_str").html("0x" + toHex16(Team_Sock_Col_addr + selectindex * 2, 5));
}
function CG_Team_SC() {
    var selectindex = $("#Team_SC_Select").get(0).selectedIndex;
    NesHex[Team_Sock_Col_addr + selectindex * 2 + 0] = $("#Team_SC_C0").get(0).selectedIndex;
    NesHex[Team_Sock_Col_addr + selectindex * 2 + 1] == $("#Team_SC_C1").get(0).selectedIndex;
    alertMsg("#isfileload", "green", "袜子颜色修改成功~");
}

function Team_SC_Change2() {
    var CL0 = $("#Team_SC_C0").get(0).selectedIndex;
    var CL1 = $("#Team_SC_C1").get(0).selectedIndex;
    document.getElementById("canteamscpictemp").crossorigin = "";
    document.getElementById("canteamscpictemp").src = Team_Sock_IMG;
    var c1 = (nespal[CL0 * 3 + 0] + ',' + nespal[CL0 * 3 + 1] + ',' + nespal[CL0 * 3 + 2]).split(',');
    var c2 = (nespal[CL1 * 3 + 0] + ',' + nespal[CL1 * 3 + 1] + ',' + nespal[CL1 * 3 + 2]).split(',');
    setTimeout(function () {
        let CGimg = document.getElementById("canteamscpictemp");
        let CGcanvas = document.createElement('canvas');
        CGcanvas.width = CGimg.width;
        CGcanvas.height = CGimg.height;
        var CGctx = CGcanvas.getContext('2d');
        CGctx.drawImage(CGimg, 0, 0);
        var CGimageData = CGctx.getImageData(0, 0, CGimg.width, CGimg.height);
        var CGdata = CGimageData.data;
        for (var i = 0; i < CGdata.length; i += 4) {
            if (CGdata[i] == 204 && CGdata[i + 1] == 51 && CGdata[i + 2] == 102) {
                CGdata[i] = c1[0]; CGdata[i + 1] = c1[1]; CGdata[i + 2] = c1[2];
            }
            if (CGdata[i] == 153 && CGdata[i + 1] == 51 && CGdata[i + 2] == 0) {
                CGdata[i] = c2[0]; CGdata[i + 1] = c2[1]; CGdata[i + 2] = c2[2];
            }
        }
        CGctx.putImageData(CGimageData, 0, 0);
        document.getElementById("canteamscpict").crossorigin = "";
        CGimg.src = document.getElementById("canteamscpict").src = CGcanvas.toDataURL("image/png");
    }, 200);
}