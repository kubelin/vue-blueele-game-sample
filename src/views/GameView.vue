<template>
  <div class="min-h-screen bg-blue-50 py-8">
    <div class="container mx-auto px-4 max-w-3xl">
      <!-- 상단 게임 정보 -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-blue-600 mb-2">푸른코끼리 퀴즈</h1>
        <p class="text-gray-600">현재 레벨: {{ quizStore.level }}</p>
      </div>
      <!-- 디버깅용 -->
      <pre>{{ quizStore.currentQuiz }}</pre>
      <!-- 퀴즈 카드 영역 -->
      <QuizCard v-if="quizStore.currentQuiz" :quiz="quizStore.currentQuiz" @answer-selected="handleAnswer" />


      <!-- 결과 모달 등 추가 UI -->
    </div>
  </div>
</template>



<script setup>
import { onMounted } from 'vue'
import { useQuizStore } from '@/stores/quizStore'
import QuizCard from '@/components/QuizCard.vue'

const quizStore = useQuizStore()

// 답변 처리
const handleAnswer = (isCorrect) => {
  if (isCorrect) {
    quizStore.addScore()
  }
}

// 컴포넌트 마운트 시 퀴즈 초기화
onMounted(() => {
  quizStore.initializeQuiz()
})
</script>
