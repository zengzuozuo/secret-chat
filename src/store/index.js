import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        ws: null,
        chatUserList: {},
        isShowTopPopup: false, //顶部提示框
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
        langValue: "zh-CN"   //当前语言
    },
    mutations: {
        WSconnect(state, url) {
            if(!url) {
                console.error("websocket连接地址有误")
                state.tipText = "服务器连接地址有误"
                state.isShowTopPopup = true
                setTimeout(() => {state.isShowTopPopup = false}, 2000)
                return;
            }
            if ("WebSocket" in window) {
                state.ws = new WebSocket(url)
                state.ws.onopen = () => {
                    console.log("连接成功")
                    //关闭loading动画
                    state.loading = false
                    if(sessionStorage.getItem("userid")) {
                        this.commit("WSsend", {
                            data: {
                                method: "login",
                                params: [sessionStorage.getItem("userid")]
                            }
                        })
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
                    if(data.code == 3001) {
                        this.commit("showTopPopup", data.result)
                        return;
                    }
                    if(data.code != 200) return;
                    switch(data.method) {
                        case 'pushMessage':
                            let mingwen = decodeMessage(data.result.msg_data, data.result.msg_nonce, data.result.msg_pubkey)
                            
                            this.commit("addChatUser", {
                                userid: data.result.from_user_id,
                                list: [
                                    {
                                        message: mingwen,
                                        self: false
                                    }
                                ],
                                pk: data.result.msg_pubkey
                            })
                        break; 
                        case 'logout':
                            localStorage.removeItem("pub_key")
                            localStorage.removeItem("sec_key")
                            sessionStorage.removeItem("userid")
                            router.replace('login')
                        break;
                        case 'register':
                            state.registerUserid = data.result
                        break;
                        case 'login':
                            localStorage.setItem("pub_key", data.result[0].pub_key)
                            localStorage.setItem("sec_key", data.result[0].sec_key)
                        break;
                    }
                }
                
                state.ws.onclose = () => {
                    console.log("连接已关闭")
                    this.commit("showTopPopup", "连接已关闭")
                    state.loading = true
                    this.commit("WSconnect", "ws://13.231.69.243:3000/")
                }
            }else {
                alert("当前环境暂不支持聊天")
            }
            //解密文本
            function decodeMessage(message, nonce, publicKey) {
                let secretKey = localStorage.getItem("sec_key")
                let mgwen = nacl.box.open(nacl.util.decodeBase64(message), nacl.util.decodeBase64(nonce), nacl.util.decodeBase64(publicKey), nacl.util.decodeBase64(secretKey))
                return nacl.util.encodeUTF8(mgwen)
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
                    this.commit("showTopPopup", "连接尚未连接正在进行关闭建立")
                    break;
                case 3:
                    this.commit("showTopPopup", "连接已经关闭或者连接不能打开")
                    break;
                default:
                    break;
            }
        },
        addChatUser(state, data) {
            if(data.list[0].message.trim() == "") return
            state.changeM = new Date().getTime()
            if(state.chatUserList.hasOwnProperty(data.userid)) {
                state.chatUserList[data.userid].list.push(data.list[0])
                state.chatUserList[data.userid].pk = data.pk
            }else {
                state.chatUserList[data.userid] = data
            }
        },
        showTopPopup(state, msg) {
            state.tipText = msg
            state.isShowTopPopup = true
            setTimeout(() => {state.isShowTopPopup = false}, 8000)
        },
        showAlert(state, msg) {
            state.alertText = msg
            state.isShowAlert = true

        }
    }
})