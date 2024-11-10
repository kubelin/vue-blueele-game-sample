<!-- src/components/QuizCard.vue -->
<script setup>
import { ref } from 'vue'
import { Trophy, CheckCircle, XCircle, ArrowRight } from 'lucide-vue-next'
import { useQuizStore } from '@/stores/quizStore'

const quizStore = useQuizStore()
const answered = ref(false)
const correct = ref(false)

// 선택된 답변인지 확인하는 함수
const isSelected = (index) => {
  return quizStore.selectedAnswer === index;
};

// 정답인지 확인하는 함수
const isCorrect = (index) => {
  return index === quizStore.quizzes[quizStore.currentQuizIndex].correctAnswer;
};

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
  console.log('next question');
  console.log('next question ' + quizStore.currentQuizIndex + ' ' + quizStore.quizzes.length);
  if (quizStore.currentQuizIndex < quizStore.quizzes.length - 1) {
    quizStore.nextQuiz()
  } else {
    quizStore.endGame()
  }
}
</script>

<template>
  <div v-if="!quizStore.isGameOver" class="bg-white rounded-2xl shadow-lg p-8 transition-all hover:shadow-xl">
    <!-- ... (기존 코드 유지) ... -->
    <div class="bg-white rounded-2xl shadow-lg p-8 transition-all hover:shadow-xl">
      <!-- 상단 상태 표시 -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-4">
          <div class="bg-blue-100 p-3 rounded-full">
            <!-- <Brain class="w-8 h-8 text-blue-500" /> -->
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
        <div class="flex flex-col space-y-6">
          <button v-for="(option, index) in quizStore.quizzes[quizStore.currentQuizIndex].options" :key="index"
            @click="selectAnswer(index)" :disabled="answered"
            class="answer-option p-6 text-lg font-medium rounded-2xl transition-all text-left block w-full" :class="{
              'bg-white hover:bg-blue-50': !answered,
              'bg-green-50': answered && isCorrect(index),
              'bg-red-50': answered && isSelected(index) && !isCorrect(index),
              'opacity-75': answered && !isSelected(index)
            }">
            {{ option }}
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
  </div>
  <div v-else class="bg-white rounded-2xl shadow-lg p-8 transition-all hover:shadow-xl text-center">
    <h2 class="text-2xl font-bold mb-4">게임 종료!</h2>
    <p class="text-lg">모든 문제를 풀었습니다.</p>
    <p class="text-lg">최종 점수: {{ quizStore.score }}</p>
    <button @click="quizStore.resetGame()" class="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full
                      hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105">
      게임 다시 시작
    </button>
  </div>


</template>


<style scoped>
.answer-option {
  border: 2.5px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  display: block;
}

.answer-option:hover:not(:disabled) {
  border-color: #93c5fd;
  transform: translateY(-2px);
  box-shadow: 0 8px 15px -3px rgba(0, 0, 0, 0.1);
}

.answer-option:active:not(:disabled) {
  transform: translateY(0);
}

/* 정답일 때 */
.answer-option.bg-green-50 {
  border-color: #86efac;
  box-shadow: 0 4px 6px -1px rgba(134, 239, 172, 0.3);
}

/* 오답일 때 */
.answer-option.bg-red-50 {
  border-color: #fca5a5;
  box-shadow: 0 4px 6px -1px rgba(252, 165, 165, 0.3);
}

/* 추가 애니메이션 */
@keyframes gentle-bounce {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-3px);
  }
}

.answer-option:hover:not(:disabled) {
  animation: gentle-bounce 2s infinite;
}
</style>
