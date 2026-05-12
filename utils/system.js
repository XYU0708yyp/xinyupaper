// 系统信息，模块初始化时获取一次
const SYSTEM_INFO = uni.getSystemInfoSync()

// 状态栏高度，兜底 15px
export const getStatusBarHeight = () => SYSTEM_INFO.statusBarHeight || 15

// 标题栏高度：小程序根据胶囊按钮垂直居中反推，其他平台默认 40px
export const getTitleBarHeight = () => {
	// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-ALIPAY
	if (uni.getMenuButtonBoundingClientRect) {
		let { top, height } = uni.getMenuButtonBoundingClientRect()
		return height + (top - getStatusBarHeight()) * 2
	}
	// #endif
	return 40
}

// 导航栏总高度 = 状态栏 + 标题栏，页面内容区用此值做 paddingTop
export const getNavBarHeight = () => getStatusBarHeight() + getTitleBarHeight()

// 头条小程序左侧返回按钮右边界，其他平台返回 0
export const getLeftIconLeft = () => {
	// #ifdef MP-TOUTIAO
	let { leftIcon: { left, width } } = tt.getCustomButtonBoundingClientRect()
	return left + parseInt(width)
	// #endif

	// #ifndef MP-TOUTIAO
	return 0
	// #endif
}
