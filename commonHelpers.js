import{a as y,S as b,i}from"./assets/vendor-527658dd.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&d(m)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const S="https://pixabay.com/api",v="42319756-1866d229574eee1c1aa4e15c2",a="hidden";y.defaults.baseURL=S;const n={message:"Sorry, there are no images matching your search query. Please try again!",color:"#FFA000",position:"topRight",icon:"icon-octagon",iconText:"",timeout:5e3,titleColor:"#fff",messageColor:"#fff",iconColor:"#fff"},h={key:v,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:20},P=document.querySelector(".form"),g=document.querySelector("ul.gallery"),u=document.querySelector(".loader"),l=document.querySelector("#show-more");let c=1,f=1,p="";const O=new b(".gallery a",{sourceAttr:"data-source",captionsData:"alt",captionDelay:250}),L=s=>{g.insertAdjacentHTML("beforeend",s.map(e=>`<li class="gallery-item">
                  <a class="gallery-link" href="${e.largeImageURL}" data-source="${e.largeImageURL}">
                    <img class="gallery-image" src="${e.webformatURL}"  alt="${e.tags}"/>
                  </a>
                </li>`).join("")),O.refresh()},q=(s,e)=>{const o=e*(s-1),d=g.children[o].getBoundingClientRect();window.scrollBy({top:d.y,left:0,behavior:"smooth"})},w=async(s,e)=>(await y.get("/",{params:{...h,q:s,page:e}})).data,x=async s=>{s.preventDefault();const e=s.target.elements.search.value.trim();s.target.elements.search.value="",l.classList.add(a),u.classList.remove(a),g.innerHTML="",c=1;try{const o=await w(e,c);if(!o.totalHits){i.show(n);return}L(o.hits),c++,p=e,f=Math.ceil(o.totalHits/h.per_page),f>1?l.classList.remove(a):i.show({...n,message:"We're sorry, but you've reached the end of search results."})}catch(o){i.show({...n,message:o.message,color:"#EF4040"})}finally{u.classList.add(a)}},A=async()=>{u.classList.remove(a),l.classList.add(a);try{const s=await w(p,c);L(s.hits),q(c,h.per_page),c++}catch(s){i.show({...n,message:s.message})}finally{f>=c?l.classList.add(a):i.show({...n,message:"We're sorry, but you've reached the end of search results."}),u.classList.add(a)}};P.addEventListener("submit",x);l.addEventListener("click",A);
//# sourceMappingURL=commonHelpers.js.map
