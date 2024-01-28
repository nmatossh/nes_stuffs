//Player select item add
function LoadTxtData() {

    for (var i = 11; i > 0; i--) {
        var sel;
        if (i == 1) {
            sel = document.getElementById('selectplayerGK');
        } else {
            sel = document.getElementById('selectplayer' + addPreZero(i));
        }

        var str = "";
        for (var W = 0; W < playerstr.length; W++) {
            str += '<option>' + playerstr[W] + '</option>';
        }
        sel.innerHTML = str;
    }

    //替补部分
    for (var i = 1; i <= 10; i++) {
        var resel;

        if (i == 9) {
            resel = document.getElementById('selectplayertgk1');

        } else if (i == 10) {
            resel = document.getElementById('selectplayertgk2');
        } else {
            resel = document.getElementById('selectplayert' + addPreZero(i));
        }
        var restr = "";
        for (var W = 0; W < playerstr.length; W++) {
            restr += '<option>' + playerstr[W] + '</option>';
        }
        resel.innerHTML = str;
    }
}

//生成Html元素
function LoadHtmlInner() {
    BulidHTML_Team_Player();
    LoadTxtData();
    BulidHTML_ChrHTML();
    BulidInstructTabHtml();
}

function BulidHTML_ChrHTML() {
    ////////////////////////////////////////////////////////CHR 2.0
    $("#CHRTab").append('<div id="chrEditmeu" style="display:none;position: fixed;"><button style="background-color:white;color:black;" onclick="CopyTileData()">复制</button><br><button style="background-color:white;color:black;" onclick="PastTileData()">粘贴</button></div><div id="ChrColors"></div ><canvas id="chrCanvas" width="128" height="128"></canvas><br><select id="chrPageSelect"></select><span>视图大小:</span><select id="chrSizeSelect"><option value="128">128x128</option><option value="256" selected>256x256</option><option value="512">512x512</option></select><br><span id="tileInfo"></span><br><span id="tileCode"></span><br><span>画笔:</span><select id="penSelect"><option value="0"></option><option value="1"></option><option value="2"></option><option value="3"></option></select>&nbsp;<canvas id="penCanvas" width="32" height="32"></canvas>&nbsp;<span>剪切板:</span><canvas id="PastTileCanvas" width="32" height="32"></canvas><br><canvas id="selectedTileCanvas" width="128" height="128"></canvas><br><button onclick="writeTileData()">应用Tile数据更改</button><br><span>CHR大图:右键弹出复制/粘贴菜单.<br>Tile编辑:左键改颜色,右键切换画笔.<br>注:可按住左键并移动鼠标连续编辑<br>Tile编辑暂为实验性功能,操作并不便捷.</span>');
    $("#ChrColors").append("<span>Chr 简易查看/编辑工具 v2.1 by daymoe<br>调色板:</span><select id='ChrColor1' onchange='ChrColorChange()'></select> <select id='ChrColor2'onchange='ChrColorChange()'></select> <select id='ChrColor3'onchange='ChrColorChange()'></select> <select id='ChrColor4'onchange='ChrColorChange()'></select>");
    InputPlayerColorData("#ChrColor1");
    InputPlayerColorData("#ChrColor2");
    InputPlayerColorData("#ChrColor3");
    InputPlayerColorData("#ChrColor4");
    document.getElementById("ChrColor1")[0x0F].selected = true;
    document.getElementById("ChrColor2")[0x07].selected = true;
    document.getElementById("ChrColor3")[0x28].selected = true;
    document.getElementById("ChrColor4")[0x39].selected = true;
}

function BulidHTML_Team_Player() {
    ////////////////////////////////////////////////////////球员
    $("#Team_player_list").empty();
    var Team_player_list = "<div id='playerlistdiv' style='float:left; display:inline;'>";
    //正常
    for (var i = 11; i > 0; i--) {
        if (i == 1) {
            Team_player_list += '<span>No.GK：</span><select id="selectplayerGK" offindex=0></select><br>';
        } else {
            Team_player_list += '<span>No.' + addPreZero(i) + '：</span><select id="selectplayer' + addPreZero(i) + '" offindex=0></select><br>';
        }
    }
    Team_player_list += "</div>";
    //替补
    Team_player_list += "<div id='replayerlistdiv' style='float:left; display:none;'>";
    for (var i = 0; i <= 7; i++) {
        Team_player_list += '<span>Re.' + addPreZero(i + 1) + '：</span><select id="selectplayert' + addPreZero(i + 1) + '" offindex=0></select><br>';
    }
    Team_player_list += '<span>Re.GK1：</span><select id="selectplayertgk1" offindex=0></select><br>';
    Team_player_list += '<span>Re.GK2：</span><select id="selectplayertgk2" offindex=0></select><br>';
    Team_player_list += "</div>";
    //
    $("#Team_player_list").html(Team_player_list);
    ////////////////////////////////////////////////////////球队
    $("#Team_list").empty();
    var Team_list = "<select id='Team_Select' onchange='TeamSelectChange()'>";
    for (var W = 0; W < teamlist.length; W++) {
        Team_list += '<option>' + teamlist[W] + '</option>';
    }
    Team_list += "</select>";
    //新增的球队
    Team_list += "<select id='Add_Team_Select' style='display:none;' onchange='Add_TeamSelectChange()'>";
    for (var W = 3; W < teamlist.length; W++) {
        Team_list += '<option>' + teamlist[W] + '</option>';
    }
    Team_list += "</select>";
    Team_list += "<button id='showadteambtn' onclick='CAddTeam()'>球星添加</button>&nbsp;<button onclick='ChangeTeam()'>修改</button><br>";
    Team_list += '<div id="Team_AKDFdiv"><span>战术：</span><select id="Team_AK"></select>&nbsp;<span>阵型：</span><select id="Team_DF"></select><span id="TeamedStr"> </span><br></div>';
    $("#Team_list").html(Team_list);
    for (var i = 0; i < 4; i++) {
        $("#Team_DF").append("<option value='" + (i) + "'>" + Formation_Str[i] + "</option>");
    }
    for (var i = 4; i < Formation_Str.length; i++) {
        $("#Team_AK").append("<option value='" + (i) + "'>" + Formation_Str[i] + "</option>");
    }

    //新增
    Team_player_list = "<div id='addteam' style='float:left; display:none;'>使用空地址<input id='addteamusenewaddr' type='checkbox'><br>";
    for (var i = 11; i > 0; i--) {
        if (i == 1) {
            Team_player_list += '<div><span>No.GK：</span><select id="addplayerGK" offindex=0 onchange="addteamclick()"></select><br></div>';
        } else {
            Team_player_list += '<div><span>No.' + addPreZero(i) + '：</span><select id="addplayer' + addPreZero(i) + '" offindex=0 onchange="addteamclick()"></select><br></div>';
        }
    }
    Team_player_list += '<span>固定参数:</span><br>';
    Team_player_list += '<div><span>阵型战术</span><select id="addplayeSB1" offindex=0 onchange="addteamclick()"></select><br></div>';
    Team_player_list += '<div><span>未知数据</span><select id="addplayeSB2" offindex=0 onchange="addteamclick()"></select><br></div>';
    Team_player_list += '<div><span>门将</span><select id="addplayeSB3" offindex=0 onchange="addteamclick()"></select><br></div>';
    Team_player_list += '<div><span>后卫</span><select id="addplayeSB4" offindex=0 onchange="addteamclick()"></select><br></div>';
    Team_player_list += '<div><span>中场</span><select id="addplayeSB5" offindex=0 onchange="addteamclick()"></select><br></div>';
    Team_player_list += '<div><span>前锋</span><select id="addplayeSB6" offindex=0 onchange="addteamclick()"></select><br></div>';
    Team_player_list += '<div><span>角球主罚(高位)</span><select id="addplayeSB7" offindex=0 onchange="addteamclick()"></select><br></div>';
    Team_player_list += '<div><span>角球AI1</span><select id="addplayeSB8" offindex=0 onchange="addteamclick()"></select><br></div>';
    Team_player_list += '<div><span>角球AI2</span><select id="addplayeSB9" offindex=0 onchange="addteamclick()"></select></div>';
    Team_player_list += '<div><span id="addteamStr">Hex:</span></div>';

    Team_player_list += "</div>";
    $("#Team_player_list").append(Team_player_list);

    for (var i = 11; i > 0; i--) {
        var sel;
        if (i == 1) {
            sel = document.getElementById('addplayerGK');
        } else {
            sel = document.getElementById('addplayer' + addPreZero(i));
        }
        var str = "";
        for (var W = 0; W < playerstr.length; W++) {
            str += '<option>' + playerstr[W] + '</option>';
        }
        sel.innerHTML = str;
    }

    var strTEMP = "";
    for (var W = 0; W < playerstr.length; W++) {
        strTEMP += '<option>' + playerstr[W] + '</option>';
    }
    document.getElementById('addplayeSB3').innerHTML =
        document.getElementById('addplayeSB4').innerHTML =
        document.getElementById('addplayeSB5').innerHTML =
        document.getElementById('addplayeSB6').innerHTML = strTEMP;

    strTEMP = "";
    for (var W = 0; W < 256; W++) {
        strTEMP += '<option>' + toHex16(W) + '</option>';
    }
    document.getElementById('addplayeSB2').innerHTML =
        document.getElementById('addplayeSB7').innerHTML =
        document.getElementById('addplayeSB8').innerHTML =
        document.getElementById('addplayeSB9').innerHTML = strTEMP;

    strTEMP = "";
    for (var W = 0; W < team_da.length; W++) {
        strTEMP += '<option>' + team_da[W] + '</option>';
    }
    document.getElementById('addplayeSB1').innerHTML = strTEMP;

    //袜子
    $("#Teamedit_a_1").empty();
    var Team_SC_list = "<div id='Team_SCDIV'>";
    Team_SC_list +="<select id='Team_SC_Select' onchange='Team_SC_Change()'>";
    for (var W = 0; W < teamlist.length; W++) {
        Team_SC_list += '<option>' + teamlist[W] + '</option>';
    }
    Team_SC_list += "</select><span id='Team_SC_str'></span><br>";
    Team_SC_list += '<span>浅色:</span><select id="Team_SC_C0" offindex=0 onchange="Team_SC_Change2()"></select>&nbsp;';
    Team_SC_list += '<span>深色</span><select id="Team_SC_C1" offindex=0 onchange="Team_SC_Change2()"></select><br>';
    Team_SC_list += "<img id='canteamscpict' src=''/><img id='canteamscpictemp' style='display:none;' src=''/>";
    Team_SC_list += "<br><button onclick='CG_Team_SC()'>修改</button>";
    Team_SC_list += "</div>";
    $("#Teamedit_a_1").html(Team_SC_list);

    strTEMP = "";
    for (var W = 0; W < 0x3F; W++) {
        strTEMP += '<option>' + toHex16(W) + '</option>';
    }
    document.getElementById('Team_SC_C0').innerHTML =  document.getElementById('Team_SC_C1').innerHTML=strTEMP;

    ////////////////////////////////////////////////////////
}

//造型肖像等
function LoadPlayerEditHtml() {
    $("#playeredit_a_0").empty();
    var htmlstr = "<span>Players:</span> <select id='PlayerEditNameList' offindex=0 onchange='PlayerEditSelectChange();'></select><br>";
    htmlstr += "<span>Mod:</span><select id='PlayerModSelect' offindex=0 onchange='PlayerModSelectChange();'>";
    for (var i = 0; i < PlayModList.length; i++) {
        htmlstr += "<option value='" + (i) + "'>" + PlayModList[i] + "</option>";
    }
    htmlstr += "</select><br><div>";
    htmlstr += "<table id='PlayerEditColor' style='border:1px solid #F00;'>";//background-color: #595959;
    htmlstr += "<tr><td>皮肤</td><td>头发</td><td>上衣</td><td>短裤</td><td>造型</td></tr>";
    htmlstr += "<tr><td><span id='PlayerSkincolour' class='colorpanle'>     </span></td><td><span id='PlayerHaircolor' class='colorpanle'>     </span></td><td><span id='PlayerCoatcolor' class='colorpanle'>     </span></td><td><span id='PlayerShortscolor' class='colorpanle'>     </span></td><td><div id='diccanvasmod'><img id='canvasmod' src='" + IMG_ModPic[18] + "'/><div id='LoadPlayEditPngChange'></div><div></td></tr>";
    htmlstr += "<tr><td><select id='PlayerSkincolourSe' offindex=0 onchange='getColoroptionsVal(this)'></select></td><td><select id='PlayerHaircolorSe' offindex=0 onchange='getColoroptionsVal(this)'></select></td><td><select id='PlayerCoatcolorSe' offindex=0 onchange='getColoroptionsVal(this)'></select></td><td><select id='PlayerShortscolorSe' offindex=0 onchange='getColoroptionsVal(this)'></select></td><td><button id='GetModBtn' onclick='GetModFunction()'>刷新预览</button></td></tr>";
    htmlstr += "</table>";
    htmlstr += "</div>";
    htmlstr += "<span id='SeModeDataSpan'>Data:</span><br>";
    htmlstr += "<button onclick='ChangeNowPlayerMod()'>修改当前人物造型数据</button><img id='canvasmodtemp' style='display:none;' src='" + IMG_ModPic[18] + "'/>";
    htmlstr += "<br><span>Mod造型必须要有选中项才会加载图片.<br>球员编号0x76大空翼开始没有头型.<br>造型预览图片显示不了的话重新点一下.<br></span>";
    $("#playeredit_a_0").html(htmlstr);
    $("#PlayerEditNameList").empty();
    for (var i = 0; i < PlayerName.length; i++) {
        $("#PlayerEditNameList").append("<option value='" + (i) + "'>" + PlayerName[i] + "</option>");
    }

    InputPlayerColorData("#PlayerSkincolourSe");
    InputPlayerColorData("#PlayerHaircolorSe");
    InputPlayerColorData("#PlayerCoatcolorSe");
    InputPlayerColorData("#PlayerShortscolorSe");
    $('#PlayerEditNameList').val('000000');
    $('#PlayerModSelect').val('000000');

    //对决肖像部分
    $("#playeredit_a_2").empty();
    htmlstr = "<select id='PlayerVSModColorList' onchange='PlayerVSModColorChange();'></select><br>";
    htmlstr += "<div id='vspic_outside' style='width:256px;height:110px;vertical-align: middle;display: table-cell; text-align: center;'><img id='caVSmod' src='" + IMG_VS_Pic[0] + "'/></div>";
    htmlstr += "<table style='border-collapse: collapse;border: 1px red solid;' id='vspic_Tab'><tr>";
    htmlstr += "<td><span>浅色皮肤</span><br><select id='vscol_1' onchange='PlayerVSModColorChange2();'></select></td>";
    htmlstr += "<td><span>深色皮肤</span><br><select id='vscol_2' onchange='PlayerVSModColorChange2();'></select></td>";
    htmlstr += "<td><span id='vscc_1'>GK衣领</span><br><select id='vscol_3' onchange='PlayerVSModColorChange2();'></select></td>";
    htmlstr += "<td><span id='vscc_2'>GK球衣</span><br><select id='vscol_4' onchange='PlayerVSModColorChange2();'></select></td>";
    htmlstr += "<td><span>头发颜色</span><br><select id='vscol_5' onchange='PlayerVSModColorChange2();'></select></td></tr>";
    htmlstr += "<tr><td><span>内框背景</span><br><select id='vscol_6' onchange='PlayerVSModColorChange2();'></select></td>";
    htmlstr += "<td><span>外框背景</span><br><select id='vscol_7' onchange='PlayerVSModColorChange2();'></select></td>";
    htmlstr += "</tr></table>";
    htmlstr += "<button onclick='ChangeVsPic_()'>修改</button><img id='caVSmodtemp' style='display:none;' src='" + IMG_VS_Pic[0] + "'/>";

    $("#playeredit_a_2").html(htmlstr);
    for (var i = 0; i < IMG_Name_Portrait.length; i++) {
        $("#PlayerVSModColorList").append("<option value='" + (i) + "'>" + IMG_Name_Portrait[i][0] + "</option>");
    }
    for (var i = 0; i < 0x3F; i++) {
        $("#vscol_1").append("<option value='" + (i) + "'>" + toHex16(i) + "</option>");
        $("#vscol_2").append("<option value='" + (i) + "'>" + toHex16(i) + "</option>");
        $("#vscol_3").append("<option value='" + (i) + "'>" + toHex16(i) + "</option>");
        $("#vscol_4").append("<option value='" + (i) + "'>" + toHex16(i) + "</option>");
        $("#vscol_5").append("<option value='" + (i) + "'>" + toHex16(i) + "</option>");
        $("#vscol_6").append("<option value='" + (i) + "'>" + toHex16(i) + "</option>");
        $("#vscol_7").append("<option value='" + (i) + "'>" + toHex16(i) + "</option>");
    }
    $("#vspic_Tab tr th").css('border', '1px solid');
    $("#vspic_Tab tr td").css('text-align', 'center');

    //对决肖像挂接
    $("#playeredit_a_3").empty();

    htmlstr = "<table style='border-collapse: collapse;border: 1px red solid;' id='vscg_Tab'><tr>";
    htmlstr += "<tr>";
    htmlstr += "<td><select id='PlayerVSModADDList1' onchange='PlayerVSModAddChange(1);'></select><br><select id='Vsmodelist1' onchange='bingDVSimg(1);'></select></td>";
    htmlstr += "<td class='cvspkimg'><img id='VSmodIMG1' src='" + IMG_VS_Pic[IMG_VS_Pic.length - 1] + "'/><br><span id='VSmodIMG1str'>0x20704</span></td>";
    htmlstr += "</tr>";
    htmlstr += "<tr>";
    htmlstr += "<td><select id='PlayerVSModADDList2' onchange='PlayerVSModAddChange(2);'></select><br><select id='Vsmodelist2' onchange='bingDVSimg(2);'></select></td>";
    htmlstr += "<td class='cvspkimg'><img id='VSmodIMG2' src='" + IMG_VS_Pic[0] + "'/><br><span id='VSmodIMG2str'>0x21E6C</span></td>";
    htmlstr += "</tr>";
    htmlstr += "</table>";
    htmlstr += "<button onclick='ChangGVsPKpic()'>修改</button>";

    $("#playeredit_a_3").html(htmlstr);
    for (var i = 0; i < PlayerName_Skill.length; i++) {
        if (i == 0) {
            $("#PlayerVSModADDList1").append("<option value='" + (i) + "'>" + playerstrtemp0 + "</option>");
        }
        if (i == 0x01 || i == 0x0E || i == 0x20 || i == 0x21 || i == 0x25 || i == 0x38 || i == 0x3F || i == 0x4B || i == 0x32 ||
            i == 0x51 || i == 0x55 || i == 0x5A || i == 0x68 || i == 0x73) {
        } else {
            $("#PlayerVSModADDList1").append("<option value='" + (i) + "'>" + PlayerName_Skill[i] + "</option>");
        }
    }
    for (var i = 0; i < Portrait_List.length; i++) {
        $("#Vsmodelist1").append("<option value='" + (i) + "'>" + Portrait_List[i] + "</option>");
    }

    for (var i = 0; i < 4; i++) {
        $("#PlayerVSModADDList2").append("<option value='" + (i) + "'>" + Portrait_List_GK[i] + "</option>");
    }
    for (var i = 4; i < Portrait_List_GK.length; i++) {
        $("#Vsmodelist2").append("<option value='" + (i) + "'>" + Portrait_List_GK[i] + "</option>");
    }

    $("#vscg_Tab tr td").css('border', '1px solid');
    $("#vscg_Tab tr td").css('text-align', 'left');
    $(".cvspkimg").css('text-align', 'center');
}

//AI能力索引 进攻/防守跑动
function loadHPandOther() {
    var str = "<select id='AiHPindex' onchange='outAiStr();'>";
    for (var i = 0; i < Ai_HP_Index.length; i++) {
        str += '<option value= "' + (i) + '">' + Ai_HP_Index[i] + '</option>';
    }
    str += "</select>";
    $("#aitab0").append(str);

    str = "<select id='AiXXAck' onchange='outAiStr();'>";
    for (var i = 0; i < 0x100; i++) {
        str += '<option value= "' + (i) + '">' + addPreZero(i.toString(16).toUpperCase()) + '</option>';
    }
    str += "</select>";
    $("#aitab2").append(str);

    str = "<select id='AiXXDef' onchange='outAiStr();'>";
    for (var i = 0; i < 0x100; i++) {
        str += '<option value= "' + (i) + '">' + addPreZero(i.toString(16).toUpperCase()) + '</option>';
    }
    str += "</select>";
    $("#aitab3").append(str);
}

//检查并输出步长数据
function checkrunai() {
    for (var i = 0; i < 12; i++) {
        var xxxx = "#AiRunType_" + (i + 1);
        $(xxxx).val(NesHex[步长类型 + $('#AiRunType').get(0).selectedIndex * 12 + i]);
    }
    $('#AiRunType_Addr').html(' 0x' + toHex16((步长类型 + $('#AiRunType').get(0).selectedIndex * 12), 5));
    outAiStr();
}

//拼接步长HTML
function loadAiRun() {
    var str = "<select id='AiRunType' onchange='checkrunai();'>";
    for (var i = 0; i < Ai_Run.length; i++) {
        str += '<option value= "' + (i) + '">' + Ai_Run[i] + '</option>';
    }
    str += "</select><span id='AiRunType_Addr'></span>";

    var tempstr = ["抓人", "带球", "进攻", "防守", "进攻接应", "防守接应"];
    for (var i = 0; i < tempstr.length; i++) {
        str += "<div><span>" + tempstr[i] + "<span>";
        str += "<select id='AiRunType_" + (i * 2 + 1) + "' onchange='outAiStr();'>";
        str += "</select> ";
        str += "<select id='AiRunType_" + (i * 2 + 2) + "' onchange='outAiStr();'>";
        str += "</select></div>";
    }

    $("#aitab1").append(str);
    for (var i = 0; i < 0x100; i++) {
        for (var x = 0; x < 12; x++) {
            $('#AiRunType_' + (x + 1)).append($('<option/>').text(toHex16(i)).attr("value", i));
        }
    }
}

//网页AI顶部选项及传球意向HTML
function loadPassAi1() {
    //$("#AI_Players_Name").empty();//(i + 23)
    var AI_player_list = "<div>Players:";
    AI_player_list += " <select id='AiPlayerSelect' offindex=0 onchange='AiPlayersChange();'>";

    for (var i = 0; i < Aiplayerstr.length; i++) {

        AI_player_list += '<option value= "' + i + '">' + Aiplayerstr[i] + '</option>';
    }
    AI_player_list += "</select><div id='AIOutStr'></div></div>";//<br><button onclick='outAiStr();'>获取更改后的代码</button>
    $("#AI_Players_Name").html(AI_player_list);

    //传球意向
    var AiPasslist = "<span id='Passtext'></span><select id='AiPasslistSelect' offindex=0 onchange='AiPasslistChange();'>";
    for (var i = 0; i < 0x2F + 1; i++) {
        AiPasslist += '<option value= "' + (i) + '">' + addPreZero(i.toString(16).toUpperCase()) + '</option>';
    }

    AiPasslist += "</select><br>";
    //传球意向子项
    var passdiv = AiPasslist + "<div>";
    for (var i = 0; i <= 7; i++) {
        passdiv += "<select id='passdata" + (i + 1) + "' offindex=0 onchange='getoptionsVal(this," + (i + 1) + ")'></select>";
        passdiv += "<span id='passsp" + (i + 1) + "'></span>";
        if ((i + 1) != 8) { passdiv += "<br>"; }
    }
    passdiv += "</div>";
    $("#aitab7").html(passdiv);
    loadPassAi2();//填充传球意向代码
}

function AI几率分区数据HTML构造(tempXstr, st, ed, str) {
    var temphtml = "";
    for (var i = st; i <= ed; i++) {
        temphtml += "<div><span id='" + str[0] + i + "' af='" + tempXstr[i - st] + "'>" + tempXstr[i - st] + "</span>";
        temphtml += "<span id='" + str[1] + i + "'></span>";
        for (var x = 0; x < 4; x++) {
            temphtml += " <select id='" + str[2] + i + "_" + x + "' onchange='" + str[3] + ";'>";
            temphtml += "</select>";
        }
        temphtml += "</div>" + 分割线;
    }
    return temphtml;
}

//进攻AI几率HTML
function loadAckAi() {
    var str = "<div id='tab_Ack'><div>";//切换选项卡层
    str += "<button onclick='showdiv(0);'>进攻_平地</button>";
    str += "<button onclick='showdiv(1);'>进攻_1p高低空禁区内</button>";
    str += "<button onclick='showdiv(2);'>进攻_npc高低空禁区内</button>";
    str += "</div>";

    str += "<div class='tab_content''>";//外层选项卡

    ////Start平地进攻
    str += "<div id='aiackdiv1'>";
    str += " <select id='AiAck1' onchange='ldAIData1(0);'>";
    for (var i = 0; i < Ai_Ack_1str.length; i++) {

        str += '<option value= "' + (i) + '">' + Ai_Ack_1str[i] + '</option>';
    }
    str += "</select>";
    var tempXstr = ["区域1：1P角球点附近", "区域2：1P大禁区前沿", "区域3：1P小禁区前沿", "区域4：1P小禁区 ", "区域5：中场区域", "区域6：NPC后场区域"];
    str += AI几率分区数据HTML构造(tempXstr, 0, 5, ["AiEx_", "AiEx_Txt_", "AiEx_select_", "GetAIData1(0);"]);
    str += "</div>";
    ////End平地进攻

    ////Start高低空禁区内
    str += "<div id='aiackdiv2' style='display:none;'>";
    str += " <select id='AiAck2' onchange='ldAIData1(1);'>";
    for (var i = 0; i < Ai_Ack_2str.length; i++) {

        str += '<option value= "' + (i) + '">' + Ai_Ack_2str[i] + '</option>';
    }
    str += "</select>";
    tempXstr = ["区域7：1P大禁区腰", "区域8：1P小禁区前沿", "区域9：1P小禁区内"];
    str += AI几率分区数据HTML构造(tempXstr, 6, 8, ["AiEx_", "AiEx_Txt_", "AiEx_select_", "GetAIData1(1);"]);
    str += "</div>";
    ////End高低空禁区内

    ////Start高低空禁区内
    str += "<div id='aiackdiv3' style='display:none;'>";
    str += " <select id='AiAck3' onchange='ldAIData1(2);'>";
    for (var i = 0; i < Ai_Ack_3str.length; i++) {

        str += '<option value= "' + (i) + '">' + Ai_Ack_3str[i] + '</option>';
    }
    str += "</select>";
    tempXstr = ["区域10：NPC大禁区腰", "区域11：NPC小禁区前沿", "区域12：NPC小禁区内"];
    str += AI几率分区数据HTML构造(tempXstr, 9, 11, ["AiEx_", "AiEx_Txt_", "AiEx_select_", "GetAIData1(2);"]);
    str += "</div>";
    ////End高低空禁区内

    str += "</div></div>";//外层选项卡
    $("#aitab4").append(str);

    for (var i = 0; i <= 5; i++) {
        for (var x = 0; x < 4; x++) {
            添加几率文本(Ai_data_1_2, "#AiEx_select_" + i + "_" + x);
        }
    }
    for (var i = 6; i <= 8; i++) {
        for (var x = 0; x < 4; x++) {
            添加几率文本(Ai_data_2_2, "#AiEx_select_" + i + "_" + x);
        }
    }
    for (var i = 9; i <= 11; i++) {
        for (var x = 0; x < 4; x++) {
            添加几率文本(Ai_data_3_2, "#AiEx_select_" + i + "_" + x);
        }
    }
}

//防守AI几率HTML
function loadDefAi() {
    var str = "<div id='tab_Def' ><div>";//切换选项卡层
    str += "<button onclick='showdiv(3);'>防守_平地</button>";
    str += "<button onclick='showdiv(4);'>防守_1p高低空禁区内</button>";
    str += "<button onclick='showdiv(5);'>防守_npc高低空禁区内</button>";
    str += "</div>";

    str += "<div class='tab_content''>";//外层选项卡

    ////Start平地防守
    str += "<div id='aidefdiv1'>";
    str += "<select id='AiDef1' onchange='ldAIData2(0);'>";
    for (var i = 0; i < Ai_Def_1str.length; i++) {

        str += '<option value= "' + (i) + '">' + Ai_Def_1str[i] + '</option>';
    }
    str += "</select>";
    var tempXstr = ["区域1：NPC角球点附近", "区域2：NPC大禁区前沿", "区域3：NPC小禁区前沿", "区域4：NPC小禁区 ", "区域5：中场区域", "区域6：1P后场区域"];
    str += AI几率分区数据HTML构造(tempXstr, 0, 5, ["AiEx1_", "AiEx1_Txt_", "AiEx1_select_", "GetAIData2(0);"]);
    str += "</div>";
    ////End平地防守

    ////Start高低空禁区内防守
    str += "<div id='aidefdiv2' style='display:none;'>";
    str += "<select id='AiDef2' onchange='ldAIData2(1);'>";
    for (var i = 0; i < Ai_Def_2str.length; i++) {

        str += '<option value= "' + (i) + '">' + Ai_Def_2str[i] + '</option>';
    }
    str += "</select>";
    tempXstr = ["区域7：NPC大禁区腰", "区域8：NPC小禁区前沿", "区域9：NPC小禁区内"];
    str += AI几率分区数据HTML构造(tempXstr, 6, 8, ["AiEx1_", "AiEx1_Txt_", "AiEx1_select_", "GetAIData2(1);"]);
    str += "</div>";
    ////End高低空禁区内防守

    ////Start高低空禁区内防守
    str += "<div id='aidefdiv3' style='display:none;'>";
    str += "<select id='AiDef3' onchange='ldAIData2(2);'>";
    for (var i = 0; i < Ai_Def_3str.length; i++) {

        str += '<option value= "' + (i) + '">' + Ai_Def_3str[i] + '</option>';
    }
    str += "</select>";
    tempXstr = ["区域10：1P大禁区腰", "区域11：1P小禁区前沿", "区域12：1P小禁区内"];
    str += AI几率分区数据HTML构造(tempXstr, 9, 11, ["AiEx1_", "AiEx1_Txt_", "AiEx1_select_", "GetAIData2(2);"]);
    str += "</div>";
    ////End高低空禁区内防守

    str += "</div></div>";//外层选项卡
    $("#aitab5").append(str);

    for (var i = 0; i <= 5; i++) {
        for (var x = 0; x < 4; x++) {
            添加几率文本(Ai_data_4_2, "#AiEx1_select_" + i + "_" + x);
        }
    }
    for (var i = 6; i <= 8; i++) {
        for (var x = 0; x < 4; x++) {
            添加几率文本(Ai_data_5_2, "#AiEx1_select_" + i + "_" + x);
        }
    }
    for (var i = 9; i <= 11; i++) {
        for (var x = 0; x < 4; x++) {
            添加几率文本(Ai_data_6_2, "#AiEx1_select_" + i + "_" + x);
        }
    }
}

//GKAI几率HTML 此处HTML构造不再优化方便解读 进攻防守的HTML构造
function loadGKAi() {
    var str = "<div id='tab_GK' ><div>";//切换选项卡层
    str += "<button onclick='showdiv(6);'>正常防守AI(选择击球或抱球)</button>";
    str += "<button onclick='showdiv(7);'>高低空遇GK选择出击AI</button>";
    str += "<button onclick='showdiv(8);'>平地遇GK选择出击AI</button>";
    str += "</div>";

    str += "<div class='tab_content''>";//外层选项卡
    ////Start平地防守
    str += "<div id='aiGKdiv1'>";
    str += "<select id='AiGK1' onchange='ldAIData3(0);'>";
    for (var i = 0; i < Ai_GK_1str.length; i++) {

        str += '<option value= "' + (i) + '">' + Ai_GK_1str[i] + '</option>';
    }
    str += "</select>";
    //Start子项
    var temphtml = "";
    temphtml += "<div><span id='AiEx2_1' af='正常防守'></span><br>";
    temphtml += "<span id='AiEx2_Txt_1'></span>";
    for (var x = 0; x < 4; x++) {
        temphtml += " <select id='AiEx2_select_1_" + x + "' onchange='GetAIData3(0);'>";
        temphtml += "</select>";
    }
    temphtml += "</div>";
    str += temphtml;
    //End子项
    str += "</div>";
    ////End平地防守
    ////Start高低空禁区内防守
    str += "<div id='aiGKdiv2' style='display:none;'>";
    str += "<select id='AiGK2' onchange='ldAIData3(1);'>";
    for (var i = 0; i < Ai_GK_2str.length; i++) {

        str += '<option value= "' + (i) + '">' + Ai_GK_2str[i] + '</option>';
    }
    str += "</select>";
    //Start子项
    temphtml = "";
    temphtml += "<div><span id='AiEx2_2' af='高低空出击'></span><br>";
    temphtml += "<span id='AiEx2_Txt_2'></span>";
    for (var x = 0; x < 4; x++) {
        temphtml += " <select id='AiEx2_select_2_" + x + "' onchange='GetAIData3(1);'>";
        temphtml += "</select>";
    }
    temphtml += "</div>";
    str += temphtml;
    //End子项
    str += "</div>";
    ////End高低空禁区内防守
    ////Start高低空禁区内防守
    str += "<div id='aiGKdiv3' style='display:none;'>";
    str += "<select id='AiGK3' onchange='ldAIData3(2);'>";
    for (var i = 0; i < Ai_GK_3str.length; i++) {

        str += '<option value= "' + (i) + '">' + Ai_GK_3str[i] + '</option>';
    }
    str += "</select>";
    //Start子项
    temphtml = "";
    temphtml += "<div><span id='AiEx2_3' af='被单挑时出击'></span><br>";
    temphtml += "<span id='AiEx2_Txt_3'></span>";
    for (var x = 0; x < 4; x++) {
        temphtml += " <select id='AiEx2_select_3_" + x + "' onchange='GetAIData3(2);'>";
        temphtml += "</select>";
    }
    temphtml += "</div>";
    str += temphtml;
    //End子项
    str += "</div>";
    ////End高低空禁区内防守

    str += "</div></div>";//外层选项卡
    $("#aitab6").append(str);

    for (var x = 0; x < 4; x++) {
        添加几率文本(Ai_data_7_2, "#AiEx2_select_1_" + x);
        添加几率文本(Ai_data_8_2, "#AiEx2_select_2_" + x);
        添加几率文本(Ai_data_9_2, "#AiEx2_select_3_" + x);
    }
}

//指令(技能)部分HTML
function BulidInstructTabHtml() {
    /**/
    var btn = '<button id="Instructedit_x_0" af="#Instructedit_a_0" onclick="showInstructbuttondiv(0)">指令数据</button>';
    btn += '<button id="Instructedit_x_1" af="#Instructedit_a_1" onclick="showInstructbuttondiv(1)">技能添加</button>';
    var htmlstr = btn +"<div id='Instructedit_a_0'><div><span>暴力/威力最好不要超过0xFC.<br>体力/二过一可正常修改,网页版不显示关联的0440/0443数据的.<br>指令部分仅支持原版地址中的数据查看修改</span></div>";
    htmlstr += "<div><span>指令集:</span><select id='InstructList' onchange='GetInstruct();'>";
    for (var i = 0; i < 指令文本.length; i++) {
        htmlstr += "<option value='" + (i) + "'>" + 指令文本[i] + "</option>";
    }
    htmlstr += "</select><br></div>";

    htmlstr += "<div><span>暴力值:</span><select id='InstructB' onchange='CheckInstructB();'>";
    for (var i = 0; i < 0x100; i++) {
        htmlstr += "<option value='" + (i) + "'>" + toHex16(i) + "=" + i + "</option>";
    }
    htmlstr += "</select><br></div>";

    htmlstr += "<div><span>威值值:</span><select id='InstructW'>";
    for (var i = 0; i < 0x100; i++) {
        htmlstr += "<option value='" + (i) + "'>" + toHex16(i) + "=" + i + "</option>";
    }
    htmlstr += "</select><br></div>";

    htmlstr += "<div><span>体力值:</span><select id='InstructT' onchange='CheckInstructT();'>";
    for (var i = 0; i <= 500; i++) {
        htmlstr += "<option value='" + (i) + "'>" + i + "</option>";
    }
    htmlstr += "</select></div>";

    htmlstr += "<div id='Instruct2_1DIV'><span>二过一距离:</span><select id='Instruct2_1' style='dispaly:none;'>";
    for (var i = 0; i < 0x100 / 8; i++) {
        htmlstr += "<option value='" + (i) + "'>" + toHex16(i) + "</option>";
    }
    htmlstr += "</select></div>";

    htmlstr += "<div><span>技能肖像↓</span><br><select id='skill__addr' onchange='getskillimgcode();'>";
    for (var i = 0; i < Skill_o_str.length; i++) {
        htmlstr += "<option value='" + (i) + "'>" + Skill_o_str[i] + "</option>";
    }
    htmlstr += "</select><select id='skill__code'>";
    for (var i = 0; i < Skill_o_txt.length; i++) {
        htmlstr += "<option value='" + (i) + "'>" + Skill_o_txt[i] + "</option>";
    }
    htmlstr += "</select></div>";
    htmlstr += "<span id='InstructTempText'></span>";
    htmlstr += "<div><button onclick='ChangeInstruct();'>修改指令数据↑</button></div></div>";
    htmlstr += "<div id='Instructedit_a_1'><div><span>必杀查看/修改支持原版部分改版.</span></div><div><span>必杀:</span><select id='SikllNameList' onchange='GetSkill();'>";
    for (var i = 0; i < PlayerName_Skill.length; i++) {
        htmlstr += "<option value='" + (i) + "'>" + PlayerName_Skill[i] + "</option>";
    }
    htmlstr += "</select><button id='SkillViewType' onclick='ChangeSkillView();'>切换模式</button></div><span id='SkillStr'></span>";
    htmlstr += "<div id='SkillEdit' style='display:none;'></div>";
    htmlstr += "</div>";
    $("#InstructTab").html(htmlstr);
}

var SkillViewTypeVar = 1;//必杀查看编辑模式更改

function GetSkillEdit() {
    var xdz = $("#SikllNameList").get(0).selectedIndex * 2 + 球员必杀索引;
    var bdz = ramcheck(xdz, NesHex);
    var str = "<div><span>技能入口 : 0x" + toHex16(xdz, 5) + "=" + toHex16(NesHex[xdz]) + " " + toHex16(NesHex[xdz + 1]);
    str += " 索引地址:0x" + toHex16(bdz, 5);
    str += "</span></div><div><span>技能索引 : ";
    for (var i = 0; i <= 6; i++) {
        str += toHex16(NesHex[bdz + (i * 2) + 0]) + " " + toHex16(NesHex[bdz + (i * 2) + 1]) + " ";
    }
    str += "</span></div>";
    var shootaddr = ramcheck(bdz, NesHex);//继续跳转索引;0x30000 + NesHex[bdz + 1] * 0x100 + NesHex[bdz] + 0x10; //ramcheck(bdz, NesHex);

    var Skilltype = SkillSTR2_.split(",");
    Skilltype[0] = "必杀射门";
    var selectstr = "<div><span>必杀类型:</span><select id='skilladdtype' onchange='Changeskilladdtype();'>";
    for (var i = 0; i < Skilltype.length; i++) {
        selectstr += "<option>" + Skilltype[i] + "</option>";
    }
    selectstr += "</select>";
    selectstr += "<select id='skillsub'>";
    selectstr += "</select><button onclick='addSkillsub();'>增加技能</button></div>";

    selectstr += "<ul id='ulshoot'>";
    for (var i = 0; i < skilllistshoot.length; i++) {
        let sub = "#ulshoot" + i;
        selectstr += "<li style='display:block;'><button af='ulshoot' onclick='DelSkillsub(this);'>删</button><span>" + skilllistshoot[i] + "</span></li>";
    }
    selectstr += "</ul>";

    selectstr += "<ul id='ulother'>";
    for (var i = 0; i < skilllistother.length; i++) {
        let sub = "#ulother" + i;
        selectstr += "<li style='display:block;'><button af='ulother' onclick='DelSkillsub(this);'>删</button><span>" + skilllistother[i] + "</span></li>";
    }
    selectstr += "</ul>";
    selectstr += "<button onclick='Add_Skills();'>应用必杀修改</button><span>强制使用新空地址→<input id='usenewaddr' type='checkbox'>(非必要勿勾选)</span><br>";
    selectstr += "<div><span>必杀添加说明<br>七大类技能索引占用2*7=0x0E字节,必杀射门最长占用0x12字节.<br>一段通用的非射门类的技能数据用做索引占用0x0A字节.";
    selectstr += "<br>单人技能最大占用0x1C字节(双人技能第二字节写入0xFF).<br>强写通用索引可能导致游戏无法运行.<br>通用索引数据:01 02 03 04 05 06 81 82 83 84 00";
    selectstr += "<br>技能总开关指向七大类技能的索引.<br>索引为00 00表示无必杀技能.<br>如果索引非00 00,跳转并读取必杀代码.";
    selectstr += "<br>*强制使用新空地址:解决部分改版新增必杀射门无效的BUG.</span></div>";
    $("#SkillEdit").html(str + selectstr);
}