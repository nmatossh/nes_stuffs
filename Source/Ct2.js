$(document).ready(function () {
    $(document).pjax('a', '#main', {
        fragment: '#main'
    });
    LoadHtmlInner();
    $("#isfileload").html("All done. No File Load.");
});

//判断浏览器是否支持FileReader对象
var reader
if (FileReader) {
    reader = new FileReader();
} else {
    alert('您的浏览器不支持FileReader对象');
}
var NesHex = [];
var file2 = document.getElementById('Nesfileupload');

file2.onchange = function () {
    var uploadfilenames = $(this).val();
    NesHex = [];
    var file = file2.files[0];
    reader.readAsArrayBuffer(file); //二进制数组
    reader.onload = function () {
        var byts = new Uint8Array(reader.result);
        for (var i = 0; i < byts.length; i++) {
            NesHex.push(byts[i]);
        }
        filenamenes = getFileName(uploadfilenames);
        CheckNesHex(filenamenes);
        //alert(filenamenes);
    }
}

function CheckNesHex(fname) {
    IsCn = Is1v32 = false;
    if (NesHex[0x3D1F6] == 0xA2) {
        IsCn = true;
    }
    if (NesHex[0x3D1F6] == 0xFF) {
        Is1v32 = true;
    }
    $("#HackDiv").css("pointer-events", "auto");
    $("#btnsave").css("pointer-events", "auto");
    document.getElementById("checknes").innerText = " type:" + NesHex[0].toString(16) + " " + NesHex[1].toString(16) + " " + NesHex[2].toString(16);
    checkramtype(NesHex);
    TeamSelectChange(); showTeamEditbuttondiv(0);//队伍选择
    Add_TeamSelectChange();//球星添加
    Team_SC_Change();//袜子配色
    $('#AiPlayerSelect').val('0'); //AI
    document.getElementById("isfileload").innerText = "Load File:" + filenamenes;
    //BindCHRDataAndHTML();
    ChangeOrGetMusic(0); document.getElementById("MusicTeamNameList")[0].selected = true; getTeamMusicVal();//音乐初始化完毕执行
    LoadHex16();//16进制编辑器
    AiButtonClick("#aitab_0");
    showPlayerEditbuttondiv(0);//能力值
    document.getElementById("AiPlayerSelect")[0x22].selected = true;
    AiPlayersChange();//AI查看
    GetInstruct(); showInstructbuttondiv(0);//指令   
    $('#PlayerEditNameList').val('0'); PlayerEditSelectChange();//造型
    $('#playerAbilitySe').val('0'); GetPlayerData(0);//球员能力
    $('#playerGKAbilitySe').val('0'); GetPlayerData(1)//GK能力
    GetSkill();//必杀
    Changeskilladdtype();
    $('#_set_data').css('display', 'inline-block');
    $('#_run_game_div').css('display', 'block');
    PlayerVSModColorChange();//肖像部分
    IntoChrPage();//Chr简易编辑初始化
    setTimeout(function () {
        document.getElementById("Vsmodelist2")[0].selected = true;
        bingDVSimg(2);
    }, 400);
}

$(function () {
    $("#menu .ctab").each(function (index) { //带参数遍历各个选项卡
        $(this).click(function () { //注册每个选卡的单击事件
            $("#menu li.tabFocus").removeClass("tabFocus"); //移除已选中的样式
            $(this).addClass("tabFocus"); //增加当前选中项的样式
            //显示选项卡对应的内容并隐藏未被选中的内容
            $("#content .ctab:eq(" + index + ")").show()
                .siblings().hide();
        });
    });
})

function showInstructbuttondiv(x) {
    $("#Instructedit_a_0").css("display", "none");
    $("#Instructedit_a_1").css("display", "none");
    obj = "#Instructedit_x_" + x;
    var idname = $(obj).attr("af");
    //清空其它同类按钮选中颜色
    $(obj).siblings().css("color", "black"); //按钮原来颜色
    $(obj).siblings().css("font-weight", "normal"); //按钮原来颜色
    //点击后变色
    $(obj).css("color", "green");
    $(obj).css("font-weight", "bold");
    $(idname).css("display", "block");
}

function showTeamEditbuttondiv(x) {
    $("#Teamedit_a_0").css("display", "none");
    $("#Teamedit_a_1").css("display", "none");
    obj = "#Teamedit_x_" + x;
    var idname = $(obj).attr("af");
    //清空其它同类按钮选中颜色
    $(obj).siblings().css("color", "black"); //按钮原来颜色
    $(obj).siblings().css("font-weight", "normal"); //按钮原来颜色
    //点击后变色
    $(obj).css("color", "green");
    $(obj).css("font-weight", "bold");
    $(idname).css("display", "block");
}

function showPlayerEditbuttondiv(x) {
    $("#playeredit_a_0").css("display", "none");
    $("#playeredit_a_1").css("display", "none");
    $("#playeredit_a_2").css("display", "none");
    $("#playeredit_a_3").css("display", "none");
    obj = "#playeredit_x_" + x;
    var idname = $(obj).attr("af");
    //清空其它同类按钮选中颜色
    $(obj).siblings().css("color", "black"); //按钮原来颜色
    $(obj).siblings().css("font-weight", "normal"); //按钮原来颜色
    //点击后变色
    $(obj).css("color", "green");
    $(obj).css("font-weight", "bold");
    $(idname).css("display", "block");
}

function showAIbuttondiv(x) {
    $("#aitab0").css("display", "none");
    $("#aitab1").css("display", "none");
    $("#aitab2").css("display", "none");
    $("#aitab3").css("display", "none");
    $("#aitab4").css("display", "none");
    $("#aitab5").css("display", "none");
    $("#aitab6").css("display", "none");
    $("#aitab7").css("display", "none");
    obj = "#aitab_" + x;
    var idname = $(obj).attr("af");
    $(obj).siblings().css("color", "black");
    $(obj).siblings().css("font-weight", "normal");
    $(obj).css("color", "green");
    $(obj).css("font-weight", "bold");
    $(idname).css("display", "block");
    if (x == 4) { showdiv(0); }
    if (x == 5) { showdiv(3); }
    if (x == 6) { showdiv(6); }
}

function AiButtonClick(obj) {
    $("#aitab0").css("display", "none");
    $("#aitab1").css("display", "none");
    $("#aitab2").css("display", "none");
    $("#aitab3").css("display", "none");
    $("#aitab4").css("display", "none");
    $("#aitab5").css("display", "none");
    $("#aitab6").css("display", "none");
    $("#aitab7").css("display", "none");
    var idname = $(obj).attr("af");
    $(obj).siblings().css("color", "black");
    $(obj).siblings().css("font-weight", "normal");
    $(obj).css("color", "green");
    $(obj).css("font-weight", "bold");
    $(idname).css("display", "block");
}

function SetOldData() {
    var txt = $("#isfileload").text();
    if (!window.localStorage) {
        $("#isfileload").text("浏览器不支持localStorage");
        setTimeout(function () {
            $("#isfileload").text(txt);
        }, 1000);
        return;
    }
    if (NesHex.length <= 0) {
        $("#isfileload").text("No file load.");
        setTimeout(function () {
            $("#isfileload").text(txt);
        }, 1000);
        return;
    }
    try {
        localStorage.removeItem('RomData');
    }
    catch
    {

    }
    try {
        localStorage.removeItem('RomName');
    }
    catch
    {

    }
    localStorage.setItem('RomData', JSON.stringify(NesHex));
    localStorage.setItem('RomName', filenamenes);
    $("#isfileload").text("Ok.Data Saved.");
    setTimeout(function () {
        $("#isfileload").text(txt);
    }, 1000);
}

function PlayNes() {
    var txt = $("#isfileload").text();
    if (!window.localStorage) {
        $("#isfileload").text("浏览器不支持localStorage");
        setTimeout(function () {
            $("#isfileload").text(txt);
        }, 1000);
        return;
    }
    if (NesHex.length <= 0) {
        $("#isfileload").text("No rom can paly.");
        setTimeout(function () {
            $("#isfileload").text(txt);
        }, 1000);
        return;
    }
    try {
        localStorage.removeItem('RomDataToplay');
    }
    catch
    {

    }
    try {
        localStorage.removeItem('RomDataToplay_name');
    }
    catch
    {

    }
    localStorage.setItem('RomDataToplay', JSON.stringify(NesHex));
    if (localStorage.getItem('RomDataToplay_name') != filenamenes) { localStorage.setItem('RomDataToplay_name', filenamenes); }

    var emu = $("#emulist").get(0).selectedIndex;
    if (emu == 0) {
        localStorage.setItem('RomDataToplay_core', 'fceumm');
    }
    else {
        localStorage.setItem('RomDataToplay_core', 'nestopia');
    }
    window.open('play.html');
}

function LoadOldData() {
    var txt = $("#isfileload").text();
    if (!window.localStorage) {
        $("#isfileload").text("浏览器不支持localStorage");
        setTimeout(function () {
            $("#isfileload").text(txt);
        }, 1000);
        return;
    }
    if (window.localStorage.length > 0) {
        weekArray = JSON.parse(localStorage.getItem('RomData'));
        NesHex = weekArray;
        if (localStorage.getItem('RomName') != null) {
            filenamenes = localStorage.getItem('RomName');
        } else {
            filenamenes = 'localStorage.nes';
        }
        CheckNesHex();
        $("#isfileload").text("Data read successfully");
        setTimeout(function () {
            $("#isfileload").text(filenamenes);
        }, 1000);
    } else {
        $("#isfileload").text("No RomData in your web browser's.");
        setTimeout(function () {
            $("#isfileload").text(txt);
        }, 1000);
    }
}