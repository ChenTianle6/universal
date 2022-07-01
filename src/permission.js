import router from './router'
import store from './store'

// 定义一个用户未登录情况下可以访问的白名单
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // 获取token
  const token = store.getters.token
  if (token) {
    if (to.path === '/login') {
      next(from.path)
    } else {
      if (!store.getters.hasUserInfo) {
        // 调用获取信息接口
        const response = await store.dispatch('user/getUserInfo')
        if (response) {
          const { permission } = response
          const filterRoutes = await store.dispatch(
            'permission/filterRoutes',
            permission.menus
          )
          filterRoutes.forEach((item) => {
            router.addRoute(item)
          })
          return next(to.path)
        } else {
          next('/login')
        }
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
