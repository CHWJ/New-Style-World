// ==UserScript==
// @name        知乎-手机网页版
// @namespace   Violentmonkey Scripts
// @match       https://www.zhihu.com/*
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        unsafeWindow
// @version     1.0.2
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
      .ContentItem-actions{
        overflow-y: scroll;
      }
      .ContentItem-actions > .Menu-item{
        width: unset;
        padding: unset;
      }
    `);
    
    unsafeWindow.search = function(){
      unsafeWindow.location.href = "/search?type=content&q=";
    }
    window.setTimeout(function(){
      let a = document.createElement("a");
      a.classList = 'MobileAppHeader-logo';
      a.href = '/search?type=content&q=';
      a.text = "探索新世界";
      let els = document.getElementsByClassName("MobileAppHeader-actions");
      els[0].replaceChild(a,els[0].firstChild);
    },2000);
  }else if(/zhihu\.com\/question\//.test(window.location.href)){ // 回答
    GM_addStyle(`
      .HotQuestions-bottomButton {
        display: none;
      }
    `);
    window.setTimeout(function(){
      let els = document.getElementsByClassName("ContentItem-expandButton");
      els[0].parentNode.removeChild(els[0]);
      document.getElementsByClassName("is-collapsed")[0].classList = "RichContent RichContent--unescapable";
      document.getElementsByClassName("RichContent-inner")[0].style["maxHeight"]="unset";
    },3000);
  }
})();
