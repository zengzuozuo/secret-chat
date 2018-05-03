<template>
    <div class="wallet-page">
        <header>{{$t('message.my')}}</header>
        <div class="main">
            <div class="menu-wrap">
                <div class="menu">
                    <img class="icon" src="static/images/qrcode_icon.png" />
                    <div class="content">
                        <p>{{userid}}</p>
                    </div>
                    <a href="javascript:;" :data-clipboard-text="userid" @click="copy" class="tag-read">{{$t('message.copyaddress')}}</a>
                </div>
                <p class="tip">{{$t('message.wallet1')}}</p>
                <div class="menu bt" v-if="pageData">
                    <img class="icon" src="static/images/wallet_icon.png" />
                    <div class="content">
                        <label>{{$t('message.wdye')}}</label>
                    </div>
                    <div class="balance"><span>{{pageData.balance}}</span>{{$t('message.wallet2')}}</div>
                </div>
            </div>
            
            <ul class="combo-list" v-if="pageData">
                <li v-for="item in pageData.result">
                    <div class="ctn-l">
                        <label>{{$store.state.langValue == "zh-CN" ? item.cn_title : item.en_title}} 
                            <img v-if="item.pack_id == 5 && $store.state.langValue == 'zh-CN'" src="static/images/chaozhi_icon.png" />
                            <img v-if="item.pack_id == 5 && $store.state.langValue == 'en-US'" src="static/images/chaozhi_en_icon.png" />
                        </label>
                        <div class="content">{{$store.state.langValue == "zh-CN" ? item.cn_memo : item.en_memo}}</div>
                    </div>
                    <mu-raised-button :label="$t('message.wallet4')" v-if="item.amount == 0" @click.native="buy(item.pack_id)" primary />
                    <mu-raised-button :label="item.amount + 'SAC'" v-if="item.amount != 0" @click.native="buy(item.pack_id)" primary />
                </li>
            </ul>
            <div class="flex-wrap">
                <p class="tip no-border">{{$t('message.wallet3')}}</p>
                <!-- <i class="iconfont" @click="$router.push('specification')">&#xe600;</i> -->
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
            userid: localStorage.getItem('userid') || "",
            toast: false,
            toastMessage: "",
            pageData: null,
            timestamp: ""
        }
    },
    mounted() {
        this.getData();
        this.$store.state.langValue = localStorage.getItem("LANGUAGE") || "zh-CN"
        this.$i18n.locale = localStorage.getItem("LANGUAGE") || "zh-CN"
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
                this.$store.commit("showTopPopup", this.$t('message.tip01'))  //该浏览器不支持自动复制
                // 释放内存  
                clipboard.destroy()  
            })  
        },
        getData() {
            this.timestamp = new Date().getTime()
            console.log([this.userid, this.timestamp])
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
                    params: [this.userid, id, this.$store.state.langValue, this.timestamp]
                },
                callback: (res) => {
                    if(res.code == 200 && res.method == "buyTariffPackages") {
                        if(res.serial != this.timestamp) return;
                        console.log(res)
                        if(res.result == "OK") {
                            this.$store.commit("showAlert", $t('message.wallet5'))
                            this.getData()
                        }else {
                            localStorage.setItem("LANGUAGE", this.$store.state.langValue)
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
        padding-top: 50px;
        .menu-wrap {
            background-color: #fff;
            overflow: hidden;
            a {
                color: #317ae2;
            }
            .menu {
                display: flex;
                padding: 12px 20px;            
                align-items: center;
                background-color: #fff;
                &.bt {
                    border-top: 1px solid #DCDCDC;
                }
                .icon {
                    width: 30px;
                }
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
                        word-wrap:break-word;
                        color: #317ae2;
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
                        font-size: 25px;
                        font-weight: bold;
                        color: #317ae2;
                    }
                }
            }
            .tip {
                margin: 10px 0;
                padding: 0 20px;
                font-size: 12px;
                color: #999;
            }
        }
        
        .flex-wrap {
            display: flex;
            align-items: center;
            .tip {
                flex: 1;
                border-bottom: 1px solid #d5d5d5;
                margin: 10px 0;
                text-align: left;
                padding: 0 20px 5px;
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
            padding: 10px 5px;
            overflow: hidden;
            li {
                display: flex;
                align-items: center;
                background: url('../../../static/images/bg1.png') no-repeat center;
                background-size: 100% 100%;
                overflow: hidden;
                border-radius: 6px;
                padding: 12px 15px;
                margin: 10px 0 0;
                .ctn-l {
                    flex: 1;
                    .content {
                        padding: 5px 0;
                    }
                }
                label {
                    font-weight: 700;
                    img {
                        height: 16px;
                        vertical-align: middle;
                    }
                }
                
            }
        }
        .tipbox {
            text-align: center;
        }
    }
}
</style>
