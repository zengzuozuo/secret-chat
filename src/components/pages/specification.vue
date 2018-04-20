<template>
    <div class="specification-page">
        <mu-appbar class="header" title="会员费用详情">
            <i class="iconfont" slot="left" @click="$router.go(-1)">&#xe621;</i>
        </mu-appbar>
        <div class="main">
            <p>
                备注：您充值的sac，一部分是以太坊公网收取的，一部分是我们的运营开发费用。<br /><br />
                因为我们第一个版本，使用的是以太坊的公链，以太坊需要收取一定成本的费用同时我们的运营和开发人员，也需要一定的费用
                我们后期将在eos上发行新的公链，我们自己的公链，也在研发当中我们将持续地竭诚为您的信息安全服务
            </p>
        </div>
    </div>
</template>

<style scoped lang="less">
.specification-page {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .header {
        .iconfont {
            font-size: 30px;
        }
    }
    .main {
        flex: 1;
        padding: 10px 10%;
        p {
            font-size: 14px;
        }
    }
}
</style>
