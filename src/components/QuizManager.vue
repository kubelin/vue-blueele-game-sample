<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-6">퀴즈 관리</h2>

    <!-- 퀴즈 추가 폼 -->
    <div class="bg-white rounded-xl shadow p-6 mb-6">
      <h3 class="text-lg font-semibold mb-4">새 퀴즈 추가</h3>
      <form @submit.prevent="addNewQuiz" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">문제</label>
          <input v-model="newQuiz.question" type="text" class="w-full p-2 border rounded" required />
        </div>

        <div>
          <label class="block text-sm font-medium mb-2">선택지</label>
          <div v-for="(option, index) in newQuiz.options" :key="index" class="mb-2">
            <div class="flex gap-2">
              <input v-model="newQuiz.options[index]" type="text" class="flex-1 p-2 border rounded" required />
              <button @click="removeOption(index)" class="px-3 text-red-500" type="button">
                ×
              </button>
            </div>
          </div>
          <button @click="addOption" type="button" class="text-blue-500 text-sm">
            + 선택지 추가
          </button>
        </div>

        <div class="flex gap-4">
          <div>
            <label class="block text-sm font-medium mb-2">정답 번호</label>
            <select v-model="newQuiz.correctIndex" class="p-2 border rounded" required>
              <option v-for="(_, index) in newQuiz.options" :key="index" :value="index">
                {{ index + 1 }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">점수</label>
            <input v-model.number="newQuiz.points" type="number" class="p-2 border rounded" required />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">레벨</label>
            <input v-model.number="newQuiz.level" type="number" min="1" max="8" class="p-2 border rounded" required />
          </div>
        </div>

        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          퀴즈 추가
        </button>
      </form>
    </div>

    <!-- 퀴즈 목록 -->
    <div class="space-y-4">
      <div v-for="quiz in quizStore.quizzes" :key="quiz.id" class="bg-white rounded-xl shadow p-6">
        <div class="flex justify-between items-start">
          <div>
            <h4 class="font-semibold">{{ quiz.question }}</h4>
            <div class="mt-2 space-y-1">
              <div v-for="(option, index) in quiz.options" :key="index"
                :class="{ 'text-green-600 font-medium': index === quiz.correctIndex }">
                {{ index + 1 }}. {{ option }}
              </div>
            </div>
            <div class="mt-2 text-sm text-gray-500">
              레벨: {{ quiz.level }} | 점수: {{ quiz.points }}
            </div>
          </div>
          <div class="flex gap-2">
            <button @click="editQuiz(quiz)" class="text-blue-500">
              수정
            </button>
            <button @click="deleteQuiz(quiz.id)" class="text-red-500">
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuizStore } from '@/stores/quizStore'

const quizStore = useQuizStore()

const newQuiz = ref({
  question: '',
  options: ['', '', '', ''],
  correctIndex: 0,
  points: 20,
  level: 1
})

const addNewQuiz = () => {
  quizStore.addQuiz({
    id: Date.now(),  // 간단한 ID 생성
    ...newQuiz.value
  })
  // 폼 초기화
  newQuiz.value = {
    question: '',
    options: ['', '', '', ''],
    correctIndex: 0,
    points: 20,
    level: 1
  }
}

const addOption = () => {
  newQuiz.value.options.push('')
}

const removeOption = (index) => {
  if (newQuiz.value.options.length > 2) {
    newQuiz.value.options.splice(index, 1)
  }
}

const editQuiz = (quiz) => {
  // 수정 로직 구현
}

const deleteQuiz = (quizId) => {
  if (confirm('정말 삭제하시겠습니까?')) {
    quizStore.quizzes = quizStore.quizzes.filter(q => q.id !== quizId)
  }
}
</script>
