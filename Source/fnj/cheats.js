//金手指
function toHex16(temp, len = 2) {
    var x = (temp).toString(16);
    return addPreZero(x, len).toUpperCase();
}

EJS_cheats = [
    ["选关 ", "0026:00"],
    ["射门指令", "043C:00"],
    ["比赛时间 05F7", "05F7:B4"],
    ["我方进球数 0028", "0028:00"],
    ["敌方进球数 0029", "0029:00"],
    ["我方门将水平大降 0307", "0307:01,0308:4F"],
    ["我方空门 030A", "030A:15"],
    ["敌方门将水平大降 038B", "038B:01,038C:4F"],
    ["敌方空门 038E", "038E:15"],
    ["翼解锁全技能(赛中解锁)", "0000:00,0448:80,0446:05,0449:80"],
    ["我方全员满级", "0303:62,030F:62,031B:62,0327:62,0333:62,033F:62,034B:62,0357:62,0363:62,036F:62,037B:62"],
    ["我方全员体力999", "0301:E7,0302:03,030D:E7,030E:03,0319:E7,031A:03,0325:E7,0326:03,0331:E7,0332:03,033D:E7,033E:03,0349:E7,034A:03,0355:E7,0356:03,0361:E7,0362:03,036D:E7,036E:03,0379:E7,037A:03"],
    ["敌方全员满级", "0387:62,0393:62,039F:62,03AB:62,03B7:62,03C3:62,03CF:62,03DB:62,03E7:62,03F3:62,03FF:62"],
    ["我方GK选人0300", "0300:21"],
    ["我方02号选人030C", "030C:15"],
    ["我方03号选人0318", "0318:15"],
    ["我方04号选人0324", "0324:15"],
    ["我方05号选人0330", "0330:15"],
    ["我方06号选人033C", "033C:15"],
    ["我方07号选人0348", "0348:15"],
    ["我方08号选人0354", "0354:15"],
    ["我方09号选人0360", "0360:15"],
    ["我方10号选人036C", "036C:15"],
    ["我方11号选人0378", "0378:15"]//["请勿删除上面的金手指,临时测试可继续添加", " "]
];

function addPreZero(num, count = 2) {
    return ('000000000' + num).slice(-count);
}
var teamlist2 = [];
function alertMsg(id, color, txt, time = 2500) {
    $(id).css("color", color);
    $(id).html(txt);
    setTimeout(function () {
        $(id).html("");
    }, time);
}

async function  S_ram() {
    //ejs_media.quickSaveState();
    try {
        var core = localStorage.getItem('RomDataToplay_core');
        var bb = await EJS_saveState();
        localStorage.setItem('Rom_State_' + core, bb);
        alertMsg("#secstr", "green", core + " 内核 存档保存成功<br>", 2000);
    } catch (e) {
        alertMsg("#secstr", "red", core + " 内核 存档保存失败<br>", 2000);
    }
}

function L_ram() {
    try {
        var core = localStorage.getItem('RomDataToplay_core');
        var bb = localStorage.getItem('Rom_State_' + core);
        var sp = new Uint8Array(bb.split(','));
        EJS_loadState(sp);
        alertMsg("#secstr", "green", core + " 内核 存档读取成功<br>", 2000);
    } catch (e) {
        alertMsg("#secstr", "red", core + " 内核 存档读取失败<br>", 2000);
    }
    //ejs_media.quickLoadState();
}

function OpenDefCheat() {
    delebun();
    $('.ejs--8732295ca5c4902a060d34706a8146[data-btn=cheat]').click();
}

function saveS() {
    $('.ejs--8732295ca5c4902a060d34706a8146[data-btn=save-state]').click();
}

function lodeS() {
    $('.ejs--8732295ca5c4902a060d34706a8146[data-btn=load-state]').click();
}

function bindCheat() {
    for (var i = 3; i < teamlist.length; i++) {
        teamlist2.push(teamlist[i]);
    }
    var htmls = "<div id='cheatdiv' style='display:none;'>";
    htmls += "<span>支持 选关/射门指令/时间/进球数/我方队伍等编辑<br>自带金手指不要删除,只能启用/关闭<br>此部分功能主要用于配合在网页上做改版时的测试<br>1.勾选左侧选框 2.选择对应下拉数据 3.点击 应用金手指<br>金手指格式  内存地址:代码 例如0026:1F<br></span>";
    htmls += "<button onClick='OpenDefCheat()'>打开金手指界面(部分手机不显示点我)</button><br>";
    htmls += "<button onclick='Set_Cheat()'>应用金手指</button><br>";
    htmls += '<span><input value="9999" onClick="closeallck()" type="checkbox">全部取消</span><br>';
    htmls += '<span><input value="0" type="checkbox">选关</span><select id="RomSelect"></select><br>';
    htmls += '<span><input value="1" type="checkbox">射门指令[测试用]</span><select id="SkillSelect"></select><br>';
    htmls += '<span><input value="2" type="checkbox">比赛时间</span><select id="MTimes"></select><br>';
    htmls += '<span><input value="3" type="checkbox">我方进球数</span><select id="W_sc"></select>个<br>';
    htmls += '<span><input value="4" type="checkbox">敌方进球数</span><select id="D_sc"></select>个<br>';
    var Team_player_list = "<div id='playerlistdiv' style='float:left; display:inline;'>";
    for (var i = 0; i <= 11; i++) {
        if (i == 0) {
            i++;
            Team_player_list += '<span><input value="13" type="checkbox">GK</span><select id="selectplayerGK"></select><br>';
        } else {
            Team_player_list += '<span><input value="' + (12 + i) + '" type="checkbox">' + addPreZero(i) + '</span><select id="selectplayer' + addPreZero(i) + '"></select><br>';
        }
    }
    Team_player_list += "</div>";
    htmls += Team_player_list;
    htmls += "</div>";
    $("#cdivs").html(htmls);

    var RomSelect = document.getElementById('RomSelect');
    var RomSelectstr = "";
    for (var W = 0; W < teamlist2.length; W++) {
        RomSelectstr += '<option>' + teamlist2[W] + '</option>';
    }
    RomSelect.innerHTML = RomSelectstr;

    var SkillSelect = document.getElementById('SkillSelect');
    var SkillSelectstr = "";
    for (var W = 0; W < 0x23; W++) {
        SkillSelectstr += '<option>' + 指令文本[W] + '</option>';
    }
    SkillSelect.innerHTML = SkillSelectstr;

    var MTimes = document.getElementById('MTimes');
    var W_sc = document.getElementById('W_sc');
    var D_sc = document.getElementById('D_sc');
    var MTimesstr = "";
    var WD_scstr = "";
    for (var W = 0; W < 0x100; W++) {
        WD_scstr += '<option>' + W + '</option>';
        MTimesstr += '<option>' + gametime[W] + '</option>';
    }
    W_sc.innerHTML = WD_scstr;
    D_sc.innerHTML = WD_scstr;
    MTimes.innerHTML = MTimesstr;

    for (var i = 0; i <= 11; i++) {
        var sel;
        if (i == 0) {
            i++;
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
}

function Get_C(nb, id, tyep) {
    for (var i = 0; i < EJS_cheats.length; i++) {
        var x = EJS_cheats[i];
        let o0 = x[0];
        let o1 = x[1];
        if (o0.indexOf(nb) != -1) {
            var code = o1.substr(5, 2);
            if (tyep == 0) {
                $(id).val(parseInt(code, 16)); return;
            }
            else {
                $(id).val(tyep[parseInt(code, 16)]); return;
            }
        }
    }
}

function Set_C(nb, id) {
    for (var i = 0; i < EJS_cheats.length; i++) {
        var x = EJS_cheats[i];
        if (x[0].indexOf(nb) != -1) {
            let index = $(id).get(0).selectedIndex;
            var code = EJS_cheats[i][1].substr(0, 5) + toHex16(index, 2);
            EJS_cheats[i] = [EJS_cheats[i][0], code];
            break;
        }
    }
}

function delebun() {
    for (var i = 0; i < 24; i++) {
        if (i >= 5 && i <= 12) {

        }
        else { $('.ejs--90bcdd71cd0d2307e9ee0dffa916da[data-idx=' + i + ']').parent().css('display', "none"); }    
        try {
            $('.ejs--90bcdd71cd0d2307e9ee0dffa916da[data-idx=' + i + ']').remove();
        } catch  {}     
    }
}

function Set_Cheat() {
    //选关
    Set_C("选关 ", "#RomSelect");
    Set_C("射门指令", "#SkillSelect");
    Set_C("比赛时间 ", "#MTimes");
    Set_C("我方进球数 ", "#W_sc");
    Set_C("敌方进球数 ", "#D_sc");

    for (var w = 0; w <= 11; w++) {
        var nb;
        var str;
        if (w == 0) { nb = "GK"; str = "我方GK选人"; }
        else {
            nb = addPreZero(w); str = "我方" + addPreZero(w) + "号选人";
        }
        try {
            Set_C(str, "#selectplayer" + nb);
        } catch {

        }
    }
    //启用或关闭金手指
    $("#infoD input[type='checkbox']").each(function () {
        var value = $(this).val();
        if (value != "9999") {
            $("#ejs-cheat-switch-" + value).prop("checked", $(this).prop("checked"));
        }
    });

    $("#cheatdiv").css('display', 'none');
    //打开cheat
    $('.ejs--8732295ca5c4902a060d34706a8146[data-btn=cheat]').click();
    //$('.ejs__cheat__container').attr("hidden", true);
    //关闭cheat
    $('.ejs--ad20569e1449d7b8e99e6465960456')[0].click();
    $('.ejs--ad20569e1449d7b8e99e6465960456')[1].click();
    //EJS_cheats[21] = ["我方10号选人036C", "036C:01"]
    $('.ejs--8732295ca5c4902a060d34706a8146[data-btn=play]').click();
    alertMsg("#secstr", "green", "金手指修改成功~<br>部分金手指锁死会造成死机.例如：射门指令,请及时取消.<br>", 4000);
    delebun();
}

function closeallck() {
    $("#infoD input[type='checkbox']").each(function () {
            $(this).prop("checked", false);
    });
    delebun();
}

function Load_Cheat() {
    //选关
    Get_C("选关 ", '#RomSelect', teamlist2);
    Get_C("射门指令", "#SkillSelect", 指令文本);
    Get_C("比赛时间 ", "#MTimes", gametime);
    Get_C("我方进球数 ", "#W_sc", 0);
    Get_C("敌方进球数 ", "#D_sc", 0);

    for (var w = 0; w <= 11; w++) {
        var nb;
        var str;
        if (w == 0) { nb = "GK"; str = "我方GK选人"; }
        else {
            nb = addPreZero(w); str = "我方" + addPreZero(w) + "号选人";
        }
        Get_C(str, '#selectplayer' + nb, playerstr);
    }
}

function AlertCheatDiv() {
    delebun();
    var mydiv = $('#cheatdiv');
    if (mydiv.css('display') == 'block' || mydiv.css('display') == 'inline-block') {
        $("#cheatdiv").css('display', 'none');
        $('.ejs--8732295ca5c4902a060d34706a8146[data-btn=play]').click();
    }
    else {
        $("#cheatdiv").css('display', 'inline-block');
        $('.ejs--8732295ca5c4902a060d34706a8146[data-btn=play]').click();
        Load_Cheat();
    }
}