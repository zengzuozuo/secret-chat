<template>
    <div class="chat-list-page">
        <div class="main">
            <div class="add-chat" @click="isShowAlert = true">
                <i class="iconfont">&#xe60d;</i>
                <div class="content">{{$t('message.chatlist1')}}</div>
                <div style="display: none">{{changeM}}</div>
            </div>
            <ul>
                <li v-for="item,index in chatListData" :key="index" @click="$router.push({path: 'chatin', query: {id: item.userid}})">
                    <i class="iconfont">&#xe620;</i>
                    <div class="content">
                        <div>
                            <h3>{{item.userid}}</h3>
                            <span v-if="item.list.length > 0">{{item.list[item.list.length - 1].time}}</span>
                            
                        </div>
                        <p v-if="item.list.length > 0">{{item.list[item.list.length - 1].message}}</p>
                        <p v-if="item.list.length <= 0">无</p>
                    </div>
                </li>
            </ul>
            <mu-dialog :open="isShowAlert" :title="$t('message.chatlist2')">
                <mu-text-field v-model="to_user_id" :hintText="$t('message.chatlist5')" style="width: 100%" />
                <mu-flat-button slot="actions" primary @click="isShowAlert = false" :label="$t('message.chatlist4')"/>
                <mu-flat-button slot="actions" primary @click="getUserInfo" :label="$t('message.chatlist3')"/>
            </mu-dialog>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShowAlert: false,
            to_user_id: ""
        }
    },
    methods: {
        addChat(publicKey) {
            this.$store.commit("addChatUser", {
                userid: this.to_user_id,
                list: [],
                pk: publicKey
            })
            this.$router.push({
                path: 'chatin',
                query: {
                    id: this.to_user_id
                }
            })
        },
        getUserInfo() {
            if(this.to_user_id.trim() == "") {
                this.$store.commit("showTopPopup","对方地址不能为空")
                return;
            }
            if(this.to_user_id == localStorage.getItem("userid")) {
                this.$store.commit("showTopPopup","无法向自己发送")
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
                    console.log(1111)
                    if(!res.serial) return;
                    if(res.code === 200 && res.method == "getUserInfo") {
                        if(res.serial != this.timestamp) return;
                        this.addChat(res.result[0].pub_key)
                    }
                }
            })
            
        },
    },
    computed: {
        chatListData(){
            return this.$store.state.chatUserList
        },
        changeM() {
            return this.$store.state.changeM
        }
    }
}
</script>

<style lang="less">
.chat-list-page {
    overflow: hidden;
    .main {
        height: 100%;
        padding: 20px 10% 0;
        box-sizing: border-box;
        -webkit-overflow-scrolling: touch;
        overflow-y: scroll;
        .add-chat {
            display: flex;
            align-items: center;
            // position: sticky;
            top: 0;
            left: 0;
            background-color: #fff;
            border-bottom: 1px solid #d5d5d5;
            .iconfont {
                font-size: 40px;
            }
            .content {
                flex: 1;
                text-align: left;
                padding: 0 10px;
                font-size: 16px;
            }
        }
        ul {
            margin: 10px 0;
            li {
                display: flex;
                align-items: center;
                margin: 20px 0;
                .iconfont {
                    font-size: 40px;
                }
                .content {
                    flex: 1;
                    text-align: left;
                    padding: 0 10px;
                    font-size: 16px;
                    overflow: hidden;
                    div {
                        display: flex;
                        align-items: center;
                        overflow: hidden;
                        h3 {
                            flex: 1;
                            font-size: 16px;
                            font-weight: normal;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        span {
                            font-size: 12px;
                            color: #d5d5d5;
                        }
                    }
                    p {
                        font-size: 14px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                } 
            }
        }
    }
}
</style>

