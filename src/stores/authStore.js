import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const userRole = ref('client')
  const isLoggedIn = computed(() => user.value !== null)

  const login = (userData, role) => {
    user.value = userData
    userRole.value = role
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('userRole', role)
  }

  const logout = () => {
    user.value = null
    userRole.value = 'client'
    localStorage.removeItem('user')
    localStorage.removeItem('userRole')
  }

  const loadFromStorage = () => {
    const storedUser = localStorage.getItem('user')
    const storedRole = localStorage.getItem('userRole')
    if (storedUser && storedRole) {
      user.value = JSON.parse(storedUser)
      userRole.value = storedRole
    }
  }

  loadFromStorage()

  return { user, userRole, isLoggedIn, login, logout }
})
