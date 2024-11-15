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
const mapUIStore = useMapUIStore();
const eventStore = useEventStore();
const huntStore = useHuntStore();

const isEnrolled = computed(() => eventStore.isEnrolled);

const router = useRouter();


const todoAvatarList = computed(() =>
  Array.from(huntStore.huntStores.values())
    .filter(store => !store.visited)
    .map(store => ({
      avatar: store.avatar,
    }))
);
const achievedAvatarList = computed(() =>
  Array.from(huntStore.huntStores.values())
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


const showStoreDetails = computed(() => mapUIStore.showStoreDetails);
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
  mapUIStore.inactiveStoreDetails();
  mapUIStore.activeDistance(huntStore.huntStores[0].distance, huntStore.huntStores[0].walkTime);
  if (isEnrolled.value) {
    mapUIStore.activeDestination(huntStore.huntStores[0].name);
  }
  else {
    mapUIStore.inactiveDestination();
  }
  console.log('close');
};

const showNavbar = computed(() => mapUIStore.showNavBar);



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


    <div class="hunt-info">
      <div v-if="isEnrolled">
        <div class="eventCard">
          <GeneralCard title="To Do" :if-magnify=true :magnify-action=goToTodo :avatar-list="todoAvatarList" />
          <GeneralCard title="Achieved" :if-magnify=false :magnify-action=goToAchieved
            :avatar-list="achievedAvatarList" />
        </div>
      </div>
      <div v-else>
        <RegisterCard />
      </div>
    </div>

    <vue-bottom-sheet ref="storeDetails" @closed="closeStoreDetails">
      <div class="store-details">
        <DescriptionCard />
      </div>
    </vue-bottom-sheet>

    <NavigationBar v-if="showNavbar" class="navigation-bar" />

  </div>
</template>


<style scoped>
.store-details {
  padding: 20px;
  height: 50vh;
}

.map-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 30vh;
  width: 100vw;
  height: 70vh;
  z-index: 2;
}

.loc-info {
  position: absolute;
  top: 0;

  width: 100%;
  height: auto;

  background-color: transparent;

  padding: 30px;

  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  gap: 20px;

  justify-content: space-evenly;

  z-index: 10;
}

.hunt-info {
  position: absolute;
  bottom: 10vh;
  width: 100%;
  height: auto;
  background-color: var(--color-background);
  padding: 30px;
  border-radius: 30px 30px 0 0;
  box-sizing: border-box;
  z-index: 10;
  overflow: hidden;
}

.eventCard {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
</style>