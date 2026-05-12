<template>
	<view class="index-page" :style="{ paddingTop: navBarHeight + 'px' }">
		<custom-nav-bar title="推荐" />

		<view class="page-content">
			<!-- 1. Banner 轮播 -->
			<swiper class="banner-swiper" circular autoplay :interval="3000" indicator-dots
				indicator-active-color="#28B389">
				<swiper-item v-for="item in bannerList" :key="item.id">
					<image :src="item.picurl" mode="aspectFill" class="banner-img"></image>
				</swiper-item>
			</swiper>

			<!-- 2. 公告垂直滚动 -->
			<view class="notice-bar" v-if="noticeList.length">
				<uni-icons type="sound" color="#28B389" size="20"></uni-icons>
				<swiper class="notice-swiper" vertical autoplay :interval="3000" circular>
					<swiper-item v-for="item in noticeList" :key="item.id">
						<text class="notice-text">{{ item.title }}</text>
					</swiper-item>
				</swiper>
				<uni-icons type="right" color="#999" size="16"></uni-icons>
			</view>

			<!-- 3. 每日推荐 -->
			<common-title>
				<template #name>每日推荐</template>
				<template #custom>更多</template>
			</common-title>
			<scroll-view class="daily-scroll" scroll-x :show-scrollbar="false">
				<view class="daily-item" v-for="item in dailyList" :key="item.id">
					<image :src="item.smallPicurl" mode="aspectFill" class="daily-img"></image>
				</view>
			</scroll-view>

			<!-- 4. 专题精选 -->
			<common-title>
				<template #name>专题精选</template>
				<template #custom>更多</template>
			</common-title>
			<view class="theme-grid">
				<view class="theme-item" v-for="item in themeList" :key="item.id">
					<image :src="item.picurl" mode="aspectFill" class="theme-img"></image>
					<text class="theme-name">{{ item.name }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { getNavBarHeight } from "@/utils/system.js"
import CustomNavBar from "@/components/custom-nav-bar/custom-nav-bar.vue"
import CommonTitle from "@/components/common-title/common-title.vue"
import { apiGetBanner, apiGetDayRandom, apiGetNotice, apiGetClassify } from "@/api/apis.js"

const navBarHeight = getNavBarHeight()

const bannerList = ref([])
const noticeList = ref([])
const dailyList = ref([])
const themeList = ref([])

onMounted(() => {
	fetchBanner()
	fetchNotice()
	fetchDailyRandom()
	fetchClassify()
})

// Banner轮播
async function fetchBanner() {
	try {
		const res = await apiGetBanner()
		console.log("Banner 数据:", JSON.stringify(res))
		bannerList.value = res.data || []
	} catch (e) {
		console.error("Banner 请求异常:", e)
	}
}

// 公告列表
async function fetchNotice() {
	try {
		const res = await apiGetNotice({ pageNum: 1, pageSize: 10 })
		console.log("公告 数据:", JSON.stringify(res))
		noticeList.value = res.data || []
	} catch (e) {
		console.error("公告 请求异常:", e)
	}
}

// 每日随机推荐
async function fetchDailyRandom() {
	try {
		const res = await apiGetDayRandom()
		console.log("每日推荐 数据:", JSON.stringify(res))
		dailyList.value = res.data || []
	} catch (e) {
		console.error("每日推荐 请求异常:", e)
	}
}

// 专题分类
async function fetchClassify() {
	try {
		const res = await apiGetClassify()
		console.log("专题精选 数据:", JSON.stringify(res))
		themeList.value = res.data || []
	} catch (e) {
		console.error("专题精选 请求异常:", e)
	}
}
</script>

<style lang="scss" scoped>
.index-page {
	min-height: 100vh;
	background: #f8f8f8;
}

.page-content {
	padding-bottom: 30rpx;
}

// Banner 轮播
.banner-swiper {
	width: 100%;
	height: 350rpx;

	.banner-img {
		width: 100%;
		height: 100%;
	}
}

// 公告滚动条
.notice-bar {
	display: flex;
	align-items: center;
	height: 80rpx;
	margin: 16rpx 30rpx;
	padding: 0 20rpx;
	background: #fff;
	border-radius: 12rpx;

	.notice-swiper {
		flex: 1;
		height: 80rpx;
		margin: 0 16rpx;
	}

	.notice-text {
		font-size: 26rpx;
		color: #333;
		line-height: 80rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}

// 每日推荐横向滚动
.daily-scroll {
	display: flex;
	white-space: nowrap;
	padding: 20rpx 30rpx;

	.daily-item {
		display: inline-block;
		width: 200rpx;
		height: 280rpx;
		margin-right: 16rpx;
		border-radius: 12rpx;
		overflow: hidden;

		.daily-img {
			width: 100%;
			height: 100%;
		}
	}
}

// 专题精选 Grid
.theme-grid {
	display: flex;
	flex-wrap: wrap;
	padding: 20rpx 30rpx;

	.theme-item {
		width: calc(50% - 12rpx);
		height: 200rpx;
		margin-right: 24rpx;
		margin-bottom: 24rpx;
		border-radius: 12rpx;
		overflow: hidden;
		position: relative;

		&:nth-child(2n) {
			margin-right: 0;
		}

		.theme-img {
			width: 100%;
			height: 100%;
		}

		.theme-name {
			position: absolute;
			bottom: 12rpx;
			left: 12rpx;
			font-size: 28rpx;
			color: #fff;
			font-weight: bold;
			text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
		}
	}
}
</style>
