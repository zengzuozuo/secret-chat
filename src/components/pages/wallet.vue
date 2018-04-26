<template>
    <div class="wallet-page">
        <div class="main">
            <div class="menu">
                <i class="iconfont">&#xe611;</i>
                <div class="content">
                    <label>您的地址</label>
                    <p>{{userid}}</p>
                </div>
                <mu-raised-button :label="$t('message.copy')" :data-clipboard-text="userid" @click.native="copy" class="tag-read"/>
            </div>
            <p class="tip">把地址发给他人，他人即可通过密聊发送相应的信息到您的地址</p>
            <div class="menu" v-if="pageData">
                <i class="iconfont">&#xe781;</i>
                <div class="content">
                    <label>您的余额</label>
                </div>
                <div class="balance"><span>{{pageData.balance}}</span>条</div>
            </div>
            <ul class="combo-list" v-if="pageData">
                <li v-for="item in pageData.result">
                    <label>{{item.title}}</label>
                    <div class="content">{{item.memo}}</div>
                    <mu-raised-button label="限时免费" v-if="item.amount == 0" @click.native="buy(item.pack_id)" />
                    <mu-raised-button :label="item.amount + 'SAC'" v-if="item.amount != 0" @click.native="buy(item.pack_id)" />
                </li>
            </ul>
            <div class="flex-wrap">
                <p class="tip no-border">备注：您充值的sac，一部分是以太坊公网收取的，一部分是我们的运营开发费用。</p>
                <i class="iconfont" @click="$router.push('specification')">&#xe600;</i>
            </div>
            <mu-toast v-if="toast" :message="toastMessage" class="tipbox" />
        </div>
    </div>
</template>

<script>
import Clipboard from 'clipboard'

export default {
    data () {
        return {
            userid: sessionStorage.getItem('userid') || "",
            toast: false,
            toastMessage: "",
            pageData: null,
            timestamp: ""
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        copy() {
            var clipboard = new Clipboard('.tag-read')  
            clipboard.on('success', e => {  
                this.$store.commit("showTopSuccess", this.$t('message.copySuccess'))
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
        getData() {
            this.timestamp = new Date().getTime()
            this.$store.commit("WSsend", {
                data: {
                    method: "getTariffPackages",
                    params: [this.userid, this.timestamp]
                },
                callback: (res) => {
                    if(res.code == 200 && res.method == "getTariffPackages") {
                        if(res.serial != this.timestamp) return;
                        this.pageData = res
                    }
                }
            })
        },
        buy(id) {
            this.timestamp = new Date().getTime()
            this.$store.commit("WSsend", {
                data: {
                    method: "buyTariffPackages",
                    params: [this.userid, id, this.timestamp]
                },
                callback: (res) => {
                    if(res.code == 200 && res.method == "buyTariffPackages") {
                        if(res.serial != this.timestamp) return;
                        console.log(res)
                        console.log(1111)
                        if(res.result == "OK") {
                            this.$store.commit("showAlert", "购买成功")
                            this.getData()
                        }else {
                            window.location.href = res.result.payUrl
                        }
                        
                    }
                }
            })
        }
    }
}
</script>

<style lang="less">
.wallet-page {
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    .main {
        margin: 0 10%;
        .menu {
            display: flex;
            margin: 20px 0 0;
            align-items: center;
            .iconfont {
                font-size: 40px;
            }
            .content {
                flex: 1;
                align-self: center;
                text-align: left;
                padding: 0 10px;
                font-size: 16px;
                overflow: hidden;
                p {
                    white-space: wrap;
                    overflow: hidden;
                    word-wrap:break-word
                }
            }
            
            .tag-read {
                min-width: auto;
            }
            .balance {
                font-size: 16px;
                span {
                    display: inline-block;
                    padding: 0 5px;
                    font-size: 30px;
                    font-weight: bold;
                    color: #7e57c2;
                }
            }
        }
        .tip {
            margin: 10px 0;
            font-size: 12px;
        }
        .flex-wrap {
            display: flex;
            align-items: center;
            .tip {
                flex: 1;
                border-bottom: 1px solid #d5d5d5;
                margin: 20px 0;
                text-align: left;
                padding: 0 0 5px 0;
                font-size: 12px;
                &.no-border {
                    border: none;
                }
            }
            .iconfont {
                font-size: 20px;
            }
        }
        
        .combo-list {
            li {
                display: flex;
                align-items: center;
                margin: 10px 0 30px;
                label {
                    font-weight: 700;
                }
                .content {
                    flex: 1;
                    padding: 0 10px;
                }
            }
        }
        .tipbox {
            text-align: center;
        }
    }
}
</style>
