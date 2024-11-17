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
        <p class="description">{{ storeInfo.description }}</p>
        <div class="photo-container">
            <img v-for="(photo, index) in storeInfo.photos" :key="index"
                :class="[index < 2 ? 'full-width' : 'half-width', 'photo-common']" :src="photo" />
        </div>
    </div>
    <div class="get-direction-wrapper">
        <GeneralButton v-if="isEnrolled" class="get-direction" text="Get Directions" :click-event="getDirection" />
    </div>
</template>

<style scoped>
.get-direction-wrapper {
    position: absolute;
    bottom: 0;
    padding: 15px;
    width: 100%;
    background-color: white;
}

.get-direction {
    width: 100%;
}

.store-details-card {
    width: 100vw;
    padding: 20px;
}

.description {
    width: 100%;
}

.photo-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    gap: 10px;
}

.photo-common {
    margin-bottom: 10px;
    border-radius: 20px;
    object-fit: cover;
    /* 确保图片裁剪适配容器 */
}

.full-width {
    width: 100%;
    aspect-ratio: 16 / 9;
    /* 设置宽高比例为 16:9 */
}

.half-width {
    width: calc(50% - 5px);
    aspect-ratio: 1 / 1;
    /* 设置宽高比例为 1:1 */
}
</style>