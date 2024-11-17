<script setup>
import { ref } from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiStar, mdiMapCheckOutline, mdiMagnify } from '@mdi/js';
import { useRouter } from 'vue-router';
import { useMapUIStore } from '@/stores/mapUIStore';
const router = useRouter();
const mapUIStore = useMapUIStore();

function selectNavBarItem(item) {
    mapUIStore.NavBarItem = item;
    if (mapUIStore.NavBarItem === "my-hunt") {
        router.push('/hunt');
    } else if (mapUIStore.NavBarItem === "rewards") {
        router.push('/rewards');
    }
}

</script>

<template>
    <div class="navigate-bar-container">
        <div class="navigate-bar-item" :class="{ active: mapUIStore.NavBarItem === 'my-hunt' }"
            @click="selectNavBarItem('my-hunt')">
            <svg-icon type="mdi" :path="mdiMapCheckOutline"></svg-icon>
            <p>My Hunt</p>
        </div>
        <div class="navigate-bar-item" :class="{ active: mapUIStore.NavBarItem === 'rewards' }"
            @click="selectNavBarItem('rewards')">
            <svg-icon type="mdi" :path="mdiStar"></svg-icon>
            <p>Rewards</p>
        </div>
    </div>
</template>


<style scoped>
.navigate-bar-container {
    display: flex;
    justify-content: space-evenly;
    padding: 10px;
}

.navigate-bar-item {
    border: none;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--gray);
    cursor: pointer;
    transition: color 0.3s;
}

.navigate-bar-item.active {
    color: var(--color2);
}
</style>