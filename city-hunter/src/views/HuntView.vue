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
import GeneralRewardCard from "@/components/GeneralRewardCard.vue";
import GeneralButton from '@/components/GeneralButton.vue';
const mapUIStore = useMapUIStore();
const eventStore = useEventStore();
const huntStore = useHuntStore();
const mapStore = useMapStore();

const isEnrolled = computed(() => eventStore.isEnrolled);

const router = useRouter();

const task = [
  {
    subtext: "You are here!",
    text: "Take a photo to confirm your arrival",
    buttonText: "Take photo",
    secButtonText: "Upload",
    img: "/rewards/take_photo.svg"
  },
  {
    subtext: "You are here!",
    text: "Take a photo to confirm your arrival",
    buttonText: "Take photo",
    secButtonText: "Upload",
    img: "/rewards/stars.svg"
  },

]


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
    //mapStore.fitBounds();
  }
  else {
    mapUIStore.inactiveDestination();
  }
  mapStore.polygon.remove();


  console.log('close');
};

const showNavbar = computed(() => mapUIStore.showNavBar);

//const showTask = ref(true); 
const showReward = ref(false);


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
      <div class="store-details">
        <DescriptionCard />
      </div>
    </vue-bottom-sheet>

    <NavigationBar v-if="showNavbar" class="navigation-bar" />

    <v-dialog v-model="mapUIStore.showArrivalTask" width="auto" transition="dialog-bottom-transition">
      <v-card class="v-card-style">
        <GeneralRewardCard :text="task[0].text" :subtext="task[0].subtext" :img="task[0].img"
          :button-text="task[0].buttonText" :sec-button-text="task[0].secButtonText" />
      </v-card>
    </v-dialog>


    <v-dialog v-model="mapUIStore.showOneThirdCard" width="auto" transition="dialog-bottom-transition">
      <v-card class="v-card-style">
        <div class="general-reward-card">
          <img src="/rewards/thumb_color.svg" />
          <p> Great job! Keep going~</p>
          <h2> You're 1/3 of the way through your hunt!</h2>
          <GeneralButton text="Next stop" :click-event=null />
        </div>
      </v-card>
    </v-dialog>

    <v-dialog v-model="mapUIStore.showCompleteCard" width="auto" transition="dialog-bottom-transition">
      <v-card class="v-card-style">
        <div class="general-reward-card">
          <img src="/rewards/ace_hunter.svg" />
          <p> Wow, congratulations!</p>
          <h2> You've outpaced 80% of participants!</h2>
          <p>Time</p>
          <h3>2:30:46</h3>
          <p>Your Footsteps</p>
          <h3>Golden Backery</h3>
          <GeneralButton text="Get my reward" :click-event=null />
        </div>
      </v-card>
    </v-dialog>

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
  bottom: 8vh;
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
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
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
  max-width: 320px;
  border-radius: 20px !important;

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