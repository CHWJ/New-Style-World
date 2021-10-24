// ==UserScript==
// @name        知乎-手机网页版
// @namespace   Violentmonkey Scripts
// @match       https://www.zhihu.com/*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @version     1.0.0
// @updateURL   https://raw.githubusercontent.com/CHWJ/New-Style-World/master/zhihu-mobile-web.user.js
// @author      CHWJ
// @description 2021/10/4 19:56:17
// ==/UserScript==

var BussinessObj = {
  hideElements : [],
  timerToHide : null,
  timerCount : 0
};

(function() {
  GM_addStyle(`.MobileAppHeader-downloadLink { display: none; }`);
  GM_addStyle(`body { overflow-x: hidden !important; }`);
  if(/zhihu\.com\/$/.test(window.location.href)){ // 首页
    GM_addStyle(`
      .DownloadGuide {
        display: none;
      }
    `);
  }else if(/zhihu\.com\/question\//.test(window.location.href)){ // 回答
    GM_addStyle(`
      .HotQuestions-bottomButton {
        display: none;
      }
    `);
    window.setTimeout(function(){
      var els = document.getElementsByClassName("ContentItem-expandButton");
      els[0].parentNode.removeChild(els[0]);
      document.getElementsByClassName("is-collapsed")[0].classList = "RichContent RichContent--unescapable";
      document.getElementsByClassName("RichContent-inner")[0].style["maxHeight"]="unset";
    },3000);
  }
})();
