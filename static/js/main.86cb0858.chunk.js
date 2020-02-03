(this.webpackJsonppanes=this.webpackJsonppanes||[]).push([[0],{118:function(e,t,n){e.exports=n(200)},123:function(e,t,n){},135:function(e,t,n){},187:function(e,t,n){},200:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(23),o=n.n(i),l=(n(123),n(2)),c=n(1),s=n(6),u=n(18);function d(e,t,n,r){this.stability=null!=e?Math.abs(e):8,this.sensitivity=null!=t?1+Math.abs(t):100,this.tolerance=null!=n?1+Math.abs(n):1.1,this.delay=null!=r?r:150,this.lastUpDeltas=function(){var e,t,n;for(n=[],e=1,t=2*this.stability;1<=t?e<=t:e>=t;1<=t?e++:e--)n.push(null);return n}.call(this),this.lastDownDeltas=function(){var e,t,n;for(n=[],e=1,t=2*this.stability;1<=t?e<=t:e>=t;1<=t?e++:e--)n.push(null);return n}.call(this),this.deltasTimestamp=function(){var e,t,n;for(n=[],e=1,t=2*this.stability;1<=t?e<=t:e>=t;1<=t?e++:e--)n.push(null);return n}.call(this)}d.prototype.check=function(e){var t;return null!=(e=e.originalEvent||e).wheelDelta?t=e.wheelDelta:null!=e.deltaY?t=-40*e.deltaY:null==e.detail&&0!==e.detail||(t=-40*e.detail),this.deltasTimestamp.push(Date.now()),this.deltasTimestamp.shift(),t>0?(this.lastUpDeltas.push(t),this.lastUpDeltas.shift(),this.isInertia(1)):(this.lastDownDeltas.push(t),this.lastDownDeltas.shift(),this.isInertia(-1))},d.prototype.isInertia=function(e){var t,n,r,a,i,o,l;return null===(t=-1===e?this.lastDownDeltas:this.lastUpDeltas)[0]?e:!(this.deltasTimestamp[2*this.stability-2]+this.delay>Date.now()&&t[0]===t[2*this.stability-1])&&(r=t.slice(0,this.stability),n=t.slice(this.stability,2*this.stability),l=r.reduce((function(e,t){return e+t})),i=n.reduce((function(e,t){return e+t})),o=l/r.length,a=i/n.length,Math.abs(o)<Math.abs(a*this.tolerance)&&this.sensitivity<Math.abs(a)&&e)},d.prototype.showLastUpDeltas=function(){return this.lastUpDeltas},d.prototype.showLastDownDeltas=function(){return this.lastDownDeltas};var m=d,h=n(24),f=n.n(h),g=function(){try{var e=Object.defineProperty({},"passive",{get:function(){}});window.addEventListener("test",null,e)}catch(t){return console.error(t),!1}return!0}();function y(e,t,n){var a=e.orientation,i="y"===a?window.innerHeight:window.innerWidth,o="y"===a?"height":"width",l=function(){var e="y"===a?t.current.previousSize[0]:t.current.previousSize[1],r=i-e;t.current.previousSize=[window.innerHeight,window.innerWidth];var l="translate".concat(a,"(-").concat((i-r)*(t.current.curPage-1),"px)");n({transition:"transform 0s"}),n(Object(s.a)({transform:l},o,"".concat(i,"px"))),t.current.resetLinearTranslate()};return Object(r.useEffect)((function(){return window.addEventListener("resize",l,!1),document.addEventListener("resize",l,!1),l(),function(){window.removeEventListener("resize",l,!1),document.removeEventListener("resize",l,!1)}})),l}function v(e){return function(t){Object.keys(t).forEach((function(n){e.current&&(e.current.style[n]=t[n])}))}}function p(e,t,n,a){var i={reqAnim:null,touchStartPos:0,touchMoveDelta:0},o=e.orientation,l=e.swipeSensitivity,c=function(e){return"y"===o?window.innerHeight:window.innerWidth},s=function(n,r){var a=!e.touchEnabled,i=t.current.isAnimating,o="start"===n?t.current.isInSwipe:!t.current.isInSwipe,l=e.parentStatus.current.isAnimating;return a||i||o||l},u=function(e){var n=-c()*(t.current.curPage-1),r="translate".concat(o,"(").concat(n,"px)");e&&(t.current.isAnimating=!0),a({transform:r}),Object(h.forceCheck)()},d=function e(){var n=-(c()*(t.current.curPage-1)-i.touchMoveDelta),r="translate".concat(o,"(").concat(n,"px)");a({transform:r}),i.reqAnim=requestAnimationFrame(e)},m=function(n){s("start")?u():(t.current.isInSwipe=!0,i.reqAnim=requestAnimationFrame(d),i.touchStartPos="y"===e.orientation?n.touches[0].clientY:n.touches[0].clientX)},f=function(t){if(s("move"))u();else{var n=("y"===e.orientation?t.changedTouches[0].clientY:t.changedTouches[0].clientX)-i.touchStartPos;i.touchMoveDelta=n}},y=function(r){cancelAnimationFrame(i.reqAnim),i.touchMoveDelta=0,t.current.isInSwipe=!1;var a=("y"===e.orientation?r.changedTouches[0].clientY:r.changedTouches[0].clientX)-i.touchStartPos;if(e.parentStatus.current.isAnimating)return console.log(r.changedTouches),void u();!function(r){if(Math.abs(r)>l){var a=(1-Math.abs(r)/c())*e.transDuration;if(r<0)if(t.current.curPage<t.current.maxPage){n((function(e){return e+1}),t,B.TOUCH,a)}else u();else if(t.current.curPage>1){n((function(e){return e-1}),t,B.TOUCH,a)}else u()}else u();t.current.childStatus.forEach((function(e){return e.current.resetLinearTranslate()}))}(a)};return Object(r.useEffect)((function(){return document.addEventListener("touchstart",m,!!g&&{passive:!0}),document.addEventListener("touchmove",f,!!g&&{passive:!0}),document.addEventListener("touchend",y,!!g&&{passive:!0}),function(){document.removeEventListener("touchstart",m,!!g&&{passive:!0}),document.removeEventListener("touchmove",f,!!g&&{passive:!0}),document.removeEventListener("touchend",y,!!g&&{passive:!0})}})),u}var x=function(e,t,n){return function(r,a,i,o,l){var c=e.parentStatus.current,s=a.current,u=r(s.curPage),d=function(){return 1===u},m=function(){return u===s.maxPage},h=function(){return u>1&&u<s.maxPage},f=function(){return u<1||u>s.maxPage},g=function(){return u<s.curPage},y=function(){return u>s.curPage},v=function(){return 0===e.layoutIndex},p=function(){return e.layoutIndex>0};(function(t){var n=e.layoutIndex===c.curPage,r=c.isAnimating;return p()&&(!n||r)})()||(f()&&(c.allowPrev=!0,c.allowNext=!0),d()&&(c.allowPrev=!0,c.allowNext=!1),h()&&(c.allowPrev=!1),m()&&(c.allowNext=!0,c.allowPrev=!1),v()&&(function(e){var t=!s.allowNext,n=y()&&t,r=s.childSliderIndices.includes(s.curPage),a=s.childStatus.map((function(e){return e.current.isAnimating})).includes(!0);return(r||a)&&n&&i===B.WHEEL}()||function(e){var t=!s.allowPrev,n=g()&&t,r=s.childSliderIndices.includes(s.curPage),a=s.childStatus.map((function(e){return e.current.isAnimating})).includes(!0);return(r||a)&&n&&i===B.WHEEL}())||f()||(e.onBeforeScroll(a,e.layoutIndex),s.curPage=u,s.isAnimating=!0,c.isAnimating=!0,t(o,l),n({transform:"translate".concat(e.orientation,"(-").concat(100*(s.curPage-1)).concat("y"===e.orientation?"vh":"vw"," )")}),s.updateNavDots(s.curPage)))}},b=n(98),w=n(99),E=n(112),S=n(100),O=n(116);function j(){var e=Object(l.a)(["\n    visibility: ",";\n    animation: "," 2s linear;\n    transition: visibility 2s ease-in;\n"]);return j=function(){return e},e}function P(){var e=Object(l.a)(["\n    from {\n        opacity: 1;\n    }\n\n    to {\n        opacity: 0;\n    }\n"]);return P=function(){return e},e}function k(){var e=Object(l.a)(["\n    from {\n        opacity: 0;\n    }\n\n    to {\n        opacity: 1;\n    }\n"]);return k=function(){return e},e}a.a.Component;var T=Object(c.b)(k()),D=Object(c.b)(P()),I=c.a.div(j(),(function(e){return e.out?"hidden":"visible"}),(function(e){return e.out?D:T}));n(135);function C(){var e=Object(l.a)(["\n        display: flex;\n        width: 100%;\n        height: 100%;\n    "]);return C=function(){return e},e}var z=function(){var e=c.a.div(C());return a.a.createElement(e,null,a.a.createElement("div",{className:"cls-spinner"},a.a.createElement("div",{className:"cls-circle cls-spin"})))};function A(){var e=Object(l.a)(["\n    display: block;\n    height: 100vh;\n    width: 100vw;\n    overflow: hidden;\n"]);return A=function(){return e},e}function L(){var e=Object(l.a)(["\n  position: relative;\n  width: 100%;\n  height: 100%;\n"]);return L=function(){return e},e}var N,M=c.a.section(L()),R=Object(c.a)(M)(A()),H=function(e){var t=e.children,n=e.className,i=e.style,o=function(){return a.a.createElement(R,{className:e.className,style:e.style},e.children)},l=function(){return a.a.createElement(R,{className:n,style:Object(u.a)({},i)},a.a.createElement(f.a,{unmountIfInvisible:!0,resize:!0,overflow:!0,placeholder:a.a.createElement(M,null,a.a.createElement(z,null)),offset:-1,once:e.once},a.a.createElement(I,null,t)))},c=Object(r.useMemo)((function(){return e.lazy?l:o}));return a.a.createElement(c,null)};function W(){var e=Object(l.a)(["\n  background: ",";\n  border: "," solid ",";\n  border-radius: 50%;\n  width: 0.06em;\n  height: 0.06em;\n  margin: ",';\n  transition: all 0.2s ease-out;\n  &:hover {\n    /*\n     *   "!important" *MUST* be set otherwise the styleApplicator/setStyles\n     *    function will set inline styles that override these hover styles.\n     */\n    border: 0.04em solid '," !important;\n    margin: 0.05em !important;\n  }\n"]);return W=function(){return e},e}H.defaultProps={lazy:!1,once:!1},document.ontouchmove=function(e){e.preventDefault()};var B={WHEEL:"wheel",TOUCH:"touch",BUTTON:"button"};function U(e){var t=Object(r.useRef)(null),n=v(t),i=Object(r.useRef)({isAnimating:!1,isInSwipe:!1,curPage:e.initialPage,maxPage:e.children.length,childSliderIndices:e.children.reduce((function(e,t,n){return t.type===F?e.concat([n+1]):e}),[]),allowNext:!0,allowPrev:!0,styleSetter:n,previousSize:[window.innerHeight,window.innerWidth],resize:function(){},resetLinearTranslate:function(){},childStatus:[],containerEl:t,updateNavDots:function(){}});var o=x(e,(function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:e.transDuration,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.easing;n({transition:"transform ".concat(t,"s ").concat(r)})}),n);function l(){n({transition:"transform 0s"}),i.current.isAnimating=!1,e.parentStatus.current.isAnimating=!1,e.onAfterScroll(i,e.layoutIndex),Object(h.forceCheck)()}i.current.resetLinearTranslate=p(e,i,o,n),i.current.resize=y(e,i,n),function(e,t,n){var a=new m,i=(new Date).getTime(),o=[];function l(r){if(r.stopPropagation(),!!a.check(r)&&e.wheelEnabled&&!t.current.isAnimating){var l=(new Date).getTime(),c=l-i,s=-r.wheelDelta||r.deltaY||r.detail;c>200&&(o=[]),i=l,o=o.slice(-30).concat([s]);n((function(e){return(t=o).reduce((function(e,t){return e+t}),0)/t.length>0?e+1:e-1;var t}),t,B.WHEEL)}}Object(r.useEffect)((function(){return window.addEventListener("wheel",l,!!g&&{passive:!0}),function(){window.removeEventListener("wheel",l,!!g&&{passive:!0})}}))}(e,i,o),function(e,t,n){var a=e.buttonIds,i=function(e){if(!t.current.isAnimating){var r;try{r=e.target.attributes.to.value}catch(e){console.error(e)}"next"===r&&n((function(e){return e+1}),t,B.BUTTON),"prev"===r&&n((function(e){return e-1}),t,B.BUTTON),isNaN(parseInt(r))||n((function(e){return parseInt(r)}),t,B.BUTTON)}};Object(r.useEffect)((function(){return a.map((function(e){try{document.getElementById(e).addEventListener("click",i)}catch(t){console.error(e,t)}})),function(){try{a.map((function(e){document.getElementById(e.id).removeEventListener("click",i)}))}catch(e){console.error(e)}}}))}(e,i,o),e.parentStatus.current.childStatus.push(i);var c=i,s=a.a.Children.toArray(e.children).map((function(e,t){return e.type!==F&&"SubSlider"!==e.props.className?e:a.a.cloneElement(e,{parentStatus:c,layoutIndex:t+1,status:i})}));return a.a.createElement((function(){return Object(r.useMemo)((function(){var n=s.map((function(t,n){var r={position:"absolute",top:"0px",transform:"translatex(".concat(100*n,"vw)")};return"y"===e.orientation?t:a.a.cloneElement(t,{style:Object(u.a)({},t.props.style,{},r)})}));return a.a.createElement("div",null,a.a.createElement("div",{onTransitionEnd:l,ref:t,style:Object(u.a)({width:"100%",height:"100%",position:"fixed"},e.style)},n),a.a.createElement(Y,{layoutIndex:e.layoutIndex,initialPage:e.initialPage,status:i,shouldDisplay:e.showNavDots,color:e.navDotColor,pos:e.navDotPos}))}))}),null)}function F(e){var t=e.buttons;return a.a.createElement(H,{style:Object(u.a)({},e.style)},t?a.a.createElement(t,{show:e.showButtons}):null,a.a.createElement(U,e,e.children))}U.defaultProps=(N={showNavDots:!0,navDotColor:"#fff",navDotPos:"right",initialPage:1,buttonIds:[],layoutIndex:0,parentStatus:{current:{curPage:0,childSliderIndices:[0],allowPrev:!1,allowNext:!1,isInSwipe:!1,isAnimating:!1,resize:function(){},childStatus:[],containerEl:{current:{focus:function(){}}}}},children:[],easing:"ease-out"},Object(s.a)(N,"initialPage",1),Object(s.a)(N,"touchEnabled",!0),Object(s.a)(N,"wheelEnabled",!0),Object(s.a)(N,"onAfterScroll",(function(){})),Object(s.a)(N,"onBeforeScroll",(function(){})),Object(s.a)(N,"swipeSensitivity",100),Object(s.a)(N,"transDuration",1),Object(s.a)(N,"orientation","y"),N);var Y=function(e){var t=e.layoutIndex,n=e.initialPage,r=e.orientation,i=e.status,o=e.pos,l=e.shouldDisplay,c=void 0===l||l,s=e.color,u=void 0===s?"#fff":s;if(!c)return null;var d=Array(i.current.maxPage).fill().map((function(e){return a.a.createRef()})),m=d.map((function(e){return v(e)})),h=i.current.curPage;return i.current.updateNavDots=function(e){m[h-1]({border:"0em solid ".concat(u)}),m[e-1]({border:"0.04em solid ".concat(u)}),h=e},a.a.createElement(X,{orientation:r,pos:o},Array(i.current.maxPage).fill().map((function(e,r){return a.a.createElement(q,{ref:d[r],key:"dot-".concat(t,"-").concat(r),active:n===r+1,color:u})})))},_=c.a.div(W(),(function(e){return e.color}),(function(e){return e.active?"0.04em":"0em"}),(function(e){return e.color}),(function(e){return e.active?"0.05em":"0.09em"}),(function(e){return e.color})),q=a.a.forwardRef((function(e,t){var n=e.active,r=e.color;return a.a.createElement(_,{ref:t,active:n,color:r})})),X=function(e){var t=e.children,n=e.pos,r="right"===n||"left"==n?"y":"x",i=Object(s.a)({flexDirection:"".concat("y"===r?"column":"row"),height:"".concat("y"===r?"auto":"0.14em"),width:"".concat("x"===r?"auto":"0.14em"),right:"".concat("right"===n?"1%":"auto"),left:"".concat("left"===n?"1%":"x"===r?"50%":"auto"),bottom:"".concat("bottom"===n?"1%":"auto"),top:"".concat("top"===n?"1%":"y"===r?"50%":"auto"),transform:"".concat("x"===r?"translateX(-50%)":"auto")},"transform","".concat("y"===r?"translateY(-50%)":"auto")),o=Object(u.a)({},{position:"absolute",zIndex:"99999999999",fontSize:"5em",display:"flex",alignContent:"center",alignItems:"center"},{},i);return a.a.createElement("div",{style:o},t)};function $(){var e=Object(l.a)(["\n    /* IMPORTANT! disable touch-actions and pointer-events on all button components that to not contain the 'to' prop */\n    touch-action: none;\n    pointer-events: none;\n    transform: scalex(0.5);\n"]);return $=function(){return e},e}function J(){var e=Object(l.a)(["\n    /* desired positioning on page */\n    left: 93vw;\n    right: 0;\n"]);return J=function(){return e},e}function V(){var e=Object(l.a)(["\n    /* desired positioning on page */\n    right: 94vw;\n    left: 0;\n"]);return V=function(){return e},e}function G(){var e=Object(l.a)(["\n    font-size: 10em;\n    font-family: Courier, monospace;\n    top: 50%;\n    transform: translatey(-50%);\n    color: rgba(255,255,255,1);\n    font-weight: 200;\n    position: absolute;\n    z-index: 101;\n    display: flex;\n    text-align: center;\n    align-items: center;\n    align-content: center;\n    justify-content: center;\n    transition: font-size 0.3s ease-out;\n    /* hover effects etc. */\n    &:hover {\n        color: rgba(255,255,255,1.0);\n        font-weight: 400;\n        font-size: 11em;\n    }\n    &:active {\n        font-size: 13em;\n    }\n"]);return G=function(){return e},e}function K(){var e=Object(l.a)(["\n    /* large numbers indicating page number */\n    width: 100%;\n    text-align: center;\n    font-size: 10em;\n    font-weight: 600;\n    color: white;\n    position: absolute;\n    top: 50%;\n    transform: translatey(-50%);\n"]);return K=function(){return e},e}c.a.div(K());var Q=c.a.div(G());Object(c.a)(Q)(V()),Object(c.a)(Q)(J()),c.a.div($());var Z=n(51),ee=n.n(Z),te=n(52),ne=n.n(te),re=n(35),ae=n.n(re),ie=n(115),oe=(n(186),n(187),n(205)),le=n(111),ce=n(203),se=n(204);function ue(){var e=Object(l.a)(["\n        position: absolute;\n        bottom: 0;\n        width: 10%;\n        height: 1px;\n        background-color: rgba(0,0,0,50.1);\n\n    "]);return ue=function(){return e},e}function de(){var e=Object(l.a)(["\n        position: relative;\n        width: 100%;\n        height: 100%\n    "]);return de=function(){return e},e}function me(){var e=Object(l.a)(["\n    position: relative;\n    padding: 2% 4% 8% 4%;\n    width: 96%%;\n"]);return me=function(){return e},e}function he(){var e=Object(l.a)(["\n    display: ",";\n    overflow-x: hidden;\n    height: 100vh;\n    align-items: center;\n    justify-content: flex-start;\n\n"]);return he=function(){return e},e}function fe(){var e=Object(l.a)(["\n    display: flex;\n    flex-direction: column;\n    ","\n"]);return fe=function(){return e},e}function ge(){var e=Object(l.a)(["\n    background: rgba(0,0,0,0.1)\n"]);return ge=function(){return e},e}function ye(){var e=Object(l.a)(["\n        position: relative;\n        display: inline-block;\n        width: 100%;\n        max-height: 28em;\n    "]);return ye=function(){return e},e}function ve(){var e=Object(l.a)(["\n        overflow: hidden;\n        width: 100%;\n        height: 3em;\n        display: inline-block;\n        background: rgba(0,0,0,0.2);\n        margin-top: 0.1em;\n    "]);return ve=function(){return e},e}function pe(){var e=Object(l.a)(["\n        width: 10%;\n        display: flex;\n        background: rgba(255,255,255,0.1);\n        flex-direction: column;\n    "]);return pe=function(){return e},e}function xe(){var e=Object(l.a)(["\n        display: flex;\n        width: 100%;\n        height: 100%;\n        flex-direction: row;\n    "]);return xe=function(){return e},e}function be(){var e=Object(l.a)(["\n        display: flex;\n        border: 1px solid #333;\n        border-radius: 7px;\n        background: rgb(36, 36, 46); !important;\n        width: 100%;\n        max-height: 30em;\n        overflow: hidden;\n        flex-direction: column;\n    "]);return be=function(){return e},e}function we(){var e=Object(l.a)(["\n        width: 0.5em;\n        height: 0.5em;\n        border: 0px solid rgba(0,0,0,0);\n        border-radius: 50%;\n        margin-right: 0.5em;\n    "]);return we=function(){return e},e}function Ee(){var e=Object(l.a)(["\n        position: relative;\n        display: flex;\n        width: 100%;\n        height: 2em;\n        background: #fff;\n        flex-direction: row;\n        align-items: center;\n        align-content: end;\n        justify-content: flex-end;\n    "]);return Ee=function(){return e},e}function Se(){var e=Object(l.a)(["\n    background: none !important;\n    font-size: 0.9em;\n    text-shadow: #000;\n"]);return Se=function(){return e},e}oe.a.registerLanguage("jsx",le.a);var Oe=ce.a,je=se.a,Pe=Object(c.a)(oe.a)(Se()),ke=function(e){var t=e.children,n=c.a.div(Ee()),r=c.a.div(we()),i=c.a.div(be()),o=c.a.div(xe()),l=c.a.div(pe()),s=c.a.div(ve()),u=Object(c.a)((function(e){return a.a.createElement(ie.a,Object.assign({},e,{forceVisible:"y",autoHide:!1}),a.a.createElement(Le,null,e.children))}))(ye());return a.a.createElement(i,null,a.a.createElement(n,null,a.a.createElement(r,{style:{background:"#4d4"}}),a.a.createElement(r,{style:{background:"#fe5"}}),a.a.createElement(r,{style:{background:"#f34"}})),a.a.createElement(o,null,a.a.createElement(l,null,Array().fill().map((function(e){return a.a.createElement(s,{key:"".concat(Math.floor(1e10*Math.random()))})}))),a.a.createElement(u,null,a.a.createElement(Pe,{language:"javascript",style:Oe},t))))},Te=c.a.code(ge()),De=function(e){var t=e.children;return a.a.createElement("div",{style:{background:"rgba(0,0,0,0.0)",border:"1px solid rgba(0,0,0,0.7)",borderRadius:"7px",padding:"0.7em 1em",margin:"0.5em 0"}},a.a.createElement(Pe,{language:"javascript",style:je},t))},Ie=c.a.div(fe(),(function(e){switch(e.color){case"mid":return"\n                        background: #fbc1bc;\n                    ";case"light":return"\n                        background: #ffaada;\n                    ";case"dark":return"\n                        background: #fff;\n                    "}})),Ce=c.a.div(he(),(function(e){return e.flex?"flex":"block"})),ze=c.a.div(me()),Ae=function(e){var t=e.children,n=e.flex,r="boxContainer".concat(Math.floor(1e3*Math.random())).concat((new Date).getTime());return a.a.createElement(Ce,{id:r,flex:n},a.a.createElement(ze,{id:"content_".concat(r)},t))},Le=function(e){var t=e.children,n="boxContainer".concat(Math.floor(1e3*Math.random())).concat((new Date).getTime()),i=c.a.div(de());c.a.div(ue());return Object(r.useEffect)((function(){var e=function(e){e.stopPropagation()};try{document.getElementById(n).addEventListener("wheel",e),document.getElementById(n).addEventListener("touchstart",e),document.getElementById(n).addEventListener("touchmove",e),document.getElementById(n).addEventListener("touchend",e)}catch(t){console.error(t)}return function(){try{document.getElementById(n).removeEventListener("wheel",e),document.getElementById(n).removeEventListener("touchstart",e),document.getElementById(n).removeEventListener("touchmove",e),document.getElementById(n).removeEventListener("touchend",e)}catch(t){}}})),a.a.createElement(i,{id:"".concat(n)},t)},Ne=n(3),Me=Object(Ne.WidthProvider)(Ne.Responsive);function Re(){var e={autoResize:!0,breakpoints:{xl:1280,lg:1080,md:800,sm:768,xs:700},cols:{xl:7,lg:7,md:7,sm:1,xs:1},containerPadding:{xl:[0,0],lg:[0,0],md:[0,0],sm:[0,0],xs:[0,0]},margin:{xl:[0,0],lg:[0,0],md:[0,0],sm:[0,0],xs:[0,0]},verticalCompact:!0,compactType:"vertical",rowHeight:1600,className:"layout",layouts:{xl:[{i:"left",x:0,y:0,w:4,h:1,static:!0},{i:"center",x:4,y:0,w:3,h:1,static:!0},{i:"right",x:4,y:0,w:0,h:0,static:!0}],lg:[{i:"left",x:0,y:0,w:4,h:1,static:!0},{i:"center",x:4,y:0,w:3,h:1,static:!0},{i:"right",x:4,y:0,w:0,h:0,static:!0}],md:[{i:"left",x:0,y:0,w:4,h:1,static:!0},{i:"center",x:4,y:0,w:3,h:1,static:!0},{i:"right",x:99,y:0,w:0,h:0,static:!0}],sm:[{i:"left",x:0,y:0,w:1,h:1,static:!0},{i:"center",x:2,y:0,w:2,h:1,static:!0},{i:"right",x:99,y:0,w:0,h:0,static:!0}],xs:[{i:"left",x:0,y:0,w:1,h:1,static:!0},{i:"center",x:2,y:0,w:2,h:1,static:!0},{i:"right",x:99,y:0,w:0,h:0,static:!0}]}};return a.a.createElement(a.a.Fragment,null,a.a.createElement(Me,Object.assign({},e,{style:{minHeight:"100vh",minWidth:"100vw",overflow:"hidden"}}),a.a.createElement(Ie,{key:"center",color:"dark"},a.a.createElement(Ae,{flex:!0},a.a.createElement("strong",null,"Very Important:"),a.a.createElement("br",null),a.a.createElement(Te,null,"Slide")," components should be the ",a.a.createElement("em",null,a.a.createElement("strong",null,"only")," immediate")," children of ",a.a.createElement(Te,null,"Slider")," components. ",a.a.createElement("br",null),a.a.createElement("br",null),a.a.createElement(Te,null,"Slide")," components should ",a.a.createElement("em",null,a.a.createElement("strong",null,"always")," be the immediate")," children of either ",a.a.createElement(Te,null,"Slider")," or ",a.a.createElement(Te,null,"SubSlider")," components.")),a.a.createElement(Ie,{key:"left",color:"light",align:"start",alignSelf:"center"},a.a.createElement(Ae,null,a.a.createElement("h1",null,"react-fullslide"),a.a.createElement("h4",null,"Minimal Example"),a.a.createElement(ke,null,"\nexport default function App (props) {\n    return (\n        <Slider>\n\n            <Slide> 1 </Slide>\n\n            <Slide> 2 </Slide>\n\n            <Slide> 3 </Slide>\n\n        </Slider>\n    );\n}\n    "))),a.a.createElement(Ie,{key:"right",color:"mid"})))}var He=Object(Ne.WidthProvider)(Ne.Responsive);function We(){var e={autoResize:!0,breakpoints:{xl:1280,lg:1080,md:800,sm:768,xs:700},cols:{xl:7,lg:7,md:7,sm:1,xs:1},containerPadding:{xl:[0,0],lg:[0,0],md:[0,0],sm:[0,0],xs:[0,0]},margin:{xl:[0,0],lg:[0,0],md:[0,0],sm:[0,0],xs:[0,0]},verticalCompact:!0,compactType:"vertical",rowHeight:1600,className:"layout",layouts:{xl:[{i:"left",x:0,y:0,w:4,h:1,static:!0},{i:"center",x:4,y:0,w:3,h:1,static:!0},{i:"right",x:4,y:0,w:0,h:0,static:!0}],lg:[{i:"left",x:0,y:0,w:4,h:1,static:!0},{i:"center",x:4,y:0,w:3,h:1,static:!0},{i:"right",x:4,y:0,w:0,h:0,static:!0}],md:[{i:"left",x:0,y:0,w:4,h:1,static:!0},{i:"center",x:4,y:0,w:3,h:1,static:!0},{i:"right",x:99,y:0,w:0,h:0,static:!0}],sm:[{i:"left",x:0,y:0,w:1,h:1,static:!0},{i:"center",x:2,y:0,w:2,h:1,static:!0},{i:"right",x:99,y:0,w:0,h:0,static:!0}],xs:[{i:"left",x:0,y:0,w:1,h:1,static:!0},{i:"center",x:2,y:0,w:2,h:1,static:!0},{i:"right",x:99,y:0,w:0,h:0,static:!0}]}};return a.a.createElement(a.a.Fragment,null,a.a.createElement(He,Object.assign({},e,{style:{minHeight:"100vh",minWidth:"100vw",overflow:"hidden"}}),a.a.createElement(Ie,{key:"center",color:"dark"},a.a.createElement(Ae,{flex:!0},a.a.createElement("strong",null,"Take-away:"),a.a.createElement("br",null),a.a.createElement(Te,null,"Slide"),a.a.createElement("strong",null," and "),a.a.createElement(Te,null,"SubSlider")," components should be the ",a.a.createElement("em",null,a.a.createElement("strong",null,"only")," immediate")," children of ",a.a.createElement(Te,null,"Slider")," components. ",a.a.createElement("br",null),a.a.createElement("br",null),"A maximum (1-indexed) nesting depth of 2 is supported. That means a single ancestor, with any number of second-generation children. In other words, the parent ",a.a.createElement(Te,null,"Slider")," can have mulitple ",a.a.createElement("em",null,"direct")," ",a.a.createElement(Te,null,"SubSlider")," children. ",a.a.createElement("br",null),a.a.createElement("br",null),"Why? Because this component exists on a real 2-dimensional plane. Each additional layer of nesting requires either (a) an additional dimension of motion or (b) a different imlementation. ",a.a.createElement("br",null),a.a.createElement("br",null),"Methods for adding additional scroll dimensions will be included in future releases.")),a.a.createElement(Ie,{key:"left",color:"light"},a.a.createElement(Ae,null,a.a.createElement("h4",null,"Minimal Example - Nested Sliders"),a.a.createElement(ke,null,"\nexport default function NestedSliderApp (props) {\n    return (\n        <Slider>\n\n            <Slide> 1 </Slide>\n\n            <Slide key={'slide-2'}>\n            /* key props are optional unless generating slides from an array */\n                2\n            </Slide>\n\n            <SubSlider key={'slide-3'}>\n                {\n                    childSlides.map((Feature, i) => (\n                        <Slide key={`slide-3-${i+1}`}>\n                        /* slides are 1-indexed internally */\n                            {`3.${i+1}`}\n                        </Slide>\n                    ))\n                }\n            </SubSlider>\n\n        </Slider>\n    );\n}\n    "))),a.a.createElement(Ie,{key:"right",color:"mid"})))}var Be=Object(Ne.WidthProvider)(Ne.Responsive);function Ue(){var e={autoResize:!0,breakpoints:{xl:1280,lg:1080,md:800,sm:768,xs:700},cols:{xl:7,lg:7,md:7,sm:1,xs:1},containerPadding:{xl:[0,0],lg:[0,0],md:[0,0],sm:[0,0],xs:[0,0]},margin:{xl:[0,0],lg:[0,0],md:[0,0],sm:[0,0],xs:[0,0]},verticalCompact:!0,compactType:"vertical",rowHeight:1600,className:"layout",layouts:{xl:[{i:"left",x:0,y:0,w:4,h:1,static:!0},{i:"center",x:4,y:0,w:3,h:1,static:!0},{i:"right",x:4,y:0,w:0,h:0,static:!0}],lg:[{i:"left",x:0,y:0,w:4,h:1,static:!0},{i:"center",x:4,y:0,w:3,h:1,static:!0},{i:"right",x:4,y:0,w:0,h:0,static:!0}],md:[{i:"left",x:0,y:0,w:4,h:1,static:!0},{i:"center",x:4,y:0,w:3,h:1,static:!0},{i:"right",x:99,y:0,w:0,h:0,static:!0}],sm:[{i:"left",x:0,y:0,w:1,h:1,static:!0},{i:"center",x:2,y:0,w:2,h:1,static:!0},{i:"right",x:99,y:0,w:0,h:0,static:!0}],xs:[{i:"left",x:0,y:0,w:1,h:1,static:!0},{i:"center",x:2,y:0,w:2,h:1,static:!0},{i:"right",x:99,y:0,w:0,h:0,static:!0}]}};return a.a.createElement(a.a.Fragment,null,a.a.createElement(Be,Object.assign({},e,{style:{minHeight:"100vh",minWidth:"100vw",overflow:"hidden"}}),a.a.createElement(Ie,{key:"center",color:"dark"},a.a.createElement(Ae,{flex:!0},"Your ",a.a.createElement("em",null,"slide content")," component(s) (direct child of ",a.a.createElement(Te,null,"Slide"),") could be a ",a.a.createElement(Te,null,"React.Fragment"),".",a.a.createElement(De,null,"export const SlideContent = (props) => (\n    <React.Fragment>\n        {/*\n          * Your slide content goes here.\n          */}\n    </React.Fragment>\n);\n"))),a.a.createElement(Ie,{key:"left",color:"light"},a.a.createElement(Ae,null,a.a.createElement("h4",null,"Importing and Loading Slide Content"),a.a.createElement(ke,null,"import {\n    // these are all React.Fragments containing slide content\n    SlideContent_1,\n    SlideContent_2,\n    array_of_slideContent\n} from './mySlides'\n\nexport default function SliderApp (props) {\n    return (\n        <Slider>\n\n            <Slide>\n                <SlideContent_1 />\n            </Slide>\n\n            <Slide>\n                <SlideContent_2 />\n            </Slide>\n\n            <SubSlider key={'slide-3'}>\n                {\n                    array_of_slideContent.map((SlideContent, i) => (\n                        <Slide key={`slide-3-${i}`}>\n                            <SlideContent />\n                        </Slide>\n                    ))\n                }\n            </SubSlider>\n\n        </Slider>\n    );\n}\n"))),a.a.createElement(Ie,{key:"right",color:"mid"})))}var Fe=Object(Ne.WidthProvider)(Ne.Responsive);function Ye(){var e={autoResize:!0,breakpoints:{xl:1280,lg:1080,md:800,sm:768,xs:700},cols:{xl:7,lg:7,md:7,sm:1,xs:1},containerPadding:{xl:[0,0],lg:[0,0],md:[0,0],sm:[0,0],xs:[0,0]},margin:{xl:[0,0],lg:[0,0],md:[0,0],sm:[0,0],xs:[0,0]},verticalCompact:!0,compactType:"vertical",rowHeight:1600,className:"layout",layouts:{xl:[{i:"left",x:0,y:0,w:4,h:1,static:!0},{i:"center",x:4,y:0,w:3,h:1,static:!0},{i:"right",x:4,y:0,w:0,h:0,static:!0}],lg:[{i:"left",x:0,y:0,w:4,h:1,static:!0},{i:"center",x:4,y:0,w:3,h:1,static:!0},{i:"right",x:4,y:0,w:0,h:0,static:!0}],md:[{i:"left",x:0,y:0,w:4,h:1,static:!0},{i:"center",x:4,y:0,w:3,h:1,static:!0},{i:"right",x:99,y:0,w:0,h:0,static:!0}],sm:[{i:"left",x:0,y:0,w:1,h:1,static:!0},{i:"center",x:2,y:0,w:2,h:1,static:!0},{i:"right",x:99,y:0,w:0,h:0,static:!0}],xs:[{i:"left",x:0,y:0,w:1,h:1,static:!0},{i:"center",x:2,y:0,w:2,h:1,static:!0},{i:"right",x:99,y:0,w:0,h:0,static:!0}]}};return a.a.createElement(a.a.Fragment,null,a.a.createElement(Fe,Object.assign({},e,{style:{minHeight:"100vh",minWidth:"100vw",overflow:"hidden"}}),a.a.createElement(Ie,{key:"center",color:"dark"},a.a.createElement(Ae,{flex:!0},"Both ",a.a.createElement(Te,null,"Slider")," and ",a.a.createElement(Te,null,"SubSlider")," can take any of these props.")),a.a.createElement(Ie,{key:"left",color:"light"},a.a.createElement(Ae,null,a.a.createElement("h4",null,a.a.createElement(Te,null,"Slider")," defaultProps and propTypes"),a.a.createElement(ke,null,"\n----------------------------------------------------------------------\n------  prop  ----  default value  -------  type  ----------  comments\n----------------------------------------------------------------------\n     showNavDots:      [true,         PropTypes.bool  ],\n     navDotColor:      ['#fff',       PropTypes.string],\n     navDotPos:        ['primary',    PropTypes.string], //or 'secondary'\n     initialPage:      [1,            PropTypes.number],\n     buttonIds:        [[],           PropTypes.array ],\n     easing:           ['ease-out',   PropTypes.string],\n     initialPage:      [1,            PropTypes.number], // 1-based indexing\n     touchEnabled:     [true,         PropTypes.bool  ],\n     wheelEnabled:     [true,         PropTypes.bool  ],\n     onAfterScroll:    [function(){}, PropTypes.func  ],\n     onBeforeScroll:   [function(){}, PropTypes.func  ],\n     swipeSensitivity: [100,          PropTypes.number],\n     transDuration:    [1,            PropTypes.number], // seconds\n     orientation:      ['y' (or 'x'), PropTypes.string],\n\n"))),a.a.createElement(Ie,{key:"right",color:"mid"})))}var _e=Object(Ne.WidthProvider)(Ne.Responsive);function qe(){var e={autoResize:!0,breakpoints:{xl:1280,lg:1080,md:800,sm:768,xs:700},cols:{xl:7,lg:7,md:7,sm:1,xs:1},containerPadding:{xl:[0,0],lg:[0,0],md:[0,0],sm:[0,0],xs:[0,0]},margin:{xl:[0,0],lg:[0,0],md:[0,0],sm:[0,0],xs:[0,0]},verticalCompact:!0,compactType:"vertical",rowHeight:1600,className:"layout",layouts:{xl:[{i:"left",x:0,y:0,w:4,h:1,static:!0},{i:"center",x:4,y:0,w:3,h:1,static:!0},{i:"right",x:4,y:0,w:0,h:0,static:!0}],lg:[{i:"left",x:0,y:0,w:4,h:1,static:!0},{i:"center",x:4,y:0,w:3,h:1,static:!0},{i:"right",x:4,y:0,w:0,h:0,static:!0}],md:[{i:"left",x:0,y:0,w:4,h:1,static:!0},{i:"center",x:4,y:0,w:3,h:1,static:!0},{i:"right",x:99,y:0,w:0,h:0,static:!0}],sm:[{i:"left",x:0,y:0,w:1,h:1,static:!0},{i:"center",x:2,y:0,w:2,h:1,static:!0},{i:"right",x:99,y:0,w:0,h:0,static:!0}],xs:[{i:"left",x:0,y:0,w:1,h:1,static:!0},{i:"center",x:2,y:0,w:2,h:1,static:!0},{i:"right",x:99,y:0,w:0,h:0,static:!0}]}};return a.a.createElement(a.a.Fragment,null,a.a.createElement(_e,Object.assign({},e,{style:{minHeight:"100vh",minWidth:"100vw",overflow:"hidden"}}),a.a.createElement(Ie,{key:"center",color:"dark"},a.a.createElement(Ae,{flex:!0},"If lazyloading slides have ",a.a.createElement(Te,null,"once={false}"),", they will be unmounted every time they are invisible.")),a.a.createElement(Ie,{key:"left",color:"light"},a.a.createElement(Ae,null,a.a.createElement("h4",null,a.a.createElement(Te,null,"Slide")," defaultProps and propTypes"),a.a.createElement(ke,null,"\n----------------------------------------------------------------------\n------  prop  ----  default value  -------  type  ----------  comments\n----------------------------------------------------------------------\n     lazy:      [true,               PropTypes.bool  ],\n     once:      [true,               PropTypes.bool  ],  // lazyloaded only once?\n\n"))),a.a.createElement(Ie,{key:"right",color:"mid"})))}var Xe=Object(Ne.WidthProvider)(Ne.Responsive);function $e(){var e={autoResize:!0,breakpoints:{xl:1280,lg:1080,md:800,sm:768,xs:700},cols:{xl:7,lg:7,md:7,sm:1,xs:1},containerPadding:{xl:[56,0],lg:[0,0],md:[0,0],sm:[0,0],xs:[0,0]},margin:{xl:[0,0],lg:[0,0],md:[0,0],sm:[0,0],xs:[0,0]},verticalCompact:!0,compactType:"vertical",rowHeight:1600,className:"layout",layouts:{xl:[{i:"left",x:0,y:0,w:2.5,h:1,static:!0},{i:"center",x:2.5,y:0,w:4.5,h:1,static:!0},{i:"right",x:4,y:0,w:0,h:0,static:!0}],lg:[{i:"left",x:0,y:0,w:2.5,h:1,static:!0},{i:"center",x:2.5,y:0,w:4.5,h:1,static:!0},{i:"right",x:4,y:0,w:0,h:0,static:!0}],md:[{i:"left",x:0,y:0,w:2.5,h:1,static:!0},{i:"center",x:2.5,y:0,w:4.5,h:1,static:!0},{i:"right",x:99,y:0,w:0,h:0,static:!0}],sm:[{i:"left",x:0,y:0,w:1,h:1,static:!0},{i:"center",x:2,y:0,w:2,h:1,static:!0},{i:"right",x:99,y:0,w:0,h:0,static:!0}],xs:[{i:"left",x:0,y:0,w:1,h:1,static:!0},{i:"center",x:2,y:0,w:2,h:1,static:!0},{i:"right",x:99,y:0,w:0,h:0,static:!0}]}};return a.a.createElement(a.a.Fragment,null,a.a.createElement(Xe,Object.assign({},e,{style:{minHeight:"100vh",minWidth:"100vw",overflow:"hidden"}}),a.a.createElement("div",{key:"left",style:{position:"absolute",top:"0",height:"100vh"}},a.a.createElement(ae.a,{style:{display:"inline-block",position:"absolute",marginTop:"25%",height:"50vh"},src:ne.a})),a.a.createElement("div",{key:"center",style:{position:"absolute",top:"0",height:"100vh"}},a.a.createElement(ae.a,{src:ee.a,style:{display:"block",height:"50vh",marginTop:"15%"}}),a.a.createElement("div",{style:{display:"block",color:"#fff",fontSize:"2em",width:"100%",textAlign:"center"}},"SWIPE OR SCROLL TO CONTINUE"))))}function Je(){var e=Object(l.a)(["\n    /* IMPORTANT! disable touch-actions and pointer-events on all button components that to not contain the 'to' prop */\n    touch-action: none;\n    pointer-events: none;\n    transform: scalex(0.5);\n"]);return Je=function(){return e},e}function Ve(){var e=Object(l.a)(["\n    /* desired positioning on page */\n    left: 93vw;\n    right: 0;\n"]);return Ve=function(){return e},e}function Ge(){var e=Object(l.a)(["\n    /* desired positioning on page */\n    right: 94vw;\n    left: 0;\n"]);return Ge=function(){return e},e}function Ke(){var e=Object(l.a)(["\n    font-size: 10em;\n    font-family: Courier, monospace;\n    top: 50%;\n    transform: translatey(-50%);\n    color: rgba(255,255,255,1);\n    font-weight: 200;\n    position: absolute;\n    z-index: 101;\n    display: flex;\n    text-align: center;\n    align-items: center;\n    align-content: center;\n    justify-content: center;\n    transition: font-size 0.3s ease-out;\n    /* hover effects etc. */\n    &:hover {\n        color: rgba(255,255,255,1.0);\n        font-weight: 400;\n        font-size: 11em;\n    }\n    &:active {\n        font-size: 13em;\n    }\n"]);return Ke=function(){return e},e}function Qe(){var e=Object(l.a)(["\n    /* large numbers indicating page number */\n    display: flex;\n    align-content: center;\n    justify-content: center;\n    align-items: center;\n    text-align: center;\n    font-size: 2em;\n    line-height: 0.8em;\n    font-weight: 800;\n    color: rgb(25, 144, 184);\n    position: absolute;\n    border: 4px solid rgb(25, 144, 184);\n    border-radius: 50%;\n    top: 1vh;\n    right: 1vw;\n    width: 1.6em;\n    height: 1.6em;\n    z-index: 99999999;\n    /*transform: translatey(-50%) translatex(-50%);*/\n"]);return Qe=function(){return e},e}function Ze(){return a.a.createElement(U,{orientation:"x",transDuration:.5,initialPage:1,navDotColor:"rgb(25, 144, 184)",navDotPos:"top"},a.a.createElement(H,{style:{backgroundColor:"#ffaada"}},a.a.createElement($e,null)),a.a.createElement(H,{style:{backgroundColor:"rgba(255,255,255,1)"}},a.a.createElement(Re,null),a.a.createElement(et,null,"1")),a.a.createElement(H,{style:{backgroundColor:"rgba(255,255,255,1)"}},a.a.createElement(We,null),a.a.createElement(et,null,"2")),a.a.createElement(H,{style:{backgroundColor:"rgba(0,0,0,0.0)"}},a.a.createElement(et,null,"3"),a.a.createElement(Ue,null)),a.a.createElement(F,{style:{backgroundColor:"rgba(255,255,255,1)"},initialPage:1,transDuration:.8,navDotColor:"rgb(25, 144, 184)"},a.a.createElement(H,{style:{backgroundColor:"rgba(0,0,0,0.0)"}},a.a.createElement(Ye,null),a.a.createElement(et,null,"4.1")),a.a.createElement(H,{style:{backgroundColor:"rgba(0,0,0,0.1)"}},a.a.createElement(qe,null),a.a.createElement(et,null,"4.2"))))}var et=c.a.div(Qe()),tt=c.a.div(Ke());Object(c.a)(tt)(Ge()),Object(c.a)(tt)(Ve()),c.a.div(Je());Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(a.a.createElement((function(){return a.a.createElement(Ze,null)}),null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},51:function(e,t,n){e.exports=n.p+"static/media/gametext.4d230c28.svg"},52:function(e,t,n){e.exports=n.p+"static/media/hamburger.37d9f9d7.svg"}},[[118,151,152]]]);
//# sourceMappingURL=main.86cb0858.chunk.js.map