<template>
    <div class="set-page">
        <header>设置</header>
        <div class="main">
            <ul>
                <li>
                    <h3>{{$t('message.safety')}}</h3>
                    <div class="content">
                        <mu-checkbox v-model="$store.state.minute5logout" class="demo-checkbox"/>
                        <p class="flex1">{{$t('message.set1')}}</p>
                    </div>
                </li>
                <li>
                    <h3>{{$t('message.set2')}}</h3>
                    <div class="content">
                        <!-- <label>当前语言</label> -->
                        <mu-dropDown-menu class="flex1" :value="$store.state.langValue" @change="handleChange">
                            <mu-menu-item value="zh-CN" :title="$t('message.Chinese')"/>
                            <mu-menu-item value="en-US" :title="$t('message.English')"/>
                        </mu-dropDown-menu>
                    </div>
                </li>
            </ul>
            <mu-raised-button class="logout-btn" :label="$t('message.logout')" @click.native="logout" fullWidth primary/>            
            <p class="other-test-info">
                {{$t('message.specification1')}}<br /><br />
                {{$t('message.specification2')}}<br /><br />    
                {{$t('message.specification3')}}<br /><br />
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        logout() {
            const userid = localStorage.getItem("userid")
            this.$store.commit("WSsend", {
                data: {
                    method: "logout",
                    params: [userid]
                }
            })
        },
        // 切换语言
        handleChange (langValue) {
	        this.$store.state.langValue = langValue
            this.$i18n.locale = langValue
            localStorage.setItem("LANGUAGE", langValue)
        },
    },
    computed: {
        storeMinute5logout() {
            return this.$store.state.minute5logout
        }
    },
    watch: {
        storeMinute5logout(newval, oldval) {
            if(!newval) return;
            this.$store.state.timer = setTimeout(() => {
                this.$store.state.minute5logout = false                            
                let userid = localStorage.getItem("userid")
                this.$store.commit("WSsend", {
                    data: {
                        method: "logout",
                        params: [userid]
                    }
                })
            }, 300000)
        }
    }
}
</script>

<style lang="less">
.set-page {
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
        margin: 50px 10px 0;
        padding: 10px;
        background-color: #fff;
        ul {
            
            li {
                margin-top: 10px;
                h3 {
                    font-size: 18px;
                    font-weight: 400;
                    border-bottom: 1px solid #d5d5d5;
                    text-align: left;
                    line-height: 40px;
                }
                .content {
                    display: flex;
                    margin: 10px auto;
                    .flex1 {
                        flex: 1;
                        padding-left: 10px;
                        .mu-dropDown-menu-line {
                            margin: 0;
                        }
                        .mu-dropDown-menu-icon {
                            right: 0;
                        }
                    }
                }
            }
        }
        .other-test-info {
            border-top: 1px solid #d5d5d5;
            margin: 40px 0 0 0;  
            padding: 10px 0;
        }
        .logout-btn {
            margin-top: 20px;
        }
    }
}
</style>

