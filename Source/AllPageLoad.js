document.write('<script src="js_css_jquery.min.js"></script>');
document.write('<script src="pjax.js"></script>');

function LoadCSSJSFile(arguments) {
  for (var i = 0; i < arguments.length; i++) {
    var file = arguments[i];
    if (file.match(/.*.js$/))
      document.write('<script src="fnj/' + file + cssjsvernob + '"></script>');
    else if (file.match(/.*.css$/))
      document.write('<link rel="stylesheet" href="fnc/' + file + cssjsvernob + '" type="text/css" />');
  }
}

function checknotmobile() {
  var userAgentInfo = navigator.userAgent;
  var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
};

//libgme.js   //index.js  //cheats.js
LoadCSSJSFile(['def.css', 'datajson.js', 'bulidhtml.js', 'rampluscheck.js', 'function.js', 'AiChange.js', 'playeredit.js', 'musicedit.js', 'playAbilityEdit.js', 'edit16.js', 'chr.js','instruct.js']);

//Check 
if (checknotmobile() == true) {
  LoadCSSJSFile(['AllPage.css']);
} else {
  LoadCSSJSFile(['Mobile.css']);
}