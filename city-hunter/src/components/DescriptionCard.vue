<script setup>
import { useMapUIStore } from '@/stores/mapUIStore';
import { computed, defineProps } from 'vue';
const props = defineProps({
    text: String,
    clickEvent: Function,
});
const mapUIStore = useMapUIStore();
const storeInfo = computed(() => mapUIStore.StoreDetailsContent);
</script>

<template>
    <div>
        {{ storeInfo.name }}
        {{ storeInfo.rating ||'unkown' }}
        <div>
        </div>
    </div>
</template>

<style scoped></style>