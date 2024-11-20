<script setup>
import VueBottomSheet from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import MapComponent from '../components/MapComponent.vue';
import NavigationBar from '@/components/NavigationBar.vue'
import RegisterCard from '@/components/RegisterCard.vue'
import GeneralCard from '@/components/GeneralCard.vue';
import { computed, ref, watch, onMounted } from 'vue';
import { useEventStore } from '@/stores/eventStore';
import DestinationCard from '@/components/DestinationCard.vue';
import DistanceCard from '@/components/DistanceCard.vue';
import { useRouter } from 'vue-router';
import { useHuntStore } from "@/stores/huntStore";
import { useMapUIStore } from "@/stores/mapUIStore";
import DescriptionCard from "@/components/DescriptionCard.vue";
import { useMapStore } from "@/stores/mapStore";
import TakePhotoCard from "@/components/TakePhotoCard.vue";
import OneThirdWayCard from "@/components/OneThirdWayCard.vue";
import CompletionCard from "@/components/CompletionCard.vue";
import CouponReedemCard from "@/components/CouponReedemCard.vue";
import TutorialCard from '../components/TutorialCard.vue';
const mapUIStore = useMapUIStore();
const eventStore = useEventStore();
const huntStore = useHuntStore();
const mapStore = useMapStore();

const isEnrolled = computed(() => eventStore.isEnrolled);

const router = useRouter();


const todoAvatarList = computed(() =>
  huntStore.huntStores
    .filter(store => !store.visited)
    .map(store => ({
      avatar: store.avatar,
    }))
);
const achievedAvatarList = computed(() =>
  huntStore.huntStores
    .filter(store => store.visited)
    .map(store => ({
      avatar: store.avatar,
    }))
);

function goToTodo() {
  router.push('/todo');
}
function goToAchieved() {
  router.push('/achieved');
}


const showDestination = computed(() => mapUIStore.showDestination);

const showDistance = computed(() => mapUIStore.showDistance);

const storeDetails = ref(null);

watch(() => mapUIStore.showStoreDetails, (newVal) => {
  if (newVal) {
    storeDetails.value.open();
    //console.log("Opening Bottom Sheet");
  } else {
    storeDetails.value.close();
    //console.log("Closing Bottom Sheet");
  }
});

const closeStoreDetails = () => {
  mapUIStore.expandStoreDetails = false;
  const element = document.querySelector('.bottom-sheet__content');
  if (element) {
    element.style.height = 'var(--half-expand-bottom-sheet-height)';
    element.style.transition = 'height 0.3s ease-in-out';
  }

  mapUIStore.inactiveStoreDetails();
  mapUIStore.activeDistance(mapUIStore.nextStop.distance, mapUIStore.nextStop.walkTime);
  if (isEnrolled.value) {
    mapUIStore.activeDestination(mapUIStore.nextStop.name);
    //mapStore.fitBounds();
  }
  else {
    mapUIStore.inactiveDestination();
  }
  mapStore.polygon.remove();


  console.log('close');
};

const showNavbar = computed(() => mapUIStore.showNavBar);


watch(() => mapUIStore.nextStop, (newNextStop) => {
  if (newNextStop.name) {
    mapUIStore.DestinationContent = newNextStop.name;
    mapUIStore.DistanceContent = {
      distance: newNextStop.distance,
      walkTime: newNextStop.walkTime
    }
  }
})

const steps = [
  {
    title: 'Hi, I\'ll guide you through in this hunting journey',
    top: '30%',
  },
  {
    title: 'This is where you are',
    top: '55%',
  },
  {
    title: 'Explore and Discover Local Treasures!',
    top: '60%',
  },
  {
    title: 'Follow Our Suggested Route or Design Your Own Adventure!',
    top: '55%',
  },
  {
    title: 'Track Your Hunting Progress Here!',
    top: '40%',
  },
];
const inTutorial = ref(true);
const currentStepIndex = ref(0);
const currentStep = computed(() => steps[currentStepIndex.value]);
async function nextStep() {
  if (currentStepIndex.value < steps.length - 1) {

    currentStepIndex.value++;
    const tutorialElement = document.querySelector('.tutorial-card');
    if (tutorialElement) {
      tutorialElement.style.top = steps[currentStepIndex.value].top;
    }

    switch (currentStepIndex.value) {
      case 0:
        break;
      case 1:
        await mapStore.renderCurrentLocation();
        mapStore.map3D.center = {
          lat: mapStore.currentLocation.lat,
          lng: mapStore.currentLocation.lng,
          altitude: 10
        }
        mapStore.map3D.tilt = 30;
        mapStore.map3D.range = 1000;
        break;
      case 2:
        if (!mapStore.markersRendered)
          await mapStore.renderMarkers();
        mapStore.fitBounds();
        break;
      case 3:
        mapUIStore.nextStop = huntStore.huntStores[0];
        mapUIStore.activeDestination(mapUIStore.nextStop.name);
        eventStore.isEnrolled = true;
        mapUIStore.activeDistance(mapUIStore.nextStop.distance, mapUIStore.nextStop.walkTime);
        break;
      case 4:
        eventStore.isEnrolled = false;
        mapUIStore.showDestination = false;
        mapUIStore.showDistance = false;
        mapUIStore.showNavBar = true;
        mapUIStore.showTodoCard = true;
        const guideCat = document.querySelector('.guide-cat');
        if (guideCat) guideCat.remove();
        const arrowRight = document.querySelector('.icon-right');
        if (arrowRight) arrowRight.remove();
        const arrowDown = document.querySelector('.icon-down');
        if (arrowDown) arrowDown.style.display = 'flex';
    }


  } else {
    mapUIStore.showNavBar = true;
    mapUIStore.showTodoCard = true;
    inTutorial.value = false;
  }
}

</script>

<template>
  <div class="hunter-container">

    <div class="loc-info">
      <DestinationCard v-if="showDestination" />
      <DistanceCard v-if="showDistance && isEnrolled" />
    </div>

    <div class="map-background">
      <MapComponent />
    </div>
    <TutorialCard v-if="inTutorial" :title="currentStep.title" :goNext="nextStep" />


    <div class="hunt-info" v-if="mapUIStore.showTodoCard">
      <div v-if="isEnrolled">
        <div class="eventCard">
          <GeneralCard title="To Do" :if-magnify=true :magnify-action=goToTodo :avatar-list="todoAvatarList" />
          <GeneralCard title="Achieved" :if-magnify=true :magnify-action=goToAchieved
            :avatar-list="achievedAvatarList" />
        </div>
      </div>
      <div v-else>
        <RegisterCard />
      </div>
    </div>

    <vue-bottom-sheet ref="storeDetails" :overlay="false" @closed="closeStoreDetails">
      <DescriptionCard />
    </vue-bottom-sheet>

    <NavigationBar v-if="showNavbar" class="navigation-bar" />

    <v-dialog v-model="mapUIStore.showArrivalTask" width="auto" transition="dialog-bottom-transition">
      <TakePhotoCard />
    </v-dialog>


    <v-dialog v-model="mapUIStore.showOneThirdCard" width="auto" transition="dialog-bottom-transition">
      <OneThirdWayCard />
    </v-dialog>

    <v-dialog v-model="mapUIStore.showCompleteCard" width="auto" transition="dialog-bottom-transition">
      <CompletionCard />
    </v-dialog>

    <v-dialog v-model="mapUIStore.showCouponReedemCard" width="auto" transition="dialog-bottom-transition">
      <CouponReedemCard />
    </v-dialog>

  </div>

</template>


<style scoped>
.map-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: var(--navbar-height);
  width: 100%;
  min-width: 420px;
  height: 100%;
  z-index: 0;
}

.loc-info {
  position: absolute;
  top: 0;

  width: 100%;
  max-width: 500px;
  min-width: 420px;
  height: auto;

  background-color: transparent;

  padding: 30px;

  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  gap: 10px;

  justify-content: space-evenly;

  z-index: 10;
}

.hunt-info {
  position: fixed;
  bottom: var(--navbar-height);
  left: 0;
  right: 0;
  height: auto;
  background-color: var(--color-background);
  padding: 20px;
  border-radius: 30px 30px 0 0;
  box-sizing: border-box;
  z-index: 10;
  overflow: hidden;
}



.eventCard {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
}

@media (min-aspect-ratio: 1/2) {
  .eventCard {
    flex-direction: row;
  }
}


.general-reward-card {
  display: flex;
  flex-direction: column;
  padding: 40px;
  gap: 10px;
  justify-content: space-evenly;
  text-align: center;
}

.full-width {
  width: 100%;
}

.v-card-style {
  min-height: 540px;
  min-width: 360px;
  max-width: 360px;
  border-radius: 20px !important;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  GeneralButton {
    width: 100%;
  }

  p {
    color: gray;
  }

  h1,
  h2,
  h3,
  h4,
  h5 {
    color: var(--color-text);
  }

  img {
    width: 70%;
    align-self: center;
  }
}
</style>