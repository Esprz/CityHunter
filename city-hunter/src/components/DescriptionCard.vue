<script setup>
import { useMapUIStore } from '@/stores/mapUIStore';
import { computed, defineProps } from 'vue';
import GeneralBottomCard from './GeneralBottomCard.vue';
import GeneralButton from './GeneralButton.vue';
import { useMapStore } from '@/stores/mapStore';
import { useEventStore } from '@/stores/eventStore';
const props = defineProps({
    text: String,
    clickEvent: Function,
});
const mapUIStore = useMapUIStore();
const mapStore = useMapStore();
const eventStore = useEventStore();

const isEnrolled = computed(()=>eventStore.isEnrolled);
const storeInfo = computed(() => mapUIStore.StoreDetailsContent);

const getDirection = async () => {
    console.log(`Navigating to ${storeInfo.name}...`);
    await mapStore.calculateAndDisplayRoute({
        lat: mapStore.destination.lat,
        lng: mapStore.destination.lng,
    });
    mapUIStore.inactiveStoreDetails();
    console.log(`Arrived at ${storeInfo.name}`);
}

</script>

<template>
    <div class="store-details-card">
        <h1>{{ storeInfo.name }}</h1>
        <p>{{ storeInfo.rating || '4.3' }}</p>
        <h3 class="description">{{ storeInfo.description }}</h3>
        <GeneralButton v-if="isEnrolled" class="get-direction" text="Get Directions" :click-event="getDirection"/>
    </div>
</template>

<style scoped>
.get-direction {
    position: absolute;
    bottom: 10px;
    width: 90%;
    align-self: center;
}

.store-details-card {
    width: 90vw;


}

.description {
    width: 100%;
}
</style>