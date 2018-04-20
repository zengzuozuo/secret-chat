<template>
    <div class="set-page">
        <div class="main">
            <ul>
                <li>
                    <h3>安全</h3>
                    <div class="content">
                        <mu-checkbox label="5分钟后，自动退出应用，退出后，需要重新输入匿名账户（12个英文字母）" class="demo-checkbox"/>
                    </div>
                </li>
            </ul>
            <p class="other-test-info">您所有的聊天，都是通过区块链浏览器加密，不会储存在第三方平台。<br /><br />您只要保存好您的密钥和匿名账户，您的隐私就可以得到保护。如果有人想恶意破解您的聊天，以目前计算机的能力，需要算好几百亿年。<br /><br />您可以去以太坊的区块链浏览器查询您的相关浏览记录，您的所有信息，都会加密上链。<br /><br />我们第一期放在以太坊公链上，您可以登录以太坊的区块链浏览器查看，以太坊是全球公认的区块链技术，并且用户众多，要想在这个网络作弊，需要说服51%的用户。</p>
        </div>
    </div>
</template>

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
            margin: 60px 0 0 0;  
            padding: 10px 0;
        }
    }
}
</style>

