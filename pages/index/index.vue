<template>
	<view class="index-page" :style="{ paddingTop: navBarHeight + 'px' }">
		<custom-nav-bar title="推荐" />

		<view class="page-content">
			<!-- 1. Banner 轮播 -->
			<view class="section">
				<swiper class="banner-swiper" circular autoplay :interval="3000" indicator-dots
					indicator-active-color="#28B389">
					<swiper-item v-for="item in bannerList" :key="item._id">
						<image :src="item.picurl" mode="aspectFill" class="banner-img"></image>
					</swiper-item>
				</swiper>
			</view>

			<!-- 2. 公告垂直滚动 -->
			<view class="section" v-if="noticeList.length">
				<view class="notice-bar">
					<uni-icons type="sound" color="#28B389" size="20"></uni-icons>
					<swiper class="notice-swiper" vertical autoplay :interval="3000" circular>
						<swiper-item v-for="item in noticeList" :key="item._id">
							<text class="notice-text">{{ item.title }}</text>
						</swiper-item>
					</swiper>
					<uni-icons type="right" color="#999" size="16"></uni-icons>
				</view>
			</view>

			<!-- 3. 每日推荐 -->
			<view class="section">
				<common-title>
					<template #name>每日推荐</template>
					<template #custom>更多</template>
				</common-title>
				<scroll-view class="daily-scroll" scroll-x :show-scrollbar="false">
					<view class="daily-item" v-for="(item, index) in dailyList" :key="item._id"
						@click="goDailyPreview(index)">
						<image :src="item.smallPicurl" mode="aspectFill" class="daily-img"></image>
					</view>
				</scroll-view>
			</view>

			<!-- 4. 专题精选 -->
			<view class="section">
				<common-title>
					<template #name>专题精选</template>
					<template #custom>更多</template>
				</common-title>
				<view class="theme-grid">
					<theme-item v-for="item in themeList.slice(0, 8)" :key="item._id" :item="item" />
					<theme-item :isMore="true" />
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
import ThemeItem from "@/components/theme-item/theme-item.vue"
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

async function fetchBanner() {
	try {
		const res = await apiGetBanner()
		bannerList.value = res.data || []
	} catch (e) { }
}

async function fetchNotice() {
	try {
		const res = await apiGetNotice({ pageNum: 1, pageSize: 10 })
		noticeList.value = res.data || []
	} catch (e) { }
}

async function fetchDailyRandom() {
	try {
		const res = await apiGetDayRandom()
		dailyList.value = res.data || []
	} catch (e) { }
}

async function fetchClassify() {
	try {
		const res = await apiGetClassify()
		themeList.value = res.data || []
	} catch (e) { }
}

function goDailyPreview(index) {
	uni.setStorageSync("storgClassList", dailyList.value)
	uni.navigateTo({ url: `/pages/preview/preview?id=${dailyList.value[index]._id}` })
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

.section {
	margin-bottom: 16rpx;
}

.banner-swiper {
	width: 100%;
	height: 350rpx;

	.banner-img {
		width: 100%;
		height: 100%;
	}
}

.notice-bar {
	display: flex;
	align-items: center;
	height: 80rpx;
	margin: 0 30rpx;
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

.daily-scroll {
	display: flex;
	white-space: nowrap;
	padding: 20rpx 30rpx;

	.daily-item {
		display: inline-block;
		width: 200rpx;
		height: 440rpx;
		margin-right: 16rpx;
		border-radius: 12rpx;
		overflow: hidden;

		.daily-img {
			width: 100%;
			height: 100%;
		}
	}
}

.theme-grid {
	display: flex;
	flex-wrap: wrap;
	padding: 20rpx 30rpx;
	justify-content: space-between;
}
</style>
