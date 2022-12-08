const http = uni.$u.http

class API {
  login(params, config = {}) {
    http.post('/user/login', params, config)
  }
  register(params, config = {}) {
    http.post('/user/register', params, config)
  }
}
export default new API()
