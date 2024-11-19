<script setup>
import MapComponent from '@/components/MapComponent.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
function goToTutorial() {
  router.push('/tutorial');
}
</script>

<template>
  <main>
    <div class="home-container" @click="goToTutorial">
      <div class="map-background">
        <MapComponent />
        <div class="map-overlay"></div>
      </div>
      <img class="welcome-img" src="/welcome_image.svg" />
    </div>
  </main>
</template>

<style scoped>
.welcome-img {
  width: 80vw;
  z-index: 3;
  margin: auto;
  margin-top: 25vh;
}

.map-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vh;
  height: 100vh;
  z-index: 0;
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.home-container {
  position: relative;
  display: flex;
  justify-items: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
