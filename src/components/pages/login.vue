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
        </div>
        <footer>
            <mu-text-field v-model="userid" :hintText="$t('message.loginInputTip')"/>
            <mu-raised-button :label="$t('message.login')" @click.native="login" primary class="login-btn" />
            <a class="register" href="#/register">{{$t('message.registerText')}}>></a>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userid: "",
        }
    },
    methods: {
        login() {
            if(this.userid.trim() == "") {
                this.$store.commit("showTopPopup", "登录账号不能为空")
                return;
            }
            this.$store.commit("WSsend", {
                data: {
                    method: "login",
                    params: [this.userid]
                },
                callback: (res) => {
                    if(res.code == 200 && res.method == "login") {
                        localStorage.setItem("pub_key", res.result[0].pub_key)
                        localStorage.setItem("sec_key", res.result[0].sec_key)
                        sessionStorage.setItem('userid', this.userid)
                        this.$router.replace("chatlist")
                    }
                }
            })
        },
        handleChange (langValue) {
	      this.$store.state.langValue = langValue
	      this.$i18n.locale = langValue
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
            margin-bottom: 10%;
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
</style>
