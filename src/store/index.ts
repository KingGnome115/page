import { createStore } from 'vuex'
import { Usuario } from '@/interfaces/Usuarios'

export default createStore({
  state: {
    usuario: {} as Usuario
  },
  mutations: {
    setUsuario(state, usuario: Usuario) {
      state.usuario = usuario
    }
  },
  actions: {
    setUsuario({ commit }, usuario: Usuario) {
      commit('setUsuario', usuario)
    }
  },
  modules: {
  }
})
