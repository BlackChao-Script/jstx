const http = uni.$u.http

// 登录
export const login = (params, config = {}) => http.post('/user/login', params, config)
// 注册
export const register = (params, config = {}) => http.post('/user/register', params, config)
// 获取验证码
export const getInfoCode = (params, config = {}) => http.get('/user/getInfoCode', params, config)
