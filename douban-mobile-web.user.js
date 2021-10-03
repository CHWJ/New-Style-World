// ==UserScript==
// @name        豆瓣手机网页版
// @namespace   Violentmonkey Scripts
// @match       https://m.douban.com/group/*
// @match       https://m.douban.com/movie/*
// @grant       none
// @version     1.0.1
// @updateURL   https://raw.githubusercontent.com/CHWJ/New-Style-World/master/douban-mobile-web.user.js
// @author      CHWJ
// @description 2021/10/2 20:03:17
// ==/UserScript==

var BussinessObj = {
  hideElements : [],
  timerToHide : null,
  timerCount : 0
};

$(function(){
  hideApp();
  hideAd();
  startTimer();
});

function hideApp(){
  $(".TalionNav-static").css({"margin-top":"-25px"});
  //BussinessObj.hideElements.push(".oia-wrap");
  BussinessObj.hideElements.push(".subject-banner");
  BussinessObj.hideElements.push(".score-write");
}

function hideAd(){
  BussinessObj.hideElements.push("div.center:nth-child(7)");
}

function startTimer(){
  BussinessObj.timerToHide = window.setInterval(function(){
    timerToHideFunc();
  },1000);
}

function timerToHideFunc(){
  if(BussinessObj.timerCount >= 255){
    BussinessObj.hideElements = [];
  }
  if(BussinessObj.hideElements.length > 0){
    var arr = [];
    BussinessObj.hideElements.forEach(x=>{
      var els = $(x);
      if(els.length>0){
        els.hide();
      }else{
        arr.push(x);
      }
    });
    BussinessObj.hideElements = arr;
  }else{
    window.clearInterval(BussinessObj.timerToHide);
    console.log("clear timerToHideFunc");
  }
}
