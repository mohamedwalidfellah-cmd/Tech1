<template>
  <div class="min-h-screen bg-light-gray py-8">
    <div class="max-w-2xl mx-auto px-4">
      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex justify-between text-sm mb-2">
          <span class="font-bold">Étape 2/5 : Informations Véhicule</span>
          <span class="text-gray-600">40%</span>
        </div>
        <div class="w-full bg-gray-300 rounded-full h-2">
          <div class="bg-energy h-2 rounded-full" style="width: 40%"></div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-8">
        <h1 class="text-3xl font-bold text-dark mb-8">Informations de votre Véhicule</h1>

        <form @submit.prevent="nextStep" class="space-y-6">
          <!-- Marque -->
          <div>
            <label class="block text-dark font-bold mb-2">Marque du Véhicule *</label>
            <input v-model="formData.brand" type="text" class="input-field" placeholder="Ex: Peugeot" required>
          </div>

          <!-- Modèle -->
          <div>
            <label class="block text-dark font-bold mb-2">Modèle *</label>
            <input v-model="formData.model" type="text" class="input-field" placeholder="Ex: 407" required>
          </div>

          <!-- Année -->
          <div>
            <label class="block text-dark font-bold mb-2">Année de fabrication *</label>
            <input v-model="formData.year" type="number" class="input-field" placeholder="Ex: 2015" required>
          </div>

          <!-- Motorisation -->
          <div>
            <label class="block text-dark font-bold mb-2">Type de motorisation *</label>
            <select v-model="formData.fuel" class="input-field" required>
              <option value="">-- Sélectionner --</option>
              <option value="essence">Essence</option>
              <option value="diesel">Diesel</option>
              <option value="hybride">Hybride</option>
            </select>
          </div>

          <!-- Immatriculation -->
          <div>
            <label class="block text-dark font-bold mb-2">Immatriculation *</label>
            <input v-model="formData.immatriculation" type="text" class="input-field" placeholder="Ex: 123456" required>
          </div>

          <!-- Carte Grise Upload -->
          <div>
            <label class="block text-dark font-bold mb-2">Photo de la Carte Grise * (Obligatoire)</label>
            <div class="border-2 border-dashed border-energy rounded-lg p-6 text-center cursor-pointer hover:bg-energy hover:bg-opacity-10 transition" @click="$refs.fileInput.click()">
              <i class="fas fa-cloud-upload-alt text-energy text-3xl mb-2"></i>
              <p class="text-dark font-semibold">{{ formData.carteGrise ? formData.carteGrise.name : 'Cliquez pour télécharger' }}</p>
              <p class="text-gray-600 text-sm">JPG, PNG (max 5 MB)</p>
              <input ref="fileInput" @change="handleFileUpload" type="file" accept="image/*" hidden>
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex gap-4 mt-8">
            <button type="button" @click="previousStep" class="btn-secondary flex-1">
              <i class="fas fa-arrow-left mr-2"></i> Retour
            </button>
            <button type="submit" class="btn-primary flex-1">
              Suivant <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useClientStore } from '../../stores/clientStore'

const router = useRouter()
const clientStore = useClientStore()
const fileInput = ref(null)

const formData = ref({
  brand: clientStore.diagnosticData.step2.brand || '',
  model: clientStore.diagnosticData.step2.model || '',
  year: clientStore.diagnosticData.step2.year || '',
  fuel: clientStore.diagnosticData.step2.fuel || '',
  immatriculation: clientStore.diagnosticData.step2.immatriculation || '',
  carteGrise: null
})

const handleFileUpload = (e) => {
  formData.value.carteGrise = e.target.files[0]
}

const nextStep = () => {
  clientStore.setStep2Data(formData.value)
  router.push('/client/step3')
}

const previousStep = () => {
  router.push('/client/step1')
}
</script>

<style scoped>
.input-field {
  @apply w-full px-4 py-3 border-2 border-light-gray rounded-lg focus:border-energy focus:outline-none transition;
}

.btn-primary {
  @apply bg-energy text-dark font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition;
}

.btn-secondary {
  @apply bg-dark-gray text-white font-bold py-3 px-6 rounded-lg hover:bg-dark transition;
}
</style>
