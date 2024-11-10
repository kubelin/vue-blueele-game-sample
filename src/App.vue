<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import { RouterView } from 'vue-router'

// 상태 관리
// const currentLevel = ref(1)
// const score = ref(0)
// const requiredScore = ref(100)
// const currentQuizIndex = ref(0)
// const answered = ref(false)
// const correct = ref(false)

// // 캐릭터 이미지 매핑
// const characterImages = {
//   1: '/characters/level1.png',  // 실제 이미지 경로로 수정 필요
//   2: '/characters/level2.png',
//   3: '/characters/level3.png',
//   4: '/characters/level4.png'
// }

// // 현재 캐릭터 이미지
// const currentCharacterImage = computed(() => characterImages[currentLevel.value])

// // 현재 퀴즈 데이터
// const currentQuiz = computed(() => quizData[currentQuizIndex.value])

// // 답변 체크
// const checkAnswer = (selectedIndex) => {
//   answered.value = true
//   correct.value = selectedIndex === currentQuiz.value.correctIndex

//   if (correct.value) {
//     score.value += 20
//     checkLevelUp()
//   }
// }

// // 레벨업 체크
// const checkLevelUp = () => {
//   if (score.value >= requiredScore.value && currentLevel.value < 4) {
//     currentLevel.value++
//     score.value = 0
//     requiredScore.value = currentLevel.value * 100
//   }
// }

// // 옵션 스타일링
// const getOptionClass = (index) => {
//   if (!answered.value) {
//     return 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
//   }
//   if (index === currentQuiz.value.correctIndex) {
//     return 'border-green-500 bg-green-50'
//   }
//   return 'border-gray-200 opacity-60'
// }

// // 다음 문제로
// const nextQuiz = () => {
//   answered.value = false
//   correct.value = false
//   currentQuizIndex.value = (currentQuizIndex.value + 1) % quizData.length
// }
</script>

<template>
  <RouterView />
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
