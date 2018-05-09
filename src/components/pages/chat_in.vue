<template>
    <div class="chat-in-page">
        <!--<mu-appbar class="header">
            <i class="iconfont" slot="left" @click="$router.go(-1)">&#xe621;</i>
            <div slot="left">
                <p>{{$route.query.id}}</p>
                <span>{{$t('message.chatin1')}}</span>
            </div>
        </mu-appbar>-->
        <header class="header">
        	<a href="javascript:;" class="back-btn" @click="$router.go(-1)"></a>
        	<div>
        		<p>{{$route.query.id}}</p>
        		<span>{{$t('message.chatin1')}}</span>
        	</div>
        </header>
        <div class="main" ref="main">
            <ul ref="listWrap">
                <li v-for="item in chatListData[$route.query.id].list" :class="{'self' : item.self}">
                    <i class="iconfont" slot="left">&#xe62c;</i>
                    <p>{{item.message}}</p>
                </li>
            </ul>
        </div>
        <footer ref="footer">
            <div class="input-wrap">
                <mu-text-field :hintText="$t('message.chatin2')" :errorText="inputErrorText" v-model="messageText" multiLine :rows="1" :rowsMax="6"/>
                <i class="iconfont" @click="getUserInfo" slot="left">&#xe60c;</i>
            </div>
            <div style="display: none">{{changeM}}</div>
            <!--<p class="large-tip" v-show="isShowlargeTip">文字输入已达上限</p>-->
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            messageText: "",
            timestamp: "",
            isShowlargeTip: false,
            inputErrorText: ""
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
    	getUserInfo() {
    		const to_user_id = this.$route.query.id
            if(to_user_id.trim() == "") {
                this.$store.commit("showTopPopup", this.$t('message.chatlist6'))
                return;
            }
            if(to_user_id == localStorage.getItem("userid")) {
                this.$store.commit("showTopPopup", this.$t('message.chatlist7'))
                return;
            }
            this.$store.state.loading = true
            this.timestamp = new Date().getTime()
            this.$store.commit("WSsend", {
                data: {
                    method: "getUserInfo",
                    params: [to_user_id, this.timestamp]
                },
                callback: (res) => {
                    console.log(1111)
                    if(!res.serial) return;
                    if(res.code === 200 && res.method == "getUserInfo") {
                        if(res.serial != this.timestamp) return;
                        this.sendMessage(res.result[0].pub_key)
                    }
                }
            })
            
        },
        sendMessage(publicKey) {

        	try{
        		if(this.messageText.trim() == "") {
	                this.$store.commit("showTopPopup", this.$t('message.chatin3'))
	                return;
	            }
	            if(this.$getStrLeng(this.messageText) > 384) {
	                this.$store.commit("showTopPopup", this.$t('message.chatin4'))
	                return
	            }
	            const to_user_id = this.$route.query.id
//	            let publicKey = this.$store.state.chatUserList[to_user_id].pk
	            
	
	            let nonce = nacl.randomBytes(nacl.secretbox.nonceLength)
	            let B64nonce = nacl.util.encodeBase64(nonce)
	
	            let secretKey = localStorage.getItem("sec_key")
	            console.log(publicKey)
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

	                        var date = new Date(); //获取到当前的系统时间
	                        var m = date.getMinutes() <= 9 ? ("0" + date.getMinutes()) : date.getMinutes()
	                        var s = date.getSeconds() <= 9 ? ("0" + date.getSeconds()) : date.getSeconds()
	                        var time = (date.getHours() <= 9 ? ("0" + date.getHours()) : date.getHours()) + ":" + m + ":" + s
	                        this.$store.commit("addChatUser", {
	                            userid: to_user_id,
	                            list: [{message: this.messageText, self: true, time: time}],
	                            pk: publicKey
	                        })
	                        this.messageText = ""
	                    }
	                }
	            })
        	}catch(e){
        		this.$store.commit("showTopPopup", this.$t('message.chatin5'))
        	}
            
            
        },
        scrollBottom() {
            if(!this.$refs.main) return
            this.$refs.main.scrollTop = this.$refs.main.scrollHeight
        },
        goBack() {
        	alert(1111)
        	this.$router.go(-1)
        }
    },
    watch: {
    	messageText(newValue, oldValue) {
    		if(this.$getStrLeng(newValue) > 384) {
    			this.inputErrorText = this.$t('message.chatin4')
    		}else {
				this.inputErrorText = ""    			
    		}

    		this.$refs.main.style = "padding-bottom:" + this.$refs.footer.offsetHeight + "px"
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
    /*position: fixed;
    top: 0;
    left: 0;*/
    width: 100%;
    height: 100%;
    overflow: hidden;
    .header {
    	position: absolute;
    	top: 0;
    	left: 0;
    	width: 100%;
        background-color: #317ae2;
        height: 56px;
        display: flex;
        align-items: center;
        z-index: 999999;
        .back-btn {
        	height: 100%;
        	width: 56px;
        	background: url('../../../static/images/arrow_back_icon.png') no-repeat center;
        	background-size: 60%;
        }
        div {
        	flex: 1;
            color: #fff;
        }

    }
    .main {
        height: 100%;
        padding: 56px 0 70px;
        box-sizing: border-box;
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
                    color: #5399ee;
                }
                p {
                    padding: 10px;
                    box-shadow: 0 0 10px #d5d5d5;
                    margin: 0 30px 0 10px;
                    border-radius: 6px;
                    word-wrap: break-word;
                    overflow: hidden;
                }
            }
        }
    }
    footer {
    	position: absolute;
    	bottom: 0;
    	left: 0;
    	width: 100%;
        padding: 10px 20px;
        border-top: 2px solid #d5d5d5;
        background-color: #fff;
        .input-wrap {
            display: flex;
            align-items: center;
            .mu-text-field {
                flex: 1;
                margin: 0 10px 0 0;
            }
            .iconfont {
                font-size: 24px;
                color: #238fea;
            }
        }
        .large-tip {
        	position: absolute;
        	bottom: 0;
        	left: 20px;
        	font-size: 12px;
        	color: #c33;
        }
    }
}
</style>

