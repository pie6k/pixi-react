"use strict";(self.webpackChunk_pixi_react_docs=self.webpackChunk_pixi_react_docs||[]).push([[501],{2700:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>p,toc:()=>l});var r=n(7896),o=(n(2784),n(3905));const a={},i="Container",p={unversionedId:"components/Container",id:"components/Container",title:"Container",description:"Props",source:"@site/docs/components/Container.mdx",sourceDirName:"components",slug:"/components/Container",permalink:"/components/Container",draft:!1,editUrl:"https://github.com/pixijs/pixi-react/tree/master/packages/docs/docs/components/Container.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"BitmapText",permalink:"/components/BitmapText"},next:{title:"Graphics",permalink:"/components/Graphics"}},c={},l=[{value:"Props",id:"props",level:2},{value:"Usage",id:"usage",level:2},{value:"Example",id:"example",level:2}],s={toc:l};function u(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},s,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"container"},"Container"),(0,o.kt)("h2",{id:"props"},"Props"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://pixijs.download/dev/docs/PIXI.Container.html"},"https://pixijs.download/dev/docs/PIXI.Container.html")),(0,o.kt)("h2",{id:"usage"},"Usage"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live",live:!0},'<Stage width={300} height={300} options={{ backgroundColor: 0xeef1f5 }}>\n  <Container position={[150, 150]}>\n    <Sprite anchor={0.5} x={-75} y={-75} image="/img/bunny.png" />\n    <Sprite anchor={0.5} x={0} y={0} image="/img/bunny.png" />\n    <Sprite anchor={0.5} x={75} y={75} image="/img/bunny.png" />\n  </Container>\n</Stage>\n')),(0,o.kt)("h2",{id:"example"},"Example"),(0,o.kt)("iframe",{height:500,scrolling:"no",title:"Container",src:"//codepen.io/inlet/embed/ca683993e355b9f3370f0a44d189141f/?height=300&theme-id=33987&default-tab=result&embed-version=2",frameBorder:"no",allowFullScreen:!0,style:{width:"100%"}}))}u.isMDXComponent=!0},3905:(e,t,n)=>{n.d(t,{Zo:()=>s,kt:()=>f});var r=n(2784);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,s=p(e,["components","mdxType","originalType","parentName"]),u=l(n),d=o,f=u["".concat(c,".").concat(d)]||u[d]||m[d]||a;return n?r.createElement(f,i(i({ref:t},s),{},{components:n})):r.createElement(f,i({ref:t},s))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=d;var p={};for(var c in t)hasOwnProperty.call(t,c)&&(p[c]=t[c]);p.originalType=e,p[u]="string"==typeof e?e:o,i[1]=p;for(var l=2;l<a;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);