<script setup>
import MapComponent from '@/components/MapComponent.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
function goToTutorial() {
  router.push('/hunt');
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
main{
  width: 100%;
  height: 100%;
}
.home-container {
  display: flex;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.welcome-img {
  width: 80%;
  height: 50%;
  z-index: 3;
  margin: auto;
  margin-top: 25vh;
  overflow: hidden;
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  overflow: hidden;
}


</style>
