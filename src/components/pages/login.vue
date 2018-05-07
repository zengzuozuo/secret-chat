<template>
    <div class="login-page">
        <div class="main">
            <h3>{{$t('message.miliao')}}</h3>
            <p>{{$t('message.miliaoPhrase')}}</p>
            <div class="lang-switch">
            	<mu-dropDown-menu :value="$store.state.langValue" @change="handleChange">
				    <mu-menu-item value="zh-CN" :title="$t('message.Chinese')"/>
				    <mu-menu-item value="en-US" :title="$t('message.English')"/>
				</mu-dropDown-menu>
            </div>
            <mu-dialog :open="isShowAlert" class="secretkey-input" :title="$t('message.login1')">
                <mu-text-field v-model="secretKey" :hintText="$t('message.login2')" style="width: 100%" />
                <p class="tip" style="color: #c33; font-size: 12px;">{{$t('message.login8')}}</p>
                <mu-flat-button slot="actions" @click="rebuild" primary :label="$t('message.login3')"/>
                <mu-flat-button slot="actions" primary @click="saveKey" :label="$t('message.chatlist3')"/>
                <a href="javascript:;" class="login-popup-close" @click="isShowAlert = false"><i class="iconfont">&#xe647;</i></a>
            </mu-dialog>
            <mu-dialog :open="rebuildAlert" :title="$t('message.login4')">
                {{$t('message.login5')}}
                <mu-flat-button slot="actions" @click="rebuildAlert = false" primary :label="$t('message.chatlist4')"/>
                <mu-flat-button slot="actions" primary @click="$router.replace({path: 'register', query: {userId: urlQuery.userId, userStatus: urlQuery.userStatus}})" :label="$t('message.chatlist3')"/>
            </mu-dialog>
            <div class="return-btn" @click="goBack">
            	<i class="iconfont">&#xe641;</i>
            </div>
        </div>
        <footer>
            <mu-raised-button :label="$t('message.login')" @click.native="auth" primary class="login-btn" />
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userid: "",
            isShowAlert: false,
            rebuildAlert: false,
            urlQuery: null,  //地址栏参数
            secretKey: ""
        }
    },
    mounted() {
        this.urlQuery = this.$route.query
        localStorage.removeItem("key_store")
        localStorage.removeItem("pub_key")
        localStorage.removeItem("sec_key")
        localStorage.removeItem("userid")
        localStorage.removeItem("CHATDATA")
        
		this.$store.state.langValue = localStorage.getItem("LANGUAGE") || "zh-CN"
        this.$i18n.locale = localStorage.getItem("LANGUAGE") || "zh-CN"
    },
    methods: {
        login() {
            this.urlQuery = this.$route.query
            // 判断是否为新用户
            if(this.urlQuery.userStatus == 0) {
                this.$router.replace({path: 'register', query: {userId: this.urlQuery.userId, userStatus: this.urlQuery.userStatus}})
                return;
            }
            let keyStore = JSON.parse(localStorage.getItem("key_store"))
            if(!keyStore) {
                // 弹出秘钥输入框
                this.isShowAlert = true
                return
            }
            // 验证本地是否有秘钥
            if(keyStore.userid == this.urlQuery.userId) {
                // 登录
                this.$store.commit("WSsend", {
                    data: {
                        method: "login",
                        params: [this.urlQuery.userId]
                    },
                    callback: (res) => {
                        if(res.code == 200 && res.method == "login") {
                            localStorage.setItem("pub_key", res.result[0].pub_key)
//                          localStorage.setItem("sec_key", res.result[0].sec_key)
                            localStorage.setItem('userid', this.urlQuery.userId)
                            sessionStorage.setItem('userid', this.urlQuery.userId)
                            this.$router.replace("chatlist")
                        }
                    }
                })
            }else {
                // 弹出秘钥输入框
                this.isShowAlert = true
            }
        },
        // 切换语言
        handleChange (langValue) {
	        this.$store.state.langValue = langValue
            this.$i18n.locale = langValue
            sessionStorage.setItem("LANG", langValue)
            localStorage.setItem("LANGUAGE", langValue)
        },
        // 重新生成
        rebuild() {
            this.isShowAlert = false
            this.rebuildAlert = true
        },
        // 验证
        auth() {
            if(!this.$route.query.authCode) {
                this.$store.commit("showAlert", this.$t('message.login6'))
                return
            }
            this.$store.commit("WSsend", {
                data: {
                    method: "auth",
                    params: [this.$route.query.userId, this.$route.query.authCode]
                },
                callback: (res) => {
                    if(res.code == 200 && res.method == "auth") {
                        this.login()
                    }
                    
                }
            })
        },
        // 保存秘钥
        saveKey() {
            console.log(this.secretKey)
            if(this.secretKey.trim() == "") {
                this.$store.commit("showTopPopup", this.$t('message.login7'))
                return;
            }
            localStorage.setItem("sec_key", this.secretKey)
            localStorage.setItem("key_store", JSON.stringify({userid: this.urlQuery.userId, sec_key: this.secretKey}))
            this.login()
        },
        //返回 .. 关闭webview
        goBack() {
        	try{
        		window.app.closeWebView()
        	}catch(e){
        		window.history.go(-1)
        	}
        }
    },
    computed: {
        safetyStatus() {
            return this.$store.state.safetyStatus
        }
    }
}
</script>


<style lang="less">
.login-page {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: url('../../../static/images/login_bg.jpg') no-repeat center;
    background-size: cover;
    .main {
        flex: 1;
        position: relative;
        color: #fff;
        h3 {
            text-align: center;
            font-size: 40px;
            font-weight: normal;
            margin-top: 20%;
        }
        p {
            text-align: center;
            padding: 0 20px;
        }
        .lang-switch {
        	position: absolute;
        	right: 0;
        	top: 0;
			color: #fff;
        	.label {
        		vertical-align: middle;
        	}
        	.mu-dropDown-menu-text {
        		color: #fff;
        	}
        	.mu-dropDown-menu-icon {
        		color: #fff;
        	}
        }
        .return-btn {
        	position: absolute;
        	top: 12px;
        	left: 12px;
        	.iconfont {
        		font-size: 20px;
        	}
        	
        }
    }
    footer {
        padding: 10px 10%;
        text-align: center;
        box-sizing: border-box;
        .mu-text-field {
            display: block;
            width: 100%;
            margin: 10px auto;
            color: #cccdce;
            .mu-text-field-hint {
                color: #cccdce;
            }
            .mu-text-field-input {
                text-align: center;
                color: #cccdce;
            }
        }
        .login-btn {
            width: 80%;
            margin-bottom: 40%;
        }
        h3 {
            font-size: 20px;
            padding: 10px 0;
        }
        p {
            font-size: 14px;
        }
        .register {
            display: block;
            margin: 20px auto;
            color: #cccdce;
        }
    }
}
.mu-dialog {
	position: relative;
}
.login-popup-close {
	position: absolute;
	top: 5px;
	right: 10px;
	.iconfont {
		font-size: 16px;
		color: #bfb4b4;
	}
}
</style>
