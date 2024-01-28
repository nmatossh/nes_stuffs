/*! Aiview 1.0 by daymoe */
function AiPlayersChange() {
    var AiGKList = [
        0x02, 0x0F, 0x21, 0x22,
        0x26, 0x33, 0x39, 0x40, 0x4C, 0x52, 0x56, 0x5B,
        0x69, 0x74, 0x76, 0x79, 0x7E, 0x81, 0x84, 0x87,
        0x8A, 0x8F, 0x92, 0x97, 0x9A, 0x9F, 0xA2, 0xA5,
        0xA8, 0xAB, 0xAE, 0xB1, 0xB5, 0xBA, 0xBD, 0xC2,
        0xC5
    ];

    var AiDataAddrIndex = aI_我方球员 + (0x22 * 4); //AI数据索引地址
    IsGK = false;
    我方球员数据 = false;
    AI数据索引 = $("#AiPlayerSelect").get(0).selectedIndex;

    if (AI数据索引 <= 33) {
        我方球员数据 = true;
        AiDataAddrIndex = aI_我方球员;
    }
    else {
        AI数据索引 = AI数据索引 - 34;
    }

    for (var gkid = 0; gkid < AiGKList.length; gkid++) //这里直接处理GK
    {
        if (AiGKList[gkid] == $("#AiPlayerSelect").get(0).selectedIndex + 1) {
            IsGK = true;
            break;
        }
    }
    var hptemp = 0;
    if (IsGK == true) {
        hptemp = 0x9D;
        if (我方球员数据 == true) {
            var 数据地址 = AiDataAddrIndex + AI数据索引 * 4;
            $("#aitab_4").css('display', 'none');
            $("#aitab_5").css('display', 'none');
            $("#aitab_6").css('display', 'none');
            $("#aitab_7").css('display', 'none');
        }
        else {
            var 数据地址 = AiDataAddrIndex + AI数据索引 * 12;
            $("#aitab_4").css('display', 'none');
            $("#aitab_5").css('display', 'none');
            $("#aitab_6").css('display', 'inline-block');
            $("#aitab_7").css('display', 'inline-block');
            $("#AiPasslistSelect").val(NesHex[数据地址 + 10]);
            $("#AiGK1").val(NesHex[数据地址 + 4]);
            $("#AiGK2").val(NesHex[数据地址 + 5]);
            $("#AiGK3").val(NesHex[数据地址 + 6]);
            AiPasslistChange();
        }
    }
    else {
        if (我方球员数据 == true) {
            var 数据地址 = AiDataAddrIndex + AI数据索引 * 4;
            $("#aitab_4").css('display', 'none');
            $("#aitab_5").css('display', 'none');
            $("#aitab_6").css('display', 'none');
            $("#aitab_7").css('display', 'none');
        }
        else {
            var 数据地址 = AiDataAddrIndex + AI数据索引 * 12;
            $("#aitab_4").css('display', 'inline-block');
            $("#aitab_5").css('display', 'inline-block');
            $("#aitab_6").css('display', 'none');
            $("#aitab_7").css('display', 'inline-block');
            $("#AiAck1").val(NesHex[数据地址 + 4]);
            $("#AiAck2").val(NesHex[数据地址 + 5]);
            $("#AiAck3").val(NesHex[数据地址 + 6]);
            $("#AiDef1").val(NesHex[数据地址 + 7]);
            $("#AiDef2").val(NesHex[数据地址 + 8]);
            $("#AiDef3").val(NesHex[数据地址 + 9]);
            $("#AiPasslistSelect").val(NesHex[数据地址 + 10]);
            AiPasslistChange();
        }
    }

    $("#AiHPindex").val(NesHex[数据地址 + 0] + hptemp);
    $("#AiRunType").val(NesHex[数据地址 + 1]);
    $("#AiXXAck").val(NesHex[数据地址 + 2]);
    $("#AiXXDef").val(NesHex[数据地址 + 3]);

    if (IsGK == true && 我方球员数据 == false) {

        ldAIData3(0); ldAIData3(1); ldAIData3(2);
        GetAIData3(0); GetAIData3(1); GetAIData3(2);
    }

    if (IsGK == false && 我方球员数据 == false) {

        ldAIData1(0); ldAIData1(1); ldAIData1(2);
        ldAIData2(0); ldAIData2(1); ldAIData2(2);
    }
    checkrunai();
    outAiStr();
}

var OutAI_Str = "";
/////输出地址跟数据显示在网页上
function outAiStr() {
    OutAI_Str = "";
    try {
        var 能力 = $("#AiHPindex").get(0).selectedIndex;
        if (IsGK == true) {
            能力 = 能力 - 0x9D;
        }
        var txt1 = "完整代码数据：" + (aI_我方球员 + (0x22 * 4) + (AI数据索引 * 12)).toString(16).toUpperCase() + "="
            + toHex16(能力)
            + " " + toHex16($("#AiRunType").get(0).selectedIndex)
            + " " + toHex16($("#AiXXAck").get(0).selectedIndex)
            + " " + toHex16($("#AiXXDef").get(0).selectedIndex)
            + " " + toHex16($("#AiAck1").get(0).selectedIndex)
            + " " + toHex16($("#AiAck2").get(0).selectedIndex)
            + " " + toHex16($("#AiAck3").get(0).selectedIndex)
            + " " + toHex16($("#AiDef1").get(0).selectedIndex)
            + " " + toHex16($("#AiDef2").get(0).selectedIndex)
            + " " + toHex16($("#AiDef3").get(0).selectedIndex)
            + " " + toHex16($("#AiPasslistSelect").get(0).selectedIndex) + " 00";

        if (IsGK == true) {
            txt1 = "完整代码数据：" + (aI_我方球员 + (0x22 * 4) + (AI数据索引 * 12)).toString(16).toUpperCase() + "="
                + toHex16(能力)
                + " " + toHex16($("#AiRunType").get(0).selectedIndex)
                + " " + toHex16($("#AiXXAck").get(0).selectedIndex)
                + " " + toHex16($("#AiXXDef").get(0).selectedIndex)
                + " " + toHex16($("#AiGK1").get(0).selectedIndex)
                + " " + toHex16($("#AiGK2").get(0).selectedIndex)
                + " " + toHex16($("#AiGK3").get(0).selectedIndex)
                + " 00 "
                + " 00 "
                + " 00 "
                + " " + toHex16($("#AiPasslistSelect").get(0).selectedIndex) + " 00";
        }

        var txt2 = "";
        var txt3 = "";
        for (var i = 0; i < 8; i++) {
            txt2 += $(("#passdata" + (i + 1))).find('option:selected').text() + " ";
        }
        txt2 = "传球意向代码：" + toHex16((aI_传球意向 + ($("#AiPasslistSelect").get(0).selectedIndex * 8)), 5) + "=" + txt2;
        for (var i = 0; i < 12; i++) {
            txt3 += toHex16($(("#AiRunType_" + (i + 1))).get(0).selectedIndex) + " ";
        }
        txt3 = "步长数据代码：" + toHex16(步长类型 + ($("#AiRunType").get(0).selectedIndex * 12), 5) + "=" + txt3;
        if (我方球员数据 == true) {
            txt1 = "完整代码数据：" + (aI_我方球员 + AI数据索引 * 4).toString(16).toUpperCase() + "="
                + toHex16(能力)
                + " " + toHex16($("#AiRunType").get(0).selectedIndex)
                + " " + toHex16($("#AiXXAck").get(0).selectedIndex)
                + " " + toHex16($("#AiXXDef").get(0).selectedIndex);

            OutAI_Str = "<div><span>" + txt1 + "</span></div><div><span>" + txt3 +"</span></div>" ;
        }
        else {
            OutAI_Str = "<div><span>" + txt1 + "</span></div><div><span>" + txt2 + "</span></div><div><span>" + txt3 + "</span></div>";
        }

        document.getElementById("AIOutStr").innerHTML = OutAI_Str + "<div><span>如需更改数据,使用上面的地址跟数据.</span></div><div><span>几率的数据也会标明地址,请谨慎修改.</span></div>";
    }
    catch
    {
        //
    }
}

function AiPasslistChange() {
    var strcode = aI_传球意向;
    for (var ist = 0; ist < 48; ist++) {
        if ($("#AiPasslistSelect").get(0).selectedIndex != ist) {
            continue;
        }
        var dizhi = strcode + ist * 8;
        for (var i = 0; i <= 7; i++) {
            $("#passsp" + (i + 1)).text(GetPassAiType(NesHex[dizhi + i]));
            $("#passdata" + (i + 1)).val(NesHex[dizhi + i]);
            $("#passdata" + (i + 1)).attr("offindex", dizhi + i);
        }
        $("#Passtext").html("传球意向类型:0x" + toHex16(dizhi, 5));
    }
    outAiStr();
}

function GetPassAiType(nb1) {
    if ((nb1 / 4) > 11) { return "随机"; }
    else { return parseInt((nb1 / 4)) + "号"; }
    return "??";
}

function loadPassAi2() {
    for (var i = 0; i <= 7; i++) {
        InputPassData("#passdata" + (i + 1));
    }
}

function showdiv(x) {
    $("#aiackdiv1").css('display', 'none');
    $("#aiackdiv2").css('display', 'none');
    $("#aiackdiv3").css('display', 'none');
    $("#aidefdiv1").css('display', 'none');
    $("#aidefdiv2").css('display', 'none');
    $("#aidefdiv3").css('display', 'none');
    $("#aiGKdiv1").css('display', 'none');
    $("#aiGKdiv2").css('display', 'none');
    $("#aiGKdiv3").css('display', 'none');

    switch (x) {
        case 0: $("#aiackdiv1").css('display', 'block'); break;
        case 1: $("#aiackdiv2").css('display', 'block'); break;
        case 2: $("#aiackdiv3").css('display', 'block'); break;
        case 3: $("#aidefdiv1").css('display', 'block'); break;
        case 4: $("#aidefdiv2").css('display', 'block'); break;
        case 5: $("#aidefdiv3").css('display', 'block'); break;
        case 6: $("#aiGKdiv1").css('display', 'block'); break;
        case 7: $("#aiGKdiv2").css('display', 'block'); break;
        case 8: $("#aiGKdiv3").css('display', 'block'); break;
    }
}

function GetAIData1(type) {
    var st = 0;
    var ed = 5;
    if (type == 0) {
    }
    if (type == 1) {
        st = 6; ed = 8;
    }
    if (type == 2) {
        st = 9; ed = 11;
    }

    var str = "";
    for (var i = st; i <= ed; i++) {

        var Hex1 = [];
        for (var x = 0; x < 4; x++) {
            Hex1.push($("#AiEx_select_" + i + "_" + x).val());
        }

        if (type == 0) {
            var 几率 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            str = GetAiTyoeStr(Hex1, "", Ai_data_1_3, Ai_data_1_2, 几率);
        }
        if (type == 1) {
            var 几率 = [0, 0, 0, 0];
            str = GetAiTyoeStr(Hex1, "", Ai_data_2_3, Ai_data_2_2, 几率);
        }
        if (type == 2) {
            var 几率 = [0, 0, 0, 0];
            str = GetAiTyoeStr(Hex1, "", Ai_data_3_3, Ai_data_3_2, 几率);
        }
        $("#AiEx_Txt_" + i).html(str);
    }
}

function GetAIData2(type) {
    var st = 0;
    var ed = 5;
    if (type == 0) {
    }
    if (type == 1) {
        st = 6; ed = 8;
    }
    if (type == 2) {
        st = 9; ed = 11;
    }

    var str = "";
    for (var i = st; i <= ed; i++) {

        var Hex1 = [];
        for (var x = 0; x < 4; x++) {
            Hex1.push($("#AiEx1_select_" + i + "_" + x).val());
        }

        if (type == 0) {
            var 几率 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            str = GetAiTyoeStr(Hex1, "", Ai_data_4_3, Ai_data_4_2, 几率);
        }
        if (type == 1) {
            var 几率 = [0, 0, 0, 0];
            str = GetAiTyoeStr(Hex1, "", Ai_data_5_3, Ai_data_5_2, 几率);
        }
        if (type == 2) {
            var 几率 = [0, 0, 0, 0];
            str = GetAiTyoeStr(Hex1, "", Ai_data_6_3, Ai_data_6_2, 几率);
        }
        $("#AiEx1_Txt_" + i).html(str);
    }
}

function GetAIData3(type) {
    var str = "";
    var Hex1 = [];
    for (var x = 0; x < 4; x++) {
        Hex1.push($("#AiEx2_select_" + (type + 1) + "_" + x).val());
    }

    if (type == 0) {
        var 几率 = [0, 0, 0];
        str = GetAiTyoeStr(Hex1, "", Ai_data_7_3, Ai_data_7_2, 几率);
    }
    if (type == 1) {
        var 几率 = [0, 0];
        str = GetAiTyoeStr(Hex1, "", Ai_data_8_3, Ai_data_8_2, 几率);
    }
    if (type == 2) {
        var 几率 = [0, 0];
        str = GetAiTyoeStr(Hex1, "", Ai_data_9_3, Ai_data_9_2, 几率);
    }
    $("#AiEx2_Txt_" + (type + 1)).html(str);
}

function ldAIData1(type) {
    var 地址 = (进攻AI地址 + $("#AiAck1").get(0).selectedIndex * 48);
    var st = 0;
    var ed = 5;
    if (type == 0) {
    }

    if (type == 1) {

        st = 6; ed = 8;
        地址 = (进攻AI地址 + $("#AiAck2").get(0).selectedIndex * 48);
    }
    if (type == 2) {
        st = 9; ed = 11;
        地址 = (进攻AI地址 + $("#AiAck3").get(0).selectedIndex * 48);
    }
    for (var i = st; i <= ed; i++) {
        for (var x = 0; x < 4; x++) {
            $(("#AiEx_select_" + (i) + "_" + x)).val(toHex16(NesHex[地址 + (i * 4) + x]));
            $("#AiEx_" + i).html($("#AiEx_" + i).attr("af") + " 地址:0x" + toHex16(地址 + (i * 4), 5));
        }
    }
    GetAIData1(0); GetAIData1(1); GetAIData1(2);
    outAiStr();
}

function ldAIData2(type) {
    var 地址 = (防守AI地址 + $("#AiDef1").get(0).selectedIndex * 48);
    var st = 0;
    var ed = 5;
    if (type == 0) {
    }

    if (type == 1) {

        st = 6; ed = 8;
        地址 = (防守AI地址 + $("#AiDef2").get(0).selectedIndex * 48);
    }
    if (type == 2) {
        st = 9; ed = 11;
        地址 = (防守AI地址 + $("#AiDef3").get(0).selectedIndex * 48);
    }
    for (var i = st; i <= ed; i++) {
        for (var x = 0; x < 4; x++) {
            $(("#AiEx1_select_" + (i) + "_" + x)).val(toHex16(NesHex[地址 + (i * 4) + x]));
            $("#AiEx1_" + i).html($("#AiEx1_" + i).attr("af") + " 地址:0x" + toHex16(地址 + (i * 4), 5));
        }
    }
    GetAIData2(0); GetAIData2(1); GetAIData2(2);
    outAiStr();
}

function ldAIData3(type) {
    var 地址 = (GKAI地址 + $("#AiGK1").get(0).selectedIndex * 12);

    if (type == 0) {
    }

    if (type == 1) {

        地址 = (GKAI地址 + $("#AiGK2").get(0).selectedIndex * 12);
    }
    if (type == 2) {
        地址 = (GKAI地址 + $("#AiGK3").get(0).selectedIndex * 12);
    }

    for (var x = 0; x < 4; x++) {
        $(("#AiEx2_select_" + (type + 1) + "_" + x)).val(toHex16(NesHex[地址 + (type * 4) + x]));
    }
    GetAIData3(0); GetAIData3(1); GetAIData3(2);
    outAiStr();
    $("#AiEx2_" + (type + 1)).html($("#AiEx2_" + (type + 1)).attr("af") + " 地址:0x" + toHex16(地址 + (type * 4), 5));
}

var 分割线 = "<HR style= 'border: 1 dashed #987cb9'' width ='80%' color =#987 cb 9 SIZE = 1>";
function getoptionsVal(op, id) {
    $("#passsp" + id).text(GetPassAiType($(op).val()));
    outAiStr();
    //GetPassAiType($(op).val());
    //alert($(op).attr("offindex"));
}

function InputPassData(passdataid) {
    $(passdataid).empty();
    var list = "";
    for (var i = 0x08; i <= 0x2F; i++) {
        list += '<option value= "' + (i) + '">' + toHex16(i) + '</option>';
    }
    for (var i = 0x3C; i <= 0x3F; i++) {
        list += '<option value= "' + (i) + '">' + toHex16(i) + '</option>';
    }
    $(passdataid).html(list);
}

$(document).ready(function () {
    loadPassAi1();
    loadAckAi();
    loadDefAi();
    loadGKAi();
    loadHPandOther();//能力 进攻防守跑动
    loadAiRun();
});