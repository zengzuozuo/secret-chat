import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        ws: null
    },
    mutations: {
        WSconnect(state, url) {
            if(!url) {
                console.error("websocket连接地址有误")
                return;
            }
            if ("WebSocket" in window) {
                state.ws = new WebSocket(url)
                state.ws.onopen = function()
               {
                // state.ws.send("发送数据");
                  console.log("连接成功");
               };
                
               state.ws.onmessage = function (evt) 
               { 
                  var received_msg = evt.data;
                  console.log(received_msg)
                  console.log("数据已接收...");
               };
                
               state.ws.onclose = function()
               { 
                  // 关闭 websocket
                  console.log("连接已关闭..."); 
               };
            }else {
                alert("当前环境暂不知道聊天")
            }
            
        },
        WSsend(state, data) {
            console.log(state.ws.readyState)
            if(!state.ws) return;
            if(state.ws.readyState == 1) {
                state.ws.send(data)
            }
        }
    }
})