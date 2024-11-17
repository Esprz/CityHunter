<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiChevronDown, mdiExportVariant, mdiMagnify } from '@mdi/js';
import { ref } from 'vue';
import NavigationBar from '@/components/NavigationBar.vue'
import { useMapUIStore } from "@/stores/mapUIStore";
const mapUIStore = useMapUIStore();
</script>

<template>
    <div class="page-container">
        <div class="page-header">
            <h1>Rewards</h1>  
        </div>        
    </div>
    <NavigationBar v-if="mapUIStore.showNavBar" class="navigation-bar" />
</template>

<style scoped>

    
</style>