(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{22:function(e){e.exports=JSON.parse('{"urls":{"resources":"https://sheets.googleapis.com/v4/spreadsheets/1fQyQXJPiFwXKT7wJ8wmJgTolLwxxiOe2PE3xpNQR9Wc/values/Resources!A2:C?key=AIzaSyB2ynMpXWG49Fk-rS0cBZdytUH9GK96NzU","training":"https://sheets.googleapis.com/v4/spreadsheets/1fQyQXJPiFwXKT7wJ8wmJgTolLwxxiOe2PE3xpNQR9Wc/values/Training%20Links!A2:C?key=AIzaSyB2ynMpXWG49Fk-rS0cBZdytUH9GK96NzU","sheet":"https://sheets.googleapis.com/v4/spreadsheets/1po_TE36FA-I7J2Y-Biw5snWdfSm_Cx055KVi1c43G7Y/values/App%20Assembly!A1:E?key=AIzaSyB2ynMpXWG49Fk-rS0cBZdytUH9GK96NzU"},"serverEndpointBaseURLs":{"getData":"https://hours.team4159.org/users/getusers","getUserData":"https://hours.team4159.org/users/getuserdata","signIn":"https://hours.team4159.org/users/signin","signOut":"https://hours.team4159.org/users/signout"},"colors":{"primary":"#7D1120","secondary":"#9C3131","cardinalWhite":"#FEFEFE","background":"#FFFFFF","lighterGray":"#FAFAFA","semiLighterGray":"#F9F9F9","lightGray":"#F0F0F0","gray":"#EDEDED","darkGray":"#B0B0B0","darkerGray":"#444444"},"icons":{"color":"#B0B0B0","size":28}}')},319:function(e,t,n){e.exports=n.p+"static/media/cardinalbotics_logo_red_transparent.28ac1cbe.png"},320:function(e,t,n){e.exports=n.p+"static/media/favicon.d9409a15.png"},356:function(e,t,n){e.exports=n(485)},485:function(e,t,n){"use strict";n.r(t);n(242);var r=n(128),o=n(12),i=n(282),a=n(504),s=n(5),c=n.n(s),l=(n(153),n(0)),d=n.n(l),u=n(36),f=n(342),g=n(341),h=n(26),p=n.n(h),b=n(9),j=n.n(b),m=n(241);function y(e){return O.apply(this,arguments)}function O(){return(O=p()((function*(e){if("string"!==typeof e)throw new TypeError("Password must be a string");if(0===e.length)throw new RangeError("Password cannot be blank");try{yield m.default.setItem("password",e)}catch(t){throw new Error("Note: Failed to save password on your device, you will have to log in again next time")}}))).apply(this,arguments)}var w=n(22);function v(e){return x.apply(this,arguments)}function x(){return(x=p()((function*(e){var t,n=w.serverEndpointBaseURLs.getUserData+"?password="+encodeURIComponent(e),r={ok:!1,messages:[],data:{verified:!1,user:null}};try{t=yield fetch(n)}catch(i){r.messages.push("Unable to fetch status. Are you connected to the internet?")}if(t.ok){var o=yield t.json();r.ok=!0,r.data.verified=!0,r.data.user={name:o.name,password:e,signedIn:o.signedIn?yield C().then((function(e){return e.find((function(e){return e.name.trim()===o.name.trim()}))})).then((function(e){return Date.now()-e.timeIn})).catch((function(){return Date.now()})):0}}else 404===t.status?r.messages.push("Sorry, it looks like you don't exist\nOr that's the wrong password...\nBoth possibilities are equally likely"):r.messages.push("Server behaved unexpectedly and gave this error: ["+t.status+"] "+t.statusText);return r}))).apply(this,arguments)}function I(e,t){return S.apply(this,arguments)}function S(){return(S=p()((function*(e,t){var n,r=t?w.serverEndpointBaseURLs.signIn:w.serverEndpointBaseURLs.signOut,o={ok:!1,messages:[],data:null};try{n=yield fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:e})})}catch(a){o.messages.push("Unable to fetch status. Are you connected to the internet?")}if(400===n.status)o.ok=!0,o.messages.push(yield n.text());else if(n.ok){var i=yield v(e);o.ok=i.ok&&i.data.verified,o.ok&&(o.data=i.data.user)}else o.messages.push("Unable to sign "+(k?"in":"out")+": ["+n.status+"] "+n.statusText);return o}))).apply(this,arguments)}function k(e){return I(e,!0)}function C(){return fetch(w.serverEndpointBaseURLs.getData).then((function(e){return e.json()})).then((function(e){return e.sort((function(e,t){return e.signedIn!==t.signedIn?t.signedIn-e.signedIn:e.totalTime!==t.totalTime?t.totalTime-e.totalTime:e.username<t.username?-1:e.username>t.username?1:0}))})).catch((function(e){return console.log("Failed to update basic data. F. "+JSON.stringify(e)),[]}))}var z=n(14);function P(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function D(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?P(Object(n),!0).forEach((function(t){c()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):P(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var B=Object(l.createContext)({updateData:function(){},userInfo:{loaded:!1,loggedIn:!1,signedIn:0,name:"",password:""}});function M(e){var t=e.children,n=Object(l.useState)({loaded:!1,loggedIn:!1,signedIn:0,name:"",password:""}),r=j()(n,2),o=r[0],i=r[1],a={updateData:function(e){i(D(D({},o),e))},userInfo:o};return Object(l.useEffect)((function(){m.default.getItem("password").then(function(){var e=p()((function*(e){var t={loaded:!0};if(e){var n=yield v(e);if(n.ok&&n.data.verified){t.loggedIn=!0,t.name=n.data.user.name,t.password=n.data.user.password;var r=(yield C()).find((function(e){return e.name.trim()===t.name.trim()})),i=Date.now()-r.timeIn;Boolean(r.signedIn)!==Boolean(o.signedIn)?r.signedIn?t.signedIn=i:t.signedIn=0:r.signedIn&&Math.abs(o.signedIn-i)>2e3&&(t.signedIn=i)}}a.updateData(t)}));return function(t){return e.apply(this,arguments)}}())}),[]),Object(z.jsx)(B.Provider,{value:a,children:t})}function E(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=Object(l.useContext)(B);return e?t.userInfo:t}function L(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function R(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?L(Object(n),!0).forEach((function(t){c()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):L(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var H=Object(l.createContext)({toggle:function(){},showMessage:function(){},show:!1,message:"No Message"});function F(e){var t=e.children,n=Object(l.useState)({show:!1,message:"No Message"}),r=j()(n,2),o=r[0],i=r[1],a=function(e){i(R(R({},o),e))},s=R(R({},o),{},{toggle:function(e){if("boolean"!==typeof e&&(e=!o.show),e!==o.show){var t={show:e};e||(t.message=""),a(t)}},showMessage:function(e){a({show:!0,message:e})}});return Object(z.jsx)(H.Provider,{value:s,children:t})}function T(){return Object(l.useContext)(H)}var A=n(78),G=n(8),W=n(39),N=n(11),U=n(119),V=n(343),J=G.default.create({container:{width:"90%",maxWidth:600,height:172,maxHeight:"50%",padding:0,alignSelf:"center",justifyContent:"space-between",alignItems:"stretch",backgroundColor:"white",borderRadius:4},scrollContainer:{marginBottom:8,justifyContent:"center",flex:1},textContainer:{paddingHorizontal:16,paddingVertical:12,flexGrow:0},text:{textAlign:"center",fontSize:24}});function X(){var e=T(),t=function(){return e.toggle(!1)};return e.show?Object(z.jsxs)(V.default,{visible:e.show,animationType:"slide",onDismiss:t,contentContainerStyle:J.container,children:[Object(z.jsx)(N.default,{style:J.scrollContainer,children:Object(z.jsx)(A.default,{style:J.textContainer,contentContainerStyle:J.textContainerContent,bounces:!1,pinchGestureEnabled:!1,children:Object(z.jsx)(W.default,{style:J.text,children:e.message||"Oh no! The programmers forgot to leave a message here"})})}),Object(z.jsx)(U.default,{mode:"contained",onPress:t,style:{justifySelf:"flex-end"},children:"Close"})]}):null}var K=n(64),Q=n(503),Y=n(497),_=n(323),q=n(324),Z=n(344),$=n(115),ee=n(80),te=n(189),ne=n(214),re=G.default.create({menuButtonStyle:{position:"absolute",top:0,left:0,width:48,height:48,borderRadius:0,borderBottomRightRadius:4,zIndex:1,margin:0,padding:4}}).menuButtonStyle;function oe(e){var t=e.navigation;return Object(z.jsx)(ne.default,{accessibilityLabel:"Menu",icon:"menu",size:44,color:w.colors.secondary,style:re,onPress:t.toggleDrawer})}function ie(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ae(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ie(Object(n),!0).forEach((function(t){c()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ie(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var se=G.default.create({defaultScreenStyle:{width:"100%",height:"100%",flex:1,padding:"5%",paddingTop:48,backgroundColor:w.colors.background,alignItems:"center"}}).defaultScreenStyle;function ce(e){var t=e.navigation,n=e.children,r=e.additionalStyles,i=G.default.compose(se,r),a=d.a.useRef(te.default.create({onMoveShouldSetPanResponder:function(){return!0},onPanResponderTerminationRequest:function(){return!0},onShouldBlockNativeResponder:function(){return!0},onPanResponderRelease:function(e,n){Math.abs(n.dx)<Math.abs(n.dy)||n.dx>20&&n.vx>.1&&t.openDrawer()}})).current;return Object(z.jsxs)(N.default,ae(ae({style:i},"web"===o.default.OS?a.panHandlers:{}),{},{children:[t&&Object(z.jsx)(oe,{navigation:t}),n]}))}var le=G.default.create({member:{flexDirection:"column",width:"100%",minHeight:48,backgroundColor:w.colors.gray,borderRadius:4,marginVertical:4,overflow:"hidden"},indicator:{position:"absolute",backgroundColor:w.colors.darkGray,top:0,left:0,width:8,height:"100%"},entryContent:{paddingHorizontal:8,paddingVertical:8,paddingLeft:16},memberName:{fontSize:18}});function de(e){return Math.floor(e/3600)+" hour"+(1!==Math.floor(e/3600)?"s":"")+" and "+Math.floor(e%3600/60)+" minute"+(1!==Math.floor(e%3600/60)?"s":"")}function ue(e){var t=e.entry;return Object(z.jsxs)(N.default,{style:le.member,children:[Object(z.jsx)(N.default,{style:G.default.compose(le.indicator,{backgroundColor:t.signedIn?"green":w.colors.darkGray})}),Object(z.jsxs)(N.default,{style:le.entryContent,children:[Object(z.jsx)(W.default,{style:G.default.compose(le.memberName,{color:t.signedIn?"green":"black"}),children:t.name}),Object(z.jsxs)(W.default,{children:["Total: ",de(t.totalTime/1e3),Boolean(t.signedIn)&&" (+"+de(t.timeIn/1e3)+")"]})]})]})}function fe(){return(fe=p()((function*(e,t){var n=t.trim();if(0===n.length)throw new RangeError("Password cannot be empty");if(e.userInfo.signedIn)throw new Error("Cannot switch users while signed in");var r=yield v(n);if(!r.ok||!r.data.verified)throw new Error(r.messages.join("\n"));e.updateData({loggedIn:!0,name:r.data.user.name,password:r.data.user.password,signedIn:r.data.user.signedIn});try{yield y(n)}catch(o){return"Successfully Logged In!\n"+o.message}return"Success. You're now logged in as "+r.data.user.name.trim()+" using "+r.data.user.password}))).apply(this,arguments)}function ge(){return(ge=p()((function*(e){if(e.userInfo.password){var t=yield C(),n=t.find((function(t){return t.name.trim()===e.userInfo.name.trim()})),r=Date.now()-n.timeIn;return Math.abs(e.userInfo.signedIn-r)>2e3&&e.updateData({signedIn:n.signedIn?r:0}),t}}))).apply(this,arguments)}var he=G.default.create({list:{width:"100%",paddingHorizontal:8},listContent:{alignSelf:"center",alignItems:"stretch",width:"100%",maxWidth:600}});function pe(e){var t=e.navigation,n=Object(l.useState)([]),r=j()(n,2),o=r[0],i=r[1],a=E(!1),s=Object(z.jsx)($.default,{size:"large",color:w.colors.primary}),c=function(){(function(e){return ge.apply(this,arguments)})(a).then(i)};return Object(l.useEffect)((function(){c();var e=setInterval(c,3e4);return function(){return clearInterval(e)}}),[a.userInfo.password]),o&&(s=Object(z.jsx)(ee.default,{style:he.list,contentContainerStyle:he.listContent,scrollEventThrottle:16,data:o.sort((function(e,t){return e.signedIn!==t.signedIn?t.signedIn-e.signedIn:e.name.localeCompare(t.name)})),keyExtractor:function(e){return e.id.toString()},renderItem:function(e){return e=e.item,Object(z.jsx)(ue,{entry:e})}})),Object(z.jsx)(ce,{navigation:t,children:s})}var be=n(345),je={googledrive:"google-drive",roster:"clipboard-account",calendar:"calendar",forms:"format-list-bulleted-square",website:"web",photo:"google-photos",youtube:"youtube-tv",training:"teach",grant:"currency-usd",money:"currency-usd",irc:"book",handbook:"book",default:"cogs"},me=G.default.create({linkButtonStyle:{width:"100%",minHeight:40,flex:1,justifyContent:"center",alignItems:"flex-start",marginVertical:2}}).linkButtonStyle;function ye(e){var t=e.icon,n=void 0===t?"":t,r=e.title,o=e.url,i=je[n.toLowerCase().trim()]||je.default;return Object(z.jsx)(U.default,{icon:i,mode:"contained",color:w.colors.secondary,onPress:function(){return be.openBrowserAsync(o)},style:me,children:r||"Resource"},r||"Resource: "+o+"<"+n+">")}var Oe=G.default.create({listStyle:{width:"100%"}}).listStyle;function we(e){var t=e.navigation,n=Object(l.useState)([]),r=j()(n,2),o=r[0],i=r[1],a=T();Object(l.useEffect)((function(){fetch(w.urls.resources).then((function(e){return e.json()})).then((function(e){return i(e.values)})).catch((function(e){return a.showMessage("Unable to load resources: "+e)}))}),[]);var s=Object(z.jsx)($.default,{size:"large",color:w.colors.primary});return o&&(s=Object(z.jsx)(ee.default,{style:Oe,data:o,keyExtractor:function(e){return e[0]+": "+e[1]},renderItem:function(e){return e=e.item,Object(z.jsx)(ye,{title:e[0],url:e[1],icon:e[2]})}})),Object(z.jsx)(ce,{navigation:t,children:s})}var ve=n(340),xe=n(319),Ie=n.n(xe),Se=G.default.create({logoStyle:{width:"100%",height:"50%",alignSelf:"center"}}).logoStyle;function ke(){return Object(z.jsx)(K.default,{resizeMode:"contain",style:Se,source:Ie.a})}var Ce=G.default.create({formContainer:{width:"100%",maxWidth:600,paddingHorizontal:8,alignItems:"center"},loginInputContainer:{width:"100%",borderRadius:5,overflow:"hidden"},loginInput:{width:"100%",color:"#7D1120",backgroundColor:w.colors.lighterGray},loginButton:{width:"100%",backgroundColor:w.colors.lightGray,marginVertical:5,paddingVertical:6,borderRadius:5,shadowColor:w.colors.darkerGray,shadowOffset:{width:0,height:4},shadowRadius:4,shadowOpacity:.25,elevation:3},loginButtonContent:{alignItems:"center",justifyContent:"center",alignSelf:"center",padding:10},loginButtonText:{color:w.colors.darkerGray,fontSize:20,fontWeight:"bold"}});function ze(e){var t=e.navigation,n=E(!1),r=Object(l.useState)(""),o=j()(r,2),i=o[0],a=o[1],s=T(),c=function(){s.showMessage("Verifying that you exist..."),function(e,t){return fe.apply(this,arguments)}(n,i).then(s.showMessage).catch((function(e){return s.showMessage(e.message)}))};return Object(z.jsxs)(ce,{navigation:t,children:[Object(z.jsx)(ke,{}),Object(z.jsxs)(N.default,{style:Ce.formContainer,children:[Object(z.jsx)(N.default,{style:Ce.loginInputContainer,children:Object(z.jsx)(ve.default,{label:"Login",value:i,style:Ce.loginInput,secureTextEntry:!0,onChange:function(e){return a(e.nativeEvent.text)},onSubmitEditing:c})}),Object(z.jsx)(U.default,{onPress:c,compact:!0,mode:"contained",style:Ce.loginButton,contentStyle:Ce.loginButtonContent,labelStyle:Ce.loginButtonText,children:"Submit"})]})]})}var Pe=G.default.create({list:{width:"100%"},button:{width:"100%",minHeight:45,flex:1,justifyContent:"space-around",alignItems:"flex-start",paddingHorizontal:"4%",marginVertical:4},text:{flex:1,width:"30%",fontSize:16,paddingHorizontal:5,justifyContent:"center",alignContent:"center"},title:{width:"100%",alignSelf:"center",textAlign:"center",fontSize:30,color:w.colors.primary,marginTop:"5%"}});function De(e){var t=e.navigation,n=Object(l.useState)([]),r=j()(n,2),o=r[0],i=r[1],a=T();Object(l.useEffect)((function(){fetch(w.urls.sheet).then((function(e){return e.json()})).then((function(e){return e.values})).then((function(e){for(var t=0;t<e.length;t++)0!==t&&e[t][0].trim()===e[t-1][0].trim()||(e.splice(t,0,e[t][0].trim()),t++);i(e)})).catch((function(e){return a.showMessage("Unable to load forms: "+e)}))}),[]);var s=Object(z.jsx)($.default,{size:"large",color:w.colors.primary});return o&&(s=Object(z.jsx)(ee.default,{style:Pe.list,data:o,keyExtractor:function(e){return e[1]+": "+e[2]},renderItem:function(e){if("string"==typeof(e=e.item))return Object(z.jsx)(N.default,{style:Pe.button,children:Object(z.jsx)(W.default,{style:Pe.title,children:e})});var t=e[4].trim();return Object(z.jsxs)(N.default,{style:Pe.button,children:[t&&"n/a"!==t.toLowerCase()&&Object(z.jsxs)(W.default,{style:Pe.text,children:["Due ",e[4]]}),Object(z.jsx)(ye,{title:e[1],url:e[2]})]})}})),Object(z.jsx)(ce,{navigation:t,children:s})}function Be(e){var t=e.navigation,n=T(),r=E(!1),o=r.userInfo.name.trim(),i=Object(l.useState)(!1),a=j()(i,2),s=a[0],c=a[1],d=s||!r.userInfo.loaded;Object(l.useEffect)((function(){r.userInfo.loaded&&!r.userInfo.password&&(n.showMessage("Looks like it's your first time here!\nLog in to get started!"),t.navigate("Login"))}),[r.userInfo.loaded]);return Object(z.jsxs)(ce,{navigation:t,children:[Object(z.jsx)(ke,{}),Object(z.jsx)(N.default,{style:{width:"100%",marginTop:16,alignItems:"center",paddingHorizontal:8,overflow:"visible"},children:Object(z.jsx)(U.default,{onPress:function(){if(!r.userInfo.password)return n.showMessage("You have to log in first!"),void t.navigate("Login");var e;c(!0),r.userInfo.signedIn?(e=r.userInfo.password,I(e,!1)).then((function(e){e.ok?(r.updateData({signedIn:0}),n.showMessage("Successfully Signed Out")):n.showMessage(e.messages.join("\n")),c(!1)})):k(r.userInfo.password).then((function(e){e.ok?r.updateData({signedIn:e.data.signedIn}):n.showMessage(e.messages.join("\n")),c(!1)}))},compact:!0,mode:"contained",loading:d,disabled:d,style:{maxWidth:"100%",maxHeight:160,justifyContent:"center",alignItems:"center",backgroundColor:w.colors.semiLighterGray,borderRadius:8,borderColor:w.colors.lighterGray,shadowColor:w.colors.darkerGray,shadowOffsetY:{width:0,height:8},shadowRadius:16,shadowOpacity:.25,elevation:3,overflowX:"hidden"},contentStyle:{width:600,height:96,paddingHorizontal:16,paddingVertical:8,borderColor:w.colors.lighterGray},labelStyle:{color:d||!r.userInfo.loggedIn?"gray":r.userInfo.signedIn?"red":"green",overflow:"visible",paddingVertical:6,fontSize:24,borderColor:w.colors.lighterGray,fontWeight:"bold",maxWidth:"100%"},children:!d&&(r.userInfo.loggedIn?"Sign "+(r.userInfo.signedIn?"Out":"In")+" as "+o:"Log in to get started!")})})]})}var Me=n(69),Ee=n.n(Me);var Le={Home:function(e){return Object(z.jsx)(Ee.a,{viewBox:"0 0 512 512",fill:e.color||w.icons.color,width:w.icons.size,height:w.icons.size,children:Object(z.jsx)(Me.Path,{d:"M503.402 228.885L273.684 19.567c-10.083-9.189-25.288-9.188-35.367-.001L8.598 228.886c-8.077 7.36-10.745 18.7-6.799 28.889 3.947 10.189 13.557 16.772 24.484 16.772h36.69v209.721c0 8.315 6.742 15.057 15.057 15.057h125.914c8.315 0 15.057-6.741 15.057-15.057V356.932h74.002v127.337c0 8.315 6.742 15.057 15.057 15.057h125.908c8.315 0 15.057-6.741 15.057-15.057V274.547h36.697c10.926 0 20.537-6.584 24.484-16.772 3.941-10.19 1.273-21.529-6.804-28.89zM445.092 42.73H343.973l116.176 105.636v-90.58c0-8.315-6.741-15.056-15.057-15.056z"})})},Login:function(e){return Object(z.jsxs)(Ee.a,{viewBox:"0 -80 512 640",fill:e.color||w.icons.color,width:w.icons.size,height:w.icons.size,children:[Object(z.jsx)(Me.Path,{d:"M255.81 395.4c0-54.54 30-102.31 74.14-126.62 6.23-11.48 13.22-22.72 18.25-34.71 20.38-48.55 31.22-99 24.27-152.09-5.74-43.81-31-70.72-73.63-79C279-.93 259-.71 239.06 2.08 196.61 8 169.92 34.19 162.06 77c-4.58 24.9-3.65 49.8.16 74.64 7 45.36 20.9 88.06 47.27 125.91a10.91 10.91 0 012.19 4.63c1.33 12.31-7 28.56-18.1 33.55-12.11 5.42-24.57 10.1-37.1 14.43-33.13 11.46-66.37 22.44-97.12 40-20.19 11.55-34.4 28-43.92 49.19C6.17 440 1.83 462.2.27 484.62-.28 492.47.18 501 .18 509h309.91c-33.02-27-54.28-67.71-54.28-113.6z"}),Object(z.jsx)(Me.Path,{d:"M397 277.89c-63.43 0-115 52.51-115 117.05S333.54 512 397 512s115-52.51 115-117.05-51.6-117.06-115-117.06zm46 116.43c-8.78.32-17.58.22-28.75.32.16 17.33.45 32.91.4 48.49 0 13-6.59 20.53-17.72 19.65-13.82-1.09-17.21-9.07-17.18-19 .06-15.62-.23-31.24-.39-48.77-9.46.09-18.08.4-26.68.2-12.64-.3-15.79-4.21-9-12.24 14.69-17.48 30.05-34.59 45.25-51.78 4.79-5.41 10.11-5.58 15-.15 15.75 17.28 31.65 34.49 47 52 6.31 7.25 1.67 10.96-7.93 11.28z"})]})},Leaderboard:function(e){return Object(z.jsx)(Ee.a,{viewBox:"10 10 80 80",fill:e.color||w.icons.color,width:w.icons.size,height:w.icons.size,children:Object(z.jsx)(Me.Path,{d:"M85.4 63.1c0 2.6-1.1 4.8-2.8 6.6 0 0 0 .1-.1.1-.3 8.6-7.3 15.5-16 15.5-4.8 0-9.1-2.1-12-5.4-7.9.7-16.8-.7-20.8-4.7-.4-.4-.7-.8-1.1-1.2-5.2-.3-10.1-1.7-12.7-4.3-1.8-1.8-2.8-4-2.8-6.6 0-5.4 1.8-11.4 4.8-16 1.5-2.3 3.2-4.1 5.1-5.5.3-.3.4-.7.5-1.1.1-.6-.1-1.3-.5-1.8-1.8-2-3-4.7-3-7.7 0-6.3 5.1-11.4 11.4-11.4 2.9 0 5.5 1.1 7.5 2.9 2.2-1.8 4.9-2.8 7.9-2.8 3.2 0 6.1 1.2 8.3 3.1 2-2 4.8-3.2 7.9-3.2 6.3 0 11.4 5.1 11.4 11.4 0 2.9-1.1 5.6-3 7.7-.4.6-.5 1.2-.5 1.8.1.4.2.8.5 1.1 1.9 1.4 3.6 3.2 5.1 5.5 3.1 4.6 4.9 10.6 4.9 16zm-3.7 1.1c.1-.3.1-.7.1-1.1 0-12.8-8.6-20.7-14.7-20.7-1.9 0-4.1.8-6.2 2.2 1.8 1.4 3.4 3.3 4.9 5.5.7 1 1.3 2 1.8 3.2 6.6.4 12.1 4.9 14.1 10.9zm-8.3-28.7c.9-1.3 1.4-2.8 1.4-4.5 0-4.3-3.5-7.8-7.8-7.8-2.2 0-4.1.9-5.5 2.3 1.2 2 1.9 4.3 1.9 6.7 0 1.8-.4 3.4-1 5 1.3 1 2.9 1.5 4.6 1.5 2.2 0 4.2-.9 5.6-2.4.3-.2.6-.5.8-.8zm-2.6 37.3c1.6-1.6 3.6-3.9 2.2-6.2-1.3-2.2-4.7-2.2-6.1-.2-1.4-2-4.8-2-6.1.2-1.4 2.4.6 4.6 2.2 6.2.9.9 3.3 3 3.9 3.4.5-.5 3-2.6 3.9-3.4zm-8.7-18.9c.4-.1.9-.2 1.3-.3-1.6-2.6-3.5-4.7-5.6-6.1-1-.8-2.1-1.4-3.2-1.8-1.3-.5-2.5-.8-3.7-.8-1 0-2.1.2-3.2.6-1.1.4-2.2.9-3.3 1.7-5.1 3.4-9.8 10.7-9.8 20.7 0 .9.2 1.7.5 2.4.3.8.8 1.4 1.4 2 .7.6 1.6 1.2 2.7 1.6 3.2 1.4 8.1 2 12.8 1.9-.9-2-1.4-4.2-1.4-6.5-.1-7.3 4.8-13.5 11.5-15.4zM59.3 32c0-4.7-3.8-8.5-8.5-8.5s-8.5 3.8-8.5 8.5 3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5zm-21 .3c0-2.7.8-5.1 2.2-7.1-1.4-1.2-3.1-1.9-5.1-1.9-4.3 0-7.8 3.5-7.8 7.8 0 1.7.5 3.2 1.5 4.5.3.3.5.6.7.9 1.4 1.5 3.4 2.4 5.6 2.4 1.5 0 2.9-.4 4-1.2-.6-1.7-1.1-3.5-1.1-5.4zM36 50.1c1.5-2.4 3.3-4.3 5.3-5.8-1.9-1.3-4-2-5.8-2-6.1 0-14.7 7.9-14.7 20.7 0 1.6.5 2.9 1.7 4 1.6 1.5 4.8 2.5 8.4 2.9-.2-.7-.2-1.4-.2-2.2-.1-5.9 1.9-12.5 5.3-17.6z"})})},Resources:function(e){return Object(z.jsxs)(Ee.a,{viewBox:"0 0 45.057 45.057",fill:e.color||w.icons.color,width:w.icons.size,height:w.icons.size,children:[Object(z.jsx)(Me.Path,{d:"M20.776 14h12.252c1.613 0 1.613-2.5 0-2.5H20.776c-1.611 0-1.611 2.5 0 2.5zM33.028 19.417H20.776c-1.612 0-1.612 2.5 0 2.5h12.252c1.614 0 1.614-2.5 0-2.5zM33.028 26.9H20.776c-1.612 0-1.612 2.5 0 2.5h12.252c1.614 0 1.614-2.5 0-2.5zM33.028 34.816H20.776c-1.612 0-1.612 2.5 0 2.5h12.252c1.614 0 1.614-2.5 0-2.5zM16.202 10.872h-3.484c-.126 0-.229.077-.229.172v3.513c0 .094.102.171.229.171h3.484c.126 0 .229-.077.229-.171v-3.513c0-.095-.102-.172-.229-.172zM15.989 18.673h-3.484c-.126 0-.229.077-.229.172v3.513c0 .094.102.171.229.171h3.484c.126 0 .229-.077.229-.171v-3.513c0-.095-.102-.172-.229-.172zM15.989 26.261h-3.484c-.126 0-.229.077-.229.173v3.512c0 .095.102.172.229.172h3.484c.126 0 .229-.077.229-.172v-3.512c0-.095-.102-.173-.229-.173zM15.989 34.139h-3.484c-.126 0-.229.077-.229.172v3.514c0 .094.102.17.229.17h3.484c.126 0 .229-.076.229-.17v-3.514c0-.095-.102-.172-.229-.172z"}),Object(z.jsx)(Me.Path,{d:"M33.431 0H5.179v45.057h34.699V6.25L33.431 0zm3.447 42.056H8.179V3h23.707v4.76h4.992v34.296z"})]})},Forms:function(e){return Object(z.jsx)(Ee.a,{viewBox:"0 -4 55 70",fill:e.color||w.icons.color,width:w.icons.size,height:w.icons.size,children:Object(z.jsx)(Me.Path,{d:"M60.5 28.87a1.52 1.52 0 01-.44 1.06l-8.71 8.7a1.45 1.45 0 01-1.06.44 1.47 1.47 0 01-1.06-.44 1.51 1.51 0 010-2.12l7.65-7.64-1.68-1.68L53.43 29 36.6 45.8l-5.91 1 1-5.91.43-.43 3.28 3.27a1.41 1.41 0 001.06.44 1.44 1.44 0 001.06-.44 1.51 1.51 0 000-2.12l-3.28-3.28L44.8 27.74l5.49-5.49L55.1 27l2.07-2.07 2.89 2.89a1.5 1.5 0 01.44 1.05zm-1.94-5a2 2 0 000-2.82l-2.1-2.1a2 2 0 00-2.82 0l-1.19 1.15 4.93 4.9zm-21 24.84l-8.45 1.41h-.25a1.5 1.5 0 01-1.06-.44 1.52 1.52 0 01-.42-1.31l1.41-8.46a1.58 1.58 0 01.42-.81l13-13V9a2 2 0 00-2-2H15.13v10.58a1.5 1.5 0 01-1.5 1.5H8a1.5 1.5 0 010-3h4.17V9.24L4.06 17.6A2 2 0 003.5 19v36a2 2 0 002 2h34.76a2 2 0 002-2V44.38l-3.88 3.88a1.56 1.56 0 01-.82.41z"})})}},Re=n(320),He=n.n(Re);function Fe(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function Te(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Fe(Object(n),!0).forEach((function(t){c()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Fe(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var Ae=G.default.create({header:{width:"100%",minHeight:"10%",paddingHorizontal:"2%",paddingVertical:"5%",flexDirection:"row",alignItems:"center",justifyContent:"flex-start",backgroundColor:"red"},logo:{width:"20%",height:"100%",borderRadius:5,aspectRatio:1},textContainer:{width:"80%"},text:{fontSize:18,color:w.colors.cardinalWhite,textAlign:"left",marginHorizontal:15},timeIn:{fontSize:16,color:w.colors.cardinalWhite,textAlign:"left",marginHorizontal:15}}),Ge=Object(Y.default)(),We="/ReactNativeCardinalBoticsApp",Ne={prefixes:["cardinalbotics-hours-app://"],config:{screens:{Home:We+"/",Login:We+"/login",Leaderboard:We+"/leaderboard",Resources:We+"/resources",Forms:We+"/forms"}}};function Ue(e){var t=function(e,t){return e+" "+t+(1===e?"":"s")},n=Math.floor(e/3600),r=Math.floor(e%3600/60),o=Math.floor(e%60);return"Signed in for: \n"+t(n,"hour")+" "+t(r,"minute")+" "+t(o,"second")}function Ve(){var e=E(),t=Object(l.useState)(0),n=j()(t,2),r=n[0],o=n[1],i=function(){e.signedIn&&o(Math.floor((Date.now()-e.signedIn)/1e3))};return Object(l.useEffect)((function(){i();var e=setInterval(i,1e3);return function(){return clearInterval(e)}}),[e.signedIn]),Object(z.jsxs)(Z.LinearGradient,{colors:["#7D1120","#A6242F","#FF4D4D"],start:[0,0],end:[1,1],style:Ae.header,children:[Object(z.jsx)(K.default,{source:He.a,resizeMode:"contain",style:Ae.logo}),Object(z.jsxs)(N.default,{style:Ae.textContainer,children:[Object(z.jsx)(W.default,{style:Ae.text,children:e.loaded?e.loggedIn?e.name:"Not Logged In":"Loading..."}),Object(z.jsx)(W.default,{style:Ae.timeIn,children:e.loaded?e.signedIn?Ue(r):"No Sessions Active":"Loading..."})]})]})}function Je(e){return Object(z.jsxs)(N.default,{style:{flex:1},children:[Object(z.jsx)(Ve,{}),Object(z.jsx)(_.default,Te(Te({},e),{},{style:{flexGrow:1},children:Object(z.jsx)(q.default,Te({},e))}))]})}var Xe,Ke=function(){return Object(z.jsx)(Q.default,{linking:Ne,children:Object(z.jsxs)(Ge.Navigator,{initialRouteName:"Home",backBehavior:"history",screenOptions:{headerShown:!1,drawerActiveTintColor:w.colors.primary,drawerActiveBackgroundColor:w.colors.gray,drawerInactiveTintColor:w.colors.darkerGray,drawerInactiveBackgroundColor:w.colors.background},drawerContent:function(e){return Object(z.jsx)(Je,Te({},e))},children:[Object(z.jsx)(Ge.Screen,{name:"Home",component:Be,options:{drawerIcon:Le.Home}}),Object(z.jsx)(Ge.Screen,{name:"Login",component:ze,options:{drawerIcon:Le.Login}}),Object(z.jsx)(Ge.Screen,{name:"Leaderboard",component:pe,options:{drawerIcon:Le.Leaderboard,drawerLabel:"Other Members"}}),Object(z.jsx)(Ge.Screen,{name:"Resources",component:we,options:{drawerIcon:Le.Resources}}),Object(z.jsx)(Ge.Screen,{name:"Forms",component:De,options:{drawerIcon:Le.Forms}})]})})},Qe=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Ye(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://cra.link/PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}function _e(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function qe(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?_e(Object(n),!0).forEach((function(t){c()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):_e(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function Ze(){var e=qe(qe({},u.DefaultTheme),{},{roundness:2,colors:qe(qe({},u.DefaultTheme.colors),{},{primary:w.colors.primary,accent:w.colors.cardinalWhite})});return Object(z.jsx)(M,{children:Object(z.jsx)(F,{children:Object(z.jsxs)(f.default,{theme:e,style:{flex:1},children:[Object(z.jsx)(g.StatusBar,{animated:!0,hidden:!0,style:"dark"}),Object(z.jsx)(Ke,{}),Object(z.jsx)(X,{})]})})})}(function(e){if("serviceWorker"in navigator){if(new URL("/ReactNativeCardinalBoticsApp",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="/ReactNativeCardinalBoticsApp/service-worker.js";Qe?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var r=n.headers.get("content-type");404===n.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):Ye(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://cra.link/PWA")}))):Ye(t,e)}))}}(),"web"===o.default.OS)?(r.default.registerComponent("main",(function(){return Ze})),Object(i.createRoot)(null!=(Xe=document.getElementById("root"))?Xe:document.getElementById("main")).render(Object(z.jsx)(Ze,{}))):Object(a.default)(Ze)}},[[356,1,2]]]);
//# sourceMappingURL=app.a8413b03.chunk.js.map