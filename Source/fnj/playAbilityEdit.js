$(document).ready(function () {
    BulidplayerAbilityEditTabHtml();
});

function GetPlayerData(datatypes) {
    if (datatypes == 0) {
        var nowplayerdata = $('#playerAbilitySe').get(0).selectedIndex;
        $('#playerHP').val(NesHex[player_data_addr + nowplayerdata * 24]);
        for (var w = 1; w <= 22; w++) {
            $('#playerAb' + w).val(NesHex[player_data_addr + nowplayerdata * 24 + w]);
        }
    }

    if (datatypes == 1) //GK
    {
        var nowplayerdata2 = player_data_GK_addr + $('#playerGKAbilitySe').get(0).selectedIndex * 8;
        for (var i = 0; i <= 7; i++) {
            $("#playerGKAb" + (i + 1)).val(NesHex[nowplayerdata2 + i]);
        }
    }
}

function SetPlayerData(datatypes) {
    if (datatypes == 0) {
        var nowplayerdata = $('#playerAbilitySe').get(0).selectedIndex;
        NesHex[player_data_addr + nowplayerdata * 24] = $('#playerHP').get(0).selectedIndex;
        for (var w = 1; w <= 22; w++) {
            NesHex[player_data_addr + nowplayerdata * 24 + w] = $('#playerAb' + w).get(0).selectedIndex;
        }
        alertMsg("#isfileload", "green", "球员能力修改成功~");
    }

    if (datatypes == 1) //GK
    {
        var nowplayerdata2 = player_data_GK_addr + $('#playerGKAbilitySe').get(0).selectedIndex * 8;
        for (var i = 0; i <= 7; i++) {
            NesHex[nowplayerdata2 + i] = $("#playerGKAb" + (i + 1)).get(0).selectedIndex;
        }
        alertMsg("#isfileload", "green", "守门员能力修改成功~");
    }
}

function PlayOneClick(datatypes) {
    if (datatypes == 0) {
        //$('#playerGKAbOnclick').val('0000000');
        //$('#playerAbOnclick').val('0000000');
        var nowplayerdata = $('#playerAbOnclick').get(0).selectedIndex;
        for (var w = 1; w <= 22; w++) {
            $('#playerAb' + w).val(nowplayerdata);
        }
    }

    if (datatypes == 1) //GK
    {
        var nowplayerdata2 = $('#playerGKAbOnclick').get(0).selectedIndex;
        for (var i = 2; i <= 8; i++) {
            $('#playerGKAb' + (i)).val(nowplayerdata2);
        }
    }
}

function BulidplayerAbilityEditTabHtml() {
    $('#playeredit_a_1').empty();
    var playAbilityEditTabHtml = "<div>";
    playAbilityEditTabHtml += "<span>球员:</span><select id='playerAbilitySe' onchange='GetPlayerData(0)'></select><br>";
    playAbilityEditTabHtml += "<table style='border:1px solid'>";

    playAbilityEditTabHtml += "<tr><td>体力:</td><td><select id='playerHP' ></select></td></tr>";

    for (var i = 0; i < abilitStr.length / 2; i++) {
        playAbilityEditTabHtml += "<tr><td>" + abilitStr[i * 2 + 0] + "</td><td><select id='playerAb" + (i * 2 + 1) + "'></select></td><td>" + abilitStr[i * 2 + 1] + "</td><td><select id='playerAb" + (i * 2 + 2) + "'></select></td></tr>";
    }

    playAbilityEditTabHtml += "</table>";
    playAbilityEditTabHtml += "<span>一键设置:</span><select id='playerAbOnclick' onchange='PlayOneClick(0)' ></select>  <button onclick='SetPlayerData(0)'>球员能力修改</button><br><br>";
    playAbilityEditTabHtml += "<span>GK:</span><select id='playerGKAbilitySe' onchange='GetPlayerData(1)'></select>";
    playAbilityEditTabHtml += "<table style='border:1px solid'>";

    for (var i = 0; i < abilitGKStr.length / 2; i++) {
        playAbilityEditTabHtml += "<tr><td>" + abilitGKStr[i * 2 + 0] + "</td><td><select id='playerGKAb" + (i * 2 + 1) + "'></select></td><td>" + abilitGKStr[i * 2 + 1] + "</td><td><select id='playerGKAb" + (i * 2 + 2) + "'></select></td></tr>";
    }

    playAbilityEditTabHtml += "</table>";
    playAbilityEditTabHtml += "<span>一键设置:</span><select id='playerGKAbOnclick' onchange='PlayOneClick(1)' ></select>  <button onclick='SetPlayerData(1)'>GK能力修改</button><br><br>";
    playAbilityEditTabHtml += "<span>左侧数据真值,右侧数据显示值.<br>一键设置不包含体力.<br>能力调整不支持特殊改版,如转移了球员数据地址.<br>显示值只显示原版数据,关于修改显示值看下面.<br>体力显示值数据修改<br>0x39F1E=90 01 98 01....CC 03 D0 03<br>09 01=0109=400,98 01=0198=408<br>能力显示值数据修改<br>0x39E5E=08 08....FE FF<br>如果需要同步显示真值跟显示值,请用电脑版Hack CT2.</span>";
    playAbilityEditTabHtml += "</div>";

    //return;
    $('#playeredit_a_1').html(playAbilityEditTabHtml);
    for (var i = 0; i < player_data_ab.length; i++) {

        $("#playerGKAbOnclick").append("<option value='" + (i) + "'>" + player_data_ab[i] + "</option>");
        $("#playerAbOnclick").append("<option value='" + (i) + "'>" + player_data_ab[i] + "</option>");
    }
    for (var i = 0; i < player_data_arr.length; i++) {
        $("#playerAbilitySe").append("<option value='" + (i) + "'>" + player_data_arr[i] + "</option>");
    }
    for (var i = 0; i < player_data_GK.length; i++) {
        $("#playerGKAbilitySe").append("<option value='" + (i) + "'>" + player_data_GK[i] + "</option>");
    }
    for (var i = 0; i < player_data_hp.length; i++) {
        $("#playerHP").append("<option value='" + (i) + "'>" + player_data_hp[i] + "</option>");
        $("#playerGKAb1").append("<option value='" + (i) + "'>" + player_data_hp[i] + "</option>");
    }
    for (var w = 1; w <= 22; w++) {
        for (var i = 0; i < player_data_ab.length; i++) {
            if (w > 1 && w <= 8) {
                $("#playerGKAb" + w).append("<option value='" + (i) + "'>" + player_data_ab[i] + "</option>");
            }
            $("#playerAb" + w).append("<option value='" + (i) + "'>" + player_data_ab[i] + "</option>");
        }
        $("#playerAb" + w).val('0000000');
        if (w > 1 && w <= 8) {
            $("#playerGKAb" + w).val('0000000');
        }
    }

    $('#playerGKAbOnclick').val('0000000');
    $('#playerAbOnclick').val('0000000');
    $('#playerGKAb1').val('0000000');
    $('#playerAbilitySe').val('0000000');
    $('#playerGKAbilitySe').val('0000000');
    $('#playerHP').val('0000000');
}