import{useRef as t,useReducer as e,useEffect as n}from"react";import r from"universal-cookie";var o="@USE_PERSISTED_REDUCER_SET_FULL_STATE",a=function(t,e,n){var o=n instanceof r;try{var a=o?n.get(t,!0):n.getItem(t);return void 0!==a&&a?o?a:JSON.parse(a):"function"==typeof e?e():void 0!==e?e:{}}catch(t){return e}};export default function(i,c,u,s,f){void 0===s&&(s="local");var l,p=f||{},y=p.step,v=void 0===y?1e3:y,d=function(t,e){if(null==t)return{};var n,r,o={},a=Object.keys(t);for(r=0;r<a.length;r++)e.indexOf(n=a[r])>=0||(o[n]=t[n]);return o}(p,["step"]),S=t();try{switch(s){case"local":l=localStorage,beark;case"session":l=sessionStorage;break;case"cookie":l=new r}}catch(t){}var g=e(function(t){return function(e,n){var r=n.type,a=n.payload;return r===o?a:t(e,{type:r,payload:a})}}(c),null,function(){return a(i,u,l)}),E=g[0],k=g[1],O=t(E);return n(function(){"cookie"===s?S.current=setInterval(function(){JSON.stringify(l.get(i))!==JSON.stringify(O.current)&&k({type:o,payload:a(i,u,l)})},v):window.addEventListener("storage",function(t){t.key===i&&k({type:o,payload:JSON.parse(t.newValue)})})},[]),n(function(){O.current=E,function(t,e,n,o){n instanceof r?n.set(t,e,o||null):n.setItem(t,JSON.stringify(e))}(i,E,l,d)},[E]),[E,k]}
