<script setup>
import GeneralCard from './GeneralCard.vue';

import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import { useHuntStore } from "@/stores/huntStore";
import { useEventStore } from '@/stores/eventStore';
import { useMapUIStore } from '@/stores/mapUIStore';

const router = useRouter();

const eventStore = useEventStore();
const mapUIStore = useMapUIStore();
const huntStore = useHuntStore();

const enrollEvent = (event) => {
    eventStore.enroll(event);
    const nextDest = huntStore.huntStores[0];
    mapUIStore.activeDestination(nextDest.name);
    mapUIStore.activeDistance(nextDest.distance, nextDest.walkTime);
};


function goToTodo() {
    router.push('/todo');
}

const avatarList = computed(() =>
    huntStore.huntStores
        .filter(store => !store.visited)
        .map(store => ({
            avatar: store.avatar,
        }))
);

</script>

<template>
    <div class="register-card">
        <GeneralCard title="Today's Hunting Challenge" :if-magnify=true :magnify-action=goToTodo
            :avatar-list="avatarList" />
        <button class="register-button" @click=enrollEvent>
            <p>I'm ready to start</p>
        </button>
    </div>
</template>


<style scoped>
.register-card {
    display: flex;
    flex-direction: column;
}

.register-button {
    background-color: var(--color2);
    border: none;
    border-radius: 50px;
    padding: 10px;
    color: white;
}
</style>