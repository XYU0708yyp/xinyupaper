<template>
	<view class="preview">
		<swiper circular :current="currentIndex" @change="onSwiperChange">
			<swiper-item v-for="(item, index) in classList" :key="item._id">
				<image v-if="readImgs.includes(index)" :src="item.picurl" mode="aspectFill"
					@click="toggleMask"></image>
			</swiper-item>
		</swiper>

		<view class="mask" v-if="maskState">
			<!-- H5 和头条以外的返回按钮 -->
			<!-- #ifndef MP-TOUTIAO -->
			<view class="goBack" @click="goBack" :style="{ top: statusBarHeight + 'px' }">
				<uni-icons type="back" color="#fff" size="20"></uni-icons>
			</view>
			<!-- #endif -->

			<view class="count">{{ currentIndex + 1 }} / {{ classList.length }}</view>
			<view class="footer">
				<view class="box" @click="clickInfo">
					<uni-icons type="info" size="28"></uni-icons>
					<view class="text">信息</view>
				</view>
				<view class="box" @click="clickScore">
					<uni-icons type="star" size="28"></uni-icons>
					<view class="text">{{ currentWall.score }}分</view>
				</view>
				<view class="box" @click="clickDownload">
					<uni-icons type="download" size="23"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed } from "vue"
import { onLoad } from "@dcloudio/uni-app"
import { getStatusBarHeight } from "@/utils/system.js"
import { getFullImageUrl } from "@/utils/common.js"
import { apiGetSetupScore, apiWriteDownload } from "@/api/apis.js"

const statusBarHeight = getStatusBarHeight()
const classList = ref([])
const currentIndex = ref(0)
const maskState = ref(true)
const readImgs = ref([])

const currentWall = computed(() => classList.value[currentIndex.value] || {})

onLoad((options) => {
	const stored = uni.getStorageSync("storgClassList") || []
	// 小图转大图：_small.webp → .jpg
	classList.value = stored.map(item => ({
		...item,
		picurl: getFullImageUrl(item.smallPicurl)
	}))
	const idx = classList.value.findIndex(item => item._id === options.id)
	currentIndex.value = idx >= 0 ? idx : 0
	readImgsFun()
})

function onSwiperChange(e) {
	currentIndex.value = e.detail.current
	readImgsFun()
}

// 预加载三张图 [prev, curr, next]，支持 circular 循环
function readImgsFun() {
	const len = classList.value.length
	if (!len) return
	readImgs.value = [
		currentIndex.value <= 0 ? len - 1 : currentIndex.value - 1,
		currentIndex.value,
		currentIndex.value >= len - 1 ? 0 : currentIndex.value + 1
	]
	readImgs.value = [...new Set(readImgs.value)]
}

function toggleMask() {
	maskState.value = !maskState.value
}

function goBack() {
	uni.navigateBack({
		fail: () => uni.switchTab({ url: "/pages/index/index" })
	})
}

// 评分配置
function clickScore() {
	uni.showActionSheet({
		itemList: ["1分", "2分", "3分", "4分", "5分"],
		success: async (res) => {
			const score = res.tapIndex + 1
			try {
				await apiGetSetupScore({ wallId: currentWall.value._id, score })
				uni.showToast({ title: `已评 ${score} 分`, icon: "success" })
			} catch (e) { }
		}
	})
}

// 下载壁纸
async function clickDownload() {
	if (!currentWall.value) return
	// #ifdef H5
	uni.showModal({ content: "请长按保存壁纸", showCancel: false })
	// #endif
	// #ifndef H5
	try {
		uni.showLoading({ title: "下载中...", mask: true })
		await apiWriteDownload({ wallId: currentWall.value._id })
		uni.getImageInfo({
			src: currentWall.value.picurl,
			success: (res) => {
				uni.saveImageToPhotosAlbum({
					filePath: res.path,
					success: () => uni.showToast({ title: "保存成功", icon: "none" }),
					fail: (err) => {
						if (err.errMsg.includes("cancel")) return
						uni.showModal({
							title: "授权提示",
							content: "需要授权保存相册",
							success: (modalRes) => {
								if (modalRes.confirm) uni.openSetting({})
							}
						})
					},
					complete: () => uni.hideLoading()
				})
			},
			fail: () => {
				uni.hideLoading()
				uni.showToast({ title: "下载失败", icon: "none" })
			}
		})
	} catch (e) {
		uni.hideLoading()
	}
	// #endif
}

// 信息弹窗（简单 toast）
function clickInfo() {
	const w = currentWall.value
	uni.showModal({
		title: "壁纸信息",
		content: `发布者: ${w.nickname || '未知'}\n评分: ${w.score}分\n标签: ${(w.tabs || []).join('、')}\n${w.description || ''}`,
		showCancel: false
	})
}
</script>

<style lang="scss" scoped>
.preview {
	width: 100%;
	height: 100vh;
	position: relative;
	background: #000;

	swiper {
		width: 100%;
		height: 100%;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.mask {
		>view {
			position: absolute;
			left: 0;
			margin: auto;
			color: #fff;
			right: 0;
			width: fit-content;
		}

		.goBack {
			width: 38px;
			height: 38px;
			background: rgba(0, 0, 0, 0.5);
			left: 30rpx;
			margin-left: 0;
			border-radius: 50%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.count {
			top: 10vh;
			background: rgba(0, 0, 0, 0.3);
			font-size: 28rpx;
			border-radius: 40rpx;
			padding: 8rpx 28rpx;
			backdrop-filter: blur(10rpx);
		}

		.footer {
			background: rgba(255, 255, 255, 0.85);
			bottom: 10vh;
			width: 65vw;
			height: 120rpx;
			border-radius: 120rpx;
			color: #000;
			display: flex;
			justify-content: space-around;
			align-items: center;
			backdrop-filter: blur(20rpx);

			.box {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.text {
					font-size: 26rpx;
					color: #666;
				}
			}
		}
	}
}
</style>
