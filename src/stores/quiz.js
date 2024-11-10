import { defineStore } from 'pinia'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    currentLevel: 1,
    score: 0,
    requiredScore: 100,
    currentQuizIndex: 0,
  }),

  actions: {
    addScore(points) {
      this.score += points
      this.checkLevelUp()
    },

    checkLevelUp() {
      if (this.score >= this.requiredScore && this.currentLevel < 8) {
        this.currentLevel++
        this.score = 0
        this.requiredScore = this.currentLevel * 100
      }
    },
  },
})
