// 后端接口基础地址
const BASE_URL = "https://tea.qingnian8.com/api/bizhi"
// 接口鉴权密钥，每个请求 header 自动携带
const ACCESS_KEY = "616993"

/**
 * 统一请求封装，返回 Promise
 * 自动注入 baseURL 和 access-key，对业务层错误码(code !== 0)做 toast 提示
 */
export function request(options = {}) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || "GET",
			data: options.data || {},
			header: {
				"access-key": ACCESS_KEY,
				...options.header
			},
			success: (res) => {
				console.log("REQUEST:", options.url, "STATUS:", res.statusCode, "RESPONSE:", JSON.stringify(res.data))
				// HTTP 状态码异常
				if (res.statusCode !== 200) {
					return reject(new Error(`HTTP ${res.statusCode}`))
				}
				const data = res.data
				// errCode === 0 表示业务成功
				if (data.errCode === 0) {
					resolve(data)
				} else {
					// 业务错误码，弹出后端返回的错误信息
					uni.showToast({ title: data.errMsg || "请求失败", icon: "none" })
					console.error("业务错误:", JSON.stringify(data))
					reject(data)
				}
			},
			fail: (err) => {
				uni.showToast({ title: "网络异常", icon: "none" })
				reject(err)
			}
		})
	})
}
