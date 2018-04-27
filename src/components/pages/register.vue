<template>
    <div class="register-page">
        <!-- <mu-appbar class="header" title="新用户注册">
            <i class="iconfont" slot="left" @click="$router.go(-1)">&#xe621;</i>
        </mu-appbar> -->
        <div class="main">
            <p class="label">您的秘钥已经生成</p>
            <div class="textarea-wrap">
                <textarea v-model="secretKey" disabled></textarea>
                <mu-raised-button :label="$t('message.copy')" :data-clipboard-text="secretKey" @click.native="copy" class="tag-read"/>
            </div>
            <p class="tip">重要提示：<br />此密钥将用户加解密您的聊天信息<br />请务必保存您的秘钥.如果丢失, 将无法找回 ！<br />请不要泄露给第三方，否则您的信息可能被泄露,我们概不负责！</p>
            <div class="login-container">
                <mu-raised-button label="我已保存，去聊天!" v-show="isRegisterOk" @click.native="login" primary class="login-btn"/>
            </div>
            <mu-toast v-if="toast" :message="toastMessage" class="tipbox" />
        </div>
    </div>
</template>

<script>
import Clipboard from 'clipboard'
export default {
    data() {
        return {
            userid: "",
            loginUserid: "",
            toast: false,
            timestamp: "",
            secretKey: "",
            isRegisterOk: false
        }
    },
    mounted() {
        this.register();

    },
    computed: {
        registerUserid() {
            return this.$store.state.registerUserid
        }
    },
    methods: {
        copy() {
            var clipboard = new Clipboard('.tag-read')  
            clipboard.on('success', e => {  
                this.$store.commit("showTopSuccess", this.$t('message.copySuccess'))  //复制成功
                // 释放内存  
                clipboard.destroy()  
            })  
            clipboard.on('error', e => {  
                this.$store.commit("showTopPopup", this.$t('message.tip01'))  //该浏览器不支持自动复制
                // 释放内存  
                clipboard.destroy()  
            })  
        },
        register() {
            // 生成秘钥
            const keyPair = nacl.box.keyPair();
            const publicKey = nacl.util.encodeBase64(keyPair.publicKey)
            const secretKey = nacl.util.encodeBase64(keyPair.secretKey)
            
            const urlQuery = this.$route.query
            this.$store.commit("WSsend", {
                data: {
                    method: "register",
                    params: [urlQuery.userId, publicKey, secretKey]
                },
                callback: (res) => {
                    if(res.code == 200 && res.method == "register") {
                        sessionStorage.setItem("userid", urlQuery.userId)
                        localStorage.setItem("userid", urlQuery.userId)
                        localStorage.setItem("pub_key", publicKey)
                        localStorage.setItem("sec_key", secretKey)
                        this.secretKey = secretKey  //显示用户秘钥
                        this.isRegisterOk = true  
                    }
                }
            })
        },
        login() {
            this.timestamp = new Date().getTime()
            this.$store.commit("WSsend", {
                data: {
                    method: "login",
                    params: [this.$route.query.userId, this.timestamp]
                },
                callback: (res) => {
                    if(res.code == 200 && res.method == "login" && res.serial == this.timestamp) {
                        this.$router.replace("chatlist")
                    }
                }
            })
        }
    }
    
}
</script>

<style scoped lang="less">
.register-page {
    .header {
        .iconfont {
            font-size: 30px;
        }
    }
    .main {
        padding: 0 5%;
        overflow: hidden;
        .label {
            padding: 10px 0;
            margin-top: 15px;
        }
        .textarea-wrap {
            display: flex;
            // align-items: center;
            border-bottom: 1px solid #d5d5d5;
            margin-top: 10px;
            padding-bottom: 10px;
            textarea {
                flex: 1;
                border: none;
                font-size: 12px;
                background-color: #fff;
                min-height: 50px;
                margin-right: 10px;
            }
        }
        .tip {
            margin-top: 30px;
            // font-style: italic;
            font-size: 12px;
            color: #c33;
        }
        .login-container {
            margin: 10% 0 0 0;
            .mu-text-field {
                display: block;
                width: 100%;
                .mu-text-field-hint {
                    text-align: center !important;
                }
                .mu-text-field-content {
                    text-align: center;
                    .mu-text-field-input {
                        text-align: center;
                    }
                }
                
            }
            .mu-raised-button {
                display: block;
                margin: 10% auto 0;
                width: 60%;
            }
        }
        .tipbox {
            text-align: center;
        }
    }
}
</style>
