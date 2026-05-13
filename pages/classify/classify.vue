<template>
	<view class="classify-page" :style="{ paddingTop: navBarHeight + 'px' }">
		<custom-nav-bar title="分类" />
		<view class="page-content">
			<view class="classify-grid">
				<view class="classify-item" v-for="item in classifyList" :key="item._id"
					@click="goClassList(item)">
					<image :src="item.picurl" mode="aspectFill" class="classify-img"></image>
					<text class="classify-name">{{ item.name }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { getNavBarHeight } from "@/utils/system.js"
import CustomNavBar from "@/components/custom-nav-bar/custom-nav-bar.vue"
import { apiGetClassify } from "@/api/apis.js"

const navBarHeight = getNavBarHeight()
const classifyList = ref([])

onMounted(() => {
	fetchClassify()
})

async function fetchClassify() {
	try {
		const res = await apiGetClassify()
		classifyList.value = res.data || []
	} catch (e) { }
}

function goClassList(item) {
	uni.navigateTo({ url: `/pages/classlist/classlist?id=${item._id}&name=${item.name}` })
}
</script>

<style lang="scss" scoped>
.classify-page {
	min-height: 100vh;
	background: #f8f8f8;
}

.page-content {
	padding: 20rpx 30rpx;
}

.classify-grid {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;

	.classify-item {
		width: calc(33.33% - 16rpx);
		height: 340rpx;
		margin-bottom: 24rpx;
		border-radius: 12rpx;
		overflow: hidden;
		position: relative;

		.classify-img {
			width: 100%;
			height: 100%;
		}

		.classify-name {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 70rpx;
			background: rgba(0, 0, 0, 0.2);
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 28rpx;
			color: #fff;
			font-weight: 600;
			backdrop-filter: blur(20rpx);
		}
	}
}
</style>
