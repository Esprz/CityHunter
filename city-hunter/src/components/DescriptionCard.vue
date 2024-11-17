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

const isEnrolled = computed(() => eventStore.isEnrolled);
const storeInfo = computed(() => mapUIStore.StoreDetailsContent);

console.log(storeInfo.photos);

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
        <p>{{ storeInfo.rating || '4.3' }} ★</p>
        <h4 class="description">{{ storeInfo.description }}</h4>
        <div class="photo-container">
            <img v-for="(photo, index) in storeInfo.photos" :key="index"
                :class="index < 2 ? 'full-width' : 'half-width'" :src="photo" />
        </div>

        <GeneralButton v-if="isEnrolled" class="get-direction" text="Get Directions" :click-event="getDirection" />
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

.photo-container {
    display: flex;
    flex-wrap: wrap; /* 允许换行 */
    margin-top: 10px;
    gap: 10px; /* 图片间距 */
}

.full-width {
    width: 100%; /* 前两张图片占整行宽度 */
    margin-bottom: 10px; /* 每张图片下面的间距 */
    border-radius: 20px;
}

.half-width {
    width: calc(50% - 5px); /* 每张图片占一半宽度（减去间距） */
    border-radius: 20px;
    margin-bottom: 10px;
}

</style>