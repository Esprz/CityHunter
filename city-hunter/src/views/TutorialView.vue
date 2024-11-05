<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import MapComponent from '../components/MapComponent.vue';
import TutorialCard from '../components/TutorialCard.vue';
const router = useRouter();

const steps = ref([
  {
    title: 'Hi, I\'ll guide you through in this hunting journey',
  },
  {
    title: 'This is where you are',
  },
  {
    title: 'Explore Your Surroundings and Discover Local Treasures!',
  },
  {
    title: 'Follow Our Suggested Route or Design Your Own Adventure!',
  },
  {
    title: 'Stay Updated on the Hunt Challenge Item List Right Here!',
  },
]);

const currentStepIndex = ref(0);
const currentStep = computed(() => steps.value[currentStepIndex.value]);

function nextStep() {
  if (currentStepIndex.value < steps.value.length - 1) {
    currentStepIndex.value++;
  } else {
    router.push('/hunt');
  }
}
</script>


<template>
  <div class="tutorial">
    <div class="map-background">
      <MapComponent :highlightRoad="currentStepIndex === 2" />
    </div>
    <TutorialCard :title="currentStep.title" :goNext="nextStep" />
  </div>
</template>


<style scoped>
.tutorial {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.map-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}



</style>
