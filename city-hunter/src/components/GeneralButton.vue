<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    text: String,
    clickEvent:Function,
});
</script>

<template>
    <button class="general-button" @click=clickEvent>
        <p>{{ text }}</p>
    </button>

</template>


<style scoped>
</style>