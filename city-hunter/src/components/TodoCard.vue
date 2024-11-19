<script setup>
import { defineProps } from 'vue';
import { mdiWalk, mdiDirections } from '@mdi/js'
import SvgIcon from '@jamescoyle/vue-icon';

const props = defineProps({
    title: String,
    distance: String || null,
    time: String || null,
    avatar: String || null,
});

</script>

<template>
    <div class="todo-item-container">

        <img v-if="avatar" class="shop-image" :src="avatar" alt="Shop Avatar" />

        <div>
            <h2>{{ title }}</h2>
            <div v-if="distance != null" class="distance">

                <span class="distance-item">
                    <svg-icon type="mdi" :path=mdiDirections></svg-icon>
                    <p>{{ distance }}</p>
                </span>

                <span class="distance-item">
                    <svg-icon type="mdi" :path=mdiWalk></svg-icon>
                    <p>{{ time }}</p>
                </span>
            </div>
        </div>
    </div>
</template>


<style scoped>
.todo-item-container {
    display: flex;
}

.shop-image {
    width: 65px;
    height: 65px;
    margin-right: 20px;
    border-radius: 100%;
}

.distance {
    display: flex;
    justify-content: start;
    margin: 5px;
    color: var(--gray);
}

.distance-item {
    display: flex;
    margin-right: 10px;
    gap: 3px;
}
</style>