<template>
	<view class="custom-nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
		<view class="nav-content" :style="{ height: titleBarHeight + 'px' }">
			<!-- 左侧大标题，prop 传递 -->
			<view class="nav-left" :style="{ marginLeft: leftIconLeft + 'px' }">
				<text class="title">{{ title }}</text>
			</view>
			<!-- 中间搜索框，navigator 跳转搜索页 -->
			<navigator url="/pages/search/search" class="search">
				<uni-icons class="icon" type="search" color="#888" size="18"></uni-icons>
				<text class="text">搜索</text>
			</navigator>
		</view>
		<!-- 底部柔和绿色渐变 -->
		<view class="nav-gradient"></view>
	</view>
</template>

<script setup>
import { getStatusBarHeight, getTitleBarHeight, getLeftIconLeft } from "@/utils/system.js"

// 标题 prop，每个页面传不同值
defineProps({
	title: {
		type: String,
		default: '推荐'
	}
})

// 导航栏高度适配
const statusBarHeight = getStatusBarHeight()
const titleBarHeight = getTitleBarHeight()
const leftIconLeft = getLeftIconLeft()
</script>

<style lang="scss" scoped>
.custom-nav-bar {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 999;
	background: #fff;

	.nav-content {
		display: flex;
		align-items: center;
		height: 88rpx;
		padding: 0 30rpx;
		box-sizing: border-box;

		.nav-left {
			flex-shrink: 0;
			margin-right: 24rpx;

			.title {
				font-size: 40rpx;
				font-weight: bold;
				color: #333;
			}
		}

		.search {
			flex: 1;
			display: flex;
			align-items: center;
			height: 64rpx;
			background: #f5f5f5;
			border-radius: 32rpx;
			padding: 0 24rpx;

			.icon {
				flex-shrink: 0;
				margin-right: 8rpx;
			}

			.text {
				font-size: 26rpx;
				color: #999;
			}
		}
	}

	.nav-gradient {
		height: 6rpx;
		background: linear-gradient(to right, #28B389, rgba(40, 179, 137, 0.2), transparent);
	}
}
</style>
