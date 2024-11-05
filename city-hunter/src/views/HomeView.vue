<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

function goToTutorial() {
  router.push('/tutorial');
}
</script>

<template>
  <main>
    <div class="home-container" @click="goToTutorial">
      <h1>Welcome to City Hunter</h1>
      <p>Get Ready for Adventure</p>
    </div>
  </main>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  text-align: center;
  cursor: pointer;
}

h1 {
  font-size: 2rem;
  margin: 0;
}

p {
  font-size: 1.2rem;
  color: #555;
}
</style>
