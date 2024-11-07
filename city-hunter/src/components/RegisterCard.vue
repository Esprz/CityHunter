<script setup>
import GeneralCard from './GeneralCard.vue';
import { useEventStore } from '@/stores/eventStore';
const eventStore = useEventStore();
const enrollEvent = (event) => eventStore.enroll(event);
</script>

<template>
    <div class="register-card">
        <GeneralCard title="Today's Hunting Challenge" :if-magnify=true />
        <button class="register-button" @click=enrollEvent> <p>I'm ready to start</p></button>
    </div>
</template>


<style scoped>
.register-card{
    display: flex;
    flex-direction: column;
}
.register-button{
    background-color: var(--color2);
    border: none;
    border-radius: 50px;
    padding: 10px;
    color: white;
}

</style>