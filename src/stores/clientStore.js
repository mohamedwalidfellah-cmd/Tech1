import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useClientStore = defineStore('client', () => {
  const diagnosticData = ref({
    step1: { questionA: null, questionB: null, questionC: null },
    step2: { brand: '', model: '', year: '', fuel: '', immatriculation: '', carteGrise: null },
    step3: { name: '', phone: '', gps: null },
    step4: { zone: '', basePrice: 2500, finalPrice: 0 }
  })

  const setStep1Data = (data) => {
    diagnosticData.value.step1 = { ...diagnosticData.value.step1, ...data }
    localStorage.setItem('clientData', JSON.stringify(diagnosticData.value))
  }

  const setStep2Data = (data) => {
    diagnosticData.value.step2 = { ...diagnosticData.value.step2, ...data }
    localStorage.setItem('clientData', JSON.stringify(diagnosticData.value))
  }

  const setStep3Data = (data) => {
    diagnosticData.value.step3 = { ...diagnosticData.value.step3, ...data }
    localStorage.setItem('clientData', JSON.stringify(diagnosticData.value))
  }

  const setStep4Data = (data) => {
    diagnosticData.value.step4 = { ...diagnosticData.value.step4, ...data }
    localStorage.setItem('clientData', JSON.stringify(diagnosticData.value))
  }

  const resetData = () => {
    diagnosticData.value = {
      step1: { questionA: null, questionB: null, questionC: null },
      step2: { brand: '', model: '', year: '', fuel: '', immatriculation: '', carteGrise: null },
      step3: { name: '', phone: '', gps: null },
      step4: { zone: '', basePrice: 2500, finalPrice: 0 }
    }
    localStorage.removeItem('clientData')
  }

  const loadFromStorage = () => {
    const stored = localStorage.getItem('clientData')
    if (stored) {
      diagnosticData.value = JSON.parse(stored)
    }
  }

  loadFromStorage()

  return {
    diagnosticData,
    setStep1Data,
    setStep2Data,
    setStep3Data,
    setStep4Data,
    resetData
  }
})
