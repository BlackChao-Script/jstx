const http = uni.$u.http

// 登录
export const login = (params, config = {}) => http.post('/user/login', params, config)
// 注册
export const register = (params, config = {}) => http.post('/user/register', params, config)
// 获取图形验证码
export const getInfoCode = (params, config = {}) => http.get('/user/getInfoCode', params, config)
// 获取邮箱验证码
export const getCmailCode = (data, config = {}) => http.get('/user/getCode', data, config)

// 搜索
export const search = (data, config = {}) => http.get('/search', data, config)

// 添加好友
export const addFriend = (params, config = {}) => http.post('/friend/addfriend', params, config)
