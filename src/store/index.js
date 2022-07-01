import { createStore } from 'vuex'
import user from './modules/user'
import getters from './getters'
import Permission from './modules/permission'
export default createStore({
  getters,
  modules: {
    user,
    Permission
  }
})
