<template>
	<view class="classlist-page" :style="{ paddingTop: navBarHeight + 'px' }">
		<!-- 简易顶部栏：返回 + 标题 -->
		<view class="nav-header" :style="{ paddingTop: statusBarHeight + 'px', height: navBarHeight + 'px' }">
			<view class="nav-inner">
				<view class="back-btn" @click="goBack">
					<uni-icons type="left" color="#333" size="22"></uni-icons>
				</view>
				<text class="nav-title">{{ className }}</text>
			</view>
		</view>

		<view class="loading-layout" v-if="!wallList.length && !noData">
			<text class="loading-text">加载中...</text>
		</view>

		<view class="content">
			<navigator :url="'/pages/preview/preview?id=' + item._id" class="item"
				v-for="item in wallList" :key="item._id"
				@click="saveStorage">
				<image :src="item.smallPicurl" mode="aspectFill"></image>
			</navigator>
		</view>

		<view class="loading-layout" v-if="wallList.length || noData">
			<text class="loading-text">{{ noData ? '没有更多了' : '加载中...' }}</text>
		</view>

		<view class="safe-area-inset-bottom"></view>
	</view>
</template>

<script setup>
import { ref } from "vue"
import { onLoad, onUnload, onReachBottom, onShareAppMessage, onShareTimeline } from "@dcloudio/uni-app"
import { getStatusBarHeight, getTitleBarHeight } from "@/utils/system.js"
import { apiGetClassList } from "@/api/apis.js"

const statusBarHeight = getStatusBarHeight()
const titleBarHeight = getTitleBarHeight()
const navBarHeight = statusBarHeight + titleBarHeight

const className = ref("壁纸")
const wallList = ref([])
const noData = ref(false)

const queryParams = {
	classid: null,
	pageNum: 1,
	pageSize: 12
}

onLoad((e) => {
	if (e.id) queryParams.classid = e.id
	if (e.name) className.value = e.name
	getClassList()
})

onReachBottom(() => {
	if (noData.value) return
	queryParams.pageNum++
	getClassList()
})

async function getClassList() {
	try {
		const res = await apiGetClassList(queryParams)
		const newList = res.data || []
		wallList.value = [...wallList.value, ...newList]
		if (queryParams.pageSize > newList.length) noData.value = true
		uni.setStorageSync("storgClassList", wallList.value)
	} catch (e) {
		queryParams.pageNum = Math.max(1, queryParams.pageNum - 1)
	}
}

function saveStorage() {
	uni.setStorageSync("storgClassList", wallList.value)
}

function goBack() {
	uni.navigateBack()
}

onShareAppMessage(() => {
	return {
		title: "心语壁纸-" + className.value,
		path: "/pages/classlist/classlist?id=" + queryParams.classid + "&name=" + className.value
	}
})

onShareTimeline(() => {
	return {
		title: "心语壁纸-" + className.value,
		query: "id=" + queryParams.classid + "&name=" + className.value
	}
})

onUnload(() => {
	uni.removeStorageSync("storgClassList")
})
</script>

<style lang="scss" scoped>
.classlist-page {
	min-height: 100vh;
	background: #f8f8f8;
}

.nav-header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 999;
	background: #fff;

	.nav-inner {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		height: 44px;

		.back-btn {
			position: absolute;
			left: 16rpx;
			top: 50%;
			transform: translateY(-50%);
			width: 60rpx;
			height: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.nav-title {
			font-size: 32rpx;
			font-weight: 600;
			color: #333;
		}
	}
}

.content {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 5rpx;
	padding: 5rpx;

	.item {
		height: 440rpx;

		image {
			width: 100%;
			height: 100%;
			display: block;
		}
	}
}

.loading-layout {
	display: flex;
	justify-content: center;
	padding: 30rpx 0;

	.loading-text {
		font-size: 24rpx;
		color: #999;
	}
}

.safe-area-inset-bottom {
	height: env(safe-area-inset-bottom);
}
</style>
