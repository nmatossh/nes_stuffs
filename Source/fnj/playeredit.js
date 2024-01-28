$(document).ready(function () {
    LoadPlayerEditHtml();
});

//Player Edir Select
function PlayerEditSelectChange() {
    var selectindex = $("#PlayerEditNameList").get(0).selectedIndex;
    var coloraddr = 0;

    if (selectindex <= 125) //明星颜色
    {
        coloraddr = Edit_playerColor + selectindex * 5;
    } else { //杂鱼颜色
        coloraddr = Edit_NpcColor + (selectindex - 126) * 5;
    }
    if (selectindex < 117) {

        document.getElementById("PlayerModSelect")[NesHex[Edit_ModType + selectindex]].selected = true;
        //$("#PlayerModSelect")[NesHex[0x28901 + selectindex]].selected = true;
        //$("#PlayerModSelect").val(NesHex[0x28901 + selectindex]);
    } else {
        $('#PlayerModSelect').val('000000'); //
    }

    document.getElementById("PlayerSkincolourSe")[NesHex[coloraddr + 0]].selected = true;
    document.getElementById("PlayerHaircolorSe")[NesHex[coloraddr + 1]].selected = true;
    document.getElementById("PlayerCoatcolorSe")[NesHex[coloraddr + 2]].selected = true;
    document.getElementById("PlayerShortscolorSe")[NesHex[coloraddr + 3]].selected = true;

    $("#PlayerSkincolour").css("background-color", ReturnNesColor(NesHex[coloraddr]));
    $("#PlayerHaircolor").css("background-color", ReturnNesColor(NesHex[coloraddr + 1]));
    $("#PlayerCoatcolor").css("background-color", ReturnNesColor(NesHex[coloraddr + 2]));
    $("#PlayerShortscolor").css("background-color", ReturnNesColor(NesHex[coloraddr + 3]));

    GetModAddrDataToString();
}

function ReturnNesColor(offset) {
    var c = "rgb(" + nespal[offset * 3 + 0] + "," + nespal[offset * 3 + 1] + "," + nespal[offset * 3 + 2] + ")";
    return c;
}

function ReturnNesColor2(offset) {
    var c = "#" + nespal[offset * 3 + 0].toString(16) + nespal[offset * 3 + 1].toString(16) + nespal[offset * 3 + 2].toString(16);
    return c;
}

function PlayerModSelectChange() {
    GetModAddrDataToString();
}

function getColoroptionsVal(op) {
    var ids = $(op).attr("id");
    $("#" + ids.substring(0, ids.length - 2)).css("background-color", ReturnNesColor($(op).get(0).selectedIndex));
    GetModAddrDataToString();
}

function GetModAddrDataToString() {
    var selectindex = $("#PlayerEditNameList").get(0).selectedIndex;
    var coloraddr = 0;
    var texts = "";

    if (selectindex <= 125) //明星颜色
    {
        coloraddr = Edit_playerColor + selectindex * 5;
    } else { //杂鱼颜色
        coloraddr = Edit_NpcColor + (selectindex - 126) * 5;
    }

    texts += "0x" + coloraddr.toString(16).toUpperCase() + ":";
    texts += addPreZero($("#PlayerSkincolourSe").get(0).selectedIndex.toString(16)).toUpperCase() + " ";
    texts += addPreZero($("#PlayerHaircolorSe").get(0).selectedIndex.toString(16)).toUpperCase() + " ";
    texts += addPreZero($("#PlayerCoatcolorSe").get(0).selectedIndex.toString(16)).toUpperCase() + " ";
    texts += addPreZero($("#PlayerShortscolorSe").get(0).selectedIndex.toString(16)).toUpperCase() + " ";

    if (selectindex < 117) {
        texts += addPreZero($("#PlayerModSelect").get(0).selectedIndex.toString(16)).toUpperCase() + " ";
    }
    $("#SeModeDataSpan").html(texts);
    GetModFunction();
}


function ChangeNowPlayerMod() {
    var selectindex = $("#PlayerEditNameList").get(0).selectedIndex;
    var coloraddr = 0;
    if (selectindex <= 125) //明星颜色
    {
        coloraddr = Edit_playerColor + selectindex * 5;
    } else { //杂鱼颜色
        coloraddr = Edit_NpcColor + (selectindex - 126) * 5;
    }

    NesHex[coloraddr] = $("#PlayerSkincolourSe").get(0).selectedIndex;
    NesHex[coloraddr + 1] = $("#PlayerHaircolorSe").get(0).selectedIndex;
    NesHex[coloraddr + 2] = $("#PlayerCoatcolorSe").get(0).selectedIndex;
    NesHex[coloraddr + 3] = $("#PlayerShortscolorSe").get(0).selectedIndex;

    if (selectindex < 117) {
        NesHex[Edit_ModType + selectindex] = $("#PlayerModSelect").get(0).selectedIndex;
    }
    alertMsg("#isfileload", "green", "造型颜色修改成功~");
}

function GetModFunction() {
    var colormod1 = $("#PlayerHaircolorSe").get(0).selectedIndex; //头发
    var colormod2 = $("#PlayerSkincolourSe").get(0).selectedIndex; //皮肤
    var colormod3 = $("#PlayerCoatcolorSe").get(0).selectedIndex; //上衣
    var colormod4 = $("#PlayerShortscolorSe").get(0).selectedIndex; //短裤

    $("#LoadPlayEditPngChange").empty();

    try {
        var modtypes = $("#PlayerModSelect").get(0).selectedIndex; //头型
        if (modtypes == -1) { modtypes = 18 } //if (modtypes >= 12) { defimg = "modimg/def2.png";}
        document.getElementById("canvasmodtemp").crossorigin = "";
        document.getElementById("canvasmodtemp").src = IMG_ModPic[modtypes];
        var post1 = nespal[colormod1 * 3 + 0] + ',' + nespal[colormod1 * 3 + 1] + ',' + nespal[colormod1 * 3 + 2];
        var post2 = nespal[colormod2 * 3 + 0] + ',' + nespal[colormod2 * 3 + 1] + ',' + nespal[colormod2 * 3 + 2];
        var post3 = nespal[colormod3 * 3 + 0] + ',' + nespal[colormod3 * 3 + 1] + ',' + nespal[colormod3 * 3 + 2];
        var post4 = nespal[colormod4 * 3 + 0] + ',' + nespal[colormod4 * 3 + 1] + ',' + nespal[colormod4 * 3 + 2];

        setTimeout(function () {
            CGPNGColor(post1, post2, post3, post4);
        }, 200);
    } catch (err) { }
}

function CGPNGColor(cor1, cor2, cor3, cor4) {
    var c1 = cor1.split(',');
    var c2 = cor2.split(',');
    var c3 = cor3.split(',');
    var c4 = cor4.split(',');

    let CGimg = document.getElementById("canvasmodtemp");
    let CGcanvas = document.createElement('canvas');
    CGcanvas.width = CGimg.width;
    CGcanvas.height = CGimg.height;
    var CGctx = CGcanvas.getContext('2d');
    CGctx.drawImage(CGimg, 0, 0);
    var CGimageData = CGctx.getImageData(0, 0, CGimg.width, CGimg.height);
    var CGdata = CGimageData.data;
    for (var i = 0; i < CGdata.length; i += 4) {
        if (CGdata[i] == 0xFF && CGdata[i + 1] == 0x00 && CGdata[i + 2] == 0xC8) { CGdata[i] = c1[0]; CGdata[i + 1] = c1[1]; CGdata[i + 2] = c1[2]; }
        if (CGdata[i] == 0xFF && CGdata[i + 1] == 0xE4 && CGdata[i + 2] == 0xD0) { CGdata[i] = c2[0]; CGdata[i + 1] = c2[1]; CGdata[i + 2] = c2[2]; }
        if (CGdata[i] == 0x00 && CGdata[i + 1] == 0x00 && CGdata[i + 2] == 0xC8) { CGdata[i] = c3[0]; CGdata[i + 1] = c3[1]; CGdata[i + 2] = c3[2]; }
        if (CGdata[i] == 0x00 && CGdata[i + 1] == 0x64 && CGdata[i + 2] == 0x00) { CGdata[i] = c4[0]; CGdata[i + 1] = c4[1]; CGdata[i + 2] = c4[2]; }
    }
    CGctx.putImageData(CGimageData, 0, 0);
    document.getElementById("canvasmod").crossorigin = "";
    CGimg.src = document.getElementById("canvasmod").src= CGcanvas.toDataURL("image/png");
}

function PlayerVSModAddChange(type) {
    var id = 0;
    if (type == 1) {
        id = parseInt($("#PlayerVSModADDList1").find("option:selected").text().substring(0, 2), 16) ;
        document.getElementById("Vsmodelist1")[NesHex[playerVSmodaddr + id]].selected = true;
        bingDVSimg(1);
        $("#VSmodIMG1str").html("0x"+toHex16(playerVSmodaddr + id,5));
    }
    if (type == 2) {
        id = $("#PlayerVSModADDList2").get(0).selectedIndex;
        var x = NesHex[playerVSmod_GK_addr + id * 2];
        $("#Vsmodelist2 option").each(function (i) {
            var text = $(this).text();
            if (text.substring(0, 2) == toHex16(x)) {
                document.getElementById("Vsmodelist2")[i].selected = true;
                return true;
            }
        });
        bingDVSimg(2);
        $("#VSmodIMG2str").html("0x" + toHex16(playerVSmod_GK_addr + id * 2, 5));
    }
}

function ChangGVsPKpic() {
    var id1 = parseInt($("#PlayerVSModADDList1").find("option:selected").text().substring(0, 2), 16);
    NesHex[playerVSmodaddr+id1] = $("#Vsmodelist1").get(0).selectedIndex;
    var id2 = $("#PlayerVSModADDList2").get(0).selectedIndex;
    NesHex[playerVSmod_GK_addr + id2 * 2] = parseInt($("#Vsmodelist2").find("option:selected").text().substring(0, 2), 16);
    alertMsg("#isfileload", "green", " 肖像挂接成功~", 2000);
}

function bingDVSimg(type) {
    if (type == 1) {
        var id = $("#Vsmodelist1").get(0).selectedIndex;
        if (id == 0) {
            document.getElementById("VSmodIMG1").src = IMG_VS_Pic[IMG_VS_Pic.length-1];
            return;
        }
        else {
            var px = 7;
            switch (id) {
                case 1:
                    document.getElementById("PlayerVSModColorList")[px + 0].selected = true; break;
                case 2:
                    document.getElementById("PlayerVSModColorList")[px + 2].selected = true; break;
                case 3:
                    document.getElementById("PlayerVSModColorList")[px + 3].selected = true; break;
                case 4:
                    document.getElementById("PlayerVSModColorList")[px + 11].selected = true; break;
                case 5:
                    document.getElementById("PlayerVSModColorList")[px + 10].selected = true; break;
                case 6:
                    document.getElementById("PlayerVSModColorList")[px + 21].selected = true; break;
                case 7:
                    document.getElementById("PlayerVSModColorList")[px + 20].selected = true; break;
                case 8:
                    document.getElementById("PlayerVSModColorList")[px + 17].selected = true; break;
                case 9:
                    document.getElementById("PlayerVSModColorList")[px + 16].selected = true; break;
                case 10:
                    document.getElementById("PlayerVSModColorList")[px + 5].selected = true; break;
                case 11:
                    document.getElementById("PlayerVSModColorList")[px + 4].selected = true; break;
                case 12:
                    document.getElementById("PlayerVSModColorList")[px + 13].selected = true; break;
                case 13:
                    document.getElementById("PlayerVSModColorList")[px + 12].selected = true; break;
                case 14:
                    document.getElementById("PlayerVSModColorList")[px + 15].selected = true; break;
                case 15:
                    document.getElementById("PlayerVSModColorList")[px + 14].selected = true; break;
                case 16:
                    document.getElementById("PlayerVSModColorList")[px + 9].selected = true; break;
                case 17:
                    document.getElementById("PlayerVSModColorList")[px + 8].selected = true; break;
                case 18:
                    document.getElementById("PlayerVSModColorList")[px + 7].selected = true; break;
                case 19:
                    document.getElementById("PlayerVSModColorList")[px + 6].selected = true; break;
                case 20:
                    document.getElementById("PlayerVSModColorList")[px + 19].selected = true; break;
                case 21:
                    document.getElementById("PlayerVSModColorList")[px + 18].selected = true; break;
                case 22:
                    document.getElementById("PlayerVSModColorList")[px + 33].selected = true; break;
                case 23:
                    document.getElementById("PlayerVSModColorList")[px + 32].selected = true; break;
                case 24:
                    document.getElementById("PlayerVSModColorList")[px + 31].selected = true; break;
                case 25:
                    document.getElementById("PlayerVSModColorList")[px + 30].selected = true; break;
                case 26:
                    document.getElementById("PlayerVSModColorList")[px + 25].selected = true; break;
                case 27:
                    document.getElementById("PlayerVSModColorList")[px + 27].selected = true; break;
                case 28:
                    document.getElementById("PlayerVSModColorList")[px + 29].selected = true; break;
                case 29:
                    document.getElementById("PlayerVSModColorList")[px + 28].selected = true; break;
                case 30:
                    document.getElementById("PlayerVSModColorList")[px + 23].selected = true; break;
                case 31:
                    document.getElementById("PlayerVSModColorList")[px + 24].selected = true; break;
                case 32:
                    document.getElementById("PlayerVSModColorList")[px + 22].selected = true; break;
                case 33:
                    document.getElementById("PlayerVSModColorList")[px + 26].selected = true; break;
            }

            $("#PlayerVSModColorList").change();
            //document.getElementById("VSmodIMG1").src = document.getElementById("caVSmod").src;
            setTimeout(function () {
                document.getElementById("VSmodIMG1").src = document.getElementById("caVSmod").src;
            }, 200);
        }
    }
    if (type == 2) {
        var id = $("#Vsmodelist2").get(0).selectedIndex;
        switch (id) {
            case 0:
                document.getElementById("PlayerVSModColorList")[0].selected = true; break;
            case 1:
                document.getElementById("PlayerVSModColorList")[2].selected = true; break;
            case 2:
                document.getElementById("PlayerVSModColorList")[3].selected = true; break;
            case 3:
                document.getElementById("PlayerVSModColorList")[5].selected = true; break;
            case 4:
                document.getElementById("PlayerVSModColorList")[6].selected = true; break;
        }
        $("#PlayerVSModColorList").change();
        //document.getElementById("VSmodIMG2").src = document.getElementById("caVSmod").src;
        setTimeout(function () {
            document.getElementById("VSmodIMG2").src = document.getElementById("caVSmod").src;
        }, 200);
    }
}

function ChangeVsPic_() {
    var vspicindex = $("#PlayerVSModColorList").get(0).selectedIndex;
    var c1 = $("#vscol_1").get(0).selectedIndex;
    var c2 = $("#vscol_2").get(0).selectedIndex;
    var c3 = $("#vscol_3").get(0).selectedIndex;
    var c4 = $("#vscol_4").get(0).selectedIndex;
    var c5 = $("#vscol_5").get(0).selectedIndex;
    var c6 = $("#vscol_6").get(0).selectedIndex;
    var c7 = $("#vscol_7").get(0).selectedIndex;

    if (vspicindex == 1 || vspicindex == 2) {
        NesHex[IMG_Name_Portrait[vspicindex][1]] = c1;
        NesHex[IMG_Name_Portrait[vspicindex][2]] = c2;
        NesHex[IMG_Name_Portrait[vspicindex][3]] = c4;
        NesHex[IMG_Name_Portrait[vspicindex][4]] = c3;
    }
    else if (vspicindex == 3) {
        NesHex[IMG_Name_Portrait[vspicindex][1]] = c1;
        NesHex[IMG_Name_Portrait[vspicindex][2]] = c2;
        NesHex[IMG_Name_Portrait[vspicindex][3]] = c4;
    }
    else if (vspicindex == 4 || vspicindex == 5) {
        var xd = 0;
        if (IsCn) { xd = 0x40000; }
        NesHex[IMG_Name_Portrait[vspicindex][1] + xd] = c1;
        NesHex[IMG_Name_Portrait[vspicindex][2] + xd] = c2;
        NesHex[IMG_Name_Portrait[vspicindex][3] + xd] = c5;
        NesHex[IMG_Name_Portrait[vspicindex][4] + xd] = c4;
        NesHex[IMG_Name_Portrait[vspicindex][5] + xd] = c3;
    }
    else if (vspicindex == 7 || vspicindex == 8 ||
        vspicindex == 11 || vspicindex == 12 || vspicindex == 15 || vspicindex == 16 ||
        vspicindex == 17 || vspicindex == 18 || vspicindex == 25 || vspicindex == 26) {
        NesHex[IMG_Name_Portrait[vspicindex][1]] = c1;
        NesHex[IMG_Name_Portrait[vspicindex][2]] = c2;
        NesHex[IMG_Name_Portrait[vspicindex][3]] = c3;
        NesHex[IMG_Name_Portrait[vspicindex][4]] = c4;
    }
    else {
        NesHex[IMG_Name_Portrait[vspicindex][1]] = c1;
        NesHex[IMG_Name_Portrait[vspicindex][2]] = c2;
        NesHex[IMG_Name_Portrait[vspicindex][3]] = c5;
        NesHex[IMG_Name_Portrait[vspicindex][4]] = c4;
        NesHex[IMG_Name_Portrait[vspicindex][5]] = c3;
    }

    NesHex[0x2830B] = c6;
    NesHex[vsbgs] = c7;
    alertMsg("#isfileload", "green", " 肖像颜色修改成功~", 2000);
}

var vspicload = true;
var vspicgk = true;
var vsbgs = 0;
function PlayerVSModColorChange() {
    vspicload = false;
    vsbgs = 0;
    var vspicindex = $("#PlayerVSModColorList").get(0).selectedIndex;
    if (vspicindex >= 0 && vspicindex <= 6) {
        $("#vscc_1").html('GK衣领');
        $("#vscc_2").html('GK球衣');
        vspicgk = true;
        vsbgs = 0x28316;
    }
    else {
        $("#vscc_1").html('浅色衣服');
        $("#vscc_2").html('深色衣服');
        vspicgk = false;
        vsbgs = 0x28307;
    }

    document.getElementById("vscol_6")[NesHex[0x2830B]].selected = true;
    document.getElementById("vscol_7")[NesHex[vsbgs]].selected = true;
    document.getElementById("caVSmodtemp").crossorigin = "";
    document.getElementById("caVSmodtemp").src = IMG_VS_Pic[IMG_VS_PicNB[vspicindex]];
    $("#vscol_1").attr('disabled', false);
    $("#vscol_2").attr('disabled', false);
    $("#vscol_3").attr('disabled', false);
    $("#vscol_4").attr('disabled', false);
    $("#vscol_5").attr('disabled', false);

    if (vspicindex == 1 || vspicindex == 2) {
        document.getElementById("vscol_1")[NesHex[IMG_Name_Portrait[vspicindex][1]]].selected = true;
        document.getElementById("vscol_2")[NesHex[IMG_Name_Portrait[vspicindex][2]]].selected = true;
        document.getElementById("vscol_4")[NesHex[IMG_Name_Portrait[vspicindex][3]]].selected = true;
        document.getElementById("vscol_3")[NesHex[IMG_Name_Portrait[vspicindex][4]]].selected = true;
        $("#vscol_5").attr('disabled', true);
    }
    else if (vspicindex == 3) {
        document.getElementById("vscol_1")[NesHex[IMG_Name_Portrait[vspicindex][1]]].selected = true;
        document.getElementById("vscol_2")[NesHex[IMG_Name_Portrait[vspicindex][2]]].selected = true;
        document.getElementById("vscol_4")[NesHex[IMG_Name_Portrait[vspicindex][3]]].selected = true;
        $("#vscol_3").attr('disabled', true); $("#vscol_5").attr('disabled', true);
    }
    else if (vspicindex == 4 || vspicindex == 5) {
        var xd = 0;
        if (IsCn) { xd = 0x40000; }
        document.getElementById("vscol_1")[NesHex[IMG_Name_Portrait[vspicindex][1] + xd]].selected = true;
        document.getElementById("vscol_2")[NesHex[IMG_Name_Portrait[vspicindex][2] + xd]].selected = true;
        document.getElementById("vscol_3")[NesHex[IMG_Name_Portrait[vspicindex][5] + xd]].selected = true;
        document.getElementById("vscol_4")[NesHex[IMG_Name_Portrait[vspicindex][4] + xd]].selected = true;
        document.getElementById("vscol_5")[NesHex[IMG_Name_Portrait[vspicindex][3] + xd]].selected = true;
    }
    else if (vspicindex == 7 || vspicindex == 8 ||
        vspicindex == 11 || vspicindex == 12 || vspicindex == 15 || vspicindex == 16 ||
        vspicindex == 17 || vspicindex == 18 || vspicindex == 25 || vspicindex == 26) {
        document.getElementById("vscol_1")[NesHex[IMG_Name_Portrait[vspicindex][1]]].selected = true;
        document.getElementById("vscol_2")[NesHex[IMG_Name_Portrait[vspicindex][2]]].selected = true;
        document.getElementById("vscol_3")[NesHex[IMG_Name_Portrait[vspicindex][3]]].selected = true;
        document.getElementById("vscol_4")[NesHex[IMG_Name_Portrait[vspicindex][4]]].selected = true;
        $("#vscol_5").attr('disabled', true);
    }
    else {
        document.getElementById("vscol_1")[NesHex[IMG_Name_Portrait[vspicindex][1]]].selected = true;
        document.getElementById("vscol_2")[NesHex[IMG_Name_Portrait[vspicindex][2]]].selected = true;
        document.getElementById("vscol_3")[NesHex[IMG_Name_Portrait[vspicindex][5]]].selected = true;
        document.getElementById("vscol_4")[NesHex[IMG_Name_Portrait[vspicindex][4]]].selected = true;
        document.getElementById("vscol_5")[NesHex[IMG_Name_Portrait[vspicindex][3]]].selected = true;
    }
    vspicload = true;
    PlayerVSModColorChange2();
}

function PlayerVSModColorChange2() {
    if (vspicload == false) { return; }
    var vspicindex = $("#PlayerVSModColorList").get(0).selectedIndex;
    document.getElementById("caVSmodtemp").crossorigin = "";
    document.getElementById("caVSmodtemp").src = IMG_VS_Pic[IMG_VS_PicNB[vspicindex]];
    var idx_1 = $("#vscol_1").get(0).selectedIndex;
    var idx_2 = $("#vscol_2").get(0).selectedIndex;
    var idx_3 = $("#vscol_3").get(0).selectedIndex;
    var idx_4 = $("#vscol_4").get(0).selectedIndex;
    var idx_5 = $("#vscol_5").get(0).selectedIndex;
    setTimeout(function () {
        switch (vspicindex) {
            case 1: SetNewColor(idx_1, idx_2, idx_3, idx_4); break;
            case 2: SetNewColor(idx_1, idx_2, idx_3, idx_4); break;
            case 3: SetNewColor(idx_1, idx_2, 0x100, idx_3); break;
            case 7: SetNewColor(idx_1, idx_2, idx_3, idx_4); break;
            case 8: SetNewColor(idx_1, idx_2, idx_3, idx_4); break;
            case 11: SetNewColor(idx_1, idx_2, idx_3, idx_4); break;
            case 12: SetNewColor(idx_1, idx_2, idx_3, idx_4); break;
            case 15: SetNewColor(idx_1, idx_2, idx_3, idx_4); break;
            case 16: SetNewColor(idx_1, idx_2, idx_3, idx_4); break;
            case 17: SetNewColor(idx_1, idx_2, idx_3, idx_4); break;
            case 18: SetNewColor(idx_1, idx_2, idx_3, idx_4); break;
            case 25: SetNewColor(idx_1, idx_2, idx_3, idx_4); break;
            case 26: SetNewColor(idx_1, idx_2, idx_3, idx_4); break;
            default: SetNewColor(idx_1, idx_2, idx_3, idx_4, idx_5); break;
        }
    }, 200);
}

function SetNewColor(浅色皮肤 = 0x100, 深色皮肤 = 0x100, 浅色衣服_GK衣领 = 0x100, 深色衣服_GK球衣 = 0x100, 头发 = 0x100,) {
    //var 背景色 = Color.FromArgb(102, 153, 255);
    var idx_1 = $("#vscol_1").get(0).selectedIndex;
    var idx_2 = $("#vscol_2").get(0).selectedIndex;
    var idx_3 = $("#vscol_3").get(0).selectedIndex;
    var idx_4 = $("#vscol_4").get(0).selectedIndex;
    var idx_5 = $("#vscol_5").get(0).selectedIndex;
    var idx_6 = $("#vscol_6").get(0).selectedIndex;
    var idx_7 = $("#vscol_7").get(0).selectedIndex;

    var c1 = (nespal[idx_1 * 3 + 0] + ',' + nespal[idx_1 * 3 + 1] + ',' + nespal[idx_1 * 3 + 2]).split(',');
    var c2 = (nespal[idx_2 * 3 + 0] + ',' + nespal[idx_2 * 3 + 1] + ',' + nespal[idx_2 * 3 + 2]).split(',');
    var c3 = (nespal[idx_3 * 3 + 0] + ',' + nespal[idx_3 * 3 + 1] + ',' + nespal[idx_3 * 3 + 2]).split(',');
    var c4 = (nespal[idx_4 * 3 + 0] + ',' + nespal[idx_4 * 3 + 1] + ',' + nespal[idx_4 * 3 + 2]).split(',');
    var c5 = (nespal[idx_5 * 3 + 0] + ',' + nespal[idx_5 * 3 + 1] + ',' + nespal[idx_5 * 3 + 2]).split(',');
    var c6 = (nespal[idx_6 * 3 + 0] + ',' + nespal[idx_6 * 3 + 1] + ',' + nespal[idx_6 * 3 + 2]).split(',');
    var c7 = 'rgb(' + (nespal[idx_7 * 3 + 0] + ',' + nespal[idx_7 * 3 + 1] + ',' + nespal[idx_7 * 3 + 2]).split(',') + ')';
    $("#vspic_outside").css('background-color', c7);

    let CGimg = document.getElementById("caVSmodtemp");  
    let CGcanvas = document.createElement('canvas');
    CGcanvas.width = CGimg.width;
    CGcanvas.height = CGimg.height;
    var CGctx = CGcanvas.getContext('2d');
    CGctx.drawImage(CGimg, 0, 0);
    var CGimageData = CGctx.getImageData(0, 0, CGimg.width, CGimg.height);
    var CGdata = CGimageData.data;
    for (var i = 0; i < CGdata.length; i += 4) {
        if (CGdata[i] == 255 && CGdata[i + 1] == 204 && CGdata[i + 2] == 204 && 浅色皮肤 != 0x100) {
            CGdata[i] = c1[0]; CGdata[i + 1] = c1[1]; CGdata[i + 2] = c1[2]; continue;
        }
        if (CGdata[i] == 255 && CGdata[i + 1] == 153 && CGdata[i + 2] == 0 && 深色皮肤 != 0x100) {
            CGdata[i] = c2[0]; CGdata[i + 1] = c2[1]; CGdata[i + 2] = c2[2]; continue;
        }
        if (CGdata[i] == 153 && CGdata[i + 1] == 255 && CGdata[i + 2] == 255 && 浅色衣服_GK衣领 != 0x100) {
            CGdata[i] = c3[0]; CGdata[i + 1] = c3[1]; CGdata[i + 2] = c3[2]; continue;
        }
        if (CGdata[i] == 153 && CGdata[i + 1] == 204 && CGdata[i + 2] == 255 && 深色衣服_GK球衣 != 0x100) {
            CGdata[i] = c4[0]; CGdata[i + 1] = c4[1]; CGdata[i + 2] = c4[2]; continue;
        }
        if (CGdata[i] == 102 && CGdata[i + 1] == 51 && CGdata[i + 2] == 0 && 头发 != 0x100) {
            CGdata[i] = c5[0]; CGdata[i + 1] = c5[1]; CGdata[i + 2] = c5[2]; continue;
        }
        if (CGdata[i] == 102 && CGdata[i + 1] == 153 && CGdata[i + 2] == 255) {
            CGdata[i] = c6[0]; CGdata[i + 1] = c6[1]; CGdata[i + 2] = c6[2]; continue;
        }
    }
    CGctx.putImageData(CGimageData, 0, 0);
    document.getElementById("caVSmod").crossorigin = "";
    CGimg.src = document.getElementById("caVSmod").src=CGcanvas.toDataURL("image/png");
}

function InputPlayerColorData(passdataid) {
    $(passdataid).empty();
    var list = "";
    for (var i = 0x00; i <= 0x3F; i++) {
        //var newcolor=ReturnNesColor2(i);
        var newcolor = oppositeColor(ReturnNesColor2(i));
        if (i == 0x00 || i == 0x01 || i == 0x02 || i == 0x06 || i == 0x07 || i == 0x08 || i == 0x09 || i == 0x0A || i == 0x0B || i == 0x0C || i == 0x1A || i == 0x1B || i == 0x1C || i == 0x21 || i == 0x22 || i == 0x23 || i == 0x24 || i == 0x25 || i == 0x26
            || i == 0x11 || i == 0x12 || i == 0x13 || i == 0x14 || i == 0x15 || i == 0x2D || i == 0x3D) {
            newcolor = "#FFFFFF";
        }
        list += '<option  value=<span style="background-color:' + ReturnNesColor(i) + ';color:' + newcolor + ';">' + addPreZero(i.toString(16).toUpperCase()) + '</span></option>';
    }
    $(passdataid).html(list);
}

function oppositeColor(a) {
    a = a.replace('#', '');
    var c16, c10, max16 = 15, b = [];
    for (var i = 0; i < a.length; i++) {
        c16 = parseInt(a.charAt(i), 16); //  to 16进制
        c10 = parseInt(max16 - c16, 10); // 10进制计算
        b.push(c10.toString(16)); // to 16进制
    }
    return '#' + b.join('');
}