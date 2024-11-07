<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMagnify } from '@mdi/js';
</script>

<template>
    <div class="magnify-container" >
        <svg-icon class="magnify" type="mdi" :path=mdiMagnify></svg-icon>
    </div>
</template>

<style scoped>
.magnify-container {
    padding: 5px;
    border-radius: 100%;
    width: 36px;
    height: 36px;
    background-color: var(--color4);
    color: var(--color2);
    justify-content: center;
    align-items: center;
}
</style>