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
  }else if(/zhihu\.com\/question\//.test(window.location.href)){ // 
    GM_addStyle(`
      .HotQuestions-bottomButton {
        display: none;
      }
    `);
  }
})();
