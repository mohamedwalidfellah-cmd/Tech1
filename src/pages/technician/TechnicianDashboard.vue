<template>
  <div class="min-h-screen bg-gradient-to-br from-dark via-dark-gray to-dark py-6 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="bg-gradient-to-r from-energy to-yellow-400 rounded-xl p-6 mb-8 shadow-xl">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-dark flex items-center gap-2">
              <i class="fas fa-tools"></i> Espace Technicien
            </h1>
            <p class="text-dark opacity-90 mt-1">{{ technicianName }}</p>
          </div>
          <button @click="logout" class="bg-dark hover:bg-dark-gray text-energy font-bold py-2 px-4 rounded-lg transition">
            <i class="fas fa-sign-out-alt mr-2"></i> Déco
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-semibold">Ordres en attente</p>
              <p class="text-4xl font-bold text-energy mt-2">{{ pendingCount }}</p>
            </div>
            <i class="fas fa-clock text-5xl text-yellow-400 opacity-20"></i>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-semibold">En cours</p>
              <p class="text-4xl font-bold text-blue-500 mt-2">{{ activeCount }}</p>
            </div>
            <i class="fas fa-spinner text-5xl text-blue-400 opacity-20"></i>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-semibold">Complétées</p>
              <p class="text-4xl font-bold text-green-500 mt-2">{{ technicianStore.completedOrders.length }}</p>
            </div>
            <i class="fas fa-check-circle text-5xl text-green-400 opacity-20"></i>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="flex gap-4 mb-6">
        <button @click="activeTab = 'pending'" :class="activeTab === 'pending' ? 'bg-energy text-dark' : 'bg-white text-dark'" class="font-bold py-3 px-6 rounded-lg hover:shadow-lg transition">
          <i class="fas fa-inbox mr-2"></i> En attente
        </button>
        <button @click="activeTab = 'active'" :class="activeTab === 'active' ? 'bg-blue-500 text-white' : 'bg-white text-dark'" class="font-bold py-3 px-6 rounded-lg hover:shadow-lg transition">
          <i class="fas fa-tasks mr-2"></i> Actifs
        </button>
        <button @click="activeTab = 'completed'" :class="activeTab === 'completed' ? 'bg-green-500 text-white' : 'bg-white text-dark'" class="font-bold py-3 px-6 rounded-lg hover:shadow-lg transition">
          <i class="fas fa-archive mr-2"></i> Historique
        </button>
      </div>

      <!-- Orders List -->
      <div class="space-y-4">
        <!-- Pending Orders -->
        <div v-if="activeTab === 'pending'" class="space-y-4">
          <div v-for="order in pendingOrders" :key="order.id" class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <h3 class="text-xl font-bold text-dark mb-2">{{ order.clientName }}</h3>
                  <p class="text-gray-600 flex items-center gap-2">
                    <i class="fas fa-phone text-energy"></i> {{ order.clientPhone }}
                  </p>
                </div>
                <div>
                  <p class="text-gray-600 font-semibold mb-1">Véhicule</p>
                  <p class="text-dark font-bold">{{ order.vehicleBrand }} {{ order.vehicleModel }} ({{ order.vehicleYear }})</p>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pb-4 border-b">
                <div>
                  <p class="text-gray-600 text-sm">Immatriculation</p>
                  <p class="text-dark font-bold">{{ order.immatriculation }}</p>
                </div>
                <div>
                  <p class="text-gray-600 text-sm">Zone</p>
                  <p class="text-dark font-bold">{{ order.zone }}</p>
                </div>
                <div>
                  <p class="text-gray-600 text-sm">Montant minimum</p>
                  <p class="text-energy font-bold text-xl">{{ order.finalPrice }} DA</p>
                </div>
              </div>

              <div class="flex gap-3">
                <button @click="acceptOrder(order.id)" class="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition">
                  <i class="fas fa-check-circle mr-2"></i> Accepter
                </button>
                <button @click="viewOrderDetails(order)" class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition">
                  <i class="fas fa-eye mr-2"></i> Détails
                </button>
              </div>
            </div>
          </div>
          <div v-if="pendingOrders.length === 0" class="text-center py-12 bg-white rounded-xl">
            <i class="fas fa-inbox text-5xl text-gray-300 mb-4"></i>
            <p class="text-gray-600 font-semibold">Aucun ordre en attente</p>
          </div>
        </div>

        <!-- Active Orders -->
        <div v-if="activeTab === 'active'" class="space-y-4">
          <div v-for="order in activeOrders" :key="order.id" class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
            <div class="bg-blue-50 border-l-4 border-blue-400 p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-bold text-dark">{{ order.clientName }}</h3>
                <span class="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">En cours</span>
              </div>
              <p class="text-gray-600 mb-4">📍 {{ order.zone }} • 📱 {{ order.clientPhone }}</p>
              <div class="flex gap-3">
                <button @click="completeOrder(order.id)" class="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition">
                  <i class="fas fa-flag-checkered mr-2"></i> Terminer
                </button>
                <button @click="updateStatus(order.id, 'Sur place')" class="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition">
                  <i class="fas fa-location-dot mr-2"></i> Sur place
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Completed Orders -->
        <div v-if="activeTab === 'completed'" class="space-y-4">
          <div v-for="order in technicianStore.completedOrders" :key="order.id" class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
            <div class="bg-green-50 border-l-4 border-green-400 p-6">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-xl font-bold text-dark">{{ order.clientName }}</h3>
                <span class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">Complété</span>
              </div>
              <p class="text-gray-600 mb-3">{{ order.vehicleBrand }} {{ order.vehicleModel }} • {{ order.zone }}</p>
              <div class="bg-yellow-50 p-3 rounded-lg mb-4 border-l-4 border-energy">
                <p class="text-energy font-bold text-lg">Facture: {{ order.invoice?.totalAmount || order.finalPrice }} DA</p>
              </div>
              <button @click="downloadInvoice(order)" class="w-full bg-gradient-to-r from-energy to-yellow-400 text-dark font-bold py-2 rounded-lg hover:shadow-lg transition">
                <i class="fas fa-download mr-2"></i> Télécharger Facture
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Invoice Modal -->
      <div v-if="showInvoiceModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <h2 class="text-2xl font-bold text-dark mb-6 flex items-center gap-2">
            <i class="fas fa-file-invoice-dollar text-energy"></i> Générer Facture
          </h2>
          <form @submit.prevent="generateInvoice" class="space-y-4">
            <div>
              <label class="block text-dark font-bold mb-2">Coût des pièces (DA)</label>
              <input v-model.number="invoiceData.partsTotal" type="number" class="w-full px-4 py-2 border-2 border-light-gray rounded-lg focus:border-energy outline-none">
            </div>
            <div>
              <label class="block text-dark font-bold mb-2">Coût main d'œuvre (DA)</label>
              <input v-model.number="invoiceData.laborCost" type="number" class="w-full px-4 py-2 border-2 border-light-gray rounded-lg focus:border-energy outline-none">
            </div>
            <div class="bg-energy bg-opacity-20 p-4 rounded-lg">
              <p class="text-dark font-bold">Total: <span class="text-energy text-xl">{{ invoiceData.partsTotal + invoiceData.laborCost + currentOrder.finalPrice }} DA</span></p>
            </div>
            <div class="flex gap-4">
              <button type="button" @click="showInvoiceModal = false" class="btn-secondary flex-1">Annuler</button>
              <button type="submit" class="btn-primary flex-1">Générer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useTechnicianStore } from '../../stores/technicianStore'
import { useAuthStore } from '../../stores/authStore'
import { generateInvoicePDF } from '../../utils/pdfGenerator'

const router = useRouter()
const technicianStore = useTechnicianStore()
const authStore = useAuthStore()

const activeTab = ref('pending')
const showInvoiceModal = ref(false)
const currentOrder = ref(null)

const invoiceData = ref({
  partsTotal: 0,
  laborCost: 0
})

const technicianName = computed(() => authStore.user?.name || 'Technicien')

const pendingOrders = computed(() => 
  technicianStore.myOrders.filter(o => o.status === 'En attente')
)

const activeOrders = computed(() => 
  technicianStore.myOrders.filter(o => ['Assigné / Ordre généré', 'Sur place'].includes(o.status))
)

const pendingCount = computed(() => pendingOrders.value.length)
const activeCount = computed(() => activeOrders.value.length)

const acceptOrder = (orderId) => {
  technicianStore.updateOrderStatus(orderId, 'Assigné / Ordre généré')
}

const updateStatus = (orderId, status) => {
  technicianStore.updateOrderStatus(orderId, status)
}

const completeOrder = (orderId) => {
  currentOrder.value = technicianStore.myOrders.find(o => o.id === orderId)
  invoiceData.value = { partsTotal: 0, laborCost: 0 }
  showInvoiceModal.value = true
}

const generateInvoice = () => {
  const order = currentOrder.value
  const totalAmount = order.finalPrice + invoiceData.value.partsTotal + invoiceData.value.laborCost
  
  const invoicePayload = {
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    date: new Date(),
    clientName: order.clientName,
    clientPhone: order.clientPhone,
    vehicleBrand: order.vehicleBrand,
    vehicleModel: order.vehicleModel,
    vehicleYear: order.vehicleYear,
    immatriculation: order.immatriculation,
    displacementCost: order.finalPrice,
    laborCost: invoiceData.value.laborCost,
    parts: [],
    totalAmount: totalAmount
  }
  
  generateInvoicePDF(invoicePayload)
  technicianStore.generateInvoice(order.id, invoicePayload)
  showInvoiceModal.value = false
}

const downloadInvoice = (order) => {
  if (order.invoice) {
    generateInvoicePDF(order.invoice)
  }
}

const viewOrderDetails = (order) => {
  router.push(`/technician/order/${order.id}`)
}

const logout = () => {
  authStore.logout()
  router.push('/login')
}

// Load orders on mount
technicianStore.loadMyOrders(authStore.user?.id || 1)
</script>

<style scoped>
.btn-primary {
  @apply bg-energy text-dark font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 transition;
}

.btn-secondary {
  @apply bg-gray-300 text-dark font-bold py-2 px-4 rounded-lg hover:bg-gray-400 transition;
}
</style>
