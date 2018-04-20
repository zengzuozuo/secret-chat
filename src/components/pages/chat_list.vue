<template>
    <div class="chat-list-page">
        <div class="main">
            <div class="add-chat" @click="$router.push('addchat')">
                <i class="iconfont">&#xe60d;</i>
                <div class="content">开始新的聊天</div>
            </div>
            <ul>
                <li v-for="item,index in 3" :key="index" @click="$router.push('chatin')">
                    <i class="iconfont">&#xe620;</i>
                    <div class="content">
                        <div>
                            <h3>密聊官方客服</h3>
                            <span>今天12:12</span>
                        </div>
                        <p>密聊是一款私密聊天软件，区块链加密，点对点的传输，不经过中心服务器不经过中心服务器</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="less">
.chat-list-page {
    overflow: hidden;
    .main {
        height: 100%;
        padding: 20px 10% 0;
        box-sizing: border-box;
        -webkit-overflow-scrolling: touch;
        overflow-y: scroll;
        .add-chat {
            display: flex;
            align-items: center;
            // position: sticky;
            top: 0;
            left: 0;
            background-color: #fff;
            border-bottom: 1px solid #d5d5d5;
            .iconfont {
                font-size: 40px;
            }
            .content {
                flex: 1;
                text-align: left;
                padding: 0 10px;
                font-size: 16px;
            }
        }
        ul {
            margin: 10px 0;
            li {
                display: flex;
                align-items: center;
                margin: 20px 0;
                .iconfont {
                    font-size: 40px;
                }
                .content {
                    flex: 1;
                    text-align: left;
                    padding: 0 10px;
                    font-size: 16px;
                    div {
                        display: flex;
                        align-items: center;
                        h3 {
                            flex: 1;
                            font-size: 16px;
                            font-weight: normal;
                        }
                        span {
                            font-size: 12px;
                            color: #d5d5d5;
                        }
                    }
                    p {
                        font-size: 14px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                } 
            }
        }
    }
}
</style>

