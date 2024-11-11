<script setup>
import { ref } from 'vue'
import { ThumbsUp, Smile, Frown, ArrowRight } from 'lucide-vue-next'  
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
  if (quizStore.currentQuizIndex < quizStore.quizzes.length - 1) {
    quizStore.nextQuiz()
  } else {
    quizStore.endGame()
  }
}
</script>

<template>
  <div v-if="!quizStore.isGameOver" class="bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl shadow-lg p-8 transition-all hover:shadow-xl">
    <!-- 상단 상태 표시 --> 
    <div class="flex items-center justify-between mb-8">
      <div class="flex items-center gap-4">
        <div class="bg-white p-3 rounded-full shadow-md">
          <!-- Cool icon here -->
        </div>
        <div>
          <h3 class="text-2xl font-bold text-white">
            문제 {{ quizStore.currentQuizIndex + 1 }}
          </h3>
          <p class="text-lg text-indigo-100">난이도: {{ quizStore.level }}</p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <ThumbsUp class="w-6 h-6 text-yellow-400" />  
        <span class="text-2xl font-bold text-white">{{ quizStore.score }}</span>
      </div>
    </div>
      
    <!-- 문제 영역 -->  
    <div class="space-y-6 text-center">
      <div class="p-6 bg-white rounded-xl shadow-md">
        <h4 class="text-xl font-semibold text-gray-800">
          {{ quizStore.quizzes[quizStore.currentQuizIndex].question }}  
        </h4>
      </div>
      <!-- 답변 옵션 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button v-for="(option, index) in quizStore.quizzes[quizStore.currentQuizIndex].options" :key="index"
          @click="selectAnswer(index)" :disabled="answered"  
          class="answer-option p-6 text-xl font-medium rounded-xl transition-all block w-full" 
          :class="{
            'bg-white hover:bg-indigo-50 text-indigo-800': !answered,
            'bg-green-400 text-white': answered && isCorrect(index),  
            'bg-red-400 text-white': answered && isSelected(index) && !isCorrect(index),
            'opacity-50': answered && !isSelected(index)
          }">
          {{ option }}
        </button>
      </div>
        
      <!-- 결과 메시지 -->  
      <div v-if="answered" class="flex flex-col items-center gap-4 mt-6">
      <div class="flex items-center gap-2" 
        :class="correct ? 'text-green-500' : 'text-red-500'">
        <component :is="correct ? Smile : Frown" class="w-8 h-8" />
        <span class="text-2xl font-bold">
          {{ correct ? 'U Go Einstein!' : 'Oops, Try again' }}  
        </span>
      </div>
        <button @click="nextQuestion" 
          class="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 
                 text-white text-xl font-bold rounded-full transition-all hover:scale-105 hover:shadow-lg">
          <div class="flex items-center gap-2">
            <RocketLaunch class="w-6 h-6" />  
            <span>Next Quiz!</span>
          </div>
        </button>
      </div>
    </div>
  </div>
   
  <!-- Game Over Screen -->
  <div v-else class="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-center">
    <h2 class="text-4xl font-bold text-white mb-4">Quiz Complete!</h2>
    <p class="text-xl text-indigo-100 mb-2">You finished all the quizzes!</p>
    <p class="text-3xl font-bold text-yellow-400 mb-6">Final Score: {{ quizStore.score }}</p>
    <button @click="quizStore.resetGame()" 
      class="px-8 py-4 bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600
             text-white text-xl font-bold rounded-full transition-all hover:scale-105 hover:shadow-lg">
      Play Again
    </button>
  </div>
</template>

<style scoped>  
.answer-option {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.answer-option:hover:not(:disabled) {  
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: scale(1.02);
}

.answer-option:active:not(:disabled) {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08);
  transform: scale(1);
}
</style>