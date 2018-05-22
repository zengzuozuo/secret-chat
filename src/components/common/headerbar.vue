<template>
	<div class="cpt-headerbar">
		<div class="return-btn" @click="goBack">
        	<i class="iconfont">&#xe641;</i>
        </div>
        <h2>{{titletext}}</h2>
	</div>
</template>

<script>
export default {
	props: {
		titletext: {
			type: String,
			default: "密聊"
		}
	},
	methods: {
		/**
		 * 关闭webview
		 * */
        goBack() {
        	try{
        		window.app.closeWebView()
        	}catch(e){
        		window.history.go(-1)
        	}
        }
	}
}
</script>

<style lang="less">
.cpt-headerbar {
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	text-align: center;
	line-height: 44px;
	font-size: 18px;
	background-color: #fff;
	.return-btn {
		position: absolute;
		width: 44px;
		height: 44px;
		font-size: 18px;
	}
	h2 {
		font-weight: normal;
		font-size: 18px;
	}
}
</style>