// 时间戳转人性化展示：5小时前、3天前、2周前
export function compareTimestamp(timestamp) {
	const now = Date.now()
	const diff = now - timestamp

	const minute = 1000 * 60
	const hour = minute * 60
	const day = hour * 24
	const week = day * 7
	const month = day * 30

	if (diff < minute) return '刚刚'
	if (diff < hour) return Math.floor(diff / minute) + '分钟'
	if (diff < day) return Math.floor(diff / hour) + '小时'
	if (diff < week) return Math.floor(diff / day) + '天'
	if (diff < month) return Math.floor(diff / week) + '周'
	return Math.floor(diff / month) + '个月'
}

// 小图转大图：xxx_small.webp → xxx.jpg
export function getFullImageUrl(smallPicurl) {
	if (!smallPicurl) return ''
	return smallPicurl.replace(/_small\.webp/, '.jpg')
}

// 异常跳转回首页
export function gotoHome() {
	uni.switchTab({ url: '/pages/index/index' })
}
