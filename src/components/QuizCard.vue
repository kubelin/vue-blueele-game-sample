<!-- src/components/QuizCard.vue -->
<script setup>
import { ref } from 'vue'
import { Brain, Trophy, Star, CheckCircle, XCircle, ArrowRight } from 'lucide-vue-next'
import { useQuizStore } from '@/stores/quizStore'

const quizStore = useQuizStore()
const answered = ref(false)
const correct = ref(false)

const selectAnswer = (index) => {
  answered.value = true
  correct.value = index === quizStore.quizzes[quizStore.currentQuizIndex].correctIndex
  if (correct.value) {
    quizStore.addScore()
  }
}

const nextQuestion = () => {
  answered.value = false
  correct.value = false
  quizStore.nextQuiz()
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg p-8 transition-all hover:shadow-xl">
    <!-- 상단 상태 표시 -->
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-4">
        <div class="bg-blue-100 p-3 rounded-full">
          <Brain class="w-8 h-8 text-blue-500" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-gray-700">
            문제 {{ quizStore.currentQuizIndex + 1 }}
          </h3>
          <p class="text-sm text-gray-500">난이도: {{ quizStore.level }}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <Trophy class="w-5 h-5 text-yellow-500" />
        <span class="font-bold text-gray-700">{{ quizStore.score }}</span>
      </div>
    </div>

    <!-- 문제 영역 -->
    <div class="space-y-6">
      <div class="p-4 bg-blue-50 rounded-xl">
        <h4 class="text-lg font-medium text-gray-800 text-center">
          {{ quizStore.quizzes[quizStore.currentQuizIndex].question }}
        </h4>
      </div>

      <!-- 답변 옵션 -->
      <div class="grid gap-3">
        <button v-for="(option, index) in quizStore.quizzes[quizStore.currentQuizIndex].options" :key="index"
          @click="selectAnswer(index)" :disabled="answered"
          class="p-4 rounded-xl border-2 transition-all text-left flex items-center gap-3">
          <div class="w-8 h-8 rounded-full flex items-center justify-center border-2">
            {{ ['A', 'B', 'C', 'D'][index] }}
          </div>
          <span>{{ option }}</span>
        </button>
      </div>

      <!-- 결과 메시지 -->
      <div v-if="answered" class="flex flex-col items-center gap-4 mt-6">
        <div class="flex items-center gap-2" :class="correct ? 'text-green-500' : 'text-red-500'">
          <component :is="correct ? CheckCircle : XCircle" class="w-6 h-6" />
          <span class="font-medium">
            {{ correct ? '정답입니다!' : '틀렸습니다.' }}
          </span>
        </div>
        <button @click="nextQuestion" class="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full
                      hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105">
          <div class="flex items-center gap-2">
            <ArrowRight class="w-5 h-5" />
            <span>다음 문제</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
