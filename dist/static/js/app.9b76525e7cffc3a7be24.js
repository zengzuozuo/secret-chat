webpackJsonp([0],{"+r1+":function(t,e){},"23wR":function(t,e){},"63QT":function(t,e){},"7Vt6":function(t,e){},AQny:function(t,e){t.exports={message:{Chinese:"中文",English:"English",login:"CHAT ON",logout:"Logout",miliao:"Secret Chat",miliaoPhrase:"Top security anonymous chat software based on block chain",loginInputTip:"Please enter your SMS password statement for login",registerText:"No account?Create a new anonymous account",safety:"Safety",copy:"copy",copyaddress:"copy",copySuccess:"Copy success",Connectionclosed:"Connection closed",login1:"enter your key",login2:"Please enter",login3:"Forget your key",login4:"Tip",login5:"Will it not be able to decrypt the previous information before it is regenerated?",login6:"Login environment exception",login7:"The secret key you entered cannot be empty",login8:"Please make sure the key is correct, otherwise it will cause the sending to fail!",my:"My",chat:"Chats",set:"Settings",wdye:"Balance",wallet1:"Send the address to someone else and someone can send the appropriate information to your address via a private chat",wallet2:"pieces",wallet3:"Details of the membership fee:Notes: The sac you top up is charged by two sections -- the public network of the Ethereum on the one hand, and our platform on the other to maintain the operation.",wallet4:"Spike",wallet5:"Purchase Succeeds",register1:"Your secret key has been generated",register2:"important note",register3:"This key will be used to encrypt and decrypt your chat information. Be sure to save your secret key.If lost, no way to recover it.Please do not disclose to third parties, otherwise your information may be leaked, we are not responsible!",register6:"Saved Go Chat",chatlist1:"Start New Chat",chatlist2:"Recipient address",chatlist3:"Enter",chatlist4:"cancel",chatlist5:"Please enter",chatlist6:"The address cannot be empty",chatlist7:"You can't send it to yourself",chatlist8:"nothing",chatin1:"Anonymous User",chatin2:"Type your message",chatin3:"The send content cannot be empty",chatin4:"The character length exceeds the limit",chatin5:"sending failure",dlzhbnwk:"The login account cannot be empty",tip01:"The browser does not support automatic replication",set1:"After 5 minutes, the application will exits automatically, and the next login must enter the key.",set2:"Language",specification1:"ALL content you sent are encrypted using TOP Encryption algorithm and saved on Blockchain, which shall NEVER store on any other platform.",specification2:"You privacy message will be kept so far, by keeping you private key secrecy. Even though one use the newest supercomputer, he cannot decipher your message.",specification3:"You can inquire the calling record of your chat in Blockchain Browser. ",welcome:"Welcome"}}},Aa6l:function(t,e){},E51W:function(t,e){},EW9h:function(t,e){},"GO/P":function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("7+uW"),i={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("router-view"),t._v(" "),s("mu-popup",{attrs:{position:"top",popupClass:"popup-top",overlay:!1,open:t.$store.state.isShowTopPopup}},[t._v(t._s(t.$store.state.tipText))]),t._v(" "),s("mu-popup",{attrs:{position:"top",popupClass:"popup-top-success",overlay:!1,open:t.$store.state.isShowSuccess}},[t._v(t._s(t.$store.state.tipText))]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.$store.state.loading,expression:"$store.state.loading"}],staticClass:"loading-shade"},[t._m(0)]),t._v(" "),s("mu-dialog",{attrs:{open:t.$store.state.isShowAlert,title:t.$t("message.login4")}},[t._v("\n    "+t._s(t.$store.state.alertText)+"\n    "),s("mu-flat-button",{attrs:{slot:"actions",label:t.$t("message.chatlist3"),primary:""},nativeOn:{click:function(e){t.$store.state.isShowAlert=!1}},slot:"actions"})],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"loading-box"},[e("embed",{attrs:{src:"static/svg/loading.svg",type:"image/svg+xml",pluginspage:"http://www.adobe.com/svg/viewer/install/"}})])}]};var o=s("VU/8")({name:"App"},i,!1,function(t){s("gwW5")},null,null).exports,n=s("/ocq"),r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"index-page"},[s("router-view",{staticClass:"index-tab-view"}),t._v(" "),s("footer",{staticClass:"footer-bar"},[s("mu-tabs",{attrs:{value:t.activeTab,lineClass:"activeline"},on:{change:t.handleTabChange}},[s("mu-tab",{attrs:{value:"wallet",href:"javascript:;",title:t.$t("message.my")},nativeOn:{click:function(e){t.switchTo("wallet")}}},[s("i",{staticClass:"iconfont"},[t._v("")])]),t._v(" "),s("mu-tab",{attrs:{value:"chatlist",href:"javascript:;",title:t.$t("message.chat")},nativeOn:{click:function(e){t.switchTo("chatlist")}}},[s("i",{staticClass:"iconfont"},[t._v("")])]),t._v(" "),s("mu-tab",{attrs:{value:"setting",href:"javascript:;",title:t.$t("message.set")},nativeOn:{click:function(e){t.switchTo("setting")}}},[s("i",{staticClass:"iconfont"},[t._v("")])])],1)],1)],1)},staticRenderFns:[]};var c=s("VU/8")({data:function(){return{activeTab:this.$route.name}},mounted:function(){},methods:{handleTabChange:function(t){this.activeTab=t},loginOut:function(){this.$router.replace("login")},switchTo:function(t){this.$router.replace(t)}},watch:{$route:function(t,e){this.activeTab="addchat"==t.name?"chatlist":t.name}}},r,!1,function(t){s("23wR")},null,null).exports,l=s("TQvf"),u=s.n(l),m={data:function(){return{userid:localStorage.getItem("userid")||"",toast:!1,toastMessage:"",pageData:null,timestamp:""}},mounted:function(){this.getData(),this.$store.state.langValue=localStorage.getItem("LANGUAGE")||"zh-CN",this.$i18n.locale=localStorage.getItem("LANGUAGE")||"zh-CN"},methods:{copy:function(){var t=this,e=new u.a(".tag-read");e.on("success",function(s){t.$store.commit("showTopSuccess",t.$t("message.copySuccess")),e.destroy()}),e.on("error",function(s){t.$store.commit("showTopPopup",t.$t("message.tip01")),e.destroy()})},getData:function(){var t=this;this.timestamp=(new Date).getTime(),this.$store.commit("WSsend",{data:{method:"getTariffPackages",params:[this.userid,this.timestamp]},callback:function(e){if(200==e.code&&"getTariffPackages"==e.method){if(e.serial!=t.timestamp)return;t.pageData=e}}})},buy:function(t){var e=this;this.timestamp=(new Date).getTime(),this.$store.commit("WSsend",{data:{method:"buyTariffPackages",params:[this.userid,t,this.$store.state.langValue,this.timestamp]},callback:function(t){if(200==t.code&&"buyTariffPackages"==t.method){if(t.serial!=e.timestamp)return;if(1===t.pack_id)e.$store.commit("showAlert",$t("message.wallet5")),e.getData();else{if(!t.result.payUrl)return;localStorage.setItem("LANGUAGE",e.$store.state.langValue),window.location.href=t.result.payUrl+"?langId="+e.$store.state.langValue}}}})}}},h={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"wallet-page"},[s("header",[t._v(t._s(t.$t("message.my")))]),t._v(" "),s("div",{staticClass:"main"},[s("div",{staticClass:"menu-wrap"},[s("div",{staticClass:"menu"},[s("img",{staticClass:"icon",attrs:{src:"static/images/qrcode_icon.png"}}),t._v(" "),s("div",{staticClass:"content"},[s("p",[t._v(t._s(t.userid))])]),t._v(" "),s("a",{staticClass:"tag-read",attrs:{href:"javascript:;","data-clipboard-text":t.userid},on:{click:t.copy}},[t._v(t._s(t.$t("message.copyaddress")))])]),t._v(" "),s("p",{staticClass:"tip"},[t._v(t._s(t.$t("message.wallet1")))]),t._v(" "),t.pageData?s("div",{staticClass:"menu bt"},[s("img",{staticClass:"icon",attrs:{src:"static/images/wallet_icon.png"}}),t._v(" "),s("div",{staticClass:"content"},[s("label",[t._v(t._s(t.$t("message.wdye")))])]),t._v(" "),s("div",{staticClass:"balance"},[s("span",[t._v(t._s(t.pageData.balance))]),t._v(t._s(t.$t("message.wallet2")))])]):t._e()]),t._v(" "),t.pageData?s("ul",{staticClass:"combo-list"},t._l(t.pageData.result,function(e){return s("li",[s("div",{staticClass:"ctn-l"},[s("label",[t._v(t._s("zh-CN"==t.$store.state.langValue?e.cn_title:e.en_title)+" \n                        "),5==e.pack_id&&"zh-CN"==t.$store.state.langValue?s("img",{attrs:{src:"static/images/chaozhi_icon.png"}}):t._e(),t._v(" "),5==e.pack_id&&"en-US"==t.$store.state.langValue?s("img",{attrs:{src:"static/images/chaozhi_en_icon.png"}}):t._e()]),t._v(" "),s("div",{staticClass:"content"},[t._v(t._s("zh-CN"==t.$store.state.langValue?e.cn_memo:e.en_memo))])]),t._v(" "),0==e.amount?s("mu-raised-button",{attrs:{label:t.$t("message.wallet4"),primary:""},nativeOn:{click:function(s){t.buy(e.pack_id)}}}):t._e(),t._v(" "),0!=e.amount?s("mu-raised-button",{attrs:{label:e.amount+"SAC",primary:""},nativeOn:{click:function(s){t.buy(e.pack_id)}}}):t._e()],1)})):t._e(),t._v(" "),s("div",{staticClass:"flex-wrap"},[s("p",{staticClass:"tip no-border"},[t._v(t._s(t.$t("message.wallet3")))])]),t._v(" "),t.toast?s("mu-toast",{staticClass:"tipbox",attrs:{message:t.toastMessage}}):t._e()],1)])},staticRenderFns:[]};var d=s("VU/8")(m,h,!1,function(t){s("GO/P")},null,null).exports,g={data:function(){return{isShowAlert:!1,to_user_id:""}},methods:{addChat:function(t){this.$store.commit("addChatUser",{userid:this.to_user_id,list:[],pk:t}),this.$router.push({path:"chatin",query:{id:this.to_user_id}})},getUserInfo:function(){var t=this;""!=this.to_user_id.trim()?this.to_user_id!=localStorage.getItem("userid")?(this.$store.state.loading=!0,this.timestamp=(new Date).getTime(),this.$store.commit("WSsend",{data:{method:"getUserInfo",params:[this.to_user_id,this.timestamp]},callback:function(e){if(console.log(1111),e.serial&&200===e.code&&"getUserInfo"==e.method){if(e.serial!=t.timestamp)return;t.addChat(e.result[0].pub_key)}}})):this.$store.commit("showTopPopup",this.$t("message.chatlist7")):this.$store.commit("showTopPopup",this.$t("message.chatlist6"))}},computed:{chatListData:function(){return this.$store.state.chatUserList},changeM:function(){return this.$store.state.changeM}}},p={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"chat-list-page"},[s("header",[t._v(t._s(t.$t("message.chat")))]),t._v(" "),s("div",{staticClass:"main"},[s("div",{staticClass:"add-chat",on:{click:function(e){t.isShowAlert=!0}}},[s("img",{staticClass:"icon",attrs:{src:"static/images/add_icon.png"}}),t._v(" "),s("div",{staticClass:"content"},[t._v(t._s(t.$t("message.chatlist1")))]),t._v(" "),s("div",{staticStyle:{display:"none"}},[t._v(t._s(t.changeM))])]),t._v(" "),s("ul",t._l(t.chatListData,function(e,a){return s("li",{key:a,on:{click:function(s){t.$router.push({path:"chatin",query:{id:e.userid}})}}},[s("img",{staticClass:"icon",attrs:{src:"static/images/chat_icon.png"}}),t._v(" "),s("div",{staticClass:"content"},[s("div",[s("h3",[t._v(t._s(e.userid))]),t._v(" "),e.list.length>0?s("span",[t._v(t._s(e.list[e.list.length-1].time))]):t._e()]),t._v(" "),e.list.length>0?s("p",{staticStyle:{"-webkit-box-orient":"vertical"}},[t._v(t._s(e.list[e.list.length-1].message))]):t._e(),t._v(" "),e.list.length<=0?s("p",{staticStyle:{"-webkit-box-orient":"vertical"}},[t._v(t._s(t.$t("message.chatlist8")))]):t._e()])])})),t._v(" "),s("mu-dialog",{attrs:{open:t.isShowAlert,title:t.$t("message.chatlist2")}},[s("mu-text-field",{staticStyle:{width:"100%"},attrs:{hintText:t.$t("message.chatlist5")},model:{value:t.to_user_id,callback:function(e){t.to_user_id=e},expression:"to_user_id"}}),t._v(" "),s("mu-flat-button",{attrs:{slot:"actions",primary:"",label:t.$t("message.chatlist4")},on:{click:function(e){t.isShowAlert=!1}},slot:"actions"}),t._v(" "),s("mu-flat-button",{attrs:{slot:"actions",primary:"",label:t.$t("message.chatlist3")},on:{click:t.getUserInfo},slot:"actions"})],1)],1)])},staticRenderFns:[]};var v=s("VU/8")(g,p,!1,function(t){s("EW9h")},null,null).exports,f={data:function(){return{}},methods:{logout:function(){var t=localStorage.getItem("userid");this.$store.commit("WSsend",{data:{method:"logout",params:[t]}})},handleChange:function(t){this.$store.state.langValue=t,this.$i18n.locale=t,localStorage.setItem("LANGUAGE",t)}},computed:{storeMinute5logout:function(){return this.$store.state.minute5logout}},watch:{storeMinute5logout:function(t,e){var s=this;t&&(this.$store.state.timer=setTimeout(function(){s.$store.state.minute5logout=!1;var t=localStorage.getItem("userid");s.$store.commit("WSsend",{data:{method:"logout",params:[t]}})},3e5))}}},_={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"set-page"},[s("header",[t._v(t._s(t.$t("message.set")))]),t._v(" "),s("div",{staticClass:"main"},[s("ul",[s("li",[s("h3",[t._v(t._s(t.$t("message.safety")))]),t._v(" "),s("div",{staticClass:"content"},[s("mu-checkbox",{staticClass:"demo-checkbox",model:{value:t.$store.state.minute5logout,callback:function(e){t.$set(t.$store.state,"minute5logout",e)},expression:"$store.state.minute5logout"}}),t._v(" "),s("p",{staticClass:"flex1"},[t._v(t._s(t.$t("message.set1")))])],1)]),t._v(" "),s("li",[s("h3",[t._v(t._s(t.$t("message.set2")))]),t._v(" "),s("div",{staticClass:"content"},[s("mu-dropDown-menu",{staticClass:"flex1",attrs:{value:t.$store.state.langValue},on:{change:t.handleChange}},[s("mu-menu-item",{attrs:{value:"zh-CN",title:t.$t("message.Chinese")}}),t._v(" "),s("mu-menu-item",{attrs:{value:"en-US",title:t.$t("message.English")}})],1)],1)])]),t._v(" "),s("mu-raised-button",{staticClass:"logout-btn",attrs:{label:t.$t("message.logout"),fullWidth:"",primary:""},nativeOn:{click:function(e){return t.logout(e)}}}),t._v(" "),s("p",{staticClass:"other-test-info"},[t._v("\n            "+t._s(t.$t("message.specification1"))),s("br"),s("br"),t._v("\n            "+t._s(t.$t("message.specification2"))),s("br"),s("br"),t._v("    \n            "+t._s(t.$t("message.specification3"))),s("br"),s("br")])],1)])},staticRenderFns:[]};var y=s("VU/8")(f,_,!1,function(t){s("Aa6l")},null,null).exports,w={data:function(){return{message:"",to_user_id:"",topPopup:!1,tipText:"",keyPair1:"",keyPair2:"",nonce:"",timestamp:""}},mounted:function(){},methods:{getUserInfo:function(){var t=this;""!=this.to_user_id.trim()?this.to_user_id!=sessionStorage.getItem("userid")?""!=this.message.trim()?(this.$store.state.loading=!0,this.timestamp=(new Date).getTime(),this.$store.commit("WSsend",{data:{method:"getUserInfo",params:[this.to_user_id,this.timestamp]},callback:function(e){if(console.log(1111),e.serial&&200===e.code&&"getUserInfo"==e.method){if(e.serial!=t.timestamp)return;t.timestamp=(new Date).getTime(),t.send(e.result[0].pub_key)}}})):this.$store.commit("showTopPopup","发送内容不能为空"):this.$store.commit("showTopPopup","无法向自己发送"):this.$store.commit("showTopPopup","对方地址不能为空")},send:function(t){var e=this,s=nacl.randomBytes(nacl.secretbox.nonceLength),a=nacl.util.encodeBase64(s),i=localStorage.getItem("sec_key"),o=nacl.box(nacl.util.decodeUTF8(this.message),s,nacl.util.decodeBase64(t),nacl.util.decodeBase64(i)),n=sessionStorage.getItem("userid");this.$store.commit("WSsend",{data:{method:"postMessage",params:[n,this.to_user_id,1,nacl.util.encodeBase64(o),a,this.timestamp]},callback:function(s){if(200===s.code&&"postMessage"==s.method){if(!s.serial)return;if(s.serial!=e.timestamp)return;e.timestamp=(new Date).getTime(),console.log("addchat"),e.$store.commit("addChatUser",{userid:e.to_user_id,list:[{message:e.message,self:!0}],pk:t}),e.$router.replace({path:"chatin",query:{id:e.to_user_id}})}}})}}},$={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"add-chat-page"},[s("div",{staticClass:"main"},[s("mu-text-field",{attrs:{label:"对方地址",labelFloat:""},model:{value:t.to_user_id,callback:function(e){t.to_user_id=e},expression:"to_user_id"}}),t._v(" "),s("mu-text-field",{attrs:{hintText:"输入您的信息",multiLine:"",rows:1,rowsMax:10},model:{value:t.message,callback:function(e){t.message=e},expression:"message"}}),t._v(" "),s("mu-raised-button",{attrs:{label:"发送",primary:"",fullWidth:""},nativeOn:{click:function(e){return t.getUserInfo(e)}}}),t._v(" "),s("mu-popup",{attrs:{position:"top",popupClass:"popup-top",overlay:!1,open:t.topPopup}},[t._v(t._s(t.tipText))])],1)])},staticRenderFns:[]};var b=s("VU/8")(w,$,!1,function(t){s("+r1+")},"data-v-4a7bc74d",null).exports,S={data:function(){return{messageText:"",timestamp:"",isShowlargeTip:!1,inputErrorText:""}},updated:function(){this.scrollBottom()},mounted:function(){console.log(this.chatListData),this.scrollBottom()},methods:{sendMessage:function(){var t=this;try{if(""==this.messageText.trim())return void this.$store.commit("showTopPopup",this.$t("message.chatin3"));if(this.$getStrLeng(this.messageText)>384)return void this.$store.commit("showTopPopup",this.$t("message.chatin4"));var e=this.$route.query.id,s=this.$store.state.chatUserList[e].pk,a=nacl.randomBytes(nacl.secretbox.nonceLength),i=nacl.util.encodeBase64(a),o=localStorage.getItem("sec_key"),n=nacl.box(nacl.util.decodeUTF8(this.messageText),a,nacl.util.decodeBase64(s),nacl.util.decodeBase64(o));console.log(n);var r=localStorage.getItem("userid");this.timestamp=(new Date).getTime(),this.$store.commit("WSsend",{data:{method:"postMessage",params:[r,e,1,nacl.util.encodeBase64(n),i,this.timestamp]},callback:function(a){if(200===a.code&&"postMessage"==a.method){if(!a.serial)return;if(a.serial!=t.timestamp)return;t.timestamp=(new Date).getTime(),console.log("chatin");var i=new Date,o=i.getHours()+":"+i.getMinutes()+":"+i.getSeconds();t.$store.commit("addChatUser",{userid:e,list:[{message:t.messageText,self:!0,time:o}],pk:s}),t.messageText=""}}})}catch(t){this.$store.commit("showTopPopup",this.$t("message.chatin5"))}},scrollBottom:function(){this.$refs.main&&(this.$refs.main.scrollTop=this.$refs.main.scrollHeight)}},watch:{messageText:function(t,e){this.$getStrLeng(t)>384?this.inputErrorText=this.$t("message.chatin4"):this.inputErrorText="",console.log(this.$refs.footer.offsetHeight),this.$refs.main.style="padding-bottom:"+this.$refs.footer.offsetHeight+"px"}},computed:{chatListData:function(){return this.$store.state.chatUserList},changeM:function(){return this.$store.state.changeM}}},C={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"chat-in-page"},[s("mu-appbar",{staticClass:"header"},[s("i",{staticClass:"iconfont",attrs:{slot:"left"},on:{click:function(e){t.$router.go(-1)}},slot:"left"},[t._v("")]),t._v(" "),s("div",{attrs:{slot:"left"},slot:"left"},[s("p",[t._v(t._s(t.$route.query.id))]),t._v(" "),s("span",[t._v(t._s(t.$t("message.chatin1")))])])]),t._v(" "),s("div",{ref:"main",staticClass:"main"},[s("ul",{ref:"listWrap"},t._l(t.chatListData[t.$route.query.id].list,function(e){return s("li",{class:{self:e.self}},[s("i",{staticClass:"iconfont",attrs:{slot:"left"},slot:"left"},[t._v("")]),t._v(" "),s("p",[t._v(t._s(e.message))])])}))]),t._v(" "),s("footer",{ref:"footer"},[s("div",{staticClass:"input-wrap"},[s("mu-text-field",{attrs:{hintText:t.$t("message.chatin2"),errorText:t.inputErrorText,multiLine:"",rows:1,rowsMax:6},model:{value:t.messageText,callback:function(e){t.messageText=e},expression:"messageText"}}),t._v(" "),s("i",{staticClass:"iconfont",attrs:{slot:"left"},on:{click:t.sendMessage},slot:"left"},[t._v("")])],1),t._v(" "),s("div",{staticStyle:{display:"none"}},[t._v(t._s(t.changeM))])])],1)},staticRenderFns:[]};var k=s("VU/8")(S,C,!1,function(t){s("OGFM")},"data-v-76520fa0",null).exports,T=s("mvHQ"),x=s.n(T),I={data:function(){return{userid:"",isShowAlert:!1,rebuildAlert:!1,urlQuery:null,secretKey:""}},mounted:function(){this.urlQuery=this.$route.query,localStorage.removeItem("key_store"),localStorage.removeItem("pub_key"),localStorage.removeItem("sec_key"),localStorage.removeItem("userid"),localStorage.removeItem("CHATDATA"),this.$store.state.chatUserList=JSON.parse(localStorage.getItem("CHATDATA"))||{},this.$store.state.langValue=localStorage.getItem("LANGUAGE")||"zh-CN",this.$i18n.locale=localStorage.getItem("LANGUAGE")||"zh-CN"},methods:{login:function(){var t=this;if(this.urlQuery=this.$route.query,0!=this.urlQuery.userStatus){var e=JSON.parse(localStorage.getItem("key_store"));e&&e.userid==this.urlQuery.userId?this.$store.commit("WSsend",{data:{method:"login",params:[this.urlQuery.userId]},callback:function(e){200==e.code&&"login"==e.method&&(localStorage.setItem("pub_key",e.result[0].pub_key),localStorage.setItem("userid",t.urlQuery.userId),sessionStorage.setItem("userid",t.urlQuery.userId),t.$router.replace("chatlist"))}}):this.isShowAlert=!0}else this.$router.replace({path:"register",query:{userId:this.urlQuery.userId,userStatus:this.urlQuery.userStatus}})},handleChange:function(t){this.$store.state.langValue=t,this.$i18n.locale=t,sessionStorage.setItem("LANG",t),localStorage.setItem("LANGUAGE",t)},rebuild:function(){this.isShowAlert=!1,this.rebuildAlert=!0},auth:function(){var t=this;this.$route.query.authCode?this.$store.commit("WSsend",{data:{method:"auth",params:[this.$route.query.userId,this.$route.query.authCode]},callback:function(e){200==e.code&&"auth"==e.method&&t.login()}}):this.$store.commit("showAlert",this.$t("message.login6"))},saveKey:function(){console.log(this.secretKey),""!=this.secretKey.trim()?(localStorage.setItem("sec_key",this.secretKey),localStorage.setItem("key_store",x()({userid:this.urlQuery.userId,sec_key:this.secretKey})),this.login()):this.$store.commit("showTopPopup",this.$t("message.login7"))},goBack:function(){try{window.app.closeWebView()}catch(t){window.history.go(-1)}}},computed:{safetyStatus:function(){return this.$store.state.safetyStatus}}},A={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"login-page"},[s("div",{staticClass:"main"},[s("h3",[t._v(t._s(t.$t("message.miliao")))]),t._v(" "),s("p",[t._v(t._s(t.$t("message.miliaoPhrase")))]),t._v(" "),s("div",{staticClass:"lang-switch"},[s("mu-dropDown-menu",{attrs:{value:t.$store.state.langValue},on:{change:t.handleChange}},[s("mu-menu-item",{attrs:{value:"zh-CN",title:t.$t("message.Chinese")}}),t._v(" "),s("mu-menu-item",{attrs:{value:"en-US",title:t.$t("message.English")}})],1)],1),t._v(" "),s("mu-dialog",{staticClass:"secretkey-input",attrs:{open:t.isShowAlert,title:t.$t("message.login1")}},[s("mu-text-field",{staticStyle:{width:"100%"},attrs:{hintText:t.$t("message.login2")},model:{value:t.secretKey,callback:function(e){t.secretKey=e},expression:"secretKey"}}),t._v(" "),s("p",{staticClass:"tip",staticStyle:{color:"#c33","font-size":"12px"}},[t._v(t._s(t.$t("message.login8")))]),t._v(" "),s("mu-flat-button",{attrs:{slot:"actions",primary:"",label:t.$t("message.login3")},on:{click:t.rebuild},slot:"actions"}),t._v(" "),s("mu-flat-button",{attrs:{slot:"actions",primary:"",label:t.$t("message.chatlist3")},on:{click:t.saveKey},slot:"actions"}),t._v(" "),s("a",{staticClass:"login-popup-close",attrs:{href:"javascript:;"},on:{click:function(e){t.isShowAlert=!1}}},[s("i",{staticClass:"iconfont"},[t._v("")])])],1),t._v(" "),s("mu-dialog",{attrs:{open:t.rebuildAlert,title:t.$t("message.login4")}},[t._v("\n                "+t._s(t.$t("message.login5"))+"\n                "),s("mu-flat-button",{attrs:{slot:"actions",primary:"",label:t.$t("message.chatlist4")},on:{click:function(e){t.rebuildAlert=!1}},slot:"actions"}),t._v(" "),s("mu-flat-button",{attrs:{slot:"actions",primary:"",label:t.$t("message.chatlist3")},on:{click:function(e){t.$router.replace({path:"register",query:{userId:t.urlQuery.userId,userStatus:t.urlQuery.userStatus}})}},slot:"actions"})],1),t._v(" "),s("div",{staticClass:"return-btn",on:{click:t.goBack}},[s("i",{staticClass:"iconfont"},[t._v("")])])],1),t._v(" "),s("footer",[s("mu-raised-button",{staticClass:"login-btn",attrs:{label:t.$t("message.login"),primary:""},nativeOn:{click:function(e){return t.auth(e)}}})],1)])},staticRenderFns:[]};var U=s("VU/8")(I,A,!1,function(t){s("7Vt6")},null,null).exports,L={data:function(){return{userid:"",loginUserid:"",toast:!1,timestamp:"",secretKey:"",isRegisterOk:!1}},mounted:function(){this.register()},computed:{registerUserid:function(){return this.$store.state.registerUserid}},methods:{copy:function(){var t=this,e=new u.a(".tag-read");e.on("success",function(s){t.$store.commit("showTopSuccess",t.$t("message.copySuccess")),e.destroy()}),e.on("error",function(s){t.$store.commit("showTopPopup",t.$t("message.tip01")),e.destroy()})},register:function(){var t=this,e=nacl.box.keyPair(),s=nacl.util.encodeBase64(e.publicKey),a=nacl.util.encodeBase64(e.secretKey),i=this.$route.query;this.$store.commit("WSsend",{data:{method:"register",params:[i.userId,s,a]},callback:function(e){200==e.code&&"register"==e.method&&(sessionStorage.setItem("userid",i.userId),localStorage.setItem("userid",i.userId),localStorage.setItem("pub_key",s),localStorage.setItem("sec_key",a),t.secretKey=a,t.isRegisterOk=!0)}})},login:function(){var t=this;this.timestamp=(new Date).getTime(),this.$store.commit("WSsend",{data:{method:"login",params:[this.$route.query.userId,this.timestamp]},callback:function(e){200==e.code&&"login"==e.method&&e.serial==t.timestamp&&t.$router.replace("chatlist")}})}}},P={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"register-page"},[s("div",{staticClass:"main"},[s("p",{staticClass:"label"},[t._v(t._s(t.$t("message.register1")))]),t._v(" "),s("div",{staticClass:"textarea-wrap"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.secretKey,expression:"secretKey"}],attrs:{disabled:""},domProps:{value:t.secretKey},on:{input:function(e){e.target.composing||(t.secretKey=e.target.value)}}}),t._v(" "),s("mu-raised-button",{staticClass:"tag-read",attrs:{label:t.$t("message.copy"),"data-clipboard-text":t.secretKey},nativeOn:{click:function(e){return t.copy(e)}}})],1),t._v(" "),s("p",{staticClass:"tip"},[t._v(t._s(t.$t("message.register2"))+"："),s("br"),t._v(t._s(t.$t("message.register3")))]),t._v(" "),s("div",{staticClass:"login-container"},[s("mu-raised-button",{directives:[{name:"show",rawName:"v-show",value:t.isRegisterOk,expression:"isRegisterOk"}],staticClass:"login-btn",attrs:{label:t.$t("message.register6"),primary:""},nativeOn:{click:function(e){return t.login(e)}}})],1),t._v(" "),t.toast?s("mu-toast",{staticClass:"tipbox",attrs:{message:t.toastMessage}}):t._e()],1)])},staticRenderFns:[]};var E=s("VU/8")(L,P,!1,function(t){s("63QT")},"data-v-7ee17290",null).exports,N={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"specification-page"},[s("mu-appbar",{staticClass:"header",attrs:{title:"会员费用详情"}},[s("i",{staticClass:"iconfont",attrs:{slot:"left"},on:{click:function(e){t.$router.go(-1)}},slot:"left"},[t._v("")])]),t._v(" "),t._m(0)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"main"},[e("p",[this._v("\n            备注：您充值的sac，一部分是以太坊公网收取的，一部分是我们的运营开发费用。"),e("br"),e("br"),this._v("\n            这是密信第一个版本，使用的是以太坊的公链。由于以太坊需要收取一定的成本费用，同时我们的平台运营和开发人员也需要一定的成本费用，故向您收取sac。 后期我们将在eos上发行新的属于我们自己的公链，整个研发过程中我们将持续地竭诚为您的信息安全服务。\n        ")])])}]};var D=s("VU/8")(null,N,!1,function(t){s("cnrw")},"data-v-11a96702",null).exports;a.default.use(n.a);var M=new n.a({routes:[{path:"/",name:"Index",component:c,redirect:"chatlist",meta:{isLogin:!0},children:[{path:"wallet",name:"wallet",component:d,meta:{isLogin:!0}},{path:"chatlist",name:"chatlist",component:v,meta:{isLogin:!0}},{path:"setting",name:"setting",component:y,meta:{isLogin:!0}},{path:"addchat",name:"addchat",component:b,meta:{isLogin:!0}}]},{path:"/chatin",component:k,meta:{isLogin:!0}},{path:"/login",component:U},{path:"/register",component:E},{path:"/specification",component:D}]});M.beforeEach(function(t,e,s){t.meta.isLogin?localStorage.getItem("userid")?s(!0):s({path:"login"}):s(!0)});var V=M,W=s("NYxO");a.default.use(W.a);var O=new W.a.Store({state:{ws:null,chatUserList:{},isShowTopPopup:!1,isShowSuccess:!1,isShowAlert:!1,alertText:"",tipText:"",userInfo:{userid:""},loading:!0,changeM:"",registerUserid:"",minute5logout:!1,timer:null,langValue:"zh-CN",safetyStatus:!1},mutations:{WSconnect:function(t,e){var s=this;if(!e)return console.error("websocket连接地址有误"),void("zh-CN"==t.langValue?this.commit("showTopPopup","服务器连接地址有误"):this.commit("showTopPopup","The server connection address is not correct"));"WebSocket"in window?(t.ws=new WebSocket(e),t.ws.onopen=function(){console.log("连接成功"),t.loading=!1,localStorage.getItem("userid")?(s.commit("WSsend",{data:{method:"login",params:[localStorage.getItem("userid")]}}),t.chatUserList=JSON.parse(localStorage.getItem("CHATDATA"))||{}):localStorage.removeItem("CHATDATA")},t.ws.onmessage=function(e){t.timer&&clearTimeout(t.timer),t.minute5logout&&(t.timer=setTimeout(function(){t.minute5logout=!1;var e=sessionStorage.getItem("userid");s.commit("WSsend",{data:{method:"logout",params:[e]}})},3e5)),t.loading=!1;var a,i,o,n,r,c,l,u,m=JSON.parse(e.data);if(console.log(m),3001!=m.code){if(200==m.code)switch(m.method){case"pushMessage":var h=function(e,s,a){try{var i=localStorage.getItem("sec_key"),o=nacl.box.open(nacl.util.decodeBase64(e),nacl.util.decodeBase64(s),nacl.util.decodeBase64(a),nacl.util.decodeBase64(i));return nacl.util.encodeUTF8(o)}catch(e){return"zh-CN"==t.langValue?"***无效密钥***":"***Invalid key***"}}(m.result.msg_data,m.result.msg_nonce,m.result.msg_pubkey);if(!h)return;var d=(a=m.result.msg_time,i=new Date,(o=new Date(1e3*a)).getFullYear(),n=o.getMonth()+1<10?"0"+(o.getMonth()+1):o.getMonth()+1,r=o.getDate(),c=o.getHours(),l=o.getMinutes()<=9?"0"+o.getMinutes():o.getMinutes(),u=o.getSeconds()<=9?"0"+o.getSeconds():o.getSeconds(),i.getDate()==r?c+":"+l+":"+u:n+"/"+r+" "+c+":"+l+":"+u);s.commit("addChatUser",{userid:m.result.from_user_id,list:[{message:h,self:!1,time:d,timestamp:m.result.msg_time}],pk:m.result.msg_pubkey});break;case"logout":localStorage.removeItem("key_store"),localStorage.removeItem("pub_key"),localStorage.removeItem("sec_key"),localStorage.removeItem("userid"),localStorage.removeItem("CHATDATA"),sessionStorage.removeItem("userid");try{window.app.closeWebView()}catch(t){V.replace("login")}break;case"register":t.registerUserid=m.result;break;case"login":localStorage.setItem("pub_key",m.result[0].pub_key),localStorage.setItem("userid",m.result[0].user_id),sessionStorage.setItem("userid",m.result[0].user_id),localStorage.setItem("key_store",x()({userid:m.result[0].user_id,sec_key:m.result[0].sec_key}));break;case"auth":t.safetyStatus=!0}}else"zh-CN"==t.langValue?s.commit("showTopPopup",m.result.cn):s.commit("showTopPopup",m.result.en)},t.ws.onclose=function(){console.log("连接已关闭"),"zh-CN"==t.langValue?s.commit("showTopPopup","连接已关闭"):s.commit("showTopPopup","Connection closed"),t.loading=!0,s.commit("WSconnect","ws://secretchat.org:3000/")}):alert("当前环境暂不支持聊天")},WSsend:function(t,e){switch(t.ws.readyState){case 0:setTimeout(function(){t.ws.send(x()(e.data)),e.callback&&t.ws.addEventListener("message",function s(a){var i=a;e.callback(JSON.parse(i.data)),t.ws.removeEventListener("message",s)})},1e3);break;case 1:if(t.ws.send(x()(e.data)),!e.callback)return;t.ws.addEventListener("message",function s(a){var i=a;e.callback(JSON.parse(i.data)),t.ws.removeEventListener("message",s)});break;case 2:"zh-CN"==t.langValue?this.commit("showTopPopup","连接尚未连接正在进行关闭建立"):this.commit("showTopPopup","Connection closed");break;case 3:"zh-CN"==t.langValue?this.commit("showTopPopup","连接已经关闭或者连接不能打开"):this.commit("showTopPopup","Connection closed")}},addChatUser:function(t,e){t.changeM=(new Date).getTime(),t.chatUserList.hasOwnProperty(e.userid)?(e.list.length>0&&t.chatUserList[e.userid].list.push(e.list[0]),t.chatUserList[e.userid].pk=e.pk):t.chatUserList[e.userid]=e,localStorage.setItem("CHATDATA",x()(t.chatUserList))},showTopPopup:function(t,e){t.tipText=e,t.isShowTopPopup=!0,setTimeout(function(){t.isShowTopPopup=!1},1500)},showTopSuccess:function(t,e){t.tipText=e,t.isShowSuccess=!0,setTimeout(function(){t.isShowSuccess=!1},1e3)},showAlert:function(t,e){t.alertText=e,t.isShowAlert=!0}}}),B=s("u64Q"),z=s.n(B),G=(s("E51W"),s("hMcO"),s("TXmL")),Q=s("AQny"),K=s.n(Q),q=s("z8sE"),F=s.n(q),R=s("v5o6"),H=s.n(R);"addEventListener"in document&&document.addEventListener("DOMContentLoaded",function(){H.a.attach(document.body)},!1),a.default.use(z.a),a.default.use(G.a);var J=new G.a({locale:"zh-CN",messages:{"zh-CN":F.a,"en-US":K.a}});O.commit("WSconnect","ws://secretchat.org:3000/"),a.default.prototype.$getStrLeng=function(t){for(var e=0,s=t.length,a=-1,i=0;i<s;i++)e+=(a=t.charCodeAt(i))>=0&&a<=128?1:3;return e},a.default.config.productionTip=!1,new a.default({el:"#app",router:V,store:O,i18n:J,components:{App:o},template:"<App/>"})},OGFM:function(t,e){},cnrw:function(t,e){},gwW5:function(t,e){},z8sE:function(t,e){t.exports={message:{Chinese:"中文",English:"English",login:"开启聊天",logout:"安全退出",miliao:"密信",miliaoPhrase:"一款基于区块链的顶级安全匿名聊天软件",loginInputTip:"请输入您的短信密码语句进行登录",registerText:"没有帐号？创建一个新的匿名帐号",safety:"安全",copy:"复制",copyaddress:"复制",copySuccess:"复制成功",Connectionclosed:"连接已关闭",login1:"请输入您的密钥",login2:"请输入",login3:"忘记密钥",login4:"提示",login5:"重新生成后将无法解密在此之前的信息，确定继续？",login6:"登录环境异常",login7:"您输入的密钥不能为空",login8:"请确保密钥正确，否则将导致发送失败！",my:"个人",chat:"聊天",set:"设置",wdye:"您的余额",wallet1:"把地址发给他人，他人即可通过密聊发送相应的信息到您的地址",wallet2:"条",wallet3:"备注：您充值的sac，一部分是以太坊公网收取的，一部分是我们的运营费用。",wallet4:"限时免费",wallet5:"购买成功",register1:"您的密钥已经生成",register2:"重要提示",register3:"此密钥将用于加解密您的聊天信息。请务必保存您的密钥.如果丢失， 将无法找回！请不要泄露给第三方，否则您的信息可能被泄露，我们概不负责！",register6:"我已保存，去聊天!",chatlist1:"开启新的聊天",chatlist2:"请输入对方地址",chatlist3:"确定",chatlist4:"取消",chatlist5:"请输入",chatlist6:"对方地址不能为空",chatlist7:"无法向自己发送",chatlist8:"无",chatin1:"匿名用户",chatin2:"请输入您的消息",chatin3:"发送内容不能为空",chatin4:"字符长度超出限制",chatin5:"发送失败",dlzhbnwk:"登录账号不能为空",tip01:"该浏览器不支持自动复制",specification1:"您所有聊天内容，都是使用高密级算法加密并保存到区块链，不会存放在任何其他平台。",specification2:"保护好您的私人密钥，隐私就得到最强的保护。当代超级计算机也无法破解您的聊天内容。",specification3:"您可以使用区块链浏览器查询聊天的呼叫信息。",set1:"5分钟后，自动安全退出应用，下一次登录需要重新输入密钥。",set2:"语言",welcome:"Welcome"}}}},["NHnr"]);