<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiMagnify } from '@mdi/js';
import { defineProps } from 'vue';
import MagnifyButton from './MagnifyButton.vue'
const props = defineProps({
    title: String,
    ifMagnify: Boolean,
    magnifyAction: Function,
    avatarList: Array || null,
});
</script>

<template>
    <div class="card">
        <div class="card-top">
            <h3> {{ title }} </h3>
            <MagnifyButton v-if="ifMagnify" @click="magnifyAction" />
        </div>
        <div class="card-bottom">
            <span v-for="(avatar, index) in avatarList" :key="index">
                <img :src="avatar.avatar" class="store-avatar" />
            </span>
        </div>
    </div>
</template>


<style scoped>
.card {
    border-radius: 20px 20px 20px 20px;
    padding: 0;
    width: 100%;
    overflow: hidden;
}

.card-top {
    border-radius: 20px 20px 0 0;
    padding: 10px 15px;
    background-color: var(--color3);
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
}

.card-bottom {
    padding: 5px 15px;
    background-color: #f5f5f5;
    border-radius: 0 0 20px 20px;
    height: 100%;
    overflow: hidden;
}

.store-avatar {
    margin: 0px;
    margin-right: 10px;
    overflow: hidden;
}
</style>