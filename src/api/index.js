const http = uni.$u.http

// 登录
export const login = (params) => http.post('/user/login', params)
// 注册
export const register = (params) => http.post('/user/register', params)
// 获取验证码
export const getInfoCode = (params) => http.get('/user/getInfoCode', params)
// 搜索
export const search = (data) => http.get('/search', data)
