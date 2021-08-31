const html=document.querySelector("html"),sections=document.querySelectorAll("section"),nav=document.querySelector("nav"),navList=document.querySelector("#navList"),hamburger=document.querySelector("#hamburger"),projectsInner=document.querySelector("#projectsInner"),modal=document.querySelector("#modal"),modalContents=document.querySelector("#modalContents"),closeButton=document.querySelector("#closeButton"),modalImage=document.querySelector("#modalImage"),modalCaption=document.querySelector("#modalCaption");let isObserverSet=!1,isNavEventsSet=!1;function toggleHamburger(){hamburger.classList.toggle("is-active"),nav.classList.toggle("is-open"),html.classList.toggle("is-frozen")}const observer=new IntersectionObserver((e=>{e.forEach((e=>{e.isIntersecting&&(document.querySelector("nav a.is-active").classList.remove("is-active"),document.querySelector(`a[href$="#${e.target.className}"]`).classList.add("is-active"))}))}),{threshold:.5,rootMargin:"100px"});function toggleModal(){html.classList.toggle("is-frozen"),modal.classList.toggle("is-shown")}function setModalContents({imgPath:e,altText:t,caption:o}){modalImage.setAttribute("src",e),modalImage.setAttribute("alt",t),modalCaption.innerText=o}function closeModal(){toggleModal(),setModalContents({imgPath:"",altText:"",caption:""})}function throttle(e,t){let o=!1;return function(){o||(e.apply(this,arguments),o=!0,setTimeout((()=>{o=!1}),t))}}function init(){if(window.innerWidth<768){if(isNavEventsSet)return;hamburger.addEventListener("click",toggleHamburger),navList.addEventListener("click",(e=>{e.target.matches("a")&&(toggleHamburger(),navList.querySelector("a.is-active").classList.remove("is-active"),e.target.classList.add("is-active"))})),isNavEventsSet=!0}else{if(isObserverSet)return;sections.forEach((e=>{observer.observe(e)})),isObserverSet=!0}}const throttledInit=throttle(init,600);document.addEventListener("DOMContentLoaded",(()=>{init(),projectsInner.addEventListener("click",(e=>{if(!e.target.matches(".btn-project"))return;const t=projectsInner.querySelector("#project"+e.target.dataset.projectno),o=t.querySelector("img"),n=t.querySelector("figcaption");toggleModal(),setModalContents({imgPath:o.getAttribute("src"),altText:o.getAttribute("alt"),caption:n.innerText})})),modal.addEventListener("click",closeModal),closeButton.addEventListener("click",closeModal),modalContents.addEventListener("click",(e=>{e.stopPropagation()}))})),window.addEventListener("resize",throttledInit);
//# sourceMappingURL=app.js.map