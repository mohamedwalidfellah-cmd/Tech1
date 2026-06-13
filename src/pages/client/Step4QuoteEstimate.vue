<template>
  <div class="min-h-screen bg-light-gray py-8">
    <div class="max-w-2xl mx-auto px-4">
      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex justify-between text-sm mb-2">
          <span class="font-bold">Étape 4/5 : Devis Prévisionnel</span>
          <span class="text-gray-600">80%</span>
        </div>
        <div class="w-full bg-gray-300 rounded-full h-2">
          <div class="bg-energy h-2 rounded-full" style="width: 80%"></div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-8">
        <h1 class="text-3xl font-bold text-dark mb-8">Devis Prévisionnel</h1>

        <div class="space-y-6">
          <!-- Zone info -->
          <div class="bg-light-gray p-6 rounded-lg border-l-4 border-energy">
            <h3 class="font-bold text-dark mb-2">Zone de couverture</h3>
            <p class="text-2xl font-bold text-energy">{{ zone }}</p>
          </div>

          <!-- Breakdown -->
          <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="font-bold text-dark mb-4">Détail du devis</h3>
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-dark">Frais de déplacement & diagnostic scanner</span>
                <span class="font-bold text-energy">{{ basePrice }} DA</span>
              </div>
              <div class="flex justify-between">
                <span class="text-dark">Pièces de rechange (estimation)</span>
                <span class="font-bold text-gray-600">À déterminer sur place</span>
              </div>
              <div class="flex justify-between">
                <span class="text-dark">Main d'œuvre (si nécessaire)</span>
                <span class="font-bold text-gray-600">À déterminer sur place</span>
              </div>
            </div>
          </div>

          <!-- Total -->
          <div class="bg-gradient-to-r from-dark to-dark-gray p-6 rounded-lg text-white">
            <p class="text-gray-300 mb-2">Montant minimum</p>
            <p class="text-4xl font-bold text-energy">{{ basePrice }} DA</p>
            <p class="text-gray-400 mt-2 text-sm">*Le montant final sera confirmé après diagnostic sur place</p>
          </div>

          <!-- Important info -->
          <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
            <p class="text-yellow-700 font-semibold"><i class="fas fa-info-circle mr-2"></i> À savoir</p>
            <ul class="mt-2 text-yellow-600 text-sm space-y-1">
              <li>✓ Diagnostic gratuit sans engagement</li>
              <li>✓ Devis détaillé après diagnostic</li>
              <li>✓ Intervention dans les 30 minutes suivant confirmation</li>
            </ul>
          </div>

          <!-- Navigation -->
          <div class="flex gap-4 mt-8">
            <button @click="previousStep" class="btn-secondary flex-1">
              <i class="fas fa-arrow-left mr-2"></i> Retour
            </button>
            <button @click="nextStep" class="btn-primary flex-1">
              Confirmer le devis <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useClientStore } from '../../stores/clientStore'
import { getZoneFromGPS } from '../../utils/geoLocation'

const router = useRouter()
const clientStore = useClientStore()

const gps = clientStore.diagnosticData.step3.gps
const zoneData = getZoneFromGPS(gps.lat, gps.lng)

const zone = ref(zoneData.zone)
const basePrice = ref(zoneData.price)

const nextStep = () => {
  clientStore.setStep4Data({
    zone: zone.value,
    basePrice: basePrice.value,
    finalPrice: basePrice.value
  })
  router.push('/client/validation')
}

const previousStep = () => {
  router.push('/client/step3')
}
</script>

<style scoped>
.btn-primary {
  @apply bg-energy text-dark font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition;
}

.btn-secondary {
  @apply bg-dark-gray text-white font-bold py-3 px-6 rounded-lg hover:bg-dark transition;
}
</style>
