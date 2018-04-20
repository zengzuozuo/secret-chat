<template>
    <div class="login-page">
        <div class="main">
            <img class="login-img" src="static/images/login_img.png" />
        </div>
        <footer>
            <h3>密聊</h3>
            <p>一款基于区块链的顶级安全匿名聊天软件</p>
            <mu-text-field hintText="请输入您的短信密码语句进行登录"/>
            <mu-raised-button label="登录" @click.native="$router.push('chatlist')" primary class="login-btn"/>
            <a class="register" href="#/register">没有帐号？创建一个新的匿名帐号>></a>
        </footer>
    </div>
</template>

<style lang="less">
.login-page {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .main {
        flex: 1;
        position: relative;
        .login-img {
            position: absolute;            
            max-width: 90%;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }  
    }
    footer {
        padding: 10px 10%;
        text-align: center;
        box-sizing: border-box;
        .mu-text-field {
            display: block;
            width: 100%;
            margin: 10px auto;
            .mu-text-field-input {
                text-align: center;
            }
        }
        h3 {
            font-size: 20px;
            padding: 10px 0;
        }
        p {
            font-size: 14px;
        }
        .register {
            display: block;
            margin: 20px auto;
        }
    }
}
</style>
