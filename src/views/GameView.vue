<template>
  <div class="min-h-screen bg-blue-50 py-8">
    <div class="container mx-auto px-4 max-w-3xl">
      <!-- 상단 게임 정보 -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-blue-600 mb-2">푸른코끼리 퀴즈</h1>
        <p class="text-gray-600">현재 레벨: {{ quizStore.level }}</p>
        <!-- 방법 1: v-if 사용 -->
        <div class="elephant-container">
          <img v-if="quizStore.level === 1" src="@/assets/0단계.png" alt="Level 1 Elephant" class="elephant-image">
          <img v-else-if="quizStore.level === 2" src="@/assets/1단계.png" alt="Level 2 Elephant" class="elephant-image">
          <img v-else-if="quizStore.level === 3" src="@/assets/2단계.png" alt="Level 3 Elephant" class="elephant-image">
          <img v-else-if="quizStore.level === 4" src="@/assets/3단계.png" alt="Level 3 Elephant" class="elephant-image">
          <img v-else-if="quizStore.level === 5" src="@/assets/4단계.png" alt="Level 3 Elephant" class="elephant-image">
          <img v-else-if="quizStore.level === 6" src="@/assets/5단계.png" alt="Level 3 Elephant" class="elephant-image">
          <img v-else-if="quizStore.level === 7" src="@/assets/6단계.png" alt="Level 3 Elephant" class="elephant-image">
          <img v-else-if="quizStore.level === 8" src="@/assets/7단계.png" alt="Level 3 Elephant" class="elephant-image">
        </div>
      </div>
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
