"use strict";(self.webpackChunk_pixi_react_docs=self.webpackChunk_pixi_react_docs||[]).push([[333],{825:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>l,default:()=>d,frontMatter:()=>a,metadata:()=>i,toc:()=>s});var r=n(7896),o=(n(2784),n(3905));const a={},l="Text",i={unversionedId:"components/Text",id:"components/Text",title:"Text",description:"Props",source:"@site/docs/components/Text.mdx",sourceDirName:"components",slug:"/components/Text",permalink:"/components/Text",draft:!1,editUrl:"https://github.com/pixijs/pixi-react/tree/master/packages/docs/docs/components/Text.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Sprite",permalink:"/components/Sprite"},next:{title:"TilingSprite",permalink:"/components/TilingSprite"}},p={},s=[{value:"Props",id:"props",level:2},{value:"Style Props",id:"style-props",level:2},{value:"Additional Props",id:"additional-props",level:3},{value:"Usage",id:"usage",level:2},{value:"Example",id:"example",level:2}],c={toc:s};function d(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"text"},"Text"),(0,o.kt)("h2",{id:"props"},"Props"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://pixijs.download/dev/docs/PIXI.Text.html"},"https://pixijs.download/dev/docs/PIXI.Text.html")),(0,o.kt)("h2",{id:"style-props"},"Style Props"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://pixijs.download/dev/docs/PIXI.TextStyle.html"},"https://pixijs.download/dev/docs/PIXI.TextStyle.html")),(0,o.kt)("h3",{id:"additional-props"},"Additional Props"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Prop"),(0,o.kt)("th",{parentName:"tr",align:null},"Default Value"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"isSprite ",(0,o.kt)("inlineCode",{parentName:"td"},"boolean")),(0,o.kt)("td",{parentName:"tr",align:null},"false"),(0,o.kt)("td",{parentName:"tr",align:null},"renders the text as a textured objects and returns it as sprite (much better performances if the text doesn't change often)")))),(0,o.kt)("p",null,"Note: isSprite establishes how the Text is rendered during its whole lifecycle after it's been mounted, therefore any change to the property later on won't have effect"),(0,o.kt)("h2",{id:"usage"},"Usage"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-jsx",metastring:"live",live:!0},"<Stage width={300} height={300} options={{ backgroundColor: 0xeef1f5 }}>\n  <Text\n    text=\"Hello World\"\n    anchor={0.5}\n    x={150}\n    y={150}\n    style={\n      new PIXI.TextStyle({\n        align: 'center',\n        fontFamily: '\"Source Sans Pro\", Helvetica, sans-serif',\n        fontSize: 50,\n        fontWeight: 400,\n        fill: ['#ffffff', '#00ff99'], // gradient\n        stroke: '#01d27e',\n        strokeThickness: 5,\n        letterSpacing: 20,\n        dropShadow: true,\n        dropShadowColor: '#ccced2',\n        dropShadowBlur: 4,\n        dropShadowAngle: Math.PI / 6,\n        dropShadowDistance: 6,\n        wordWrap: true,\n        wordWrapWidth: 440,\n      })\n    }\n  />\n</Stage>\n")),(0,o.kt)("h2",{id:"example"},"Example"),(0,o.kt)("iframe",{height:600,scrolling:"no",title:"Text",src:"//codepen.io/inlet/embed/ec46cd42dc7fed3c383fc934a0dcf6b4/?height=600&theme-id=33987&default-tab=result&embed-version=2",frameBorder:"no",allowFullScreen:!0,style:{width:"100%"}}))}d.isMDXComponent=!0},3905:(e,t,n)=>{n.d(t,{Zo:()=>c,kt:()=>f});var r=n(2784);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),d=s(n),m=o,f=d["".concat(p,".").concat(m)]||d[m]||u[m]||a;return n?r.createElement(f,l(l({ref:t},c),{},{components:n})):r.createElement(f,l({ref:t},c))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=m;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i[d]="string"==typeof e?e:o,l[1]=i;for(var s=2;s<a;s++)l[s]=n[s];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);