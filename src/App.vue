<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import { ref, computed } from 'vue'
import quizData from './data/quizData'

// 상태 관리
const currentLevel = ref(1)
const score = ref(0)
const requiredScore = ref(100)
const currentQuizIndex = ref(0)
const answered = ref(false)
const correct = ref(false)

// 캐릭터 이미지 매핑
const characterImages = {
  1: '/characters/level1.png',  // 실제 이미지 경로로 수정 필요
  2: '/characters/level2.png',
  3: '/characters/level3.png',
  4: '/characters/level4.png'
}

// 현재 캐릭터 이미지
const currentCharacterImage = computed(() => characterImages[currentLevel.value])

// 현재 퀴즈 데이터
const currentQuiz = computed(() => quizData[currentQuizIndex.value])

// 답변 체크
const checkAnswer = (selectedIndex) => {
  answered.value = true
  correct.value = selectedIndex === currentQuiz.value.correctIndex

  if (correct.value) {
    score.value += 20
    checkLevelUp()
  }
}

// 레벨업 체크
const checkLevelUp = () => {
  if (score.value >= requiredScore.value && currentLevel.value < 4) {
    currentLevel.value++
    score.value = 0
    requiredScore.value = currentLevel.value * 100
  }
}

// 옵션 스타일링
const getOptionClass = (index) => {
  if (!answered.value) {
    return 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
  }
  if (index === currentQuiz.value.correctIndex) {
    return 'border-green-500 bg-green-50'
  }
  return 'border-gray-200 opacity-60'
}

// 다음 문제로
const nextQuiz = () => {
  answered.value = false
  correct.value = false
  currentQuizIndex.value = (currentQuizIndex.value + 1) % quizData.length
}
</script>

<template>
  <div class="min-h-screen bg-blue-50 py-8">
    <div class="container mx-auto px-4 max-w-3xl">
      <!-- 상단 상태바 -->
      <div class="bg-white rounded-xl shadow-lg p-4 mb-6">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-4">
            <img :src="currentCharacterImage" alt="현재 캐릭터" class="w-16 h-16 object-contain" />
            <div>
              <div class="text-lg font-bold text-blue-600">Level {{ currentLevel }}</div>
              <div class="text-sm text-gray-600">점수: {{ score }}/{{ requiredScore }}</div>
            </div>
          </div>
          <div class="w-48 bg-gray-200 rounded-full h-3">
            <div class="bg-blue-600 rounded-full h-3 transition-all duration-500"
              :style="{ width: `${(score / requiredScore) * 100}%` }"></div>
          </div>
        </div>
      </div>

      <!-- 퀴즈 섹션 -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 class="text-xl font-bold text-center text-gray-800 mb-6">
          {{ currentQuiz.question }}
        </h2>

        <div class="grid gap-4">
          <button v-for="(option, index) in currentQuiz.options" :key="index" @click="checkAnswer(index)"
            :disabled="answered" class="p-4 rounded-lg border-2 text-left transition-all"
            :class="getOptionClass(index)">
            {{ option }}
          </button>
        </div>

        <!-- 결과 메시지 -->
        <div v-if="answered" class="mt-6 text-center">
          <p :class="correct ? 'text-green-600' : 'text-red-600'" class="font-bold text-lg">
            {{ correct ? '정답입니다! 🎉' : '틀렸습니다. 다시 도전해보세요!' }}
          </p>
          <button @click="nextQuiz"
            class="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors">
            다음 문제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- <template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template> -->

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
