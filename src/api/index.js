const http = uni.$u.http

// 登录
export const login = (params, config = {}) => http.post('/user/login', params, config)
// 注册
export const register = (params, config = {}) => http.post('/user/register', params, config)
// 获取图形验证码
export const getInfoCode = (params, config = {}) => http.get('/user/getInfoCode', params, config)
// 获取邮箱验证码
export const getCmailCode = (data, config = {}) => http.get('/user/getCode', data, config)
// 获取用户信息
export const getUserInfo = (data, config = {}) => http.get('/user/getUserInfo', data, config)
// 修改用户信息
export const modifyUser = (user_id, params, config = {}) => http.put(`/user/modify/${user_id}`, params, config)

// 搜索
export const search = (data, config = {}) => http.get('/search', data, config)

// 添加好友
export const addFriend = (params, config = {}) => http.post('/friend/addfriend', params, config)
// 获取好友申请列表
export const getFriendApply = (data, config = {}) => http.get('/friend/getFriendApply', data, config)
// 更新好友申请状态
export const changFriend = (user_id, params, config = {}) => http.put(`/friend/changFriend/${user_id}`, params, config)

// 创建群聊
export const createGroup = (params, config = {}) => http.post('/group/create', params, config)
// 获取群聊列表
export const getGroup = (data, config = {}) => http.get('/group/getList', data, config)

// 获取列表信息
export const getchitchatMsg = (data, config = {}) => http.get('/chitchat/chitchatList', data, config)
// 发送信息
export const sendchitchatMsg = (params, config = {}) => http.post('/chitchat/sendMessage', params, config)
