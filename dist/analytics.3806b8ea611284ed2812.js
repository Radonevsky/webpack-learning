(()=>{"use strict";var r,e={696:(r,e,t)=>{var o=t(638);window.analytics=function(){let r=0,e=!1;const t=()=>r++;return o(document).on("click",t),{destroy(){o(document).off("click",t),e=!0},getClicks:()=>e?"Analytics destroed. Total click: ${counter}":r}}()}},t={};function o(r){var n=t[r];if(void 0!==n)return n.exports;var a=t[r]={exports:{}};return e[r].call(a.exports,a,a.exports,o),a.exports}o.m=e,r=[],o.O=(e,t,n,a)=>{if(!t){var l=1/0;for(s=0;s<r.length;s++){for(var[t,n,a]=r[s],c=!0,i=0;i<t.length;i++)(!1&a||l>=a)&&Object.keys(o.O).every((r=>o.O[r](t[i])))?t.splice(i--,1):(c=!1,a<l&&(l=a));c&&(r.splice(s--,1),e=n())}return e}a=a||0;for(var s=r.length;s>0&&r[s-1][2]>a;s--)r[s]=r[s-1];r[s]=[t,n,a]},o.n=r=>{var e=r&&r.__esModule?()=>r.default:()=>r;return o.d(e,{a:e}),e},o.d=(r,e)=>{for(var t in e)o.o(e,t)&&!o.o(r,t)&&Object.defineProperty(r,t,{enumerable:!0,get:e[t]})},o.o=(r,e)=>Object.prototype.hasOwnProperty.call(r,e),(()=>{var r={142:0};o.O.j=e=>0===r[e];var e=(e,t)=>{var n,a,[l,c,i]=t,s=0;for(n in c)o.o(c,n)&&(o.m[n]=c[n]);if(i)var u=i(o);for(e&&e(t);s<l.length;s++)a=l[s],o.o(r,a)&&r[a]&&r[a][0](),r[l[s]]=0;return o.O(u)},t=self.webpackChunk=self.webpackChunk||[];t.forEach(e.bind(null,0)),t.push=e.bind(null,t.push.bind(t))})();var n=o.O(void 0,[638],(()=>o(696)));n=o.O(n)})();