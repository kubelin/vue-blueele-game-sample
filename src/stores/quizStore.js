// stores/quizStore.js
import { defineStore } from 'pinia'

// 초기 퀴즈 데이터
const initialQuizzes = [
  {
    id: 1,
    question: '친구가 힘들어할 때 가장 좋은 말은?',
    options: [
      '너만 힘든 거 아니야',
      '시간이 지나면 괜찮아질 거야',
      '많이 힘들었겠다. 내가 들어줄게',
      '그냥 잊어버려',
    ],
    correctIndex: 2,
    points: 20,
    level: 1,
  },
  {
    id: 2,
    question: '친구가 따돌림을 다할때 가장 좋은 말은?',
    options: [
      '힘내!!!',
      '그러길래 애들한테 잘 했어야지..',
      '나랑 같이 놀자, 이리 와!',
      '그냥 잊어버려',
    ],
    correctIndex: 2,
    points: 20,
    level: 1,
  },
]

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    quizzes: JSON.parse(localStorage.getItem('quizzes')) || initialQuizzes,
    currentQuizIndex: 0,
    score: 0,
    level: 1,
    requiredScore: 40,
    isGameOver: false,
    isQuizCompleted: false,
  }),

  getters: {
    currentQuiz: (state) => state.quizzes[state.currentQuizIndex] || null,
  },

  actions: {
    // 퀴즈 추가
    addQuiz(quiz) {
      this.quizzes.push(quiz)
      this.saveQuizzes() // localStorage에 저장
    },

    // 퀴즈 삭제
    deleteQuiz(quizId) {
      this.quizzes = this.quizzes.filter((q) => q.id !== quizId)
      this.saveQuizzes() // localStorage에 저장
    },

    // 퀴즈 수정
    updateQuiz(quizId, updatedQuiz) {
      const index = this.quizzes.findIndex((q) => q.id === quizId)
      if (index !== -1) {
        this.quizzes[index] = { ...this.quizzes[index], ...updatedQuiz }
        this.saveQuizzes() // localStorage에 저장
      }
    },

    // localStorage에 퀴즈 저장
    saveQuizzes() {
      localStorage.setItem('quizzes', JSON.stringify(this.quizzes))
    },
    endGame() {
      this.isGameOver = true
    },
    resetGame() {
      this.currentQuizIndex = 0
      this.score = 0
      this.isGameOver = false
    },

    // 기존 actions...
    initializeQuiz() {
      this.currentQuizIndex = 0
      this.score = 0
    },

    nextQuiz() {
      if (this.currentQuizIndex < this.quizzes.length - 1) {
        this.currentQuizIndex++
      } else {
        this.currentQuizIndex = 0
      }
    },

    addScore(points = 20) {
      this.score += points
      if (this.score >= this.requiredScore) {
        this.levelUp()
      }
    },

    levelUp() {
      this.level++
      this.score = 0
      this.requiredScore = this.level * 100
    },
  },
})
