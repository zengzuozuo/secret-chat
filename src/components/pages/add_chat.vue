<template>
    <div class="add-chat-page">
        <div class="main">
            <mu-text-field label="对方地址" v-model="to_user_id" labelFloat/>
            <mu-text-field hintText="输入您的信息" v-model="message" multiLine :rows="1" :rowsMax="10"/>
            <mu-raised-button label="发送" @click.native="getUserInfo" primary fullWidth/>
            <mu-popup position="top" popupClass="popup-top" :overlay="false" :open="topPopup">{{tipText}}</mu-popup>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: "",
            to_user_id: "",
            topPopup: false,
            tipText: "",
            keyPair1: "",
            keyPair2: "",
            nonce: "",
            timestamp: ""
        }
    },
    mounted() {
    },
    methods: {
        getUserInfo() {
            if(this.to_user_id.trim() == "") {
                this.$store.commit("showTopPopup","对方地址不能为空")
                return;
            }
            if(this.to_user_id == sessionStorage.getItem("userid")) {
                this.$store.commit("showTopPopup","无法向自己发送")
                return;
            }
            if(this.message.trim() == "") {
                this.$store.commit("showTopPopup","发送内容不能为空")
                return;
            }
            this.$store.state.loading = true
            this.timestamp = new Date().getTime()
            this.$store.commit("WSsend", {
                data: {
                    method: "getUserInfo",
                    params: [this.to_user_id, this.timestamp]
                },
                callback: (res) => {

                    if(!res.serial) return;
                    if(res.code === 200 && res.method == "getUserInfo") {
                        if(res.serial != this.timestamp) return;
                        this.timestamp = new Date().getTime()
                        this.send(res.result[0].pub_key)
                    }
                }
            })
            
        },
        send(publicKey) {
            

            let nonce = nacl.randomBytes(nacl.secretbox.nonceLength)
            let B64nonce = nacl.util.encodeBase64(nonce)

            let secretKey = localStorage.getItem("sec_key")
            let miwen = nacl.box(nacl.util.decodeUTF8(this.message), nonce, nacl.util.decodeBase64(publicKey), nacl.util.decodeBase64(secretKey))
            const userid = sessionStorage.getItem("userid")


            this.$store.commit("WSsend", {
                data: {
                    method: "postMessage",
                    params: [userid, this.to_user_id, 1, nacl.util.encodeBase64(miwen), B64nonce, this.timestamp]
                },
                callback: (res) => {
                    if(res.code === 200 && res.method == "postMessage") {
                        if(!res.serial) return;
                        if(res.serial != this.timestamp) return;
                        this.timestamp = new Date().getTime()

                        
                        this.$store.commit("addChatUser", {
                            userid: this.to_user_id,
                            list: [{message: this.message, self: true}],
                            pk: publicKey
                        })
                        this.$router.replace({
                            path: 'chatin',
                            query: {
                                id: this.to_user_id
                            }
                        })
                    }
                }
            })
            
            
        }
    }
}
</script>

<style scoped lang="less">
.add-chat-page {
    .main {
        padding: 20px 10%;
        .mu-text-field {
            width: 100%;
            text-align: left;
        }
        
    }
}

</style>

