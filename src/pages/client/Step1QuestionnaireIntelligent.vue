<template>
  <div class="min-h-screen bg-light-gray py-8">
    <div class="max-w-2xl mx-auto px-4">
      <!-- Progress Bar -->
      <div class="mb-8">
        <div class="flex justify-between text-sm mb-2">
          <span class="font-bold">Étape 1/5 : Questions de diagnostic</span>
          <span class="text-gray-600">20%</span>
        </div>
        <div class="w-full bg-gray-300 rounded-full h-2">
          <div class="bg-energy h-2 rounded-full" style="width: 20%"></div>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-8">
        <h1 class="text-3xl font-bold text-dark mb-8">Diagnostic Intelligent</h1>

        <!-- Question A -->
        <div class="mb-8" v-if="currentQuestion === 1">
          <h2 class="text-xl font-bold mb-6">{{ questions[0].text }}</h2>
          <div class="space-y-3">
            <button @click="answerQuestion(0, true)" class="w-full btn-option">
              <i class="fas fa-check text-energy mr-2"></i> Oui
            </button>
            <button @click="answerQuestion(0, false)" class="w-full btn-option">
              <i class="fas fa-times text-red-500 mr-2"></i> Non
            </button>
          </div>
          <div v-if="answers[0] === false" class="mt-6 bg-yellow-50 border-l-4 border-energy p-4 rounded">
            <p class="text-dark font-semibold"><i class="fas fa-lightbulb text-energy mr-2"></i> Conseil :</p>
            <p class="text-gray-700">Vérifiez que les cosses de votre batterie sont bien serrées et non oxydées.</p>
          </div>
        </div>

        <!-- Question B -->
        <div class="mb-8" v-if="currentQuestion === 2">
          <h2 class="text-xl font-bold mb-6">{{ questions[1].text }}</h2>
          <div class="space-y-3">
            <button @click="answerQuestion(1, true)" class="w-full btn-option">
              <i class="fas fa-check text-energy mr-2"></i> Oui
            </button>
            <button @click="answerQuestion(1, false)" class="w-full btn-option">
              <i class="fas fa-times text-red-500 mr-2"></i> Non
            </button>
          </div>
          <div v-if="answers[1] === true" class="mt-6 bg-yellow-50 border-l-4 border-energy p-4 rounded">
            <p class="text-dark font-semibold"><i class="fas fa-lightbulb text-energy mr-2"></i> Conseil :</p>
            <p class="text-gray-700">Votre batterie est faible. Essayez de démarrer avec des câbles de secours avant de réserver.</p>
          </div>
        </div>

        <!-- Question C -->
        <div class="mb-8" v-if="currentQuestion === 3">
          <h2 class="text-xl font-bold mb-6">{{ questions[2].text }}</h2>
          <div class="space-y-3">
            <button @click="answerQuestion(2, true)" class="w-full btn-option">
              <i class="fas fa-check text-energy mr-2"></i> Oui
            </button>
            <button @click="answerQuestion(2, false)" class="w-full btn-option">
              <i class="fas fa-times text-red-500 mr-2"></i> Non
            </button>
          </div>
          <div v-if="answers[2] === true" class="mt-6 bg-yellow-50 border-l-4 border-energy p-4 rounded">
            <p class="text-dark font-semibold"><i class="fas fa-lightbulb text-energy mr-2"></i> Conseil :</p>
            <p class="text-gray-700">Il s'agit probablement d'un simple fusible grillé. Consultez le manuel de votre véhicule.</p>
          </div>
        </div>

        <!-- Problem solved? -->
        <div v-if="problemSolved" class="bg-green-50 border-2 border-green-500 p-6 rounded-lg text-center">
          <i class="fas fa-check-circle text-green-500 text-4xl mb-4"></i>
          <p class="text-green-700 font-bold mb-4">Excellent ! Votre problème a été résolu.</p>
          <button @click="restartDiagnostic" class="btn-secondary">Recommencer</button>
        </div>

        <!-- Navigation -->
        <div class="flex gap-4 mt-8" v-if="!problemSolved">
          <button v-if="currentQuestion > 1" @click="previousQuestion" class="btn-secondary flex-1">
            <i class="fas fa-arrow-left mr-2"></i> Retour
          </button>
          <button @click="nextQuestion" class="btn-primary flex-1">
            Le problème persiste <i class="fas fa-arrow-right ml-2"></i>
          </button>
          <button @click="problemResolved" class="btn-outline flex-1">
            <i class="fas fa-check mr-2"></i> Problème réglé
          </button>
        </div>

        <!-- Final button -->
        <button v-if="currentQuestion === 3 && !problemSolved" @click="proceedToStep2" class="w-full btn-primary mt-4">
          Aucune solution trouvée - Réserver une intervention <i class="fas fa-arrow-right ml-2"></i>
        </button>
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

const questions = [
  { text: 'Le tableau de bord s\'allume-t-il ?' },
  { text: 'Entendez-vous un bruit de "clac-clac" au démarrage ?' },
  { text: 'Le problème concerne-t-il un seul élément (ex: allume-cigare, une vitre) ?' }
]

const currentQuestion = ref(1)
const answers = ref([null, null, null])
const problemSolved = ref(false)

const answerQuestion = (index, answer) => {
  answers.value[index] = answer
}

const problemResolved = () => {
  problemSolved.value = true
}

const restartDiagnostic = () => {
  currentQuestion.value = 1
  answers.value = [null, null, null]
  problemSolved.value = false
}

const nextQuestion = () => {
  if (currentQuestion.value < 3) {
    currentQuestion.value++
  }
}

const previousQuestion = () => {
  if (currentQuestion.value > 1) {
    currentQuestion.value--
  }
}

const proceedToStep2 = () => {
  clientStore.setStep1Data({
    questionA: answers.value[0],
    questionB: answers.value[1],
    questionC: answers.value[2]
  })
  router.push('/client/step2')
}
</script>

<style scoped>
.btn-primary {
  @apply bg-energy text-dark font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition;
}

.btn-secondary {
  @apply bg-dark-gray text-white font-bold py-3 px-6 rounded-lg hover:bg-dark transition;
}

.btn-outline {
  @apply border-2 border-energy text-energy font-bold py-3 px-6 rounded-lg hover:bg-energy hover:text-dark transition;
}

.btn-option {
  @apply bg-light-gray text-dark p-4 rounded-lg font-semibold hover:bg-energy hover:text-dark transition border-2 border-transparent hover:border-energy;
}
</style>
