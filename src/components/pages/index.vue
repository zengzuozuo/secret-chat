<template>
    <div class="index-page">
        <router-view class="index-tab-view"></router-view>
        <footer class="footer-bar">
            <mu-tabs :value="activeTab" lineClass="activeline" @change="handleTabChange">
                <mu-tab value="wallet" @click.native="switchTo('wallet')" href="javascript:;" :title="$t('message.my')">
                    <i class="iconfont">&#xe611;</i>
                </mu-tab>
                <mu-tab value="chatlist" @click.native="switchTo('chatlist')" href="javascript:;" :title="$t('message.chat')">
                    <i class="iconfont">&#xe663;</i>
                </mu-tab>
                <mu-tab value="setting" @click.native="switchTo('setting')" href="javascript:;" :title="$t('message.set')">
                    <i class="iconfont">&#xe68e;</i>
                </mu-tab>
                <!-- <mu-tab value="tab4" href="javascript:;" title="退出" @click.native="loginOut">
                    <i class="iconfont">&#xe642;</i>
                </mu-tab> -->
            </mu-tabs>
        </footer>
    </div>
</template>

<script>
export default {
    data () {
        return {
            activeTab: this.$route.name
        }
    },
    mounted() {
    },
    methods: {
        handleTabChange (val) {
            this.activeTab = val
        },
        loginOut() {
            this.$router.replace("login")
        },
        switchTo(path) {
            this.$router.replace(path)
        }
    },
    watch: {
        $route(to, from) {
            this.activeTab = to.name == "addchat" ? "chatlist" : to.name
        }
    }
}
</script>

<style lang="less">
.index-page {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .index-tab-view {
        flex: 1;
    }
    .footer-bar {
        .activeline {
            // display: none;
            color: #317ae2;
            background-color: #317ae2;
        }
        .mu-tabs {
            background-color: #fff;
            border-top: 1px solid #d5d5d5;
            a {
                color: #000;
            }
            .mu-tab-active {
                color: #317ae2;
                .iconfont {
                    font-size: 20px;
                }
            }
        }
    }

}
</style>
