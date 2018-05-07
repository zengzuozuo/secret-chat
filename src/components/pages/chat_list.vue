<template>
    <div class="chat-list-page">
        <header>{{$t("message.chat")}}</header>
        <div class="main">
            <div class="add-chat" @click="isShowAlert = true">
                <img class="icon" src="static/images/add_icon.png" />
                <div class="content">{{$t('message.chatlist1')}}</div>
                <div style="display: none">{{changeM}}</div>
            </div>
            <ul>
                <li v-for="item,index in chatListData" :key="index" @click="$router.push({path: 'chatin', query: {id: item.userid}})">
                    <!-- <i class="iconfont">&#xe620;</i> -->
                    <img src="static/images/chat_icon.png" class="icon" />
                    <div class="content">
                        <div>
                            <h3>{{item.userid}}</h3>
                            <span v-if="item.list.length > 0">{{item.list[item.list.length - 1].time}}</span>
                            
                        </div>
                        <p v-if="item.list.length > 0" style="-webkit-box-orient: vertical;">{{item.list[item.list.length - 1].message}}</p>
                        <p v-if="item.list.length <= 0" style="-webkit-box-orient: vertical;">{{$t('message.chatlist8')}}</p>
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
                this.$store.commit("showTopPopup", this.$t('message.chatlist6'))
                return;
            }
            if(this.to_user_id == localStorage.getItem("userid")) {
                this.$store.commit("showTopPopup", this.$t('message.chatlist7'))
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
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    background-color: #F5F5F5;
    header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        line-height: 44px;
        font-size: 18px;
        background-color: #fff;
    }
    .main {
        padding: 50px 0 0;
        
        .add-chat {
            display: flex;
            align-items: center;
            padding: 10px 20px;
            top: 0;
            left: 0;
            background-color: #fff;
            border-bottom: 1px solid #d5d5d5;
            .icon {
                width: 40px;
                height: 40px;
            }
            .iconfont {
                font-size: 40px;
            }
            .content {
                flex: 1;
                text-align: left;
                padding: 0 10px;
                font-size: 16px;
                color: #317ae2;
            }
        }
        ul {
            margin: 10px 10px;
            li {
                display: flex;
                align-items: center;
                margin: 10px 0 0;
                padding: 10px 10px;
                background-color: #fff;
                border-radius: 6px;
                .icon {
                    width: 40px;
                    height: 40px;
                }
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
                        -webkit-box-orient: vertical !important;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                } 
            }
        }
    }
}
</style>

