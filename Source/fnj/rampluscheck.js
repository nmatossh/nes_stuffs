function ramcheck(dz, Hex) {
    var bz1 = Hex[dz];
    var bz2 = Hex[dz + 1];
    ///////////////////////////////////////////////
    var bzd;
    // #region 判断地址类型
    if (bz2 == 0xBB || bz2 == 0xBC || bz2 == 0xBA) {
        bzd = 0x30000 + bz2 * 0x100 + bz1 + 0x10;
    } else {
        var obd = 0;
        if (IsCn) {
            switch ((toHex16(bz2)).substr(0, 1)) {
                case "B":
                case "F":
                    obd = 0x30000;
                    break;
                case "5":
                case "6":
                    obd = 0x73000;
                    break;
                default:
                    obd = 0x30000;
                    break;
            }
            bzd = obd + bz2 * 0x100 + bz1 + 0x10;
        }
        else {
            switch ((toHex16(bz2)).substr(0, 1)) {
                case "B":
                case "F":
                    obd = 0x30000;
                    break;
                case "7":
                case "6":
                case "5":
                    obd = 0x4cc0;
                    break;
            }
            var coddz = 0;
            if (obd == 0x4cc0) {
                if (Ram4Cc0) {
                    switch (toHex16(bz2)) {
                        case "60":
                            coddz = 0x4CC0 + bz1;
                            break;
                        case "61":
                            coddz = 0x4DC0 + bz1;
                            break;
                        case "62":
                            coddz = 0x4EC0 + bz1;
                            break;
                        case "63":
                            coddz = 0x4FC0 + bz1;
                            break;
                        case "64":
                            coddz = 0x50C0 + bz1;
                            break;
                        case "65":
                            coddz = 0x51C0 + bz1;
                            break;
                        case "66":
                            coddz = 0x52C0 + bz1;
                            break;
                        case "67":
                            coddz = 0x53C0 + bz1;
                            break;
                        case "68":
                            coddz = 0x54C0 + bz1;
                            break;
                        case "69":
                            coddz = 0x55C0 + bz1;
                            break;
                        case "6A":
                            coddz = 0x56C0 + bz1;
                            break;
                        case "6B":
                            coddz = 0x57C0 + bz1;
                            break;
                        case "6C":
                            coddz = 0x58C0 + bz1;
                            break;
                        case "6D":
                            coddz = 0x59C0 + bz1;
                            break;
                        case "6E":
                            coddz = 0x5AC0 + bz1;
                            break;
                        case "6F":
                            coddz = 0x5BC0 + bz1;
                            break;
                        case "70":
                            coddz = 0x5CC0 + bz1;
                            break;
                        case "71":
                            coddz = 0x5DC0 + bz1;
                            break;
                        case "72":
                            coddz = 0x5EC0 + bz1;
                            break;
                        case "73":
                            coddz = 0x5FC0 + bz1;
                            break;
                    }
                }
                if (Ram5000) {
                    switch (toHex16(bz2)) {
                        case "50":
                            coddz = 0x4CC0 + bz1;
                            break;
                        case "51":
                            coddz = 0x4DC0 + bz1;
                            break;
                        case "52":
                            coddz = 0x4EC0 + bz1;
                            break;
                        case "53":
                            coddz = 0x4FC0 + bz1;
                            break;
                        case "54":
                            coddz = 0x50C0 + bz1;
                            break;
                        case "55":
                            coddz = 0x51C0 + bz1;
                            break;
                        case "56":
                            coddz = 0x52C0 + bz1;
                            break;
                        case "57":
                            coddz = 0x53C0 + bz1;
                            break;
                        case "58":
                            coddz = 0x54C0 + bz1;
                            break;
                        case "59":
                            coddz = 0x55C0 + bz1;
                            break;
                        case "5A":
                            coddz = 0x56C0 + bz1;
                            break;
                        case "5B":
                            coddz = 0x57C0 + bz1;
                            break;
                        case "5C":
                            coddz = 0x58C0 + bz1;
                            break;
                        case "5D":
                            coddz = 0x59C0 + bz1;
                            break;
                        case "5E":
                            coddz = 0x5AC0 + bz1;
                            break;
                        case "5F":
                            coddz = 0x5BC0 + bz1;
                            break;
                        case "60":
                            coddz = 0x5CC0 + bz1;
                            break;
                        case "61":
                            coddz = 0x5DC0 + bz1;
                            break;
                        case "62":
                            coddz = 0x5EC0 + bz1;
                            break;
                        case "63":
                            if ((toHex16(bz1)).substr(0, 1) < 5) {
                                coddz = 0x5FC0 + bz1;
                            } else {
                                coddz = 0xC600 + bz1 - 0x50;
                            }
                            break;
                        case "64":
                            coddz = 0xC6B0 + bz1;
                            break;
                        case "65":
                            coddz = 0xC7B0 + bz1;
                            break;
                        case "66":
                            coddz = 0xC8B0 + bz1;
                            break;
                        case "67":
                            coddz = 0xC9B0 + bz1;
                            break;
                        case "68":
                            coddz = 0xCAB0 + bz1;
                            break;
                        case "69":
                            coddz = 0xCBB0 + bz1;
                            break;
                        case "6A":
                            coddz = 0xCCB0 + bz1;
                            break;
                        case "6B":
                            coddz = 0xCDB0 + bz1;
                            break;
                        case "6C":
                            coddz = 0xCEB0 + bz1;
                            break;
                        case "6D":
                            if ((toHex16(bz1)).substr(0, 1) < 5) {
                                coddz = 0xCFB0 + bz1;
                            } else {
                                coddz = 0xF010 + bz1 - 0x60;
                            }
                            break;
                        case "6E":
                            coddz = 0xF0B0 + bz1;
                            break;
                        case "6F":
                            coddz = 0xF1B0 + bz1;
                            break;
                        case "70":
                            coddz = 0xF2B0 + bz1;
                            break;
                        case "71":
                            coddz = 0xF3B0 + bz1;
                            break;
                        case "72":
                            coddz = 0xF4B0 + bz1;
                            break;
                        case "73":
                            coddz = 0xF5B0 + bz1;
                            break;
                        case "74":
                            coddz = 0xF6B0 + bz1;
                            break;
                        case "75":
                            coddz = 0xF7B0 + bz1;
                            break;
                        case "76":
                            coddz = 0xF8B0 + bz1;
                            break;
                        case "77":
                            coddz = 0xF9B0 + bz1;
                            break;
                        case "78":
                            coddz = 0xFAB0 + bz1;
                            break;
                        case "79":
                            coddz = 0xFBB0 + bz1;
                            break;
                        case "7A":
                            coddz = 0xFCB0 + bz1;
                            break;
                        case "7B":
                            coddz = 0xFDB0 + bz1;
                            break;
                        case "7C":
                            coddz = 0xFEB0 + bz1;
                            break;
                        case "7D":
                            if ((toHex16(bz1)).substr(0, 1) < 5) {
                                coddz = 0xFFB0 + bz1;
                            } else {
                                coddz = 0x119C0 + bz1 - 0x60;
                            }
                            break;
                        case "7E":
                            coddz = 0x11A60 + bz1;
                            break;
                        case "7F":
                            coddz = 0x11B60 + bz1;
                            break;
                    }
                }

                if (Ram512) {
                    coddz = 0x60000 + bz2 * 0x100 + bz1 + 0x10;
                }

                if (RamNew512) {
                    coddz = 0x78000 + bz2 * 0x100 + bz1 + 0x10;
                }

                if (RamCn768) {
                    switch (toHex16(bz2)) {
                        case "60":
                            coddz = 0x4FB0 + bz1;
                            break;
                        case "61":
                            coddz = 0x50B0 + bz1;
                            break;
                        case "62":
                            coddz = 0x51B0 + bz1;
                            break;
                        case "63":
                            coddz = 0x52B0 + bz1;
                            break;
                        case "64":
                            coddz = 0x53B0 + bz1;
                            break;
                        case "65":
                            coddz = 0x54B0 + bz1;
                            break;
                        case "66":
                            coddz = 0x55B0 + bz1;
                            break;
                        case "67":
                            coddz = 0x56B0 + bz1;
                            break;
                        case "68":
                            coddz = 0x57B0 + bz1;
                            break;
                        case "69":
                            coddz = 0x58B0 + bz1;
                            break;
                        case "6A":
                            coddz = 0x59B0 + bz1;
                            break;
                        case "6B":
                            coddz = 0x5AB0 + bz1;
                            break;
                        case "6C":
                            coddz = 0x5BB0 + bz1;
                            break;
                        case "6D":
                            coddz = 0x5CB0 + bz1;
                            break;
                        case "6E":
                            coddz = 0x5DB0 + bz1;
                            break;
                        case "6F":
                            coddz = 0x5EB0 + bz1;
                            break;
                        default:
                            coddz = 0x73000 + bz2 * 0x100 + bz1 + 0x10;
                            break;
                    }
                }

                if (Is1v32) {
                    coddz = bz2 * 0x100 + bz1 + 0x10;
                }

                bzd = coddz;
            }
            else {
                bzd = 0x30000 + bz2 * 0x100 + bz1 + 0x10;
            }
        }
    }
    //Ldcode.GetFormation(Hex, bzd, termxing, termzhanshu);
    var zzdz = bzd;// + 9;
    return zzdz;
}