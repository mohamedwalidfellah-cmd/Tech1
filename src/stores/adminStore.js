import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAdminStore = defineStore('admin', () => {
  const orders = ref([])
  const selectedFilter = ref('all')
  const technicians = ref([
    { id: 1, name: 'Ahmed', region: 'Alger' },
    { id: 2, name: 'Karim', region: 'Blida' },
    { id: 3, name: 'Mohamed', region: 'Tipaza' }
  ])

  const filteredOrders = computed(() => {
    if (selectedFilter.value === 'all') return orders.value
    return orders.value.filter(order => order.region === selectedFilter.value)
  })

  const addOrder = (order) => {
    orders.value.push({
      id: Date.now(),
      status: 'En attente',
      createdAt: new Date().toISOString(),
      ...order
    })
    saveToStorage()
  }

  const updateOrder = (id, updates) => {
    const order = orders.value.find(o => o.id === id)
    if (order) {
      Object.assign(order, updates)
      saveToStorage()
    }
  }

  const assignTechnician = (id, technicianId) => {
    updateOrder(id, {
      status: 'Assigné / Ordre généré',
      assignedTechnician: technicianId,
      assignedAt: new Date().toISOString()
    })
  }

  const saveToStorage = () => {
    localStorage.setItem('adminOrders', JSON.stringify(orders.value))
  }

  const loadFromStorage = () => {
    const stored = localStorage.getItem('adminOrders')
    if (stored) {
      orders.value = JSON.parse(stored)
    }
  }

  const getStats = () => {
    const today = new Date().toDateString()
    const todayOrders = orders.value.filter(o => new Date(o.createdAt).toDateString() === today)
    const activeOrders = orders.value.filter(o => ['En attente', 'Assigné / Ordre généré', 'Sur place'].includes(o.status))
    const completedOrders = orders.value.filter(o => o.status === 'Terminé')
    const totalRevenue = completedOrders.reduce((sum, o) => sum + (o.finalPrice || 0), 0)

    return {
      demandesJour: todayOrders.length,
      ordresActifs: activeOrders.length,
      missionsTerminees: completedOrders.length,
      chiffreAffaires: totalRevenue
    }
  }

  loadFromStorage()

  return {
    orders,
    selectedFilter,
    filteredOrders,
    technicians,
    addOrder,
    updateOrder,
    assignTechnician,
    getStats
  }
})
