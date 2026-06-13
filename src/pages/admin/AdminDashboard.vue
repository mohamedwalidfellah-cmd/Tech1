<template>
  <div class="min-h-screen bg-gradient-to-br from-dark via-dark-gray to-dark py-8">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-4xl font-bold text-white flex items-center gap-3">
              <i class="fas fa-chart-bar text-energy"></i> Dashboard Admin
            </h1>
            <p class="text-gray-400 mt-2">Gestion des demandes et des techniciens</p>
          </div>
          <button @click="logout" class="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition">
            <i class="fas fa-sign-out-alt mr-2"></i> Déconnexion
          </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-blue-100 mb-2">Demandes du jour</p>
                <p class="text-4xl font-bold">{{ stats.demandesJour }}</p>
              </div>
              <i class="fas fa-inbox text-5xl opacity-20"></i>
            </div>
          </div>

          <div class="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-yellow-100 mb-2">Ordres actifs</p>
                <p class="text-4xl font-bold">{{ stats.ordresActifs }}</p>
              </div>
              <i class="fas fa-tasks text-5xl opacity-20"></i>
            </div>
          </div>

          <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-green-100 mb-2">Missions terminées</p>
                <p class="text-4xl font-bold">{{ stats.missionsTerminees }}</p>
              </div>
              <i class="fas fa-check-circle text-5xl opacity-20"></i>
            </div>
          </div>

          <div class="bg-gradient-to-br from-energy to-yellow-500 rounded-xl p-6 text-dark shadow-lg hover:shadow-xl transition">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-yellow-900 mb-2">Chiffre d'affaires</p>
                <p class="text-4xl font-bold">{{ stats.chiffreAffaires }} DA</p>
              </div>
              <i class="fas fa-money-bill-wave text-5xl opacity-20"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Orders List -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="bg-gradient-to-r from-dark to-dark-gray p-6 flex items-center justify-between">
              <h2 class="text-2xl font-bold text-white flex items-center gap-2">
                <i class="fas fa-list text-energy"></i> Toutes les Demandes
              </h2>
              <span class="bg-energy text-dark font-bold px-3 py-1 rounded-full">{{ adminStore.orders.length }}</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full">
                <thead class="bg-light-gray border-b-2 border-gray-300">
                  <tr>
                    <th class="px-6 py-4 text-left text-dark font-bold">Client</th>
                    <th class="px-6 py-4 text-left text-dark font-bold">Véhicule</th>
                    <th class="px-6 py-4 text-left text-dark font-bold">Zone</th>
                    <th class="px-6 py-4 text-left text-dark font-bold">Status</th>
                    <th class="px-6 py-4 text-left text-dark font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in adminStore.filteredOrders" :key="order.id" class="border-b hover:bg-light-gray transition">
                    <td class="px-6 py-4">
                      <p class="font-semibold text-dark">{{ order.clientName }}</p>
                      <p class="text-sm text-gray-600">{{ order.clientPhone }}</p>
                    </td>
                    <td class="px-6 py-4 text-dark">
                      {{ order.vehicleBrand }} {{ order.vehicleModel }}
                    </td>
                    <td class="px-6 py-4 text-dark font-semibold">
                      {{ order.zone }}
                    </td>
                    <td class="px-6 py-4">
                      <span :class="getStatusBadge(order.status)" class="px-3 py-1 rounded-full text-sm font-bold">
                        {{ order.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 space-x-2">
                      <button v-if="order.status === 'En attente'" @click="openAssignModal(order)" class="bg-energy text-dark px-3 py-1 rounded-lg font-bold hover:bg-yellow-500 transition text-sm">
                        <i class="fas fa-user-check mr-1"></i> Assigner
                      </button>
                      <button @click="viewOrder(order)" class="bg-blue-500 text-white px-3 py-1 rounded-lg font-bold hover:bg-blue-600 transition text-sm">
                        <i class="fas fa-eye mr-1"></i> Voir
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Technicians Panel -->
        <div>
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="bg-gradient-to-r from-purple-600 to-purple-700 p-6">
              <h2 class="text-2xl font-bold text-white flex items-center gap-2">
                <i class="fas fa-users text-energy"></i> Techniciens
              </h2>
            </div>
            <div class="p-6 space-y-4">
              <div v-for="tech in adminStore.technicians" :key="tech.id" class="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border-l-4 border-purple-500 hover:shadow-lg transition">
                <p class="font-bold text-dark">{{ tech.name }}</p>
                <p class="text-sm text-gray-600">📍 {{ tech.region }}</p>
                <button class="mt-3 w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 rounded-lg transition">
                  <i class="fas fa-phone mr-1"></i> Contacter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Assign Modal -->
      <div v-if="showAssignModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <h2 class="text-2xl font-bold text-dark mb-6 flex items-center gap-2">
            <i class="fas fa-user-check text-energy"></i> Assigner un Technicien
          </h2>
          <div class="space-y-4 mb-6">
            <div v-for="tech in adminStore.technicians" :key="tech.id" 
              @click="selectTechnician(tech.id)"
              :class="selectedTech === tech.id ? 'bg-energy text-dark' : 'bg-light-gray text-dark'"
              class="p-4 rounded-lg cursor-pointer font-semibold hover:shadow-lg transition">
              <i class="fas fa-user-circle mr-2"></i> {{ tech.name }} ({{ tech.region }})
            </div>
          </div>
          <div class="flex gap-4">
            <button @click="closeAssignModal" class="btn-secondary flex-1">Annuler</button>
            <button @click="confirmAssign" class="btn-primary flex-1">Confirmer</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminStore } from '../../stores/adminStore'
import { useAuthStore } from '../../stores/authStore'

const router = useRouter()
const adminStore = useAdminStore()
const authStore = useAuthStore()

const showAssignModal = ref(false)
const selectedOrder = ref(null)
const selectedTech = ref(null)

const stats = computed(() => adminStore.getStats())

const getStatusBadge = (status) => {
  const badges = {
    'En attente': 'bg-yellow-100 text-yellow-800',
    'Assigné / Ordre généré': 'bg-blue-100 text-blue-800',
    'Sur place': 'bg-purple-100 text-purple-800',
    'Terminé': 'bg-green-100 text-green-800'
  }
  return badges[status] || 'bg-gray-100 text-gray-800'
}

const openAssignModal = (order) => {
  selectedOrder.value = order
  selectedTech.value = null
  showAssignModal.value = true
}

const closeAssignModal = () => {
  showAssignModal.value = false
  selectedOrder.value = null
  selectedTech.value = null
}

const selectTechnician = (techId) => {
  selectedTech.value = techId
}

const confirmAssign = () => {
  if (selectedOrder.value && selectedTech.value) {
    adminStore.assignTechnician(selectedOrder.value.id, selectedTech.value)
    closeAssignModal()
  }
}

const viewOrder = (order) => {
  router.push(`/admin/order/${order.id}`)
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.btn-primary {
  @apply bg-energy text-dark font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition;
}

.btn-secondary {
  @apply bg-gray-300 text-dark font-bold py-2 px-4 rounded-lg hover:bg-gray-400 transition;
}
</style>
