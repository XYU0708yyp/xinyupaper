<template>
	<view class="user-page" :style="{ paddingTop: navBarHeight + 'px' }">
		<custom-nav-bar title="我的" />
		<view class="page-content">
			<!-- 用户头部 -->
			<view class="user-header">
				<image class="avatar" :src="userInfo.avatar || '/static/logo.png'" mode="aspectFill"></image>
				<view class="user-meta">
					<text class="nickname">{{ userInfo.nickname || '未登录' }}</text>
					<text class="location" v-if="userInfo.location">{{ userInfo.location }}</text>
				</view>
			</view>

			<!-- 数据统计 -->
			<view class="user-stats">
				<view class="stat-item">
					<text class="stat-num">{{ userInfo.downloadCount || 0 }}</text>
					<text class="stat-label">下载</text>
				</view>
				<view class="stat-item">
					<text class="stat-num">{{ userInfo.scoreCount || 0 }}</text>
					<text class="stat-label">评分</text>
				</view>
			</view>

			<!-- 功能列表 -->
			<view class="user-menu">
				<button class="menu-item" open-type="contact">
					<text>联系客服</text>
					<uni-icons type="right" color="#ccc" size="16"></uni-icons>
				</button>
				<view class="menu-item">
					<text>订阅消息</text>
					<uni-icons type="right" color="#ccc" size="16"></uni-icons>
				</view>
				<view class="menu-item">
					<text>常见问题</text>
					<uni-icons type="right" color="#ccc" size="16"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { getNavBarHeight } from "@/utils/system.js"
import CustomNavBar from "@/components/custom-nav-bar/custom-nav-bar.vue"
import { apiUserInfo } from "@/api/apis.js"

const navBarHeight = getNavBarHeight()
const userInfo = ref({})

onMounted(() => {
	fetchUserInfo()
})

async function fetchUserInfo() {
	try {
		const res = await apiUserInfo()
		userInfo.value = res.data || {}
	} catch (e) { }
}
</script>

<style lang="scss" scoped>
.user-page {
	min-height: 100vh;
	background: #f8f8f8;
}

.page-content {
	padding: 30rpx;
}

.user-header {
	display: flex;
	align-items: center;
	padding: 40rpx 30rpx;
	background: #fff;
	border-radius: 12rpx;
	margin-bottom: 24rpx;

	.avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin-right: 24rpx;
	}

	.user-meta {
		display: flex;
		flex-direction: column;

		.nickname {
			font-size: 36rpx;
			font-weight: bold;
			color: #333;
			margin-bottom: 8rpx;
		}

		.location {
			font-size: 24rpx;
			color: #999;
		}
	}
}

.user-stats {
	display: flex;
	padding: 30rpx;
	background: #fff;
	border-radius: 12rpx;
	margin-bottom: 24rpx;

	.stat-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;

		.stat-num {
			font-size: 36rpx;
			font-weight: bold;
			color: #28B389;
		}

		.stat-label {
			font-size: 24rpx;
			color: #999;
			margin-top: 4rpx;
		}
	}
}

.user-menu {
	background: #fff;
	border-radius: 12rpx;
	overflow: hidden;

	.menu-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		padding: 0 30rpx;
		font-size: 28rpx;
		color: #333;
		border-bottom: 1rpx solid #f5f5f5;
		background: #fff;
		border-radius: 0;

		&:last-child {
			border-bottom: none;
		}
	}
}
</style>
