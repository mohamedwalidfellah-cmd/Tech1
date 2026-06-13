<template>
  <div class="min-h-screen bg-gradient-to-br from-dark via-dark-gray to-dark py-8">
    <div class="max-w-2xl mx-auto px-4">
      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex justify-between text-sm mb-2">
          <span class="font-bold text-white">Étape 5/5 : Validation Finale</span>
          <span class="text-energy font-bold">100%</span>
        </div>
        <div class="w-full bg-dark-gray rounded-full h-3 overflow-hidden shadow-lg">
          <div class="bg-gradient-to-r from-energy to-yellow-400 h-3 rounded-full" style="width: 100%"></div>
        </div>
      </div>

      <div class="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-8 border border-gray-100">
        <!-- Header -->
        <div class="text-center mb-10">
          <div class="inline-block bg-gradient-to-br from-energy to-yellow-400 rounded-full p-4 mb-4">
            <i class="fas fa-check-circle text-dark text-3xl"></i>
          </div>
          <h1 class="text-4xl font-bold bg-gradient-to-r from-dark to-energy bg-clip-text text-transparent mb-2">Récapitulatif</h1>
          <p class="text-gray-600">Vérifiez vos informations avant de confirmer</p>
        </div>

        <!-- Résumé complet -->
        <div class="space-y-6">
          <!-- Client Info Card -->
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition">
            <div class="flex items-center gap-3 mb-4">
              <i class="fas fa-user-circle text-blue-600 text-2xl"></i>
              <h3 class="text-xl font-bold text-dark">Vos Informations</h3>
            </div>
            <div class="space-y-2 text-dark">
              <p><span class="font-semibold">Nom:</span> {{ clientData.step3.name }}</p>
              <p><span class="font-semibold">Téléphone:</span> {{ clientData.step3.phone }}</p>
            </div>
          </div>

          <!-- Vehicle Info Card -->
          <div class="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg transition">
            <div class="flex items-center gap-3 mb-4">
              <i class="fas fa-car text-purple-600 text-2xl"></i>
              <h3 class="text-xl font-bold text-dark">Votre Véhicule</h3>
            </div>
            <div class="space-y-2 text-dark">
              <p><span class="font-semibold">Marque/Modèle:</span> {{ clientData.step2.brand }} {{ clientData.step2.model }}</p>
              <p><span class="font-semibold">Année:</span> {{ clientData.step2.year }}</p>
              <p><span class="font-semibold">Carburant:</span> {{ clientData.step2.fuel }}</p>
              <p><span class="font-semibold">Immatriculation:</span> {{ clientData.step2.immatriculation }}</p>
            </div>
          </div>

          <!-- Location & Zone Card -->
          <div class="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition">
            <div class="flex items-center gap-3 mb-4">
              <i class="fas fa-location-dot text-green-600 text-2xl"></i>
              <h3 class="text-xl font-bold text-dark">Zone de Déplacement</h3>
            </div>
            <div class="space-y-2 text-dark">
              <p><span class="font-semibold">Zone:</span> <span class="text-green-600 font-bold">{{ clientData.step4.zone }}</span></p>
            </div>
          </div>

          <!-- Quote Card -->
          <div class="bg-gradient-to-br from-energy/10 to-yellow-100 border-3 border-energy rounded-xl p-6 hover:shadow-xl transition">
            <div class="flex items-center gap-3 mb-4">
              <i class="fas fa-file-invoice-dollar text-energy text-2xl"></i>
              <h3 class="text-xl font-bold text-dark">Devis Prévisionnel</h3>
            </div>
            <div class="bg-white rounded-lg p-4 mb-4">
              <p class="text-gray-600 text-sm mb-2">Montant minimum</p>
              <p class="text-4xl font-bold text-energy">{{ clientData.step4.finalPrice }} <span class="text-lg text-dark">DA</span></p>
              <p class="text-gray-500 text-xs mt-2">*Le montant final sera confirmé après diagnostic</p>
            </div>
          </div>

          <!-- Diagnostic Summary -->
          <div class="bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200 rounded-xl p-6">
            <div class="flex items-center gap-3 mb-4">
              <i class="fas fa-lightbulb text-orange-600 text-2xl"></i>
              <h3 class="text-xl font-bold text-dark">Diagnos Pré-Analysé</h3>
            </div>
            <div class="space-y-2 text-dark text-sm">
              <p><span class="font-semibold">Tableau de bord:</span> {{ clientData.step1.questionA ? 'Allumé' : 'Non réactif' }}</p>
              <p><span class="font-semibold">Bruit de démarrage:</span> {{ clientData.step1.questionB ? 'Présent' : 'Absent' }}</p>
              <p><span class="font-semibold">Problème ponctuel:</span> {{ clientData.step1.questionC ? 'Oui' : 'Non' }}</p>
            </div>
          </div>

          <!-- Important Info Box -->
          <div class="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 p-4 rounded-lg">
            <p class="text-red-700 font-semibold flex items-center gap-2">
              <i class="fas fa-shield-alt"></i> Engagement Client
            </p>
            <ul class="mt-3 text-red-600 text-sm space-y-1">
              <li>✓ Diagnostic GRATUIT, sans engagement</li>
              <li>✓ Déplacement garanti dans les 30 minutes</li>
              <li>✓ Devis détaillé et gratuit après diagnostic</li>
              <li>✓ Acceptation requise avant intervention</li>
            </ul>
          </div>

          <!-- CTA Buttons -->
          <div class="flex gap-4 mt-10 pt-6 border-t-2 border-gray-200">
            <button @click="previousStep" class="btn-secondary flex-1">
              <i class="fas fa-arrow-left mr-2"></i> Modifier
            </button>
            <button @click="confirmOrder" class="btn-primary flex-1 shadow-lg hover:shadow-xl">
              <i class="fas fa-check-circle mr-2"></i> Confirmer & Réserver
            </button>
          </div>
        </div>
      </div>

      <!-- Success Modal -->
      <div v-if="showSuccess" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-2xl p-8 max-w-md text-center animate-bounce">
          <div class="bg-gradient-to-br from-green-400 to-emerald-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <i class="fas fa-check text-white text-4xl"></i>
          </div>
          <h2 class="text-2xl font-bold text-dark mb-2">Demande Confirmée !</h2>
          <p class="text-gray-600 mb-6">Un technicien vous contactera dans les 30 minutes.</p>
          <p class="text-energy font-bold text-lg mb-6">Numéro de suivi: {{ orderNumber }}</p>
          <button @click="goHome" class="btn-primary w-full">
            <i class="fas fa-home mr-2"></i> Retour à l'accueil
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useClientStore } from '../../stores/clientStore'
import { useAdminStore } from '../../stores/adminStore'

const router = useRouter()
const clientStore = useClientStore()
const adminStore = useAdminStore()

const clientData = clientStore.diagnosticData
const showSuccess = ref(false)
const orderNumber = ref('')

const confirmOrder = () => {
  const order = {
    clientName: clientData.step3.name,
    clientPhone: clientData.step3.phone,
    vehicleBrand: clientData.step2.brand,
    vehicleModel: clientData.step2.model,
    vehicleYear: clientData.step2.year,
    immatriculation: clientData.step2.immatriculation,
    fuel: clientData.step2.fuel,
    zone: clientData.step4.zone,
    finalPrice: clientData.step4.finalPrice,
    gps: clientData.step3.gps,
    status: 'En attente'
  }
  
  adminStore.addOrder(order)
  orderNumber.value = `AUTO-${Date.now().toString().slice(-6)}`
  showSuccess.value = true
}

const goHome = () => {
  clientStore.resetData()
  router.push('/')
}

const previousStep = () => {
  router.push('/client/step4')
}
</script>

<style scoped>
.btn-primary {
  @apply bg-gradient-to-r from-energy to-yellow-400 text-dark font-bold py-3 px-6 rounded-lg hover:shadow-lg transition transform hover:scale-105;
}

.btn-secondary {
  @apply bg-gradient-to-r from-dark-gray to-dark text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>
