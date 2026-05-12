# CLAUDE.md

## 语言
- 始终使用中文回复用户。

## 项目概述
心语壁纸 - 基于 uni-app (Vue 3) 的跨平台壁纸应用，一套代码编译到微信小程序、支付宝小程序、百度小程序、头条小程序、H5、Android/iOS。

## 技术栈
- **框架**: uni-app + Vue 3 Composition API (script setup)
- **样式**: SCSS (变量定义在 common/style/base-style.scss)
- **构建**: Vite (HBuilderX 集成)
- **组件库**: uni-ui (官方) + uv-ui (uView 2.x Vue 3 适配版) + mp-html (富文本)
- **后端**: RESTful API，baseURL: https://tea.qingnian8.com/api/bizhi。access-key是616993

## API 接口文档

| # | 函数名 | 路径 | 用途 | 参数 |
|---|--------|------|------|------|
| 1 | `apiGetBanner` | `/homeBanner` | Banner轮播 | 无 |
| 2 | `apiGetDayRandom` | `/randomWall` | 每日随机推荐 | 无 |
| 3 | `apiGetNotice` | `/wallNewsList` | 公告列表 | `{ pageNum, pageSize }` |
| 4 | `apiGetClassify` | `/classify` | 全部分类 | 可选筛选参数 |
| 5 | `apiGetClassList` | `/wallList` | 分类下壁纸列表 | `{ classid, pageNum, pageSize }` |
| 6 | `apiGetSetupScore` | `/setupScore` | 壁纸评分 | `{ wallId, score }` |
| 7 | `apiWriteDownload` | `/downloadWall` | 下载记录上报 | `{ wallId }` |
| 8 | `apiDetailWall` | `/detailWall` | 壁纸详情 | `{ id }` |
| 9 | `apiUserInfo` | `/userInfo` | 用户信息 | 可选 `{ userId }` |
| 10 | `apiGetHistoryList` | `/userWallList` | 用户下载历史 | `{ pageNum, pageSize }` |
| 11 | `apiNoticeDetail` | `/wallNewsDetail` | 公告详情 | `{ id }` |
| 12 | `apiSearchData` | `/searchWall` | 搜索壁纸 | `{ keyword, pageNum, pageSize }` |

## 目录结构

```
api/apis.js              - API接口集合，统一调用 request()
utils/request.js         - uni.request Promise封装: baseURL注入、access-key注入、错误码分层处理
utils/system.js          - ✅ 状态栏/导航栏高度计算，含平台条件编译 (头条 vs 其他)
utils/common.js          - compareTimestamp() 时间人性化展示, gotoHome() 异常跳转
components/custom-nav-bar/ - 自定义导航栏 (固定定位 + 渐变背景 + 搜索入口 + 胶囊按钮适配)
components/theme-item/   - 专题分类卡片 (支持 isMore 模式跳转分类页)
components/common-title/ - ✅ 通用标题栏 (name + custom 双插槽)
pages/index/             - 首页: Banner轮播、公告垂直滚动、每日推荐横向scroll、专题精选Grid
pages/classify/          - 分类页: 3列Grid展示全部分类
pages/classlist/         - 列表页: 3列Grid + onReachBottom分页 (pageNum/pageSize)
pages/preview/           - 预览页: 全屏Swiper + 三图预加载 + 信息弹窗 + 评分 + 下载保存
pages/search/            - 搜索页: 历史记录(去重10条)+热门推荐+触底分页+空态uView-empty
pages/notice/            - 公告列表
pages/notice/detail      - 公告详情: tag置顶 + mp-html富文本渲染 + 阅读量
pages/user/              - 用户中心: IP属地 + 下载/评分数量 + 联系客服(button open-type) + 订阅/常见问题
common/style/            - 设计Token + 全局背景渐变 + 安全区域适配
static/                  - tabBar图标、Logo
```

## 核心架构分层

视图层 (pages/) → 组件层 (components/) → 接口层 (api/apis.js) → 网络层 (utils/request.js) → 后端API

## 关键约定
- 跨页面数据传递使用 uni.setStorageSync("storgClassList") 而非 Vuex/Pinia
- 平台差异用条件编译: #ifdef MP-TOUTIAO / #ifndef MP-TOUTIAO / #ifdef H5 / #ifndef H5 / #ifdef MP
- 页面分享用 onShareAppMessage (好友) 和 onShareTimeline (朋友圈)
- 预览页三图预加载策略: readImgs数组维护 [prev, curr, next]，Set去重，v-if条件渲染
- 分页参数: queryParams = { pageNum: 1, pageSize: 12 }，res.data.length < pageSize 时 noData=true
- 品牌主色: $brand-theme-color: #28B389 (定义在 common/style/base-style.scss)
- Vue 3 Composition API (script setup) 规范: ref/reactive/computed/watch 等组合式写法
