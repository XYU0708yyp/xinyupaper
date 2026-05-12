import { request } from "@/utils/request.js"

// 首页Banner轮播图
export function apiGetBanner() {
	return request({ url: "/homeBanner" })
}

// 每日随机壁纸推荐
export function apiGetDayRandom() {
	return request({ url: "/randomWall" })
}

// 公告列表（分页: pageNum, pageSize）
export function apiGetNotice(data = {}) {
	return request({ url: "/wallNewsList", data })
}

// 全部分类
export function apiGetClassify(data = {}) {
	return request({ url: "/classify", data })
}

// 分类下壁纸列表（classid, pageNum, pageSize）
export function apiGetClassList(data = {}) {
	return request({ url: "/wallList", data })
}

// 壁纸评分（wallId, score）
export function apiGetSetupScore(data = {}) {
	return request({ url: "/setupScore", data })
}

// 下载记录上报（wallId）
export function apiWriteDownload(data = {}) {
	return request({ url: "/downloadWall", data })
}

// 壁纸详情（id）
export function apiDetailWall(data = {}) {
	return request({ url: "/detailWall", data })
}

// 用户信息
export function apiUserInfo(data = {}) {
	return request({ url: "/userInfo", data })
}

// 用户下载/收藏历史（分页: pageNum, pageSize）
export function apiGetHistoryList(data = {}) {
	return request({ url: "/userWallList", data })
}

// 公告详情（id）
export function apiNoticeDetail(data = {}) {
	return request({ url: "/wallNewsDetail", data })
}

// 搜索壁纸（keyword, pageNum, pageSize）
export function apiSearchData(data = {}) {
	return request({ url: "/searchWall", data })
}
