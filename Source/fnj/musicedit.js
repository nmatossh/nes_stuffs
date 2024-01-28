var musicdata1 = 0x3D0BC; //【音乐】赛中队伍音乐=0x3D0BC
var musicdata2 = 0x0133; //【音乐】圣保罗、南葛、日本会议音乐=0x0133
var musicdata3 = 0x013B; //   【音乐】巴西会议音乐=0x013B
var musicdata4 = 0x3D1F7; //  【音乐】赛中-最后五分钟=0x3D1F7   //7D1F7
var musicdata5 = 0x3D0A4; //【音乐】进球-最后五分钟=0x3D0A4    //7D0A4
var musicdata6 = 0x3460C; //【音乐】犯规-最后五分钟=0x3460C
var musicdata7 = 0x21C54; //【音乐】我方进球=0x21C54
var musicdata8 = 0x21C48; //【音乐】敌方进球=0x21C48
var musicdata9 = 0x59; //【音乐】LOGO界面=0x59
var musicdata10 = 0xBFB8; //【音乐】升级=0xBFB8
var musicdata11 = 0xC027; //【音乐】输球=0xC027
var musicdata12 = 0x237DF; //【音乐】开场解说=0x237DF
var musicdata13 = 0x26E3; //【音乐】中场休息会议=0x26E3

$(document).ready(function () {
    BulidMusicTabHtml();
});

function getTeamMusicVal() {
    if (IsCn == true) {
        musicdata4 = 0x7D1F7;
        musicdata5 = 0x7D0A4;
        musicdata1 = 0x7D0BC;
        musicdata10 = 0xAA93;
    }
    else {
        musicdata4 = 0x3D1F7;
        musicdata5 = 0x3D0A4;
        musicdata1 = 0x3D0BC;
        musicdata10 = 0xBFB8;
    }
    var teammusicnowdata = $('#MusicTeamNameList').get(0).selectedIndex;
    $('#MusicNameList1').val(NesHex[musicdata1 + teammusicnowdata]);
}

function ChangeOrGetMusic(type) {
    var teammusicnowdata = $('#MusicTeamNameList').get(0).selectedIndex;
    if (IsCn == true) {
        musicdata4 = 0x7D1F7;
        musicdata5 = 0x7D0A4;
        musicdata1 = 0x7D0BC;
        musicdata10 = 0xAA93;
    }
    else {
        musicdata4 = 0x3D1F7;
        musicdata5 = 0x3D0A4;
        musicdata1 = 0x3D0BC;
        musicdata10 = 0xBFB8;
    }
    var musicbytedata = [(musicdata1 + teammusicnowdata), musicdata2, musicdata3, musicdata4, musicdata5, musicdata6, musicdata7, musicdata8, musicdata9, musicdata10, musicdata11, musicdata12, musicdata13];

    if (type == 1) //修改
    {
        try {
            for (var i = 0; i < musicbytedata.length; i++) {
                NesHex[musicbytedata[i]] = $("#MusicNameList" + (i + 1)).val();
            }
            alertMsg("#isfileload", "green", "音乐修改成功~");
        } catch (e) {
            alertMsg("#isfileload", "red", "音乐修改失败!");
        }
    }
    else //刷新
    {
        for (var i = 0; i < musicbytedata.length; i++) {
            $("#MusicNameList" + (i + 1)).val(NesHex[musicbytedata[i]]);
        }
    }
}

var MusicTypeLoad = false;

function playmusic(pid) {
    // alert("音乐播放有错误...暂时取消.");
    if (MusicTypeLoad == false) {
        var html2mu = '<script type="text/javascript" src="fnj/libgme.js' + cssjsvernob + '" defer></script><script type="text/javascript" src="fnj/index.js' + cssjsvernob + '" defer></script>';
        $("#musicloadplaydiv ").html(html2mu);
        ctx = new AudioContext();
        nsfPlayer = createNsfPlayer(ctx);
        MusicTypeLoad = true;
    }

    var midstr = $(pid).attr('musid');
    var midtxt = $("#" + midstr).find("option:selected").text();
    var midcount = -1;
    if (midtxt.indexOf(']') >= 1) {
        var syo = midtxt.substring(midtxt.length - 2);
        midcount = hex2int(syo);
    }
    if (midcount == -1) {
        return;
    }
    nsfPlayer.play('ct2.nsf', midcount);
}

var ctx;
var nsfPlayer;
var nsffile;
/*$(document).ready(function(){  
 ctx = new AudioContext();
 nsfPlayer = createNsfPlayer(ctx);
});*/

function CloseMusic(scontss) {
    nsfPlayer.stop();
}

function BulidMusicTabHtml() {
    $("#MusicEditTab ").empty();
    var musicstrs = ["队伍音乐:", "赛前会议:", "巴西会议:", "最后5分:", "5分进球:", "5分犯规:", "我方进球:", "敌方进球:", "LOGO音乐:", "升级音乐:", "战败音乐:", "解说音乐:", "中场会议:"];
    var temp1 = musicstrs[0] +"<select id='MusicTeamNameList' onchange='getTeamMusicVal()'></select><button musid='MusicNameList1' onclick='playmusic(this)'>播放队伍音乐</button><br><select id='MusicNameList1'></select><br>";
    var musictab = temp1+"<table style='border:1px solid' class='autotd'>";
    //musictab += "<tr><td>队伍名称:</td><td><select id='MusicTeamNameList' onchange='getTeamMusicVal()'></select></td></tr>";
    for (var i = 1; i < musicstrs.length; i++) {
        musictab += "<tr><td><button musid='MusicNameList" + (i + 1) + "' onclick='playmusic(this)'>试听</button></td><td>" + musicstrs[i] + "</td><td><select id='MusicNameList" + (i + 1) + "'></select></td></tr>";
    }
    musictab += "</table>";
    musictab += "<span>首次播放需加载解析插件,会有几秒延时.</span><br>";
    musictab += "<button onclick='ChangeOrGetMusic(1)'>修改</button>  <button onclick='ChangeOrGetMusic(0)'>刷新</button>  <button onclick='CloseMusic()'>关闭音乐</button>";
    musictab += "<div id='musicloadplaydiv'></div>";
    musictab += "";

    $("#MusicEditTab ").html(musictab);

    for (var i = 0; i < teamlist.length; i++) {
        $("#MusicTeamNameList").append("<option value='" + (i) + "'>" + teamlist[i] + "</option>");
    }

    for (var w = 1; w <= 13; w++) {
        for (var i = 0; i < musicArr.length; i++) {
            $("#MusicNameList" + w).append("<option value='" + (i) + "'>" + musicArr[i] + "</option>");
        }
    }

    $('#MusicTeamNameList').val('0000000');
    $('#MusicNameList1').val('0000000');
}