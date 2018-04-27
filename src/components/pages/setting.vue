<template>
    <div class="set-page">
        <div class="main">
            <ul>
                <li>
                    <h3>{{$t('message.safety')}}</h3>
                    <div class="content">
                        <mu-checkbox v-model="$store.state.minute5logout" :label="$t('message.set1')" class="demo-checkbox"/>
                    </div>
                </li>
                <li>
                    <h3>{{$t('message.set2')}}
                        <mu-dropDown-menu :value="$store.state.langValue" @change="handleChange">
                            <mu-menu-item value="zh-CN" :title="$t('message.Chinese')"/>
                            <mu-menu-item value="en-US" :title="$t('message.English')"/>
                        </mu-dropDown-menu>
                    </h3>
                    
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
            sessionStorage.setItem("LANG", langValue)
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
    .main {
        margin: 0 10%;
        ul {
            li {
                margin-top: 30px;
                h3 {
                    font-size: 18px;
                    font-weight: 400;
                    border-bottom: 1px solid #d5d5d5;
                    text-align: left;
                    line-height: 40px;
                }
                .content {
                    margin: 20px auto;
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

