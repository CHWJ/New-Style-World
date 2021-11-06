// ==UserScript==
// @name        豆瓣手机网页版
// @namespace   Violentmonkey Scripts
// @match       https://m.douban.com/group/*
// @match       https://m.douban.com/movie/*
// @require     https://cdn.bootcdn.net/ajax/libs/linq.js/3.2.4/linq.min.js
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @version     1.0.4
// @updateURL   https://raw.githubusercontent.com/CHWJ/New-Style-World/master/douban-mobile-web.user.js
// @author      CHWJ
// @description 2021/10/2 20:03:17
// @note        2021/11/06 11:37 1.0.4 预告片设置初始音量
// ==/UserScript==

var BussinessObj = {
  hideElements : [],
  timerToHide : null,
  timerCount : 0
};

$(function(){
  if(/movie\/.*/.test(window.location.href)){
    $(".TalionNav-static").css({"margin-top":"-10px"});
  } 
  if(/movie\/subject\/.*\/$/.test(window.location.href)){ // 首页
    BussinessObj.hideElements.push(".subject-banner");
    BussinessObj.hideElements.push(".score-write");
    BussinessObj.hideElements.push(".pics-title ~ a");
    BussinessObj.hideElements.push(".write-comment");
    BussinessObj.hideElements.push(".write-review");    
    
    // hide Ad
    BussinessObj.hideElements.push(".card > div");
    
    //
    GM_addStyle(`
      .subject-intro {
        padding-top: 10px;
      }
    `);
  }else if(/movie\/subject\/.*\/comments/.test(window.location.href)){ // 短评
    BussinessObj.hideElements.push(".download-app");
  }else if(/movie\/subject\/.*\/reviews/.test(window.location.href)){ // 影评列表
    BussinessObj.hideElements.push(".download-app");
    BussinessObj.hideElements.push(".open-in-app-fixed-bottom");
    
    // todo: 最新发布的、我关注的
  }else if(/movie\/review\//.test(window.location.href)){ // 影评详情
    BussinessObj.hideElements.push(".download-app");
    BussinessObj.hideElements.push('.card > section + div,.subject-card + div');
    BussinessObj.hideElements.push('.oia-readall');
    
    $(".note-content").css("max-height","unset");
    
    // todo: 请求桌面版本的 影评详情
  }else if(/movie\/trailer\//.test(window.location.href)){ // 预告片
    var els = document.getElementsByTagName("video");
    $.each(els,function(i,el){
      el.volume = 0.325;
    });
  }
  
  if(window.location.href.indexOf("/movie/subject/")>-1){
    if($("#celebrities").length>0){
      // 演职员表
      GM_addStyle(`
      .expandActors-role {
        color: #818181;
        padding: 10px 0 10px 10px;
      }
      #expandActors .item__celebrity{
        width: 80px;
        margin-bottom: 10px;
      }
    `);
      $("#celebrities").append($(`<div id="expandActors"></div>`));
      $("#celebrities > header").css({"display":"flex","justify-content": "space-between"}).append(`<div><a id="btn-toggleExpandActors" href="javascript:;" style="font-size: 15px;">展开▼</a></div>`);
      $("#btn-toggleExpandActors").on("click",toggleExpandActors);

      // 替换短评
      var timer1 = window.setInterval(function(){
        if($(".comment-list ~ a").length>0){
          $(".comment-list ~ a").attr("href","./comments?status=P").text("查看更多热门短评");
          window.clearInterval(timer1);
        }
      },200);
      // 替换影评
      if($(".movie-reviews > p > a").length>0){
        $(".movie-reviews > p > a").attr("href","./reviews").text("查看更多热门影评");
      }
    }
  }
  
  startTimer();
});

function startTimer(){
  BussinessObj.timerToHide = window.setInterval(function(){
    if(BussinessObj.timerCount >= 255){
      BussinessObj.hideElements = [];
    }else{
      BussinessObj.timerCount++;
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
  },1000);
}

function toggleExpandActors(){
  if($(".movie-celebrities").css("display")!="none"){
    let preRole = "";
    let roleIndex = 0;
    $(".item__celebrity").forEach(x=>{
        var vm = $(x).clone();
        var role = $(vm).find(".role");
        var roleText = $(role).text();
        if(preRole !== roleText){
          roleIndex++;
          preRole = roleText;
          $("#expandActors").append($(`<div id="role-${roleIndex}"><p class="expandActors-role">#${roleText}</p></div>`));
        }
        $(role).remove();
        $("#role-"+roleIndex).append($(vm));
    });
    $(".movie-celebrities").hide();
    $("#btn-toggleExpandActors").text("展开▲");
  }else{
    $(".movie-celebrities").show();
    $("#expandActors").children().remove();
    $("#btn-toggleExpandActors").text("展开▼");
  }
}
