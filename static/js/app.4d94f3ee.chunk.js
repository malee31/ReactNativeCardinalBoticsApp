(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{21:function(e){e.exports=JSON.parse('{"urls":{"resources":"https://sheets.googleapis.com/v4/spreadsheets/1fQyQXJPiFwXKT7wJ8wmJgTolLwxxiOe2PE3xpNQR9Wc/values/Resources!A2:C?key=AIzaSyB2ynMpXWG49Fk-rS0cBZdytUH9GK96NzU","training":"https://sheets.googleapis.com/v4/spreadsheets/1fQyQXJPiFwXKT7wJ8wmJgTolLwxxiOe2PE3xpNQR9Wc/values/Training%20Links!A2:C?key=AIzaSyB2ynMpXWG49Fk-rS0cBZdytUH9GK96NzU","sheet":"https://sheets.googleapis.com/v4/spreadsheets/1po_TE36FA-I7J2Y-Biw5snWdfSm_Cx055KVi1c43G7Y/values/App%20Assembly!A1:E?key=AIzaSyB2ynMpXWG49Fk-rS0cBZdytUH9GK96NzU"},"serverEndpointBaseURLs":{"getData":"https://hours.team4159.org/users/getusers","getUserData":"https://hours.team4159.org/users/getuserdata","signIn":"https://hours.team4159.org/users/signin","signOut":"https://hours.team4159.org/users/signout"},"colors":{"primary":"#7D1120","secondary":"#9C3131","cardinalWhite":"#FEFEFE","background":"#FFFFFF","lighterGray":"#FAFAFA","lightGray":"#F0F0F0","gray":"#EDEDED","darkGray":"#B0B0B0","darkerGray":"#444444"},"icons":{"color":"#B0B0B0","size":28}}')},242:function(e,t,n){e.exports=n.p+"static/media/cardinalbotics_logo_white_clear.28ac1cbe.png"},243:function(e,t,n){e.exports=n.p+"static/media/favicon.f13dfa17.png"},268:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return Be}));var r=n(2),o=n.n(r),a=n(76),s=n(274),i=n(17),c=n.n(i),l=n(15),u=n.n(l),d=n(0),f=n(185);function g(e){return u.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:if("string"===typeof e){t.next=2;break}throw new TypeError("Password must be a string");case 2:if(0!==e.length){t.next=4;break}throw new RangeError("Password cannot be blank");case 4:return t.prev=4,t.next=7,u.a.awrap(f.default.setItem("password",e));case 7:t.next=12;break;case 9:throw t.prev=9,t.t0=t.catch(4),new Error("Note: Failed to save password on your device, you will have to log in again next time");case 12:case"end":return t.stop()}}),null,null,[[4,9]],Promise)}var h=n(21);function b(e){var t,n,r,o;return u.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return t=h.serverEndpointBaseURLs.getUserData+"?password="+encodeURIComponent(e),n={ok:!1,messages:[],data:{verified:!1,user:null}},a.prev=2,a.next=5,u.a.awrap(fetch(t));case 5:r=a.sent,a.next=11;break;case 8:a.prev=8,a.t0=a.catch(2),n.messages.push("Unable to fetch status. Are you connected to the internet?");case 11:if(!r.ok){a.next=30;break}return a.next=14,u.a.awrap(r.json());case 14:if(o=a.sent,n.ok=!0,n.data.verified=!0,a.t1=o.name,a.t2=e,o.signedIn){a.next=23;break}a.t3=0,a.next=26;break;case 23:return a.next=25,u.a.awrap(m().then((function(e){return e.find((function(e){return e.name.trim()===o.name.trim()}))})).then((function(e){return Date.now()-e.timeIn})).catch((function(){return Date.now()})));case 25:a.t3=a.sent;case 26:a.t4=a.t3,n.data.user={name:a.t1,password:a.t2,signedIn:a.t4},a.next=31;break;case 30:404===r.status?n.messages.push("Sorry, it looks like you don't exist\nOr that's the wrong password...\nBoth possibilities are equally likely"):n.messages.push("Server behaved unexpectedly and gave this error: ["+r.status+"] "+r.statusText);case 31:return a.abrupt("return",n);case 32:case"end":return a.stop()}}),null,null,[[2,8]],Promise)}function p(e,t){var n,r,o,a;return u.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return n=t?h.serverEndpointBaseURLs.signIn:h.serverEndpointBaseURLs.signOut,r={ok:!1,messages:[],data:null},s.prev=2,s.next=5,u.a.awrap(fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:e})}));case 5:o=s.sent,s.next=11;break;case 8:s.prev=8,s.t0=s.catch(2),r.messages.push("Unable to fetch status. Are you connected to the internet?");case 11:if(400!==o.status){s.next=20;break}return r.ok=!0,s.t1=r.messages,s.next=16,u.a.awrap(o.text());case 16:s.t2=s.sent,s.t1.push.call(s.t1,s.t2),s.next=29;break;case 20:if(o.ok){s.next=24;break}r.messages.push("Unable to sign "+(j?"in":"out")+": ["+o.status+"] "+o.statusText),s.next=29;break;case 24:return s.next=26,u.a.awrap(b(e));case 26:a=s.sent,r.ok=a.ok&&a.data.verified,r.ok&&(r.data=a.data.user);case 29:return s.abrupt("return",r);case 30:case"end":return s.stop()}}),null,null,[[2,8]],Promise)}function j(e){return p(e,!0)}function m(){return fetch(h.serverEndpointBaseURLs.getData).then((function(e){return e.json()})).then((function(e){return e.sort((function(e,t){return e.signedIn!==t.signedIn?t.signedIn-e.signedIn:e.totalTime!==t.totalTime?t.totalTime-e.totalTime:e.username<t.username?-1:e.username>t.username?1:0}))})).catch((function(e){return console.log("Failed to update basic data. F. "+JSON.stringify(e)),[]}))}var y=n(11);function w(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function x(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?w(Object(n),!0).forEach((function(t){o()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var O=Object(d.createContext)({updateData:function(){},userInfo:{loaded:!1,loggedIn:!1,signedIn:0,name:"",password:""}});function v(e){var t=e.children,n=Object(d.useState)({loaded:!1,loggedIn:!1,signedIn:0,name:"",password:""}),r=c()(n,2),o=r[0],a=r[1],s={updateData:function(e){a(x(x({},o),e))},userInfo:o};return Object(d.useEffect)((function(){f.default.getItem("password").then((function(e){var t,n,r,a,i;return u.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:if(t={loaded:!0},!e){c.next=15;break}return c.next=4,u.a.awrap(b(e));case 4:if(!(n=c.sent).ok||!n.data.verified){c.next=15;break}return t.loggedIn=!0,t.name=n.data.user.name,t.password=n.data.user.password,c.next=11,u.a.awrap(m());case 11:r=c.sent,a=r.find((function(e){return e.name.trim()===t.name.trim()})),i=Date.now()-a.timeIn,Boolean(a.signedIn)!==Boolean(o.signedIn)?a.signedIn?t.signedIn=i:t.signedIn=0:a.signedIn&&Math.abs(o.signedIn-i)>2e3&&(t.signedIn=i);case 15:s.updateData(t);case 16:case"end":return c.stop()}}),null,null,null,Promise)}))}),[]),Object(y.jsx)(O.Provider,{value:s,children:t})}function I(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=Object(d.useContext)(O);return e?t.userInfo:t}function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function S(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){o()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var z=Object(d.createContext)({toggle:function(){},showMessage:function(){},show:!1,message:"No Message"});function P(e){var t=e.children,n=Object(d.useState)({show:!1,message:"No Message"}),r=c()(n,2),o=r[0],a=r[1],s=function(e){a(S(S({},o),e))},i=S(S({},o),{},{toggle:function(e){if("boolean"!==typeof e&&(e=!o.show),e!==o.show){var t={show:e};e||(t.message=""),s(t)}},showMessage:function(e){s({show:!0,message:e})}});return Object(y.jsx)(z.Provider,{value:i,children:t})}function C(){return Object(d.useContext)(z)}var D=n(3),M=n(34),B=n(91),E=n(272),L=D.default.create({container:{maxWidth:"85%",minHeight:"15%",maxHeight:"50%",alignSelf:"center",backgroundColor:"white",justifyContent:"space-between",alignItems:"stretch",borderRadius:4,borderColor:"#DDDDDD"},text:{paddingVertical:10,paddingHorizontal:15,fontSize:24,textAlign:"center",flex:1}});function H(){var e=C(),t=function(){return e.toggle(!1)};return e.show?Object(y.jsxs)(E.default,{visible:e.show,animationType:"slide",onDismiss:t,contentContainerStyle:L.container,children:[Object(y.jsx)(M.default,{style:L.text,children:e.message||"Oh no! The programmers forgot to leave a message here"}),Object(y.jsx)(B.default,{mode:"contained",onPress:t,children:"Close"})]}):null}var F=n(51),R=n(7),T=n(421),A=n(415),G=n(247),U=n(248),V=n(271),W=n(83),N=n(65),J=n(165),X=D.default.create({menuButtonStyle:{position:"absolute",top:0,left:0,width:48,height:48,borderRadius:0,borderBottomRightRadius:4,zIndex:1,margin:0,padding:4}}).menuButtonStyle;function K(e){var t=e.navigation;return Object(y.jsx)(J.default,{accessibilityLabel:"Menu",icon:"menu",size:44,color:h.colors.secondary,style:X,onPress:t.toggleDrawer})}var Q=D.default.create({defaultScreenStyle:{width:"100%",height:"100%",flex:1,padding:"5%",paddingTop:48,backgroundColor:h.colors.background,alignItems:"center"}}).defaultScreenStyle;function Y(e){var t=e.navigation,n=e.children,r=e.additionalStyles,o=D.default.compose(Q,r);return Object(y.jsxs)(R.default,{style:o,children:[t&&Object(y.jsx)(K,{navigation:t}),n]})}var _=D.default.create({list:{width:"100%"},member:{flexDirection:"column",width:"100%",backgroundColor:h.colors.gray,borderRadius:10,padding:5,marginVertical:5}});function Z(e){return Math.floor(e/3600)+" hour"+(1!==Math.floor(e/3600)?"s":"")+" and "+Math.floor(e%3600/60)+" minute"+(1!==Math.floor(e%3600/60)?"s":"")}function q(e){var t=e.navigation,n=Object(d.useState)([]),r=c()(n,2),o=r[0],a=r[1],s=I(!1),i=Object(y.jsx)(W.default,{size:"large",color:h.colors.primary}),l=function(){(function(e){var t,n,r;return u.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:if(e.userInfo.password){o.next=2;break}return o.abrupt("return");case 2:return o.next=4,u.a.awrap(m());case 4:return t=o.sent,n=t.find((function(t){return t.name.trim()===e.userInfo.name.trim()})),r=Date.now()-n.timeIn,Math.abs(e.userInfo.signedIn-r)>2e3&&e.updateData({signedIn:n.signedIn?r:0}),o.abrupt("return",t);case 9:case"end":return o.stop()}}),null,null,null,Promise)})(s).then(a)};return Object(d.useEffect)((function(){l();var e=setInterval(l,3e4);return function(){return clearInterval(e)}}),[s.userInfo]),o&&(i=Object(y.jsx)(N.default,{style:_.list,scrollEventThrottle:16,data:o,keyExtractor:function(e){return e.id.toString()},renderItem:function(e){return e=e.item,Object(y.jsx)(R.default,{style:_.member,children:Object(y.jsxs)(M.default,{style:{color:e.signedIn?"green":"black",fontSize:16},children:[e.name,": ",Z(e.totalTime/1e3),Boolean(e.signedIn)&&" + "+Z(e.timeIn/1e3)]})})}})),Object(y.jsx)(Y,{navigation:t,children:i})}var $=n(275),ee={googledrive:"google-drive",roster:"clipboard-account",calendar:"calendar",forms:"format-list-bulleted-square",website:"web",photo:"google-photos",youtube:"youtube-tv",training:"teach",grant:"currency-usd",money:"currency-usd",irc:"book",handbook:"book",default:"cogs"},te=D.default.create({linkButtonStyle:{width:"100%",minHeight:40,flex:1,justifyContent:"center",alignItems:"flex-start",marginVertical:2}}).linkButtonStyle;function ne(e){var t=e.icon,n=void 0===t?"":t,r=e.title,o=e.url,a=ee[n.toLowerCase().trim()]||ee.default;return Object(y.jsx)(B.default,{icon:a,mode:"contained",color:h.colors.secondary,onPress:function(){return $.openBrowserAsync(o)},style:te,children:r||"Resource"},r||"Resource: "+o+"<"+n+">")}var re=D.default.create({listStyle:{width:"100%"}}).listStyle;function oe(e){var t=e.navigation,n=Object(d.useState)([]),r=c()(n,2),o=r[0],a=r[1],s=C();Object(d.useEffect)((function(){fetch(h.urls.resources).then((function(e){return e.json()})).then((function(e){return a(e.values)})).catch((function(e){return s.showMessage("Unable to load resources: "+e)}))}),[]);var i=Object(y.jsx)(W.default,{size:"large",color:h.colors.primary});return o&&(i=Object(y.jsx)(N.default,{style:re,data:o,keyExtractor:function(e){return e[0]+": "+e[1]},renderItem:function(e){return e=e.item,Object(y.jsx)(ne,{title:e[0],url:e[1],icon:e[2]})}})),Object(y.jsx)(Y,{navigation:t,children:i})}var ae=n(269),se=n(242),ie=n.n(se),ce=D.default.create({logoStyle:{width:"100%",height:"50%",alignSelf:"center"}}).logoStyle;function le(){return Object(y.jsx)(F.default,{resizeMode:"contain",style:ce,source:ie.a})}var ue=D.default.create({formContainer:{width:"100%",maxWidth:600,paddingHorizontal:8,alignItems:"center"},loginInputContainer:{width:"100%",borderRadius:5,overflow:"hidden"},loginInput:{width:"100%",color:"#7D1120",backgroundColor:h.colors.lighterGray},loginButton:{width:"100%",backgroundColor:h.colors.lightGray,marginVertical:5,borderRadius:5,shadowColor:h.colors.darkerGray,shadowOffsetY:4,shadowRadius:4,elevation:3},loginButtonContent:{alignItems:"center",justifyContent:"center",alignSelf:"center",padding:10},loginButtonText:{color:h.colors.darkerGray,fontSize:20,fontWeight:"bold"}});function de(e){var t=e.navigation,n=I(!1),r=Object(d.useState)(""),o=c()(r,2),a=o[0],s=o[1],i=C(),l=function(){i.showMessage("Verifying that you exist."),function(e,t){var n,r;return u.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:if(0!==(n=t.trim()).length){o.next=5;break}throw new RangeError("Password cannot be empty");case 5:if(!e.userInfo.signedIn){o.next=7;break}throw new Error("Cannot switch users while signed in");case 7:return o.next=9,u.a.awrap(b(n));case 9:if((r=o.sent).ok&&r.data.verified){o.next=12;break}throw new Error(r.messages.join("\n"));case 12:return e.updateData({loggedIn:!0,name:r.data.user.name,password:r.data.user.password,signedIn:r.data.user.signedIn}),o.prev=13,o.next=16,u.a.awrap(g(n));case 16:o.next=21;break;case 18:return o.prev=18,o.t0=o.catch(13),o.abrupt("return","Successfully Logged In!\n"+o.t0.message);case 21:return o.abrupt("return","Success. You're now logged in as "+r.data.user.name.trim()+" using "+r.data.user.password);case 22:case"end":return o.stop()}}),null,null,[[13,18]],Promise)}(n,a).then(i.showMessage).catch((function(e){return i.showMessage(e.message)}))};return Object(y.jsxs)(Y,{navigation:t,children:[Object(y.jsx)(le,{}),Object(y.jsxs)(R.default,{style:ue.formContainer,children:[Object(y.jsx)(R.default,{style:ue.loginInputContainer,children:Object(y.jsx)(ae.default,{label:"Login",value:a,style:ue.loginInput,secureTextEntry:!0,onChange:function(e){return s(e.nativeEvent.text)},onSubmitEditing:l})}),Object(y.jsx)(B.default,{onPress:l,compact:!0,mode:"contained",style:ue.loginButton,contentStyle:ue.loginButtonContent,labelStyle:ue.loginButtonText,children:"Submit"})]})]})}var fe=D.default.create({list:{width:"100%"},button:{width:"100%",minHeight:45,flex:1,justifyContent:"space-around",alignItems:"flex-start",paddingHorizontal:"4%",marginVertical:4},text:{flex:1,width:"30%",fontSize:16,paddingHorizontal:5,justifyContent:"center",alignContent:"center"},title:{width:"100%",alignSelf:"center",textAlign:"center",fontSize:30,color:h.colors.primary,marginTop:"5%"}});function ge(e){var t=e.navigation,n=Object(d.useState)([]),r=c()(n,2),o=r[0],a=r[1],s=C();Object(d.useEffect)((function(){fetch(h.urls.sheet).then((function(e){return e.json()})).then((function(e){return e.values})).then((function(e){for(var t=0;t<e.length;t++)0!==t&&e[t][0].trim()===e[t-1][0].trim()||(e.splice(t,0,e[t][0].trim()),t++);a(e)})).catch((function(e){return s.showMessage("Unable to load forms: "+e)}))}),[]);var i=Object(y.jsx)(W.default,{size:"large",color:h.colors.primary});return o&&(i=Object(y.jsx)(N.default,{style:fe.list,data:o,keyExtractor:function(e){return e[1]+": "+e[2]},renderItem:function(e){if("string"==typeof(e=e.item))return Object(y.jsx)(R.default,{style:fe.button,children:Object(y.jsx)(M.default,{style:fe.title,children:e})});var t=e[4].trim();return Object(y.jsxs)(R.default,{style:fe.button,children:[t&&"n/a"!==t.toLowerCase()&&Object(y.jsxs)(M.default,{style:fe.text,children:["Due ",e[4]]}),Object(y.jsx)(ne,{title:e[1],url:e[2]})]})}})),Object(y.jsx)(Y,{navigation:t,children:i})}function he(e){var t=e.navigation,n=C(),r=I(!1),o=r.userInfo.name.trim(),a=Object(d.useState)(!1),s=c()(a,2),i=s[0],l=s[1],u=i||!r.userInfo.loaded;Object(d.useEffect)((function(){r.userInfo.loaded&&!r.userInfo.password&&(n.showMessage("Looks like it's your first time here!\nLog in to get started!"),t.navigate("Login"))}),[r.userInfo.loaded]);return Object(y.jsxs)(Y,{navigation:t,children:[Object(y.jsx)(le,{}),Object(y.jsx)(R.default,{style:{width:"100%",marginTop:16,alignItems:"center",paddingHorizontal:8,overflow:"visible"},children:Object(y.jsx)(B.default,{onPress:function(){if(!r.userInfo.password)return n.showMessage("You have to log in first!"),void t.navigate("Login");var e;l(!0),r.userInfo.signedIn?(e=r.userInfo.password,p(e,!1)).then((function(e){e.ok?(r.updateData({signedIn:0}),n.showMessage("Successfully Signed Out")):n.showMessage(e.messages.join("\n")),l(!1)})):j(r.userInfo.password).then((function(e){e.ok?r.updateData({signedIn:e.data.signedIn}):n.showMessage(e.messages.join("\n")),l(!1)}))},compact:!0,mode:"contained",loading:u,disabled:u,style:{maxWidth:"100%",maxHeight:160,justifyContent:"center",alignItems:"center",backgroundColor:h.colors.lighterGray,borderRadius:8,borderColor:h.colors.lighterGray,shadowColor:h.colors.darkerGray,shadowOffsetY:8,shadowRadius:16,elevation:3,overflowX:"hidden"},contentStyle:{width:600,height:96,paddingHorizontal:16,paddingVertical:8,borderColor:h.colors.lighterGray},labelStyle:{color:u||!r.userInfo.loggedIn?"gray":r.userInfo.signedIn?"red":"green",fontSize:24,borderColor:h.colors.lighterGray,fontWeight:"bold",maxWidth:"100%"},children:!u&&(r.userInfo.loggedIn?"Sign "+(r.userInfo.signedIn?"Out":"In")+" as "+o:"Log in to get started!")})})]})}var be=n(53),pe=n.n(be);var je={Home:function(e){return Object(y.jsx)(pe.a,{viewBox:"0 0 512 512",fill:e.color||h.icons.color,width:h.icons.size,height:h.icons.size,children:Object(y.jsx)(be.Path,{d:"M503.402 228.885L273.684 19.567c-10.083-9.189-25.288-9.188-35.367-.001L8.598 228.886c-8.077 7.36-10.745 18.7-6.799 28.889 3.947 10.189 13.557 16.772 24.484 16.772h36.69v209.721c0 8.315 6.742 15.057 15.057 15.057h125.914c8.315 0 15.057-6.741 15.057-15.057V356.932h74.002v127.337c0 8.315 6.742 15.057 15.057 15.057h125.908c8.315 0 15.057-6.741 15.057-15.057V274.547h36.697c10.926 0 20.537-6.584 24.484-16.772 3.941-10.19 1.273-21.529-6.804-28.89zM445.092 42.73H343.973l116.176 105.636v-90.58c0-8.315-6.741-15.056-15.057-15.056z"})})},Login:function(e){return Object(y.jsxs)(pe.a,{viewBox:"0 -80 512 640",fill:e.color||h.icons.color,width:h.icons.size,height:h.icons.size,children:[Object(y.jsx)(be.Path,{d:"M255.81 395.4c0-54.54 30-102.31 74.14-126.62 6.23-11.48 13.22-22.72 18.25-34.71 20.38-48.55 31.22-99 24.27-152.09-5.74-43.81-31-70.72-73.63-79C279-.93 259-.71 239.06 2.08 196.61 8 169.92 34.19 162.06 77c-4.58 24.9-3.65 49.8.16 74.64 7 45.36 20.9 88.06 47.27 125.91a10.91 10.91 0 012.19 4.63c1.33 12.31-7 28.56-18.1 33.55-12.11 5.42-24.57 10.1-37.1 14.43-33.13 11.46-66.37 22.44-97.12 40-20.19 11.55-34.4 28-43.92 49.19C6.17 440 1.83 462.2.27 484.62-.28 492.47.18 501 .18 509h309.91c-33.02-27-54.28-67.71-54.28-113.6z"}),Object(y.jsx)(be.Path,{d:"M397 277.89c-63.43 0-115 52.51-115 117.05S333.54 512 397 512s115-52.51 115-117.05-51.6-117.06-115-117.06zm46 116.43c-8.78.32-17.58.22-28.75.32.16 17.33.45 32.91.4 48.49 0 13-6.59 20.53-17.72 19.65-13.82-1.09-17.21-9.07-17.18-19 .06-15.62-.23-31.24-.39-48.77-9.46.09-18.08.4-26.68.2-12.64-.3-15.79-4.21-9-12.24 14.69-17.48 30.05-34.59 45.25-51.78 4.79-5.41 10.11-5.58 15-.15 15.75 17.28 31.65 34.49 47 52 6.31 7.25 1.67 10.96-7.93 11.28z"})]})},Leaderboard:function(e){return Object(y.jsx)(pe.a,{viewBox:"10 10 80 80",fill:e.color||h.icons.color,width:h.icons.size,height:h.icons.size,children:Object(y.jsx)(be.Path,{d:"M85.4 63.1c0 2.6-1.1 4.8-2.8 6.6 0 0 0 .1-.1.1-.3 8.6-7.3 15.5-16 15.5-4.8 0-9.1-2.1-12-5.4-7.9.7-16.8-.7-20.8-4.7-.4-.4-.7-.8-1.1-1.2-5.2-.3-10.1-1.7-12.7-4.3-1.8-1.8-2.8-4-2.8-6.6 0-5.4 1.8-11.4 4.8-16 1.5-2.3 3.2-4.1 5.1-5.5.3-.3.4-.7.5-1.1.1-.6-.1-1.3-.5-1.8-1.8-2-3-4.7-3-7.7 0-6.3 5.1-11.4 11.4-11.4 2.9 0 5.5 1.1 7.5 2.9 2.2-1.8 4.9-2.8 7.9-2.8 3.2 0 6.1 1.2 8.3 3.1 2-2 4.8-3.2 7.9-3.2 6.3 0 11.4 5.1 11.4 11.4 0 2.9-1.1 5.6-3 7.7-.4.6-.5 1.2-.5 1.8.1.4.2.8.5 1.1 1.9 1.4 3.6 3.2 5.1 5.5 3.1 4.6 4.9 10.6 4.9 16zm-3.7 1.1c.1-.3.1-.7.1-1.1 0-12.8-8.6-20.7-14.7-20.7-1.9 0-4.1.8-6.2 2.2 1.8 1.4 3.4 3.3 4.9 5.5.7 1 1.3 2 1.8 3.2 6.6.4 12.1 4.9 14.1 10.9zm-8.3-28.7c.9-1.3 1.4-2.8 1.4-4.5 0-4.3-3.5-7.8-7.8-7.8-2.2 0-4.1.9-5.5 2.3 1.2 2 1.9 4.3 1.9 6.7 0 1.8-.4 3.4-1 5 1.3 1 2.9 1.5 4.6 1.5 2.2 0 4.2-.9 5.6-2.4.3-.2.6-.5.8-.8zm-2.6 37.3c1.6-1.6 3.6-3.9 2.2-6.2-1.3-2.2-4.7-2.2-6.1-.2-1.4-2-4.8-2-6.1.2-1.4 2.4.6 4.6 2.2 6.2.9.9 3.3 3 3.9 3.4.5-.5 3-2.6 3.9-3.4zm-8.7-18.9c.4-.1.9-.2 1.3-.3-1.6-2.6-3.5-4.7-5.6-6.1-1-.8-2.1-1.4-3.2-1.8-1.3-.5-2.5-.8-3.7-.8-1 0-2.1.2-3.2.6-1.1.4-2.2.9-3.3 1.7-5.1 3.4-9.8 10.7-9.8 20.7 0 .9.2 1.7.5 2.4.3.8.8 1.4 1.4 2 .7.6 1.6 1.2 2.7 1.6 3.2 1.4 8.1 2 12.8 1.9-.9-2-1.4-4.2-1.4-6.5-.1-7.3 4.8-13.5 11.5-15.4zM59.3 32c0-4.7-3.8-8.5-8.5-8.5s-8.5 3.8-8.5 8.5 3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5zm-21 .3c0-2.7.8-5.1 2.2-7.1-1.4-1.2-3.1-1.9-5.1-1.9-4.3 0-7.8 3.5-7.8 7.8 0 1.7.5 3.2 1.5 4.5.3.3.5.6.7.9 1.4 1.5 3.4 2.4 5.6 2.4 1.5 0 2.9-.4 4-1.2-.6-1.7-1.1-3.5-1.1-5.4zM36 50.1c1.5-2.4 3.3-4.3 5.3-5.8-1.9-1.3-4-2-5.8-2-6.1 0-14.7 7.9-14.7 20.7 0 1.6.5 2.9 1.7 4 1.6 1.5 4.8 2.5 8.4 2.9-.2-.7-.2-1.4-.2-2.2-.1-5.9 1.9-12.5 5.3-17.6z"})})},Resources:function(e){return Object(y.jsxs)(pe.a,{viewBox:"0 0 45.057 45.057",fill:e.color||h.icons.color,width:h.icons.size,height:h.icons.size,children:[Object(y.jsx)(be.Path,{d:"M20.776 14h12.252c1.613 0 1.613-2.5 0-2.5H20.776c-1.611 0-1.611 2.5 0 2.5zM33.028 19.417H20.776c-1.612 0-1.612 2.5 0 2.5h12.252c1.614 0 1.614-2.5 0-2.5zM33.028 26.9H20.776c-1.612 0-1.612 2.5 0 2.5h12.252c1.614 0 1.614-2.5 0-2.5zM33.028 34.816H20.776c-1.612 0-1.612 2.5 0 2.5h12.252c1.614 0 1.614-2.5 0-2.5zM16.202 10.872h-3.484c-.126 0-.229.077-.229.172v3.513c0 .094.102.171.229.171h3.484c.126 0 .229-.077.229-.171v-3.513c0-.095-.102-.172-.229-.172zM15.989 18.673h-3.484c-.126 0-.229.077-.229.172v3.513c0 .094.102.171.229.171h3.484c.126 0 .229-.077.229-.171v-3.513c0-.095-.102-.172-.229-.172zM15.989 26.261h-3.484c-.126 0-.229.077-.229.173v3.512c0 .095.102.172.229.172h3.484c.126 0 .229-.077.229-.172v-3.512c0-.095-.102-.173-.229-.173zM15.989 34.139h-3.484c-.126 0-.229.077-.229.172v3.514c0 .094.102.17.229.17h3.484c.126 0 .229-.076.229-.17v-3.514c0-.095-.102-.172-.229-.172z"}),Object(y.jsx)(be.Path,{d:"M33.431 0H5.179v45.057h34.699V6.25L33.431 0zm3.447 42.056H8.179V3h23.707v4.76h4.992v34.296z"})]})},Forms:function(e){return Object(y.jsx)(pe.a,{viewBox:"0 -4 55 70",fill:e.color||h.icons.color,width:h.icons.size,height:h.icons.size,children:Object(y.jsx)(be.Path,{d:"M60.5 28.87a1.52 1.52 0 01-.44 1.06l-8.71 8.7a1.45 1.45 0 01-1.06.44 1.47 1.47 0 01-1.06-.44 1.51 1.51 0 010-2.12l7.65-7.64-1.68-1.68L53.43 29 36.6 45.8l-5.91 1 1-5.91.43-.43 3.28 3.27a1.41 1.41 0 001.06.44 1.44 1.44 0 001.06-.44 1.51 1.51 0 000-2.12l-3.28-3.28L44.8 27.74l5.49-5.49L55.1 27l2.07-2.07 2.89 2.89a1.5 1.5 0 01.44 1.05zm-1.94-5a2 2 0 000-2.82l-2.1-2.1a2 2 0 00-2.82 0l-1.19 1.15 4.93 4.9zm-21 24.84l-8.45 1.41h-.25a1.5 1.5 0 01-1.06-.44 1.52 1.52 0 01-.42-1.31l1.41-8.46a1.58 1.58 0 01.42-.81l13-13V9a2 2 0 00-2-2H15.13v10.58a1.5 1.5 0 01-1.5 1.5H8a1.5 1.5 0 010-3h4.17V9.24L4.06 17.6A2 2 0 003.5 19v36a2 2 0 002 2h34.76a2 2 0 002-2V44.38l-3.88 3.88a1.56 1.56 0 01-.82.41z"})})}},me=n(243),ye=n.n(me);function we(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function xe(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?we(Object(n),!0).forEach((function(t){o()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):we(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Oe=D.default.create({header:{width:"100%",minHeight:"10%",paddingHorizontal:"2%",paddingVertical:"5%",flexDirection:"row",alignItems:"center",justifyContent:"flex-start",backgroundColor:"red"},logo:{width:"20%",height:"100%",borderRadius:5},textContainer:{width:"80%"},text:{fontSize:18,color:h.colors.cardinalWhite,textAlign:"left",marginHorizontal:15},timeIn:{fontSize:16,color:h.colors.cardinalWhite,textAlign:"left",marginHorizontal:15}}),ve=Object(A.default)();function Ie(e){var t=function(e,t){return e+" "+t+(1===e?"":"s")},n=Math.floor(e/3600),r=Math.floor(e%3600/60),o=Math.floor(e%60);return"Signed in for: \n"+t(n,"hour")+" "+t(r,"minute")+" "+t(o,"second")}function ke(){var e=I(),t=Object(d.useState)(0),n=c()(t,2),r=n[0],o=n[1],a=function(){e.signedIn&&o(Math.floor((Date.now()-e.signedIn)/1e3))};return Object(d.useEffect)((function(){a();var e=setInterval(a,1e3);return function(){return clearInterval(e)}}),[e.signedIn]),Object(y.jsxs)(V.LinearGradient,{colors:["#7D1120","#A6242F","#FF4D4D"],start:[0,0],end:[1,1],style:Oe.header,children:[Object(y.jsx)(F.default,{source:ye.a,resizeMode:"contain",style:Oe.logo}),Object(y.jsxs)(R.default,{style:Oe.textContainer,children:[Object(y.jsx)(M.default,{style:Oe.text,children:e.loaded?e.loggedIn?e.name:"Not Logged In":"Loading..."}),Object(y.jsx)(M.default,{style:Oe.timeIn,children:e.loaded?e.signedIn?Ie(r):"No Sessions Active":"Loading..."})]})]})}function Se(e){return Object(y.jsxs)(R.default,{style:{flex:1},children:[Object(y.jsx)(ke,{}),Object(y.jsx)(G.default,xe(xe({},e),{},{style:{flexGrow:1},children:Object(y.jsx)(U.default,xe({},e))}))]})}var ze=function(){return Object(y.jsx)(T.default,{children:Object(y.jsxs)(ve.Navigator,{initialRouteName:"Home",backBehavior:"history",screenOptions:{headerShown:!1,drawerActiveTintColor:h.colors.primary,drawerActiveBackgroundColor:h.colors.gray,drawerInactiveTintColor:h.colors.darkerGray,drawerInactiveBackgroundColor:h.colors.background},drawerContent:function(e){return Object(y.jsx)(Se,xe({},e))},children:[Object(y.jsx)(ve.Screen,{name:"Home",component:he,options:{drawerIcon:je.Home}}),Object(y.jsx)(ve.Screen,{name:"Login",component:de,options:{drawerIcon:je.Login}}),Object(y.jsx)(ve.Screen,{name:"Leaderboard",component:q,options:{drawerIcon:je.Leaderboard,drawerLabel:"Other Members"}}),Object(y.jsx)(ve.Screen,{name:"Resources",component:oe,options:{drawerIcon:je.Resources}}),Object(y.jsx)(ve.Screen,{name:"Forms",component:ge,options:{drawerIcon:je.Forms}})]})})},Pe=n(270),Ce=n(114);function De(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Me(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?De(Object(n),!0).forEach((function(t){o()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):De(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Be(){var e=Me(Me({},a.default),{},{roundness:2,colors:Me(Me({},a.default.colors),{},{primary:h.colors.primary,accent:h.colors.cardinalWhite})});return Object(y.jsx)(v,{children:Object(y.jsx)(P,{children:Object(y.jsx)(s.default,{theme:e,style:{flex:1},children:Object(y.jsxs)(Ce.GestureHandlerRootView,{style:{flex:1},children:[Object(y.jsx)(Pe.StatusBar,{animated:!0,hidden:!0,style:"dark"}),Object(y.jsx)(ze,{}),Object(y.jsx)(H,{})]})})})})}},281:function(e,t,n){e.exports=n(405)}},[[281,1,2]]]);
//# sourceMappingURL=app.4d94f3ee.chunk.js.map