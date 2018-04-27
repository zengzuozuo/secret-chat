<template>
    <div class="chat-in-page">
        <mu-appbar class="header">
            <i class="iconfont" slot="left" @click="$router.go(-1)">&#xe621;</i>
            <div slot="left">
                <p>{{$route.query.id}}</p>
                <span>匿名用户</span>
            </div>
        </mu-appbar>
        <div class="main" ref="main">
            <ul ref="listWrap">
                <li v-for="item in chatListData[$route.query.id].list" :class="{'self' : item.self}">
                    <i class="iconfont" slot="left">&#xe62c;</i>
                    <p>{{item.message}}</p>
                </li>
            </ul>
        </div>
        <footer>
            <div class="input-wrap">
                <mu-text-field hintText="输入您的消息" v-model="messageText" multiLine :rows="1" :rowsMax="10"/>
                <i class="iconfont" @click="sendMessage" slot="left">&#xe60c;</i>
            </div>
            <div style="display: none">{{changeM}}</div>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            messageText: "",
            timestamp: ""
        }
    },
    updated() {
        this.scrollBottom()
    },
    mounted() {
        console.log(this.chatListData)
        this.scrollBottom()
    },
    methods: {
        sendMessage() {
            if(this.messageText.trim() == "") {
                this.$store.commit("showTopPopup","发送内容不能为空")
                return;
            }
            const to_user_id = this.$route.query.id
            let publicKey = this.$store.state.chatUserList[to_user_id].pk
            

            let nonce = nacl.randomBytes(nacl.secretbox.nonceLength)
            let B64nonce = nacl.util.encodeBase64(nonce)

            let secretKey = localStorage.getItem("sec_key")
            let miwen = nacl.box(nacl.util.decodeUTF8(this.messageText), nonce, nacl.util.decodeBase64(publicKey), nacl.util.decodeBase64(secretKey))

            const userid = localStorage.getItem("userid")


            this.timestamp = new Date().getTime()  //产生随机数
            this.$store.commit("WSsend", {
                data: {
                    method: "postMessage",
                    params: [userid, to_user_id, 1, nacl.util.encodeBase64(miwen), B64nonce, this.timestamp]
                },
                callback: (res) => {
                    if(res.code === 200 && res.method == "postMessage") {
                        if(!res.serial) return;
                        if(res.serial != this.timestamp) return;
                        this.timestamp = new Date().getTime()
                        console.log("chatin")
                        var date = new Date(); //获取到当前的系统时间
                        
                        var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
                        this.$store.commit("addChatUser", {
                            userid: to_user_id,
                            list: [{message: this.messageText, self: true, time: time}],
                            pk: publicKey
                        })
                        this.messageText = ""
                    }
                }
            })
            
        },
        scrollBottom() {
            if(!this.$refs.main) return
            this.$refs.main.scrollTop = this.$refs.main.scrollHeight
        }
    },
    computed:{
        chatListData(){
            return this.$store.state.chatUserList
        },
        changeM() {
            return this.$store.state.changeM
        } 
    }
}
</script>

<style scoped lang="less">
.chat-in-page {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .header {
        .iconfont {
            font-size: 30px;
        }
        div {
            padding: 0 20px;
        }
    }
    .main {
        flex: 1;
        -webkit-overflow-scrolling: touch;
        overflow-y: scroll;
        ul {
            padding: 10px 0;
            li {
                display: flex;
                margin-top: 10px;
                padding: 0 5px;
                &.self {
                    flex-direction: row-reverse;
                    p {
                        margin: 0 10px 0 30px;
                    }
                }
                .iconfont {
                    font-size: 30px;
                    color: #7e57c2;
                }
                p {
                    padding: 10px;
                    box-shadow: 0 0 10px #d5d5d5;
                    margin: 0 30px 0 10px;
                }
            }
        }
    }
    footer {
        padding: 10px 20px;
        border-top: 2px solid #d5d5d5;
        .input-wrap {
            display: flex;
            align-items: center;
            .mu-text-field {
                flex: 1;
                margin: 0 10px 0 0;
            }
            .iconfont {
                font-size: 20px;
                color: #7e57c2;
            }
        }
    }
}
</style>

