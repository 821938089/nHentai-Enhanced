// ==UserScript==
// @name       nhentai-enhanced
// @version    0.0.1
// @author     NekoChan
// @homepage   https://github.com/NekoChanTaiwan/nHentai-Enhanced
// @supportURL https://github.com/NekoChanTaiwan/nHentai-Enhanced/issues
// @match      https://nhentai.net/*
// @namespace  https://github.com/NekoChanTaiwan
// @grant      none
// @require    https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.min.js
// @require    https://cdn.jsdelivr.net/npm/clipboard@2.0.8/dist/clipboard.min.js
// @require    https://cdn.jsdelivr.net/npm/notyf@3.9.0/notyf.min.js
// ==/UserScript==

(()=>{"use strict";const e=window.$,t=[{中文:"/language/chinese/"},{日文:"/language/japanese/"},{英文:"/language/english/"},{裏番:"https://hanime1.me/"}];let a=null,o=!1,s=0,i=!1,l=new Notyf;function c(t){e(window).scroll((()=>{e(window).scrollTop()+e(window).height()>.75*e(document).height()&&!1===i&&function(t,n=null){switch(s++,t){case"homepage":n=".index-container:nth-child(4)";break;case"page":case"span":n=".index-container"}i=!0,d(`第${s}頁 讀取中`),e.ajax({type:"GET",url:`${location.href}/?page=${s}`,cache:!0,dataType:"html",success:t=>{d(`第${s}頁 讀取成功`);let a=e("<div></div>");if(a.html(t.replaceAll("data-src","src")),e(n).append(a.find(".gallery")),r(),o)for(let e=t.options.blacklisted_tags.map((e=>".tag-".concat(e,',.gallery[data-tags~="').concat(e,'"]'))).join(","),t=document.querySelectorAll(e),n=0;n<t.length;n++)t[n].classList.add("blacklisted");d("隱藏黑名單 已關閉"),i=!1},error:()=>{d(`第${s}頁 讀取失敗`),l.dismissAll(),l.error(`第${s}頁 讀取失敗`),s--,i=!1}})}(t)}))}function r(){e(".gallery > a").attr("target","_blank")}function h(t,n){switch(t){case"homepage":n=".index-container.index-popular";break;case"page":n="#content > div";break;case"span":n=".container.index-container"}e("#content > section").insertBefore(n),e("#content > section > div").remove()}function d(e){console.log(e)}function p(t,n){e(t)[0]?e(t).html(n):d(`修改 HTML 失敗，選擇器：${t}`)}function g(e){for(let t=0;t<e.length;t++){const n=e.eq(t),o=n.html();a.Tags.hasOwnProperty(o)&&(d(`偵測到：${o}，更改為：${a.Tags[o]}`),n.html(a.Tags[o]).parent().attr("title",o))}}function f(e){const t=a.Book.Time,n=["years","year","months","month","weeks","days","day","hours","hour","minutes","minute","seconds","second","ago"];for(let a=0,o=n.length;a<o;a++)e=e.replace(n[a],t[n[a]]);return e}function u(){e('nav[role="navigation"]')[0]?(d("偵測到導航欄"),function(s){e(window).scroll((()=>{e("nav").css({position:"static",top:"0",width:"100%","z-index":"999999"}),0===e(window).scrollTop()?e("nav").css({position:"static"}):pageYOffset>=e("nav")[0].offsetTop&&e("nav").css({position:"fixed"})}));for(let t=1,n=Object.keys(a.MenuLeft).length;t<=n;t++)p(`.menu.left li:nth-child(${t}) > a`,a.MenuLeft[Object.keys(a.MenuLeft).sort(((e,t)=>e-t))[t-1]]),7==t&&e(`.menu.left li:nth-child(${t})`).hide();Object.keys(n.options.user).length?(p(".menu.right li:nth-child(1) > a",`<i class="fa fa-heart color-icon"></i> ${a.MenuRight2.Favroites}`),p(".menu.right li:nth-child(3) > a",`<i class="fa fa-sign-out-alt"></i> ${a.MenuRight2.LogOut}`),o=!0):(p(".menu.right li:nth-child(1) > a",`<i class="fa fa-sign-in-alt"></i> ${a.MenuRight1.SignIn}`),p(".menu.right li:nth-child(2) > a",`<i class="fa fa-edit"></i> ${a.MenuRight1.Register}`),o=!1),e(".menu.right").prepend('\n    <li class="desktop "><a target="_blank" href="https://github.com/NekoChanTaiwan/nHentai-downloader/releases/latest"><i class="fas fa-download"></i> &nbsp nHentai-downloader</a></li>\n    <li class="desktop "><a target="_blank" href="https://discord.gg/ekbWahg52h"><i class="fab fa-discord"></i> &nbsp Discord - nHentai-Enhanced</a></li>'),e("input[type=search]").attr({autocomplete:"off",placeholder:""}),s(),function(t){for(let n=0;n<t.length;n++)d(`新增自定選單：${Object.keys(t[n])[0]} 連結：${Object.values(t[n])[0]}`),e(".menu.left").append(`<li class="desktop "><a href="${Object.values(t[n])[0]}">${Object.keys(t[n])[0]}</a></li>`)}(t)}((function(){e("head").append('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/notyf@3.9.0/notyf.min.css">'),e("#content .index-popular")[0]?(d("偵測到首頁"),p("#content .index-popular > h2",`<i class="fa fa-fire color-icon"></i> ${a.Homepage.PopularNow}`),p("#content .container:nth-child(3) > h2",`<i class="fa fa-box-tissue color-icon"></i> ${a.Homepage.NewUploads}`),r(),d("自動翻頁 已開啟"),h("homepage"),s=1,c("homepage")):e(".index-container")[0]&&/net\/\?page=/.test(location.href)?(d("偵測到頁面列表"),r(),d("自動翻頁 已開啟"),h("page"),s=Number(location.href.split("=")[1]),c("page")):e("#tags")[0]?(d("偵測到本本"),function(){const t=e("#gallery_id").hide().text().replace("#","");e(e(`<h3 class="title"><span class="before">神的語言：</span><a id="book_id" class="god" data-clipboard-text="${t}" href="javascript:;">${t}</a></h3>`)).insertAfter("#gallery_id");const n=new ClipboardJS(".god");n.on("success",(e=>{d(`操作：${e.action}, 文字：${e.text}, 觸發：${e.trigger}`),l.dismissAll(),l.success("複製成功！"),e.clearSelection()})),n.on("error",(e=>{d(`操作：${e.action}, 觸發：${e.trigger}`),l.dismissAll(),l.error("復製失敗！")}));for(let t=1,n=Object.keys(a.Book.TagsName).length,o="";t<=n;t++)o=e(`#tags > .tag-container:nth-child(${t}) > span`)[0].outerHTML,p(`#tags > .tag-container:nth-child(${t})`,`${a.Book.TagsName[Object.keys(a.Book.TagsName).sort(((e,t)=>e-t))[t-1]]} ${o}`);g(e("#tags > .tag-container .tags a .name")),e("#download").hide(),e("#info > .buttons").prepend(`<a href="/g/${t}/1/?onePageMode=True" class="btn btn-primary"><i class="fas fa-book-open"></i> ${a.Book.Btns.Read}</a>`);let s=2===e("#info .title").length?`${e("#info .title:nth-child(1) > .pretty").text()}`:3===e("#info .title").length?`${e("#info .title:nth-child(2) > .pretty").text()}`:null,i=3===e("#info .title").length?`${e("#info .title:nth-child(1) > .pretty").text()}`:null,c="",h=0,u=s.split(" "),m=1===u.length?u.length:u.length-1,b=["Ch.","Ep.","第","話","券","前篇","中篇","後篇","+","-","#"],$=[" ","「","」"];for(let e=0;e<m;e++)c+=`${u[e]}+`;!function t(n,o=!0){function s(e,t=""){for(let a=0,o=e.length;a<o;a++)n=n.replaceAll(e[a],t)}3!=h&&(h++,o&&(n=n.replace(/[0-9]+/g,""),s(b),s($,"+")),e.ajax({type:"GET",url:`/search/?q=${n}`,cache:!1,dataType:"html",success:o=>{d(`搜尋 ${n} 讀取成功`);let s=e("<div></div>").html(o).find("#content > h1").text().replace("results",""),l=/69696969/.test(o.replace(i,"69696969"));if(d(`搜尋 結果數量：${s}`),s>0&&l)d("完美搜尋結果"),r(n);else switch(h){case 1:3===e("#info .title").length?t(i):(d("跳過搜尋 searchText2 ，搜尋 searchText3"),t(c,!1));break;case 2:s>0&&l?(d("完美搜尋結果"),r(n)):t(c,!1);break;case 3:d("勉強搜尋結果"),r(n)}function r(t){e("#info > .buttons").append(`<a href="/search/?q=${t}" class="btn btn-secondary"><i class="fas fa-search"></i> ${a.Book.Btns.SerachRelatedBook} (<span>${s.replaceAll(" ","")}</span>)</a>`)}},error:()=>{d(`搜尋 ${n} 讀取失敗`)}}))}(s);const y=e(".thumb-container").length;y>75&&(d(`總共頁數：：${y}，確定大於 75 `),p("#show-more-images-button",`<i class="fa fa-eye"></i> &nbsp; <span class="text">${a.Book.ShowMoreImagesButton}</span>`),p("#show-all-images-button",`<i class="fa fa-eye"></i> &nbsp; <span class="text">${a.Book.ShowAllImagesButton}</span>`)),p("#related-container > h2",a.Book.MoreLikeThis),r(),p("#comment-post-container > h3",`<i class="fa fa-comments color-icon"></i> ${a.Book.PostAComment}`),o?(e("#comment_form > textarea").attr("placeholder",`${a.Book.CommentFormPlaceHolder}`),p("#comment_form > div > button",`<i class="fa fa-comment"></i> ${a.Book.Comment}`)):p("#comment-post-container > div > p",`<a class="login-comment" href="/login/">${a.Book.NoLogin.Login}</a> ${a.Book.NoLogin.Or} <a class="login-comment" href="/register/">${a.Book.NoLogin.Register}</a> ${a.Book.NoLogin.ToPostAComment}`),p("time",f(e("time").html())),e("time").bind("DOMNodeInserted",(function(){let e=f(this.innerHTML);this.innerHTML!==e&&(this.innerHTML=e,d(`偵測到時間發生變化：${this.innerHTML}`))}))}()):e("#image-container")[0]?(d("偵測到閱讀本本中"),/onePageMode=True/.test(location.href)?function(){d("自動翻頁 已開啟");let t=location.href.split("/"),n=Number(t[t.length-2]),a=Number(e("span.num-pages").eq(1).text()),o=t[t.length-3],s=1,i=new IntersectionObserver((t=>{t.forEach((t=>{t.isIntersecting&&(s=Number(e(t.target).attr("id").replace("page","")),$H("span.current",s))}))}),{root:null,rootMargin:"0px",threshold:[0,1]});function c(t){e("html, body").animate({scrollTop:e(`#page${t}`).offset().top},"fast")}e("nav, #messages, #image-container, .reader-bar:last, .reader-settings, .reader-pagination").hide(),e(".reader-bar").append(`<div style="display:flex;align-self:flex-center;position:absolute;left:50%;transform:translateX(-50%)"><button class="page-number btn btn-unstyled"><span class="current">0</span><span class="divider">&nbsp;/&nbsp;</span><span class="num-pages">${a}</span></button></div>`),e(".reader-bar").eq(0).css({opacity:"0",position:"fixed",top:"0",width:"100%","z-index":"999999"}).hover((function(){e(this).animate({opacity:"1.0"},100)}),(function(){e(this).animate({opacity:"0"},100)})),e(window).keyup((t=>{switch(e(".reader-pagination > a").remove(),t.code){case"ArrowRight":s++,s<=a?c(s):s--;break;case"ArrowLeft":s--,s>=1?c(s):s++}})),function t(s){s>a||e.ajax({type:"GET",url:`/g/${o}/${s}/`,cache:!0,dataType:"html",success:a=>{d(`第 ${s} 張 讀取成功`);let o=e("<div></div>");e("#content").append(o.html(a).find("#image-container > a > img").attr("id",`page${s}`).css({display:"block",margin:"0px auto"})),s==n&&c(n),i.observe(e(`#page${s}`)[0]),t(s+1)},error:()=>{d(`第 ${s} 張 讀取失敗`),l.dismissAll(),l.error(`第 ${s} 張 讀取失敗`),t(s)}})}(1)}():d("自動翻頁 已關閉")):e("#content > h1 > span")[0]?(d("偵測到 span 頁面"),function(){const t=a.spanPage,n=t.sort,o=e("#content > h1 > span"),i=o.html();t.tags.hasOwnProperty(i)?o.html(t.tags[i]).parent():d("未知的 span 頁面"),g(e("#content > h1 > a > .name")),p(".sort > div:nth-child(1) > a",n.Recent),p(".sort > div:nth-child(2) > span",n.Popular),p(".sort > div:nth-child(2) > a:nth-child(2)",n.today),p(".sort > div:nth-child(2) > a:nth-child(3)",n.week),p(".sort > div:nth-child(2) > a:nth-child(4)",n.allTime),h("span");const l=location.href.split("=");s=1==l.length?1:Number(l[1]),c("span")}()):d("未知頁面"),document.body.style.display="",d("隱藏黑名單 已關閉"),d("Discord 聊天室 已關閉"),d("阻擋廣告 已開啟"),e(".advertisement").hide(),n.ads=null}))):(d('初始化失敗，找不到指定的元素：nav[role="navigation"]'),e("body").show())}document.body.style.display="none",e((()=>{const t=()=>{e.ajax({type:"GET",url:"//raw.githubusercontent.com/NekoChanTaiwan/nHentai-Enhanced/main/locales/zh_TW.json?flush_cache=True",cache:!1,dataType:"json",success:e=>{d("JSON 讀取成功"),a=e,u()},error:()=>{d("JSON 讀取失敗 3 秒後重新讀取"),setTimeout((()=>t()),3e3)}})};t()}))})();