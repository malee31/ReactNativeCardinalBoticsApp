(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{145:function(e,t,n){e.exports=n.p+"static/media/cardinalbotics_logo_white_clear.28ac1cbe.png"},20:function(e){e.exports=JSON.parse('{"urls":{"resources":"https://sheets.googleapis.com/v4/spreadsheets/1fQyQXJPiFwXKT7wJ8wmJgTolLwxxiOe2PE3xpNQR9Wc/values/Resources!A2:C?key=AIzaSyB2ynMpXWG49Fk-rS0cBZdytUH9GK96NzU","training":"https://sheets.googleapis.com/v4/spreadsheets/1fQyQXJPiFwXKT7wJ8wmJgTolLwxxiOe2PE3xpNQR9Wc/values/Training%20Links!A2:C?key=AIzaSyB2ynMpXWG49Fk-rS0cBZdytUH9GK96NzU","sheet":"https://sheets.googleapis.com/v4/spreadsheets/1po_TE36FA-I7J2Y-Biw5snWdfSm_Cx055KVi1c43G7Y/values/App%20Assembly!A1:E?key=AIzaSyB2ynMpXWG49Fk-rS0cBZdytUH9GK96NzU","calendar":"https://www.googleapis.com/calendar/v3/calendars/nicholas.do%40team4159.org/events?key=AIzaSyDRSH4Trb-AdjEdzA06J7WOFLbyhOqnq-M&timeZone=UTC&timeMin=2020-08-16T00:00:00Z&orderBy=startTime&singleEvents=True"},"serverEndpointBaseURLs":{"getData":"https://hours.team4159.org/users/getusers","getUserData":"https://hours.team4159.org/users/getuserdata","signIn":"https://hours.team4159.org/users/signin","signOut":"https://hours.team4159.org/users/signout"},"serverData":{"flagTime":43200},"colors":{"primary":"#7D1120","secondary":"#9C3131","cardinalWhite":"#FEFEFE","background":"#FFFFFF","gray":"#EDEDED","darkGray":"#B0B0B0"},"icons":{"color":"#B0B0B0","size":30}}')},206:function(e,t,n){e.exports=n.p+"static/media/favicon.f13dfa17.png"},240:function(e,t,n){"use strict";n.d(t,"a",(function(){return pe}));var a=n(2),r=n.n(a),o=n(64),s=n(245),c=n(14),i=n.n(c),l=n(10),u=n.n(l),d=n(0),g=n.n(d),m=n(159);function f(e){return u.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:if("string"===typeof e){t.next=2;break}throw new TypeError("Password must be a string");case 2:if(0!==e.length){t.next=4;break}throw new RangeError("Password cannot be blank");case 4:return t.prev=4,t.next=7,u.a.awrap(m.a.setItem("password",e));case 7:t.next=12;break;case 9:throw t.prev=9,t.t0=t.catch(4),new Error("Note: Failed to save password on your device, you will have to log in again next time");case 12:case"end":return t.stop()}}),null,null,[[4,9]],Promise)}var h=n(20);function p(e){var t,n,a,r;return u.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:return t=h.serverEndpointBaseURLs.getUserData+"?password="+encodeURIComponent(e),n={ok:!1,messages:[],data:{verified:!1,user:null}},o.prev=2,o.next=5,u.a.awrap(fetch(t));case 5:a=o.sent,o.next=11;break;case 8:o.prev=8,o.t0=o.catch(2),n.messages.push("Unable to fetch status. Are you connected to the internet?");case 11:if(!a.ok){o.next=20;break}return o.next=14,u.a.awrap(a.json());case 14:r=o.sent,n.ok=!0,n.data.verified=!0,n.data.user={name:r.name,password:e,signedIn:Boolean(r.signedIn)?Date.now():0},o.next=21;break;case 20:404===a.status?n.messages.push("Sorry, it looks like you don't exist\nOr that's the wrong password...\nBoth possibilities are equally likely"):n.messages.push("Server behaved unexpectedly and gave this error: ["+a.status+"] "+a.statusText);case 21:return o.abrupt("return",n);case 22:case"end":return o.stop()}}),null,null,[[2,8]],Promise)}function w(e,t){var n,a,r;return u.a.async((function(o){for(;;)switch(o.prev=o.next){case 0:return n=t?h.serverEndpointBaseURLs.signIn:h.serverEndpointBaseURLs.signOut,a={ok:!1,messages:[],data:null},o.prev=2,o.next=5,u.a.awrap(fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:e})}));case 5:r=o.sent,o.next=11;break;case 8:o.prev=8,o.t0=o.catch(2),a.messages.push("Unable to fetch status. Are you connected to the internet?");case 11:if(400!==r.status){o.next=20;break}return a.ok=!0,o.t1=a.messages,o.next=16,u.a.awrap(r.text());case 16:o.t2=o.sent,o.t1.push.call(o.t1,o.t2),o.next=21;break;case 20:r.ok?a.ok=!0:a.messages.push("Unable to sign "+(y?"in":"out")+": ["+r.status+"] "+r.statusText);case 21:return o.abrupt("return",a);case 22:case"end":return o.stop()}}),null,null,[[2,8]],Promise)}function y(e){return w(e,!0)}function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){r()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var E=Object(d.createContext)({updateData:function(){},data:{loaded:!1,loggedIn:!1,signedIn:0,name:"Name Unknown",password:""}});function x(e){var t=e.children,n=Object(d.useState)({loaded:!1,loggedIn:!1,signedIn:0,name:"Name Unknown",password:""}),a=i()(n,2),r=a[0],o=a[1],s={updateData:function(e){o(v(v({},r),e))},data:r};return Object(d.useEffect)((function(){u.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",m.a.getItem("password"));case 1:case"end":return e.stop()}}),null,null,null,Promise).then((function(e){var t,n;return u.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:if(t={loaded:!0},!e){a.next=6;break}return a.next=4,u.a.awrap(p(e));case 4:(n=a.sent).ok&&n.data.verified&&(t.loggedIn=!0,t.name=n.data.user.name,t.password=n.data.user.password);case 6:s.updateData(t);case 7:case"end":return a.stop()}}),null,null,null,Promise)}))}),[]),g.a.createElement(E.Provider,{value:s},t)}function O(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=Object(d.useContext)(E);return e?t.data:t}var k=n(242),I=n(18),j=n.n(I),z=n(321),S=n(237),P=n(247),M=n(204),B=n(243),D=n(37),L=n(25),T=n(1),C=n(206),F=n.n(C),H=n(45),R=n.n(H);var A={Home:function(e){return d.createElement(R.a,{viewBox:"0 0 512 512",fill:h.icons.color,width:h.icons.size,height:h.icons.size},d.createElement(H.Path,{d:"M503.402 228.885L273.684 19.567c-10.083-9.189-25.288-9.188-35.367-.001L8.598 228.886c-8.077 7.36-10.745 18.7-6.799 28.889 3.947 10.189 13.557 16.772 24.484 16.772h36.69v209.721c0 8.315 6.742 15.057 15.057 15.057h125.914c8.315 0 15.057-6.741 15.057-15.057V356.932h74.002v127.337c0 8.315 6.742 15.057 15.057 15.057h125.908c8.315 0 15.057-6.741 15.057-15.057V274.547h36.697c10.926 0 20.537-6.584 24.484-16.772 3.941-10.19 1.273-21.529-6.804-28.89zM445.092 42.73H343.973l116.176 105.636v-90.58c0-8.315-6.741-15.056-15.057-15.056z"}))},Login:function(e){return d.createElement(R.a,{viewBox:"0 -80 512 640",fill:h.icons.color,width:h.icons.size,height:h.icons.size},d.createElement(H.Path,{d:"M255.81 395.4c0-54.54 30-102.31 74.14-126.62 6.23-11.48 13.22-22.72 18.25-34.71 20.38-48.55 31.22-99 24.27-152.09-5.74-43.81-31-70.72-73.63-79C279-.93 259-.71 239.06 2.08 196.61 8 169.92 34.19 162.06 77c-4.58 24.9-3.65 49.8.16 74.64 7 45.36 20.9 88.06 47.27 125.91a10.91 10.91 0 012.19 4.63c1.33 12.31-7 28.56-18.1 33.55-12.11 5.42-24.57 10.1-37.1 14.43-33.13 11.46-66.37 22.44-97.12 40-20.19 11.55-34.4 28-43.92 49.19C6.17 440 1.83 462.2.27 484.62-.28 492.47.18 501 .18 509h309.91c-33.02-27-54.28-67.71-54.28-113.6z"}),d.createElement(H.Path,{d:"M397 277.89c-63.43 0-115 52.51-115 117.05S333.54 512 397 512s115-52.51 115-117.05-51.6-117.06-115-117.06zm46 116.43c-8.78.32-17.58.22-28.75.32.16 17.33.45 32.91.4 48.49 0 13-6.59 20.53-17.72 19.65-13.82-1.09-17.21-9.07-17.18-19 .06-15.62-.23-31.24-.39-48.77-9.46.09-18.08.4-26.68.2-12.64-.3-15.79-4.21-9-12.24 14.69-17.48 30.05-34.59 45.25-51.78 4.79-5.41 10.11-5.58 15-.15 15.75 17.28 31.65 34.49 47 52 6.31 7.25 1.67 10.96-7.93 11.28z"}))},Leaderboard:function(e){return d.createElement(R.a,{viewBox:"10 10 80 80",fill:h.icons.color,width:h.icons.size,height:h.icons.size},d.createElement(H.Path,{d:"M85.4 63.1c0 2.6-1.1 4.8-2.8 6.6 0 0 0 .1-.1.1-.3 8.6-7.3 15.5-16 15.5-4.8 0-9.1-2.1-12-5.4-7.9.7-16.8-.7-20.8-4.7-.4-.4-.7-.8-1.1-1.2-5.2-.3-10.1-1.7-12.7-4.3-1.8-1.8-2.8-4-2.8-6.6 0-5.4 1.8-11.4 4.8-16 1.5-2.3 3.2-4.1 5.1-5.5.3-.3.4-.7.5-1.1.1-.6-.1-1.3-.5-1.8-1.8-2-3-4.7-3-7.7 0-6.3 5.1-11.4 11.4-11.4 2.9 0 5.5 1.1 7.5 2.9 2.2-1.8 4.9-2.8 7.9-2.8 3.2 0 6.1 1.2 8.3 3.1 2-2 4.8-3.2 7.9-3.2 6.3 0 11.4 5.1 11.4 11.4 0 2.9-1.1 5.6-3 7.7-.4.6-.5 1.2-.5 1.8.1.4.2.8.5 1.1 1.9 1.4 3.6 3.2 5.1 5.5 3.1 4.6 4.9 10.6 4.9 16zm-3.7 1.1c.1-.3.1-.7.1-1.1 0-12.8-8.6-20.7-14.7-20.7-1.9 0-4.1.8-6.2 2.2 1.8 1.4 3.4 3.3 4.9 5.5.7 1 1.3 2 1.8 3.2 6.6.4 12.1 4.9 14.1 10.9zm-8.3-28.7c.9-1.3 1.4-2.8 1.4-4.5 0-4.3-3.5-7.8-7.8-7.8-2.2 0-4.1.9-5.5 2.3 1.2 2 1.9 4.3 1.9 6.7 0 1.8-.4 3.4-1 5 1.3 1 2.9 1.5 4.6 1.5 2.2 0 4.2-.9 5.6-2.4.3-.2.6-.5.8-.8zm-2.6 37.3c1.6-1.6 3.6-3.9 2.2-6.2-1.3-2.2-4.7-2.2-6.1-.2-1.4-2-4.8-2-6.1.2-1.4 2.4.6 4.6 2.2 6.2.9.9 3.3 3 3.9 3.4.5-.5 3-2.6 3.9-3.4zm-8.7-18.9c.4-.1.9-.2 1.3-.3-1.6-2.6-3.5-4.7-5.6-6.1-1-.8-2.1-1.4-3.2-1.8-1.3-.5-2.5-.8-3.7-.8-1 0-2.1.2-3.2.6-1.1.4-2.2.9-3.3 1.7-5.1 3.4-9.8 10.7-9.8 20.7 0 .9.2 1.7.5 2.4.3.8.8 1.4 1.4 2 .7.6 1.6 1.2 2.7 1.6 3.2 1.4 8.1 2 12.8 1.9-.9-2-1.4-4.2-1.4-6.5-.1-7.3 4.8-13.5 11.5-15.4zM59.3 32c0-4.7-3.8-8.5-8.5-8.5s-8.5 3.8-8.5 8.5 3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5zm-21 .3c0-2.7.8-5.1 2.2-7.1-1.4-1.2-3.1-1.9-5.1-1.9-4.3 0-7.8 3.5-7.8 7.8 0 1.7.5 3.2 1.5 4.5.3.3.5.6.7.9 1.4 1.5 3.4 2.4 5.6 2.4 1.5 0 2.9-.4 4-1.2-.6-1.7-1.1-3.5-1.1-5.4zM36 50.1c1.5-2.4 3.3-4.3 5.3-5.8-1.9-1.3-4-2-5.8-2-6.1 0-14.7 7.9-14.7 20.7 0 1.6.5 2.9 1.7 4 1.6 1.5 4.8 2.5 8.4 2.9-.2-.7-.2-1.4-.2-2.2-.1-5.9 1.9-12.5 5.3-17.6z"}))},Resources:function(e){return d.createElement(R.a,{width:45.057,height:45.057,viewBox:"0 0 45.057 45.057",fill:h.icons.color,width:h.icons.size,height:h.icons.size},d.createElement(H.Path,{d:"M20.776 14h12.252c1.613 0 1.613-2.5 0-2.5H20.776c-1.611 0-1.611 2.5 0 2.5zM33.028 19.417H20.776c-1.612 0-1.612 2.5 0 2.5h12.252c1.614 0 1.614-2.5 0-2.5zM33.028 26.9H20.776c-1.612 0-1.612 2.5 0 2.5h12.252c1.614 0 1.614-2.5 0-2.5zM33.028 34.816H20.776c-1.612 0-1.612 2.5 0 2.5h12.252c1.614 0 1.614-2.5 0-2.5zM16.202 10.872h-3.484c-.126 0-.229.077-.229.172v3.513c0 .094.102.171.229.171h3.484c.126 0 .229-.077.229-.171v-3.513c0-.095-.102-.172-.229-.172zM15.989 18.673h-3.484c-.126 0-.229.077-.229.172v3.513c0 .094.102.171.229.171h3.484c.126 0 .229-.077.229-.171v-3.513c0-.095-.102-.172-.229-.172zM15.989 26.261h-3.484c-.126 0-.229.077-.229.173v3.512c0 .095.102.172.229.172h3.484c.126 0 .229-.077.229-.172v-3.512c0-.095-.102-.173-.229-.173zM15.989 34.139h-3.484c-.126 0-.229.077-.229.172v3.514c0 .094.102.17.229.17h3.484c.126 0 .229-.076.229-.17v-3.514c0-.095-.102-.172-.229-.172z"}),d.createElement(H.Path,{d:"M33.431 0H5.179v45.057h34.699V6.25L33.431 0zm3.447 42.056H8.179V3h23.707v4.76h4.992v34.296z"}))},Forms:function(e){return d.createElement(R.a,{viewBox:"0 -4 55 70",fill:h.icons.color,width:h.icons.size,height:h.icons.size},d.createElement(H.Path,{d:"M60.5 28.87a1.52 1.52 0 01-.44 1.06l-8.71 8.7a1.45 1.45 0 01-1.06.44 1.47 1.47 0 01-1.06-.44 1.51 1.51 0 010-2.12l7.65-7.64-1.68-1.68L53.43 29 36.6 45.8l-5.91 1 1-5.91.43-.43 3.28 3.27a1.41 1.41 0 001.06.44 1.44 1.44 0 001.06-.44 1.51 1.51 0 000-2.12l-3.28-3.28L44.8 27.74l5.49-5.49L55.1 27l2.07-2.07 2.89 2.89a1.5 1.5 0 01.44 1.05zm-1.94-5a2 2 0 000-2.82l-2.1-2.1a2 2 0 00-2.82 0l-1.19 1.15 4.93 4.9zm-21 24.84l-8.45 1.41h-.25a1.5 1.5 0 01-1.06-.44 1.52 1.52 0 01-.42-1.31l1.41-8.46a1.58 1.58 0 01.42-.81l13-13V9a2 2 0 00-2-2H15.13v10.58a1.5 1.5 0 01-1.5 1.5H8a1.5 1.5 0 010-3h4.17V9.24L4.06 17.6A2 2 0 003.5 19v36a2 2 0 002 2h34.76a2 2 0 002-2V44.38l-3.88 3.88a1.56 1.56 0 01-.82.41z"}))}},U=n(3).a.create({drawerHeading:{width:"100%",minHeight:"20%",maxHeight:"25%",alignItems:"flex-start",justifyContent:"center"},drawerLogo:{width:"35%",height:"30%",maxHeight:"35%",borderRadius:25},drawerText:{fontSize:18,color:"#FFFFFF",textAlign:"left",marginTop:10,marginHorizontal:15},drawerTimeIn:{fontSize:16,color:"#FFFFFF",textAlign:"left",marginHorizontal:15},screen:{width:"100%",height:"100%",flex:1,paddingHorizontal:"5%",paddingVertical:"2%",backgroundColor:h.colors.background,alignItems:"center"},largeLogoImage:{width:"100%",height:"50%",alignSelf:"center"},signInButton:{alignItems:"center",justifyContent:"center",alignSelf:"center",backgroundColor:h.colors.gray,width:"70%",padding:"5%",marginVertical:"3%"},signInInput:{color:"#7D1120",width:"70%"},loginButton:{alignItems:"center",justifyContent:"center",alignSelf:"center",backgroundColor:h.colors.gray,width:"70%",padding:"2%",marginVertical:"3%"},signInText:{fontSize:30},whatchuDoing:{color:"#7D1120"},timeLogRow:{flexDirection:"column",width:"100%",backgroundColor:h.colors.gray,borderRadius:10,padding:5,marginVertical:"1%"},timeLogRowHeader:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"100%"},timeLogRowDid:{width:"100%",paddingHorizontal:"2%"},content:{backgroundColor:"white",padding:22,justifyContent:"center",alignItems:"center",borderRadius:4,borderColor:"rgba(0, 0, 0, 0.1)"},contentTitle:{fontSize:20,marginBottom:12},formButton:{width:"100%",minHeight:45,flex:1,justifyContent:"space-around",alignItems:"flex-start",paddingHorizontal:"4%",marginVertical:4},formBtn:{marginVertical:2},formText:{flex:1,width:"30%",fontSize:16,paddingHorizontal:5,justifyContent:"center",alignContent:"center"},calendarScreen:{paddingHorizontal:0},calendarView:{minHeight:"45%"},scroll:{maxHeight:"55%",padding:15},text:{padding:10,fontSize:20,width:"100%",flex:1,textAlign:"center",alignSelf:"center"},title:{textAlign:"center",alignSelf:"center",width:"100%",fontSize:30,color:h.colors.primary,marginTop:"5%"},logTime:{fontWeight:"bold"},resourceButton:{width:"100%",minHeight:40,flex:1,justifyContent:"center",alignItems:"flex-start",marginVertical:10}}),V=n(70),N=n(62),J=n(246),W=n(97);function G(e){var t,n;switch(null==(t=e.icon)?void 0:t.toLowerCase().trim()){case"googledrive":n="google-drive";break;case"roster":n="clipboard-account";break;case"calendar":n="calendar";break;case"forms":n="format-list-bulleted-square";break;case"website":n="web";break;case"photo":n="google-photos";break;case"youtube":n="youtube-tv";break;case"training":n="teach";break;case"grant":case"money":n="currency-usd";break;case"irc":case"handbook":n="book";break;default:n="cogs"}return g.a.createElement(W.a,{icon:n,mode:"contained",color:h.colors.secondary,onPress:function(){return u.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.a.awrap(J.a(e.url));case 2:case"end":return t.stop()}}),null,null,null,Promise)},key:e.title||"Resource: "+e.url+"<"+n+">",style:e.style||{}},g.a.createElement(L.a,{style:{textAlign:"left",width:"100%"}},e.title||"Resource"))}function X(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function K(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?X(Object(n),!0).forEach((function(t){r()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):X(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Q=Object(d.createContext)({toggle:function(){},showMessage:function(){},show:!1,message:"No Message"});function Z(e){var t=e.children,n=Object(d.useState)({show:!1,message:"No Message"}),a=i()(n,2),r=a[0],o=a[1],s=function(e){o(K(K({},r),e))},c=K(K({},r),{},{toggle:function(e){"boolean"!==typeof e&&(e=!r.show),e!==r.show&&s({show:e})},showMessage:function(e){s({show:!0,message:e})}});return g.a.createElement(Q.Provider,{value:c},t)}function _(){return Object(d.useContext)(Q)}function q(e){var t=e.navigation;return g.a.createElement(W.a,{icon:"menu",mode:"contained",color:h.colors.secondary,style:{position:"absolute",top:0,left:0,borderTopLeftRadius:0,borderTopRightRadius:0,borderBottomLeftRadius:0,zIndex:1},onPress:t.toggleDrawer},"Menu")}function Y(e){var t=e.navigation,n=Object(d.useState)([]),a=i()(n,2),r=a[0],o=a[1],s=_();Object(d.useEffect)((function(){fetch(h.urls.resources).then((function(e){return e.json()})).then((function(e){return o(e.values)})).catch((function(e){return s.showMessage("Unable to load resources: "+e)}))}),[]);var c=g.a.createElement(V.a,{size:"large",color:h.colors.primary});return r&&(c=g.a.createElement(N.a,{data:r,keyExtractor:function(e){return e[0]+": "+e[1]},renderItem:function(e){return e=e.item,g.a.createElement(G,{title:e[0],url:e[1],icon:e[2],style:U.resourceButton})}})),g.a.createElement(T.a,{style:U.screen},g.a.createElement(q,{navigation:t}),c)}var $=n(126),ee=n(145),te=n.n(ee),ne=n(241),ae=n(123),re=n(239);function oe(e){return e.show?g.a.createElement(re.a,{isVisible:e.show,onBackdropPress:e.dismiss},g.a.createElement(T.a,{style:U.content},g.a.createElement(L.a,{style:U.contentTitle},e.message||"Oh, the programmers forgot to leave a message here"),g.a.createElement(ae.a,{onPress:e.dismiss,title:e.buttonText||"Close"}))):null}function se(e){var t=e.navigation,n=O(!1),a=Object(d.useState)(""),r=i()(a,2),o=r[0],s=r[1],c=_();return g.a.createElement(T.a,{style:U.screen},g.a.createElement(q,{navigation:t}),g.a.createElement(D.a,{source:te.a,resizeMode:"contain",style:U.largeLogoImage}),g.a.createElement(ne.a,{label:"Login",value:o,style:U.signInInput,onChange:function(e){return s(e.nativeEvent.text)}}),g.a.createElement($.a,{onPress:function(){var e,t;return u.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:if(0!==(e=o.trim()).length){a.next=5;break}return a.abrupt("return",c.showMessage("Password cannot be empty"));case 5:if(!n.data.signedIn){a.next=7;break}return a.abrupt("return",c.showMessage("Cannot switch users while signed in"));case 7:return c.showMessage("Verifying that you exist."),a.next=10,u.a.awrap(p(e));case 10:if((t=a.sent).ok&&t.data.verified){a.next=13;break}return a.abrupt("return",c.showMessage(t.messages.join("\n")));case 13:return n.updateData({loggedIn:!0,name:t.data.user.name,password:t.data.user.password}),a.prev=14,a.next=17,u.a.awrap(f(e));case 17:c.showMessage("Success. You're now logged in as "+t.data.user.name.trim()+" using "+t.data.user.password),a.next=23;break;case 20:a.prev=20,a.t0=a.catch(14),c.showMessage("Successfully Logged In!\n"+a.t0.message);case 23:case"end":return a.stop()}}),null,null,[[14,20]],Promise)},activeOpacity:.7,underlayColor:h.colors.darkGray,style:U.loginButton},g.a.createElement(T.a,null,g.a.createElement(L.a,null,"Submit"))),g.a.createElement(oe,{show:c.show,message:c.message,dismiss:function(){c.toggle(!1)}}))}function ce(e){var t=e.navigation,n=Object(d.useState)([]),a=i()(n,2),r=a[0],o=a[1],s=_();Object(d.useEffect)((function(){fetch(h.urls.sheet).then((function(e){return e.json()})).then((function(e){return e.values})).then((function(e){for(var t=0;t<e.length;t++)0!==t&&e[t][0].trim()===e[t-1][0].trim()||(e.splice(t,0,e[t][0].trim()),t++);o(e)})).catch((function(e){return s.showMessage("Unable to load forms: "+e)}))}),[]);var c=g.a.createElement(V.a,{size:"large",color:h.colors.primary});return r&&(c=g.a.createElement(N.a,{data:r,keyExtractor:function(e){return e[1]+": "+e[2]},renderItem:function(e){if("string"==typeof(e=e.item))return g.a.createElement(T.a,{style:U.formButton},g.a.createElement(L.a,{style:U.title},e));var t=e[4].trim();return g.a.createElement(T.a,{style:U.formButton},t&&"n/a"!==t.toLowerCase()&&g.a.createElement(L.a,{style:U.formText},"Due ",e[4]),g.a.createElement(G,{style:[U.resourceButton,U.formBtn],title:e[1],url:e[2]}))}})),g.a.createElement(T.a,{style:U.screen},g.a.createElement(q,{navigation:t}),c)}function ie(e){var t=e.navigation,n=O(!1),a=Object(d.useState)(!1),r=i()(a,2),o=r[0],s=r[1],c=_(),l=o||!n.data.loaded;return g.a.createElement(T.a,{style:U.screen},g.a.createElement(q,{navigation:t}),g.a.createElement(D.a,{source:te.a,resizeMode:"contain",style:U.largeLogoImage}),g.a.createElement(W.a,{onPress:function(){var e;s(!0),n.data.signedIn?(e=n.data.password,w(e,!1)).then((function(e){e.ok?(n.updateData({signedIn:0}),c.showMessage("Successfully Signed Out")):c.showMessage(e.messages.join("\n")),s(!1)})):y(n.data.password).then((function(e){console.log(e),e.ok?n.updateData({signedIn:Date.now()}):c.showMessage(e.messages.join("\n")),s(!1)}))},mode:"contained",loading:l,disabled:l,style:{width:"70%"},contentStyle:{alignItems:"center",justifyContent:"center",alignSelf:"center",backgroundColor:h.colors.gray,minWidth:"100%",width:"100%",padding:"5%"},labelStyle:{color:l?"gray":n.data.signedIn?"red":"green",fontSize:30,fontWeight:"bold"}},l?"":n.data.signedIn?"Sign Out":"Sign In"),g.a.createElement(oe,{show:c.show,message:c.message,dismiss:function(){c.toggle(!1)}}))}function le(e){return Math.floor(e/3600)+" hour"+(1!==Math.floor(e/3600)?"s":"")+" and "+Math.floor(e%3600/60)+" minute"+(1!==Math.floor(e%3600/60)?"s":"")}function ue(e){var t=e.navigation,n=Object(d.useState)([]),a=i()(n,2),r=a[0],o=a[1],s=g.a.createElement(V.a,{size:"large",color:h.colors.primary});return Object(d.useEffect)((function(){fetch(h.serverEndpointBaseURLs.getData).then((function(e){return e.json()})).then((function(e){return e.sort((function(e,t){return e.signedIn!==t.signedIn?t.signedIn-e.signedIn:e.totalTime!==t.totalTime?t.totalTime-e.totalTime:e.username<t.username?-1:e.username>t.username?1:0}))})).catch((function(e){return console.log("Failed to update basic data. F. "+JSON.stringify(e)),[]})).then((function(e){console.log(e),o(e)}))}),[]),r&&(s=g.a.createElement(N.a,{scrollEventThrottle:16,data:r,keyExtractor:function(e){return e.id.toString()},renderItem:function(e){return e=e.item,g.a.createElement(T.a,{style:U.timeLogRow},g.a.createElement(L.a,{style:{color:e.signedIn?"green":"black",fontSize:16}},e.name,": ",le(e.totalTime),Boolean(e.signedIn)&&" + "+le(e.timeIn/1e3)))}})),g.a.createElement(T.a,{style:U.screen},g.a.createElement(q,{navigation:t}),s)}var de=Object(z.a)();function ge(e){var t=O(),n=Object(d.useState)(0),a=i()(n,2),r=a[0],o=a[1],s=function(){t.signedIn&&o(Math.floor((Date.now()-t.signedIn)/1e3))};return Object(d.useEffect)((function(){s();var e=setInterval(s,1e3);return function(){return clearInterval(e)}}),[t.signedIn]),g.a.createElement(T.a,{style:{flex:1}},g.a.createElement(B.a,{colors:["#7D1120","#A6242F","#FF4D4D"],start:[0,0],end:[1,1],style:U.drawerHeading},g.a.createElement(D.a,{source:F.a,resizeMode:"contain",style:U.drawerLogo}),g.a.createElement(T.a,null,g.a.createElement(L.a,{style:U.drawerText},t.loaded?t.loggedIn?t.name:"Not Logged In":"Loading..."),g.a.createElement(L.a,{style:U.drawerTimeIn},t.loaded?t.signedIn?function(e){var t=function(e,t){return e+" "+t+(1===e?"":"s")},n=Math.floor(e/3600),a=Math.floor(e%3600/60),r=Math.floor(e%60);return"Signed in for: \n"+t(n,"hour")+" "+t(a,"minute")+" "+t(r,"second")}(r):"No Sessions Active":"Loading..."))),g.a.createElement(S.a,j()({},e,{style:{flexGrow:1}}),g.a.createElement(P.a,e)))}var me=function(){return g.a.createElement(M.a,null,g.a.createElement(de.Navigator,{initialRouteName:"Home",backBehavior:"history",screenOptions:{},drawerContent:function(e){return g.a.createElement(ge,e)}},g.a.createElement(de.Screen,{name:"Home",component:ie,options:{drawerIcon:A.Home}}),g.a.createElement(de.Screen,{name:"Login",component:se,options:{drawerIcon:A.Login}}),g.a.createElement(de.Screen,{name:"Leaderboard",component:ue,options:{drawerIcon:A.Leaderboard,drawerLabel:"Other Members"}}),g.a.createElement(de.Screen,{name:"Resources",component:Y,options:{drawerIcon:A.Resources}}),g.a.createElement(de.Screen,{name:"Forms",component:ce,options:{drawerIcon:A.Forms}})))};function fe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function he(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?fe(Object(n),!0).forEach((function(t){r()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):fe(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function pe(){var e=he(he({},o.a),{},{roundness:2,colors:he(he({},o.a.colors),{},{primary:h.colors.primary,accent:h.colors.cardinalWhite})});return g.a.createElement(x,null,g.a.createElement(Z,null,g.a.createElement(s.a,{theme:e,style:{flex:1}},g.a.createElement(k.a,{animated:!0,hidden:!0,style:"dark"}),g.a.createElement(me,null))))}},253:function(e,t,n){e.exports=n(314)}},[[253,1,2]]]);
//# sourceMappingURL=app.b1ecf992.chunk.js.map