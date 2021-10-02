// ==UserScript==
// @name        豆瓣手机网页版
// @namespace   Violentmonkey Scripts
// @match       https://m.douban.com/group/*
// @match       https://m.douban.com/movie/*
// @grant       none
// @version     1.0
// @author      -
// @description 2021/10/2 下午8:03:17
// ==/UserScript==

var BussinessObj = {
  hideElements : [],
  timerToHide : null
};

$(function(){
  hideApp();
  hideAd();
});

function hideApp(){
  $(".TalionNav-static").css({"margin-top":"-25px"});
  //BussinessObj.hideElements.push(".oia-wrap");
  BussinessObj.hideElements.push(".subject-banner");
  BussinessObj.hideElements.push(".score-write");
  
  BussinessObj.timerToHide = window.setInterval(function(){
    timerToHideFunc();
  },1000);
}

function hideAd(){
  $(".card > section:nth-child(6) > div:nth-child(1) > div:nth-child(5)").hide();
}

function timerToHideFunc(){
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
  }
}
