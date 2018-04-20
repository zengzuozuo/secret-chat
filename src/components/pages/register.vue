<template>
    <div class="register-page">
        <mu-appbar class="header">
            <i class="iconfont" slot="left" @click="$router.go(-1)">&#xe621;</i>
        </mu-appbar>
        <div class="main">
            <p class="label">您的匿名账户已经生成，由以下12个字母构成</p>
            <div class="select-wrap">
                <textarea></textarea>
                <mu-raised-button label="复制" />
            </div>
            <p class="tip">备注：<br />请务必保存账号密码短句.如果丢失, 将无法找回 ！<br />请务必不要泄露给第三方，否则您的信息可能被泄露！</p>
            <div class="login-container">
                <mu-text-field hintText="请输入您的短信密码语句进行登录"/>
                <mu-raised-button label="登录" @click.native="$router.push('chatlist')" primary class="login-btn"/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.register-page {
    .header {
        .iconfont {
            font-size: 30px;
        }
    }
    .main {
        padding: 0 5%;
        .label {
            padding: 10px 0;
            margin-top: 10px;
        }
        .select-wrap {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #d5d5d5;
            margin-top: 10px;
            textarea {
                flex: 1;
                border: none;
                
            }
        }
        .tip {
            margin-top: 20px;
            font-style: italic;
            font-size: 12px;
        }
        .login-container {
            margin: 10% 0 0 0;
            .mu-text-field {
                display: block;
                width: 100%;
                .mu-text-field-content {
                    text-align: center;
                    .mu-text-field-hint {
                        text-align: center !important;
                    }
                    .mu-text-field-input {
                        text-align: center;
                    }
                }
                
            }
            .mu-raised-button {
                display: block;
                margin: 0 auto;
                width: 60%;
            }
        }
    }
}
</style>
