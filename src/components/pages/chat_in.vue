<template>
    <div class="chat-in-page">
        <mu-appbar class="header">
            <i class="iconfont" slot="left" @click="$router.go(-1)">&#xe621;</i>
            <div slot="left">
                <p>uruwe7937462364</p>
                <span>匿名用户</span>
            </div>
        </mu-appbar>
        <div class="main">
            <ul>
                <li>
                    <i class="iconfont" slot="left">&#xe62c;</i>
                    <p>加仓贵州茅台！下午2点开始分批加！</p>
                </li>
                <li class="self">
                    <i class="iconfont" slot="left">&#xe62c;</i>
                    <p>加仓贵州茅台！下午2点开始分批加！加仓贵州茅台！下午2点开始分批加！加仓贵州茅台！下午2点开始分批加！加仓贵州茅台！下午2点开始分批加！加仓贵州茅台！下午2点开始分批加！</p>
                </li>
            </ul>
        </div>
        <footer>
            <div class="input-wrap">
                <mu-text-field hintText="输入您的消息" v-model="messageText" multiLine :rows="1" :rowsMax="10"/>
                <i class="iconfont" @click="sendMessage" slot="left">&#xe60c;</i>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            messageText: ""
        }
    },
    mounted() {
        
        var keyPair1 = nacl.box.keyPair();
        console.log(keyPair1)
    },
    methods: {
        sendMessage() {
            this.$store.commit("WSsend", this.messageText)
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

