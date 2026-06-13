<template>
  <div class="min-h-screen bg-light-gray py-8">
    <div class="max-w-2xl mx-auto px-4">
      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex justify-between text-sm mb-2">
          <span class="font-bold">Étape 3/5 : Coordonnées & Géolocalisation</span>
          <span class="text-gray-600">60%</span>
        </div>
        <div class="w-full bg-gray-300 rounded-full h-2">
          <div class="bg-energy h-2 rounded-full" style="width: 60%"></div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-8">
        <h1 class="text-3xl font-bold text-dark mb-8">Vos Coordonnées</h1>

        <form @submit.prevent="nextStep" class="space-y-6">
          <!-- Nom -->
          <div>
            <label class="block text-dark font-bold mb-2">Nom Complet *</label>
            <input v-model="formData.name" type="text" class="input-field" placeholder="Ex: Ahmed Ben Ali" required>
          </div>

          <!-- Téléphone -->
          <div>
            <label class="block text-dark font-bold mb-2">Numéro de Téléphone *</label>
            <input v-model="formData.phone" type="tel" class="input-field" placeholder="Ex: 0661234567" required>
          </div>

          <!-- Géolocalisation -->
          <div>
            <label class="block text-dark font-bold mb-2">Localisation *</label>
            <button type="button" @click="requestLocation" class="btn-outline w-full mb-4">
              <i class="fas fa-location-dot mr-2"></i> {{ locationRequested ? 'Géolocalisation en cours...' : 'Activer la géolocalisation' }}
            </button>
            <p v-if="formData.gps" class="text-green-600 font-semibold">
              <i class="fas fa-check-circle mr-2"></i> Position détectée
            </p>
            <p v-if="locationError" class="text-red-600 font-semibold">
              <i class="fas fa-exclamation-circle mr-2"></i> {{ locationError }}
            </p>
          </div>

          <!-- Zone info -->
          <div v-if="zoneInfo" class="bg-green-50 border-2 border-green-500 p-4 rounded-lg">
            <p class="text-green-700 font-bold"><i class="fas fa-check-circle mr-2"></i> Zone couverte</p>
            <p class="text-green-600 mt-2">{{ zoneInfo.zone }} - Prix: {{ zoneInfo.price }} DA</p>
          </div>

          <div v-if="zoneInfo === false" class="bg-red-50 border-2 border-red-500 p-4 rounded-lg">
            <p class="text-red-700 font-bold"><i class="fas fa-times-circle mr-2"></i> Zone non couverte</p>
            <p class="text-red-600 mt-2">Malheureusement, votre zone n'est pas encore desservie.</p>
          </div>

          <!-- Navigation -->
          <div class="flex gap-4 mt-8">
            <button type="button" @click="previousStep" class="btn-secondary flex-1">
              <i class="fas fa-arrow-left mr-2"></i> Retour
            </button>
            <button type="submit" :disabled="!formData.gps" class="btn-primary flex-1">
              Suivant <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useClientStore } from '../../stores/clientStore'
import { requestGeolocation, getZoneFromGPS } from '../../utils/geoLocation'

const router = useRouter()
const clientStore = useClientStore()

const formData = reactive({
  name: clientStore.diagnosticData.step3.name || '',
  phone: clientStore.diagnosticData.step3.phone || '',
  gps: clientStore.diagnosticData.step3.gps || null
})

const locationRequested = ref(false)
const locationError = ref(null)
const zoneInfo = ref(null)

const requestLocation = async () => {
  locationRequested.value = true
  locationError.value = null
  try {
    const location = await requestGeolocation()
    formData.gps = location
    const zone = getZoneFromGPS(location.lat, location.lng)
    zoneInfo.value = zone.covered ? zone : false
  } catch (error) {
    locationError.value = 'Impossible de détecter votre position. Vérifiez les permissions.'
    zoneInfo.value = null
  } finally {
    locationRequested.value = false
  }
}

const nextStep = () => {
  clientStore.setStep3Data(formData)
  router.push('/client/step4')
}

const previousStep = () => {
  router.push('/client/step2')
}
</script>

<style scoped>
.input-field {
  @apply w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:border-energy focus:outline-none transition;
}

.btn-primary {
  @apply bg-energy text-dark font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-secondary {
  @apply bg-dark-gray text-white font-bold py-3 px-6 rounded-lg hover:bg-dark transition;
}

.btn-outline {
  @apply border-2 border-energy text-energy font-bold py-3 px-6 rounded-lg hover:bg-energy hover:text-dark transition;
}
</style>
