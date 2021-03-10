---
layout: post
title:  "JS translation"
date:   2019-04-13 17:59:11 +0800
categories: jekyll update
---

# JS实现翻译的多种方案

1、language.js 库

<https://languages.js.org/docs/>

适应于 React  Angular 和 Vue2 （需要时再学）

~~~js
import Languages from 'languages-js'
~~~

2、网上另一个微软JS库

~~~js
$(function(){
  var script=document.createElement("script");
  script.type="text/javascript";
  script.src="js/translate.js";
  document.getElementsByTagName('head')[0].appendChild(script);
  

  var value = sessionStorage.getItem("language");
  document.onreadystatechange = function () {
    if (document.readyState == 'complete') {
      if(value==="1"){
        Microsoft.Translator.Widget.Translate('zh-CHS', 'en', onProgress, onError, onComplete, onRestoreOriginal, 2000);
      }
    }
  }
  
  function onProgress(value) {
  }
  
  function onError(error) {
  }
  
  function onComplete() {
    $("#WidgetFloaterPanels").hide();
  }
  
  function onRestoreOriginal() {
  }
  
});

function translate(){
  var value = sessionStorage.getItem("language");
  if(value==="1"){
    sessionStorage.setItem("language", "0");
  }else{
    sessionStorage.setItem("language", "1");
  }
  window.location.reload();
}
~~~

测试界面

~~~html
<body>
  <button id="change">中英文切换</button
    </br></br></br></br></br></br></br></br></br></br></br></br></br></br></br>
<div style="text-align: center" >
  你好
</div>
</body>
<script type="text/javascript">
  $("#change").click(function(){
    translate();
  })
</script>
~~~



3、使用谷歌翻译的API

~~~html
<script type="text/javascript" src="http://www.google.com/jsapi"></script >
<script type="text/javascript">
  google.load("language", "1");
  function initialize()
  {
    var text = document.getElementById("text").innerHTML;
    google.language.detect(text, 
                           function(result)
                           {
      if(!result.error && result.language)
      {
        google.language.translate(text, result.language, "en", 
                                  function(result)
                                  {
          var translated = document.getElementById("translation");
          if(result.translation)
          {
            translated.innerHTML = result.translation;
          }
        });
      }
    });
  }
  google.setOnLoadCallback(initialize);
</script>
~~~

