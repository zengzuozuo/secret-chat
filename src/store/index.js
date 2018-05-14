import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import Md5 from '../../static/js/md5.js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        ws: null,
        chatUserList: {},
        isShowTopPopup: false, //顶部提示框
        isShowSuccess: false,
        isShowAlert: false,
        alertText: "",
        tipText: "",  //提示文字
        userInfo: {
            userid: ""
        },
        loading: true,
        changeM: "",
        registerUserid: "",
        minute5logout: false,
        timer: null,
        langValue: "zh-CN",   //当前语言
        safetyStatus: false
    },
    mutations: {
        WSconnect(state, url) {
            if(!url) {
                console.error("websocket连接地址有误")
                if(state.langValue == "zh-CN") {
                    this.commit("showTopPopup", "服务器连接地址有误")
                }else {
                    this.commit("showTopPopup", "The server connection address is not correct")
                }
                return;
            }
            if ("WebSocket" in window) {
                state.ws = new WebSocket(url)
                state.ws.onopen = () => {
                    console.log("连接成功")
                    //关闭loading动画
                    state.loading = false
                    if(localStorage.getItem("userid") && localStorage.getItem("sec_key")) {
                    	
                        this.commit("WSsend", {
                            data: {
                                method: "login",
                                params: [localStorage.getItem("userid"), Md5(localStorage.getItem("sec_key"))]
                            }
                        })
                        // 从缓存中恢复聊天记录
                        state.chatUserList = JSON.parse(localStorage.getItem("CHATDATA")) || {}
                    }else {
                        localStorage.removeItem("CHATDATA")
                    }
                    
                }
                state.ws.onmessage = (res) => {
                    if(state.timer) {
                        clearTimeout(state.timer)
                    }
                    if(state.minute5logout) {
                        state.timer = setTimeout(() => {
                            state.minute5logout = false                            
                            let userid = sessionStorage.getItem("userid")
                            this.commit("WSsend", {
                                data: {
                                    method: "logout",
                                    params: [userid]
                                }
                            })
                        }, 300000)
                    }
                    state.loading = false
                    let data = JSON.parse(res.data)
                    console.log(data)
                    //登录秘钥匹配错误
//                  if(data.code == 3003) {
//              		if(this.$store.state.langValue == "zh-CN") {
//                          this.commit("showTopPopup", res.result.cn)
//                      }else {
//                          this.commit("showTopPopup", res.result.en)   
//                      }
//              	}
                    if(data.code != 200) {
                    	if(state.langValue == "zh-CN") {
                            this.commit("showTopPopup", data.result.cn)
                        }else {
                            this.commit("showTopPopup", data.result.en)   
                        }
                        return;
                    }
                    switch(data.method) {
                        case 'pushMessage':
                            let mingwen = decodeMessage(data.result.msg_data, data.result.msg_nonce, data.result.msg_pubkey)
                            if(!mingwen) return;
                            var timeStr = createTime(data.result.msg_time)
                            this.commit("addChatUser", {
                                userid: data.result.from_user_id,
                                list: [
                                    {
                                        message: mingwen,
                                        self: false,
                                        time: timeStr,
                                        timestamp: data.result.msg_time
                                    }
                                ],
                                pk: data.result.msg_pubkey
                            })
                        break; 
                        case 'logout':
                            localStorage.removeItem("key_store")
					        localStorage.removeItem("pub_key")
					        localStorage.removeItem("sec_key")
					        localStorage.removeItem("userid")
					        localStorage.removeItem("CHATDATA")
                            sessionStorage.removeItem("userid")
                            
                            try{
                            	window.app.closeWebView();  //关闭webview
                            }catch(e){
                            	router.replace('login')
                            }
                        break;
                        case 'register':
                            state.registerUserid = data.result
                        break;
                        case 'login':
                            localStorage.setItem("pub_key", data.result[0].pub_key)
                            localStorage.setItem("userid", data.result[0].user_id)
                            sessionStorage.setItem("userid", data.result[0].user_id)
                            localStorage.setItem("key_store", JSON.stringify({userid: data.result[0].user_id, sec_key: data.result[0].sec_key}))
                        break;
                        case 'auth':
                            state.safetyStatus = true
                        break;
                    }
                }
                
                state.ws.onclose = () => {
                    console.log("连接已关闭")
                    if(state.langValue == "zh-CN") {
                        this.commit("showTopPopup", "连接已关闭")
                    }else {
                        this.commit("showTopPopup", "Connection closed")
                    }
                    state.loading = true
                    // 断线重连
                    this.commit("WSconnect", window.SERVER_PATH)
                }
            }else {
                alert("当前环境暂不支持聊天")
            }
            //解密文本
            function decodeMessage(message, nonce, publicKey) {
            	try{
            		let secretKey = localStorage.getItem("sec_key")
	                let mgwen = nacl.box.open(nacl.util.decodeBase64(message), nacl.util.decodeBase64(nonce), nacl.util.decodeBase64(publicKey), nacl.util.decodeBase64(secretKey))
	                return nacl.util.encodeUTF8(mgwen)
            	}catch(e){
            		if(state.langValue == "zh-CN") {
                        return "***密钥已更新，此消息无法解开***"
                    }else {
                        return "***Key has been updated, this message cannot be undone***"
                    }
            	}
            }
            //生成时间
			function createTime(times) {
                let nowTime = new Date()
                let time = new Date(times * 1000)
                let Y = time.getFullYear()
                let M = (time.getMonth()+1 < 10 ? '0'+(time.getMonth()+1) : time.getMonth()+1)
                let D = time.getDate()
                let h = time.getHours()
                let m = time.getMinutes() <= 9 ? ("0" + time.getMinutes()) : time.getMinutes()
                let s = time.getSeconds() <= 9 ? ("0" + time.getSeconds()) : time.getSeconds()

                if(nowTime.getDate() == D) {
                    return (h + ":" + m + ":" + s)
                }else {
                    return (M + "/" + D + " " + h + ":" + m + ":" + s)
                }
			}
        },
        WSsend(state, data) {
            switch(state.ws.readyState) {
                case 0:
                    setTimeout(() => {
                        state.ws.send(JSON.stringify(data.data))
                        if(!data.callback) return;
                        function aa (e) {
                            let res = e;
                            data.callback(JSON.parse(res.data))
                            state.ws.removeEventListener("message", aa)
                        }
                        state.ws.addEventListener("message", aa)
                    }, 1000)
                    break;
                case 1:
                    state.ws.send(JSON.stringify(data.data))
                    if(!data.callback) return;
                    function aa (e) {
                        let res = e;
                        data.callback(JSON.parse(res.data))
                        state.ws.removeEventListener("message", aa)
                    }
                    state.ws.addEventListener("message", aa)
                    break;
                case 2:
                    if(state.langValue == "zh-CN") {
                        this.commit("showTopPopup", "连接尚未连接正在进行关闭建立")
                    }else {
                        this.commit("showTopPopup", "Connection closed")
                    }
                    break;
                case 3:
                	if(state.langValue == "zh-CN") {
                        this.commit("showTopPopup", "连接已经关闭或者连接不能打开")
                    }else {
                        this.commit("showTopPopup", "Connection closed")
                    }
                    break;
                default:
                    break;
            }
        },
        addChatUser(state, data) {
            state.changeM = new Date().getTime()
            if(state.chatUserList.hasOwnProperty(data.userid)) {
                if(data.list.length > 0) {
                    state.chatUserList[data.userid].list.push(data.list[0])
                }
                state.chatUserList[data.userid].pk = data.pk
            }else {
                state.chatUserList[data.userid] = data
            }
            // 缓存聊天记录
            localStorage.setItem("CHATDATA", JSON.stringify(state.chatUserList))
        },
        showTopPopup(state, msg) {
            state.tipText = msg
            state.isShowTopPopup = true
            setTimeout(() => {state.isShowTopPopup = false}, 1500)
        },
        showTopSuccess(state, msg) {
            state.tipText = msg
            state.isShowSuccess = true
            setTimeout(() => {state.isShowSuccess = false}, 1000)
        },
        showAlert(state, msg) {
            state.alertText = msg
            state.isShowAlert = true
        }
    }
})