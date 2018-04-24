<template>
    <div class="register-page">
        <mu-appbar class="header" title="新用户注册">
            <i class="iconfont" slot="left" @click="$router.go(-1)">&#xe621;</i>
        </mu-appbar>
        <div class="main">
            <p class="label">您的匿名账户已经生成，由以下12个字母构成</p>
            <div class="textarea-wrap">
                <textarea v-model="registerUserid" disabled></textarea>
                <mu-raised-button label="复制" :data-clipboard-text="registerUserid" @click.native="copy" class="tag-read"/>
            </div>
            <p class="tip">备注：<br />请务必保存账号密码短句.如果丢失, 将无法找回 ！<br />请务必不要泄露给第三方，否则您的信息可能被泄露！</p>
            <div class="login-container">
                <mu-text-field v-model="loginUserid" hintText="请输入您的短信密码语句进行登录"/>
                <mu-raised-button label="登录" @click.native="login" primary class="login-btn"/>
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
            timestamp: ""
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
                this.toastMessage = "复制成功"
                this.toast = true
                setTimeout(() => {
                    this.toast = false
                },1000)
                // 释放内存  
                clipboard.destroy()  
            })  
            clipboard.on('error', e => {  
                this.toastMessage = "该浏览器不支持自动复制"
                this.toast = true
                setTimeout(() => {
                    this.toast = false
                },1000) 
                // 释放内存  
                clipboard.destroy()  
            })  
        },
        register() {
            const keyPair = nacl.box.keyPair();
            const publicKey = nacl.util.encodeBase64(keyPair.publicKey)
            const secretKey = nacl.util.encodeBase64(keyPair.secretKey)
            
            var openId = new Date().getTime()
            this.$store.commit("WSsend", {
                data: {
                    method: "register",
                    params: [openId, publicKey, secretKey]
                }
            })
        },
        login() {
            if(this.loginUserid.trim() == "") {
                this.$store.commit("showTopPopup", "登录账号不能为空")
                return;
            }
            this.timestamp = new Date().getTime()
            this.$store.commit("WSsend", {
                data: {
                    method: "login",
                    params: [this.loginUserid, this.timestamp]
                },
                callback: (res) => {
                    if(res.code == 200 && res.method == "login" && res.serial == this.timestamp) {
                        localStorage.setItem("pub_key", res.result[0].pub_key)
                        localStorage.setItem("sec_key", res.result[0].sec_key)
                        sessionStorage.setItem('userid', this.loginUserid)
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
        .label {
            padding: 10px 0;
            margin-top: 10px;
        }
        .textarea-wrap {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #d5d5d5;
            margin-top: 10px;
            textarea {
                flex: 1;
                border: none;
                font-size: 16px;
                background-color: #fff;
            }
        }
        .tip {
            margin-top: 20px;
            font-style: italic;
            font-size: 12px;
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
                margin: 0 auto;
                width: 60%;
            }
        }
        .tipbox {
            text-align: center;
        }
    }
}
</style>
