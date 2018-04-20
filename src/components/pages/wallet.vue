<template>
    <div class="wallet-page">
        <div class="main">
            <div class="menu">
                <i class="iconfont">&#xe611;</i>
                <div class="content">
                    <label>您的地址</label>
                    <p>u34234u9217372313231</p>
                </div>
            </div>
            <p class="tip">把地址发给他人，他人即可通过密聊发送相应的信息到您的地址</p>
            <div class="menu">
                <i class="iconfont">&#xe781;</i>
                <div class="content">
                    <label>您的套餐</label>
                </div>
            </div>
            <ul class="combo-list">
                <li>
                    <label>新手套餐</label>
                    <div class="content">免费发送5条信息</div>
                    <mu-raised-button label="限时免费" class=""/>
                </li>
                <li>
                    <label>初级套餐</label>
                    <div class="content">免费发送10条信息</div>
                    <mu-raised-button label="50SAC" class=""/>
                </li>
                <li>
                    <label>高级套餐</label>
                    <div class="content">免费发送100条信息</div>
                    <mu-raised-button label="500SAC" class=""/>
                </li>
            </ul>
            <div class="flex-wrap">
                <p class="tip no-border">备注：您充值的sac，一部分是以太坊公网收取的，一部分是我们的运营开发费用。</p>
                <i class="iconfont" @click="$router.push('specification')">&#xe600;</i>
            </div>
        </div>
    </div>
</template>

<style lang="less">
.wallet-page {
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    .main {
        margin: 0 10%;
        .menu {
            display: flex;
            margin: 20px 0 0;
            .iconfont {
                font-size: 40px;
            }
            .content {
                flex: 1;
                align-self: center;
                text-align: left;
                padding: 0 10px;
                font-size: 16px;
            }
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
    }
}
</style>
