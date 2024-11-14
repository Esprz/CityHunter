<script setup>
import MapComponent from '../components/MapComponent.vue';
import NavigationBar from '@/components/NavigationBar.vue'
import RegisterCard from '@/components/RegisterCard.vue'
import GeneralCard from '@/components/GeneralCard.vue';
import { computed } from 'vue';
import { useEventStore } from '@/stores/eventStore';
import LocationNameCard from '@/components/DestinationCard.vue';
import DistanceCard from '@/components/DistanceCard.vue';
import { useRouter } from 'vue-router';
import { useHuntStore } from "@/stores/huntStore";
const eventStore = useEventStore();
const huntStore = useHuntStore();
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
function goToAchieved(){
  router.push('/achieved');
}
</script>

<template>
  <div class="hunter-container">

    <div class="loc-info">
      <LocationNameCard title="XXX House"/>
      <DistanceCard />

    </div>

    <div class="map-background">
      <MapComponent />
    </div>


    <div class="hunt-info">
      <div v-if="isEnrolled">
        <div class="eventCard">
          <GeneralCard title="To Do" :if-magnify=true :magnify-action=goToTodo :avatar-list="todoAvatarList"/>
          <GeneralCard title="Achieved" :if-magnify=false :magnify-action=goToAchieved :avatar-list="achievedAvatarList"/>
        </div>
      </div>
      <div v-else>
        <RegisterCard />
      </div>
    </div>

    <NavigationBar class="navigation-bar" />

  </div>
</template>


<style scoped>
.map-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 90vh;
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