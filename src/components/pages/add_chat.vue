<template>
    <div class="add-chat-page">
        <div class="main">
            <mu-text-field label="对方地址" labelFloat/>
            <mu-text-field hintText="输入您的信息" v-model="message" multiLine :rows="1" :rowsMax="10"/>
            <mu-raised-button label="发送" @click.native="send" fullWidth/>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: ""
        }
    },
    methods: {
        send() {
            console.log(this.message)
            
        }
    }
}
</script>

<style scoped lang="less">
.add-chat-page {
    .main {
        padding: 20px 10%;
        .mu-text-field {
            width: 100%;
            text-align: left;
        }
    }
}
</style>

