<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import TutorialCard from '../components/TutorialCard.vue';
const router = useRouter();

const steps = [
  {
    title: 'Hi, I\'ll guide you through in this hunting journey',
    top: '30%',
    bg: "/tutorial/Tutorial 28.svg"
  },
  {
    title: 'This is where you are',
    top: '55%',
    bg: "/tutorial/Tutorial 29.svg"
  },
  {
    title: 'Explore and Discover Local Treasures!',
    top: '60%',
    bg: "/tutorial/Tutorial 30.svg"
  },
  {
    title: 'Explore and Discover Local Treasures!',
    top: '60%',
    bg: "/tutorial/Tutorial 31.svg"
  },
  {
    title: 'Follow Our Suggested Route or Design Your Own Adventure!',
    top: '55%',
    bg: "/tutorial/Tutorial 32.svg"
  },
  {
    title: 'Track Your Hunting Progress Here!',
    top: '30%',
    bg: "/tutorial/Tutorial 33.svg"
  },
];

const currentStepIndex = ref(0);
const currentStep = computed(() => steps[currentStepIndex.value]);

function nextStep() {
  if (currentStepIndex.value < steps.length - 1) {
    currentStepIndex.value++;
    const tutorialElement = document.querySelector('.tutorial-card');
    if (tutorialElement) {
      tutorialElement.style.top = steps[currentStepIndex.value].top;
    }
    if (currentStepIndex.value == 2) {
      setTimeout(() => {
        currentStepIndex.value++;
      }, 200);
    }
    if (currentStepIndex.value == steps.length - 1) {
      const guideCat = document.querySelector('.guide-cat');
      if (guideCat) guideCat.remove();
      const arrowRight = document.querySelector('.icon-right');
      if (arrowRight) arrowRight.remove();
      const arrowDown = document.querySelector('.icon-down');
      if (arrowDown) arrowDown.style.display = 'flex';
    }
  } else {
    router.push('/hunt');
  }
}
</script>


<template>
  <div class="tutorial">
    <div class="map-background">
      <img :src="currentStep.bg" />
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

  img {
    width: 100vw;
  }
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
